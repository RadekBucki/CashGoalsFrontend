<script setup lang="ts">
import { onMounted, PropType, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';

import { ApolloQueryResult } from '@apollo/client';

import { IncomesItems } from './components';
import {
  Budget,
  BudgetViewQueryOutput,
  Category,
  Expense,
  GoalResult, GoalResultsQueryOutput,
  Income,
  IncomeItem,
  useBudgetViewQuery, useGoalResultsQuery,
} from '@/graphql';
import LeftLayout from '@/layouts/content/LeftLayout.vue';
import Expenses from '@/views/budget/Budget/components/BudgetView/components/Expenses.vue';
import GoalsResults from '@/views/budget/Budget/components/BudgetView/components/GoalsResults.vue';

const props = defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
});

const { t } = useI18n();
const { mobile } = useDisplay();

const now = new Date();
const month: Ref<number> = ref(now.getMonth() + 1);
const year: Ref<number> = ref(now.getFullYear());
const editDate: Ref<boolean> = ref(false);

const goalsResults: Ref<GoalResult[]> = ref<GoalResult[]>([]);
const incomesItems: Ref<IncomeItem[]> = ref<IncomeItem[]>([]);
const expenses: Ref<Expense[]> = ref<Expense[]>([]);

const incomes: Ref<Income[]> = ref<Income[]>([]);
const categories: Ref<Category[]> = ref<Category[]>([]);

const mounted: Ref<boolean> = ref(false);

onMounted(() => {
  const { onResult } = useBudgetViewQuery({
    budgetId: props.budget.id,
    month: month.value,
    year: year.value,
  });
  onResult((result: ApolloQueryResult<BudgetViewQueryOutput>) => {
    if (!result.data?.goalResults || !result.data?.incomeItems || !result.data?.expenses) {
      return;
    }
    goalsResults.value = JSON.parse(JSON.stringify(result.data.goalResults));
    incomesItems.value = JSON.parse(JSON.stringify(result.data.incomeItems));
    expenses.value = JSON.parse(JSON.stringify(result.data.expenses));
    incomes.value = JSON.parse(JSON.stringify(result.data.incomes));
    categories.value = JSON.parse(JSON.stringify(result.data.visibleCategories));
  });
  mounted.value = true;
});
const { onResult, refetch: updateGoalsResults } = useGoalResultsQuery(
  { budgetId: props.budget.id, month: month.value, year: year.value },
  { enabled: mounted },
);
onResult((result: ApolloQueryResult<GoalResultsQueryOutput>) => {
  if (!result.data?.goalResults) {
    return;
  }
  goalsResults.value = JSON.parse(JSON.stringify(result.data.goalResults));
});
</script>

<template>
  <LeftLayout :sm="12" :md="12" :lg="12" :xl="12">
    <h1>{{ t('budget') + ' ' + budget.name }}</h1>
    <h2 :class="mobile ? 'd-inline-block' : 'd-inline-flex'">
      {{ t('budget.month') }}
      <template v-if="editDate">
        <VSelect
          v-model="month"
          density="compact"
          :items="[
            { title: t('months.1'), value: 1 },
            { title: t('months.2'), value: 2 },
            { title: t('months.3'), value: 3 },
            { title: t('months.4'), value: 4 },
            { title: t('months.5'), value: 5 },
            { title: t('months.6'), value: 6 },
            { title: t('months.7'), value: 7 },
            { title: t('months.8'), value: 8 },
            { title: t('months.9'), value: 9 },
            { title: t('months.10'), value: 10 },
            { title: t('months.11'), value: 11 },
            { title: t('months.12'), value: 12 },
          ]"
        />
        <VTextField v-model="year" type="number" density="compact" />
      </template>
      <template v-else>{{ t('months.' + month) }}&nbsp;{{ year }}</template>
      <VBtn
        @click="editDate = !editDate"
        :variant="mobile && editDate ? 'elevated' : 'plain'"
        class="mb-5"
        style="min-width: 0;"
      >
        <template v-if="editDate">
          <VIcon icon="mdi-check" />
        </template>
        <template v-else>
          <sup>
            <VIcon icon="mdi-pencil" />
          </sup>
        </template>
      </VBtn>
    </h2>
    <VExpansionPanels variant="accordion" multiple :model-value="['goals', 'incomes', 'expenses']">
      <GoalsResults :goalsResults="goalsResults" />
      <IncomesItems
        :budgetId="props.budget?.id"
        :incomesItems="incomesItems"
        :incomes="incomes"
        :updateIncomesItems="(items: IncomeItem[]) => { incomesItems = items; updateGoalsResults(); }"
      />
      <Expenses
        :budgetId="props.budget?.id"
        :expenses="expenses"
        :categories="categories"
        :updateExpenses="(items: Expense[]) => { expenses = items; updateGoalsResults(); }"
      />
    </VExpansionPanels>
  </LeftLayout>
</template>
