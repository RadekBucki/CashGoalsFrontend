<script setup lang="ts">
import { PropType } from 'vue';
import { useI18n } from 'vue-i18n';

import { Budget } from '@/graphql';
import LeftLayout from '@/layouts/content/LeftLayout.vue';

defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
});

const { t } = useI18n();
</script>

<template>
  <LeftLayout :sm="12" :md="12" :lg="12" :xl="12">
    <h1>{{ t('budget') + ' ' + budget.name }}</h1>
    <VTabs>
      <VTab :to="{ name: 'BudgetHome' }">{{ t('budget.home') }}</VTab>
      <VTab :to="{ name: 'BudgetIncomes' }">{{ t('budget.incomes') }}</VTab>
      <VTab :to="{ name: 'BudgetCategories' }">{{ t('budget.expenses.categories') }}</VTab>
      <VTab :to="{ name: 'BudgetGoals' }">{{ t('budget.goals') }}</VTab>
      <VTab :to="{ name: 'BudgetUsers' }">{{ t('budget.users') }}</VTab>
    </VTabs>
    <RouterView :budget="budget" />
  </LeftLayout>
</template>
