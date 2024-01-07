<script setup lang="ts">
import { PropType, ref, Ref } from 'vue';

import { ApolloQueryResult } from '@apollo/client';

import BudgetInitialization from './components/BudgetInitialization.vue';
import BudgetView from './components/BudgetView/BudgetView.vue';
import { Budget, BudgetQueryOutput, BudgetQueryVariables, useBudgetQuery } from '@/graphql';

const props = defineProps({
  id: {
    type: String as PropType<string>,
    required: true,
  },
});

const budget: Ref<Budget|null> = ref<Budget|null>(null);
const { onResult } = useBudgetQuery(props as BudgetQueryVariables, { fetchPolicy: 'cache-first' });
onResult((result: ApolloQueryResult<BudgetQueryOutput>) => {
  if (!result.data?.budget) {
    return;
  }
  budget.value = JSON.parse(JSON.stringify(result.data.budget));
});

const budgetInitialized = () => {
  if (!budget.value) {
    return;
  }
  budget.value.initializationStep = 'FINISHED';
};
</script>

<template>
  <BudgetView v-if="budget?.initializationStep == 'FINISHED'" :budget="budget" />
  <BudgetInitialization
    v-if="budget?.initializationStep !== 'FINISHED' && budget?.initializationStep != null"
    :budget="budget"
    @initialized="budgetInitialized"
  />
</template>
