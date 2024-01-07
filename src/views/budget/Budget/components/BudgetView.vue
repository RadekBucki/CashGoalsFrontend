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
      <VTab :to="{ name: 'BudgetHome' }" v-if="budget.rights?.includes('VIEW')">
        {{ t('budget.home') }}
      </VTab>
      <VTab :to="{ name: 'BudgetIncomes' }" v-if="budget.rights?.includes('EDIT_INCOMES')">
        {{ t('budget.incomes') }}
      </VTab>
      <VTab :to="{ name: 'BudgetCategories' }" v-if="budget.rights?.includes('EDIT_CATEGORIES')">
        {{ t('budget.expenses.categories') }}
      </VTab>
      <VTab :to="{ name: 'BudgetGoals' }" v-if="budget.rights?.includes('EDIT_GOALS')">
        {{ t('budget.goals') }}
      </VTab>
      <VTab :to="{ name: 'BudgetUsers' }" v-if="budget.rights?.includes('EDIT_USERS_AND_RIGHTS')">
        {{ t('budget.users') }}
      </VTab>
    </VTabs>
    <RouterView :budget="budget" />
  </LeftLayout>
</template>
