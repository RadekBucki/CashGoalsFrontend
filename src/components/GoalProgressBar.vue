<script setup lang="ts">
import { computed, ComputedRef, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';

import { GoalResult } from '@/graphql';

const props = defineProps({
  goalResult: {
    type: Object as PropType<GoalResult>,
    required: true,
  },
});

const { t } = useI18n();
const { mobile } = useDisplay();

const min: ComputedRef<number | null> = computed<number | null>(() => props.goalResult.goal.min ?? null);
const max: ComputedRef<number | null> = computed<number | null>(() => props.goalResult.goal.max ?? null);
const actual: ComputedRef<number> = computed<number>(() => props.goalResult.actual);

const postfix: ComputedRef<string> = computed<string>(
  () => {
    if (props.goalResult.goal.type === 'AMOUNT') {
      return t('budget.currency');
    }
    return '%';
  },
);

type TimeLineItem = {
  hideDot: boolean;
  dotColor?: string;
  icon?: string;
  size: string;
  text: string;
  oppositeText: string;
};
const timelineItems: ComputedRef<TimeLineItem[]> = computed<TimeLineItem[]>(
  () => {
    const blankItem: TimeLineItem = {
      hideDot: true,
      size: 'default',
      text: '',
      oppositeText: '',
    };
    const getMinMaxItem = (value: number | null): TimeLineItem => {
      if (!value) {
        return blankItem;
      }
      return {
        hideDot: false,
        dotColor: 'light-green',
        size: 'x-small',
        text: '',
        oppositeText: `${value}${postfix.value}`,
      };
    };

    function optimizeArray(items: number[]) {
      const differences = items.map((item, index) => {
        if (index === 0) {
          return 0;
        }
        return item - items[index - 1];
      });

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 5; i++) {
        const maxDifferenceIndex = differences.indexOf(Math.max(...differences));

        // Put new value between two values with max difference
        const newValue = (items[maxDifferenceIndex] + items[maxDifferenceIndex - 1]) / 2;
        items.splice(maxDifferenceIndex, 0, newValue);

        // Update differences
        differences[maxDifferenceIndex] = newValue - items[maxDifferenceIndex - 1];
        differences.splice(maxDifferenceIndex, 0, items[maxDifferenceIndex + 1] - newValue);
      }
      return items;
    }

    const getActualItem = (): TimeLineItem => {
      if ((min.value && actual.value < min.value) || (max.value && actual.value > max.value)) {
        return {
          hideDot: false,
          dotColor: 'warning',
          icon: 'mdi-alert',
          size: 'default',
          text: `${actual.value}${postfix.value}`,
          oppositeText: '',
        };
      }
      let oppositeText = '';
      if (min.value === actual.value) {
        oppositeText = `${min.value}${postfix.value}`;
      }
      if (max.value === actual.value) {
        oppositeText = `${max.value}${postfix.value}`;
      }
      return {
        hideDot: false,
        dotColor: 'success',
        icon: 'mdi-check-bold',
        size: 'default',
        text: `${actual.value}${postfix.value}`,
        oppositeText,
      };
    };

    const items: number[] = [min.value, actual.value, max.value]
      .filter((v) => v !== null)
      .sort((a, b) => (a as number) - (b as number)) as number[];

    return optimizeArray(items)
      // remove duplicates
      .filter((item, index, self) => self.indexOf(item) === index)
      .map((item) => {
        switch (item) {
          case min.value:
            return getMinMaxItem(min.value);
          case actual.value:
            return getActualItem();
          case max.value:
            return getMinMaxItem(max.value);
          default:
            return blankItem;
        }
      });
  },
);
</script>

<template>
  <VCol cols="12" md="12">
    <h4>{{ goalResult.goal.name }}</h4>
    <h5>{{ goalResult.goal.description }}</h5>
    <VTimeline :direction="mobile ? 'vertical' : 'horizontal'" side="start">
      <VTimelineItem
        v-for="(item, index) in timelineItems"
        :key="index"
        :hide-dot="item.hideDot"
        :dot-color="item.dotColor"
        :icon="item.icon"
        :size="item.size"
      >
        <template v-slot:opposite v-if="!mobile">
          {{ item.oppositeText }}
        </template>
        <template v-if="!mobile">{{ item.text }}</template>
      </VTimelineItem>
    </VTimeline>
  </VCol>
</template>
