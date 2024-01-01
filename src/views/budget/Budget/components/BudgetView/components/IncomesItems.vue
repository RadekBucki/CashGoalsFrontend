<script setup lang="ts">
import { onMounted, PropType, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { ApolloQueryResult } from '@apollo/client';

import {
  Budget,
  Income,
  IncomeItemsOutput, IncomeItemsQueryOutput,
  useIncomeItemsQuery,
} from '@/graphql';

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

const incomesItems: Ref<IncomeItemsOutput[]> = ref<IncomeItemsOutput[]>([]);
const incomes: Ref<Income[]> = ref<Income[]>([]);
onMounted(async () => {
  const { onResult } = useIncomeItemsQuery({ budgetId: props.budget.id, month: props.month, year: props.year });
  onResult((result: ApolloQueryResult<IncomeItemsQueryOutput>) => {
    if (!result.data?.incomeItems) {
      return;
    }
    incomesItems.value = JSON.parse(JSON.stringify(result.data.incomeItems));
    incomes.value = JSON.parse(JSON.stringify(result.data.incomes));
  });
});

const editIncomeItem = (incomeItem: IncomeItemsOutput) => {
  console.log(incomeItem);
};

const deleteIncomeItem = (incomeItem: IncomeItemsOutput) => {
  console.log(incomeItem);
};
</script>

<template>
  <div>
    <div v-for="income in incomesItems" :key="income.id">
      <h4>{{ income.name }} {{ income.description ? '-' : '' }} {{ income.description }}</h4>
      <VDataTable
        :headers="[
          { title: t('budget.incomeItem.date'), value: 'date' },
          { title: t('budget.incomeItem.name'), value: 'name' },
          { title: t('budget.incomeItem.description'), value: 'description' },
          { title: t('budget.incomeItem.amount'), value: 'amount' },
          { value: 'actions', align: 'end' },
        ]"
        :items="income.incomeItems"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <VBtn icon="mdi-pencil" variant="plain" class="pa-0" style="min-width: 0;" @click="editIncomeItem(item)" />
          <VBtn icon="mdi-delete" variant="plain" class="pa-0" style="min-width: 0;" @click="deleteIncomeItem(item)" />
        </template>
      </VDataTable>
    </div>
  </div>
</template>
