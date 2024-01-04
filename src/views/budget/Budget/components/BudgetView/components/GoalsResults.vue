<script setup lang="ts">
import { onMounted, PropType, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import GoalProgressBar from '@/components/GoalProgressBar.vue';
import { Budget, GoalResult, useGoalResultsQuery } from '@/graphql';

const props = defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
  month: {
    type: Number as PropType<number>,
    required: true,
  },
  year: {
    type: Number as PropType<number>,
    required: true,
  },
});

const { t } = useI18n();

const goalsResults: Ref<GoalResult[]> = ref<GoalResult[]>([]);
onMounted(() => {
  const { onResult } = useGoalResultsQuery({ budgetId: props.budget.id, month: props.month, year: props.year });
  onResult((result) => {
    if (!result.data?.goalResults) {
      return;
    }
    goalsResults.value = JSON.parse(JSON.stringify(result.data.goalResults));
  });
});
</script>

<template>
  <VExpansionPanel value="goals">
    <VExpansionPanelTitle>
      <h3>{{ t('budget.goals') }}</h3>
    </VExpansionPanelTitle>
    <VExpansionPanelText>
      <VRow v-for="goalResult in goalsResults" :key="goalResult.goal.id">
        <GoalProgressBar :goalResult="goalResult" />
      </VRow>
    </VExpansionPanelText>
  </VExpansionPanel>
</template>
