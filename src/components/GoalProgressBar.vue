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

const valueFirst: ComputedRef<boolean> = computed<boolean>(
  () => props.goalResult?.goal.min && props.goalResult?.actual < props.goalResult?.goal.min,
);
const valueLast: ComputedRef<boolean> = computed<boolean>(
  () => props.goalResult?.goal.max && props.goalResult?.actual > props.goalResult?.goal.max,
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
    const { min, max } = props.goalResult.goal;
    if (min && max) {
      return `${t('budget.goals.expected')}: ${min} - ${max}${postfix.value}`;
    }
    if (props.goalResult.goal.min) {
      return `${t('budget.goals.expected')} ${t('budget.goals.expected.min')}: ${min}${postfix.value}`;
    }
    if (props.goalResult.goal.max) {
      return `${t('budget.goals.expected')} ${t('budget.goals.expected.max')}: ${max}${postfix.value}`;
    }
    return '';
  },
);
</script>

<template>
  <VCol cols="12" md="12">
    <h4>{{ goalResult.goal.name }}</h4>
    <h5>{{ goalResult.goal.description }}</h5>
    <VTimeline direction="horizontal" side="start">
      <VTimelineItem v-if="valueFirst" dotColor="warning" icon="mdi-alert">
        <strong>{{ goalResult.actual }}{{ postfix }} ({{ expectedPhrase }})</strong>
      </VTimelineItem>

      <VTimelineItem v-if="goalResult.goal.min" dotColor="light-green" size="x-small">
        <template v-slot:opposite>
          {{ goalResult.goal.min }}{{ postfix }}
        </template>
      </VTimelineItem>

      <VTimelineItem v-if="!valueFirst && !valueLast" dotColor="success" icon="mdi-check-bold">
        <strong>{{ goalResult.actual }}{{ postfix }} ({{ expectedPhrase }})</strong>
      </VTimelineItem>

      <VTimelineItem v-if="goalResult.goal.max" dotColor="light-green" size="x-small">
        <template v-slot:opposite>
          {{ goalResult.goal.max }}{{ postfix }}
        </template>
      </VTimelineItem>

      <VTimelineItem v-if="valueLast" dotColor="warning" icon="mdi-alert">
        <strong>{{ goalResult.actual }}{{ postfix }} ({{ expectedPhrase }})</strong>
      </VTimelineItem>
    </VTimeline>
  </VCol>
</template>
