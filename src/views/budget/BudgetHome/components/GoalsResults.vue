<script setup lang="ts">
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n';

import GoalProgressBar from '@/components/GoalProgressBar.vue';
import { GoalResult } from '@/graphql';

defineProps({
  goalsResults: {
    type: Array as PropType<GoalResult[]>,
    required: true,
  },
});

const { t } = useI18n();
</script>

<template>
  <VExpansionPanel value="goals">
    <VExpansionPanelTitle>
      <h3>
        {{ t('budget.goals') }}:
        {{ goalsResults.filter(goalResult => goalResult.reached).length }}/{{ goalsResults.length }}
      </h3>
    </VExpansionPanelTitle>
    <VExpansionPanelText>
      <VRow v-for="goalResult in goalsResults" :key="goalResult.goal.id">
        <GoalProgressBar :goalResult="goalResult" />
      </VRow>
    </VExpansionPanelText>
  </VExpansionPanel>
</template>
