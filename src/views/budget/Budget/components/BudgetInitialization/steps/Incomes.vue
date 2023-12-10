<script setup lang="ts">
import { onMounted, PropType, Ref, ref } from 'vue';
import { useLocale } from 'vuetify';

import { ApolloQueryResult, FetchResult } from '@apollo/client';

import {
  Budget,
  IncomeInput,
  IncomesQueryOutput,
  IncomesQueryVariables, UpdateIncomesMutationOutput,
  useIncomesQuery,
  useUpdateIncomesMutation,
} from '@/graphql';

const props = defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
});

const { t } = useLocale();

const initialIncomes: Ref<IncomeInput[]> = ref<IncomeInput[]>([]);
const incomes: Ref<IncomeInput[]> = ref<IncomeInput[]>([]);
const selectedIncome: Ref<IncomeInput|null> = ref<IncomeInput|null>(null);
const removedIncomesIds: Ref<number[]> = ref<number[]>([]);

onMounted(() => {
  const { onResult } = useIncomesQuery({ budgetId: props.budget?.id } as IncomesQueryVariables);
  onResult((result: ApolloQueryResult<IncomesQueryOutput>) => {
    if (!result.data?.incomes) {
      return;
    }
    initialIncomes.value = structuredClone(result.data.incomes);
    incomes.value = result.data.incomes;
  });
});
const removeIncome = (income: IncomeInput) => {
  incomes.value = incomes.value.filter((i) => i !== income);
  if (selectedIncome.value === income) {
    selectedIncome.value = null;
  }
  if (income.id) {
    removedIncomesIds.value.push(income.id);
  }
};
const addIncome = () => {
  selectedIncome.value = {
    name: t('budget.incomes.new'),
    description: '',
  };
  incomes.value.push(selectedIncome.value);
};

const { mutate, onDone } = useUpdateIncomesMutation();

onDone((result: FetchResult<UpdateIncomesMutationOutput>) => {
  if (!result.data?.updateIncomes) {
    return;
  }
  initialIncomes.value = structuredClone(result.data.updateIncomes);
  incomes.value = result.data.updateIncomes;
  removedIncomesIds.value = [];
});
const acceptStep = () => {
  const modifiedIncomes = incomes.value.filter((income) => {
    const initialIncome = initialIncomes.value.find((i) => i.id === income.id);
    return !initialIncome || income.name !== initialIncome.name || income.description !== initialIncome.description;
  });
  if (modifiedIncomes.length === 0 && removedIncomesIds.value.length === 0) {
    return;
  }
  mutate({
    budgetId: props.budget.id,
    incomes: modifiedIncomes,
    removedIncomeIds: removedIncomesIds.value,
  });
};
defineExpose({ acceptStep });
</script>

<template>
  <div>
    <h1>{{ t('budget.incomes.define') }}</h1>
    <VRow>
      <VCol cols="12" md="6">
        <VList>
          <VListItem
            v-for="income in incomes"
            :key="income.id ?? income.name"
            :value="income"
            @click="selectedIncome = income"
          >
            <VListItemTitle>
              {{ income.name }}
              <VIcon style="float: right" @click="removeIncome(income)">mdi-trash-can-outline</VIcon>
            </VListItemTitle>
          </VListItem>
          <VListItem>
            <VListItemTitle>
              <VIcon @click="addIncome">mdi-plus</VIcon>
              {{ t('budget.incomes.add') }}
            </VListItemTitle>
          </VListItem>
        </VList>
      </VCol>
      <VCol cols="12" md="6" v-if="selectedIncome">
        <VTextField
          v-model="selectedIncome.name"
          :label="t('budget.incomes.name')"
          outlined
          required
        />
        <VTextField
          v-model="selectedIncome.description"
          :label="t('budget.incomes.description')"
          outlined
        />
      </VCol>
    </VRow>
  </div>
</template>
