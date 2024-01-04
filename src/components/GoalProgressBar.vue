<script setup lang="ts">
import { computed, ComputedRef, PropType } from 'vue';
import { useI18n } from 'vue-i18n';

import { GoalResult } from '@/graphql';

const props = defineProps({
  goalResult: {
    type: Object as PropType<GoalResult>,
    required: true,
  },
});

const { t } = useI18n();

const min: ComputedRef<number | null> = computed<number | null>(() => props.goalResult.goal.min ?? null);
const max: ComputedRef<number | null> = computed<number | null>(() => props.goalResult.goal.max ?? null);
const actual: ComputedRef<number> = computed<number>(() => props.goalResult.actual);
const total: ComputedRef<number> = computed<number>(() => props.goalResult.totalIncome);

const valueFirst: ComputedRef<boolean> = computed<boolean>(() => min.value && actual.value < min.value);
const valueLast: ComputedRef<boolean> = computed<boolean>(() => max.value && actual.value > max.value);

const medianDiff: ComputedRef<number> = computed<number>(
  () => {
    const values: number[] = [0, min.value, actual.value, max.value, total.value]
      .filter((v) => v !== null)
      .sort((a, b) => a - b);

    return (values[Math.floor(values.length / 2)] - values[Math.floor(values.length / 2) - 1]) / 2;
  },
);

const postfix: ComputedRef<string> = computed<string>(
  () => {
    if (props.goalResult.goal.type === 'AMOUNT') {
      return t('budget.currency');
    }
    return '%';
  },
);

const expectedPhrase: ComputedRef<string> = computed<string>(
  () => {
    if (min.value && max.value) {
      return `${t('budget.goals.expected')}: ${min.value} - ${max.value}${postfix.value}`;
    }
    if (min.value) {
      return `${t('budget.goals.expected')} ${t('budget.goals.expected.min')}: ${min.value}${postfix.value}`;
    }
    if (max.value) {
      return `${t('budget.goals.expected')} ${t('budget.goals.expected.max')}: ${max.value}${postfix.value}`;
    }
    return '';
  },
);

const repeatArray = (times: number) => Array.from({ length: times }, (_, index) => index);
const calculateNumberOfRepeats = (valueOnLeft: number, valueOnRight: number) => {
  return 10;
  if (!min.value || !max.value) {
    return 0;
  }
  if ((valueOnRight - valueOnLeft) > medianDiff.value) {
    return 1;
  }
  if ((valueOnRight - valueOnLeft) > medianDiff.value / 2) {
    return 2;
  }
  return 0;
};
</script>

<template>
  <VCol cols="12" md="12">
    <h4>{{ goalResult.goal.name }}</h4>
    <h5>{{ goalResult.goal.description }}</h5>
    <VTimeline direction="horizontal" side="start">
      <template v-if="valueFirst">
        <VTimelineItem hideDot v-for="index in repeatArray(calculateNumberOfRepeats(0, actual))" :key="index" />
        <VTimelineItem hide-dot />
        <VTimelineItem hide-dot />
        <VTimelineItem v-if="valueFirst" dotColor="warning" icon="mdi-alert">
          <strong>{{ actual }}{{ postfix }} ({{ expectedPhrase }})</strong>
        </VTimelineItem>

        <VTimelineItem hideDot v-for="index in repeatArray(calculateNumberOfRepeats(actual, min))" :key="index" />

        <VTimelineItem v-if="min" dotColor="light-green" size="x-small">
          <template v-slot:opposite>
            {{ min }}{{ postfix }}
          </template>
        </VTimelineItem>

        <VTimelineItem hideDot v-for="index in repeatArray(calculateNumberOfRepeats(min, max))" :key="index" />

        <VTimelineItem v-if="max" dotColor="light-green" size="x-small">
          <template v-slot:opposite>
            {{ max }}{{ postfix }}
          </template>
        </VTimelineItem>

        <VTimelineItem hideDot v-for="index in repeatArray(calculateNumberOfRepeats(max, total))" :key="index" />
      </template>
      <template v-if="!valueFirst && !valueLast">
        <VTimelineItem hideDot v-for="index in repeatArray(calculateNumberOfRepeats(0, min))" :key="index" />

        <VTimelineItem v-if="min && min != actual" dotColor="light-green" size="x-small">
          <template v-slot:opposite>
            {{ min }}{{ postfix }}
          </template>
        </VTimelineItem>

        <VTimelineItem hideDot v-for="index in repeatArray(calculateNumberOfRepeats(min, actual))" :key="index" />

        <VTimelineItem dotColor="success" icon="mdi-check-bold">
          <strong>{{ actual }}{{ postfix }} ({{ expectedPhrase }})</strong>
          <template v-slot:opposite v-if="min === actual || max === actual">
            {{ min === actual ? min : max }}{{ postfix }}
          </template>
        </VTimelineItem>

        <VTimelineItem hideDot v-for="index in repeatArray(calculateNumberOfRepeats(actual, max))" :key="index" />

        <VTimelineItem v-if="max && max != actual" dotColor="light-green" size="x-small">
          <template v-slot:opposite>
            {{ max }}{{ postfix }}
          </template>
        </VTimelineItem>

        <VTimelineItem hideDot v-for="index in repeatArray(calculateNumberOfRepeats(max, total))" :key="index" />
      </template>
      <template v-if="valueLast">
        <VTimelineItem hideDot v-for="index in repeatArray(calculateNumberOfRepeats(0, min))" :key="index" />

        <VTimelineItem v-if="min" dotColor="light-green" size="x-small">
          <template v-slot:opposite>
            {{ min }}{{ postfix }}
          </template>
        </VTimelineItem>

        <VTimelineItem hideDot v-for="index in repeatArray(calculateNumberOfRepeats(min, max))" :key="index" />

        <VTimelineItem v-if="max" dotColor="light-green" size="x-small">
          <template v-slot:opposite>
            {{ max }}{{ postfix }}
          </template>
        </VTimelineItem>

        <VTimelineItem hideDot v-for="index in repeatArray(calculateNumberOfRepeats(max, actual))" :key="index" />

        <VTimelineItem dotColor="warning" icon="mdi-alert">
          <strong>{{ actual }}{{ postfix }} ({{ expectedPhrase }})</strong>
        </VTimelineItem>

        <VTimelineItem hideDot v-for="index in repeatArray(calculateNumberOfRepeats(actual, total))" :key="index" />
      </template>
    </VTimeline>
  </VCol>
</template>

<style scoped>
.v-timeline--horizontal.v-timeline {
  grid-column-gap: 0 !important;
}
.v-timeline--horizontal.v-timeline--align-center .v-timeline-item__body {
  padding-inline: 0 !important;
}
</style>
