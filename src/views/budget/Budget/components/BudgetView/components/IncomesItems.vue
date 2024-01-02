<script setup lang="ts">
import { onMounted, PropType, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { ApolloQueryResult } from '@apollo/client';

import { useModalStore } from '@/components/Modal';
import VFormModal from '@/components/Modal/VFormModal.vue';
import {
  Budget,
  Income, IncomeItem, IncomeItemInput,
  IncomeItemsOutput, IncomeItemsQueryOutput, useDeleteIncomeItemMutation,
  useIncomeItemsQuery, useUpdateIncomeItemMutation,
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
const modalStore = useModalStore();

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

const editedIncomeItem: Ref<IncomeItemInput | null> = ref<IncomeItemInput | null>(null);
const setEditedIncomeItem = (incomeItem: IncomeItemInput | null = null, incomeId: number | null = null) => {
  editedIncomeItem.value = incomeItem;
  if (editedIncomeItem.value && incomeId) {
    editedIncomeItem.value.incomeId = incomeId;
  }
};
const { mutate: updateItem } = useUpdateIncomeItemMutation();
const editIncomeItem = () => {
  if (!editedIncomeItem.value) {
    return;
  }
  updateItem({
    budgetId: props.budget.id,
    incomeItem: editedIncomeItem.value,
  })
    .then(() => {
      incomesItems.value = incomesItems.value.map((incomeItemsOutput: IncomeItemsOutput) => {
        const incomeItemsOutputCopy = JSON.parse(JSON.stringify(incomeItemsOutput));
        incomeItemsOutputCopy.incomeItems = incomeItemsOutputCopy.incomeItems
          .map((incomeItemOutput: IncomeItemsOutput) => {
            if (incomeItemOutput.id === editedIncomeItem.value?.id) {
              return editedIncomeItem.value;
            }
            return incomeItemOutput;
          });
        return incomeItemsOutputCopy;
      });
    });
  editedIncomeItem.value = null;
};

const { mutate: deleteItem } = useDeleteIncomeItemMutation();
const deleteIncomeItem = (incomeItem: IncomeItem) => {
  modalStore.showQuestionModal({
    title: t('$vuetify.delete'),
    type: 'question',
    onConfirm: () => {
      deleteItem({
        budgetId: props.budget.id,
        incomeItemId: incomeItem.id,
      })
        .then(() => {
          incomesItems.value = incomesItems.value.map((incomeItemsOutput: IncomeItemsOutput) => {
            const incomeItemsOutputCopy = JSON.parse(JSON.stringify(incomeItemsOutput));
            incomeItemsOutputCopy.incomeItems = incomeItemsOutputCopy.incomeItems
              .filter((incomeItemOutput: IncomeItemsOutput) => incomeItemOutput.id !== incomeItem.id);
            if (incomeItemsOutputCopy.incomeItems.length === 0) {
              return null;
            }
            return incomeItemsOutputCopy;
          })
            .filter((incomeItemsOutput: IncomeItemsOutput | null) => incomeItemsOutput != null);
        });
    },
  });
};
</script>

<template>
  <VExpansionPanel value="incomes">
    <VExpansionPanelTitle>
      <h3>{{
        t('budget.incomes')
          + ': '
          + incomesItems
            .map((incomeItemsOutput: IncomeItemsOutput) => incomeItemsOutput.incomeItems
              .map((incomeItem: IncomeItem) => incomeItem.amount)
              .reduce((a: number, b: number) => a + b, 0))
            .reduce((a: number, b: number) => a + b, 0)
          + ' ' + t('budget.currency')
      }}</h3>
    </VExpansionPanelTitle>
    <VExpansionPanelText>
      <div v-for="income in incomesItems" :key="income.id">
        <h4>
          {{ income.name }}: {{
            income.incomeItems.map((incomeItem: IncomeItem) => incomeItem.amount).reduce((a: number, b: number) => a + b, 0)
          }} {{ t('budget.currency') }}
        </h4>
        <p v-if="income.description">{{ income.description }}</p>
        <VDataTable
          :headers="[
            { title: t('budget.incomeItem.date'), value: 'date', sortable: true },
            { title: t('budget.incomeItem.name'), value: 'name' },
            { title: t('budget.incomeItem.description'), value: 'description' },
            { title: `${t('budget.incomeItem.amount')} (${t('budget.currency')})`, value: 'amount', sortable: true },
            { value: 'actions', align: 'end' },
          ]"
          :items="income.incomeItems"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <VBtn
              icon="mdi-pencil"
              variant="plain"
              class="pa-0"
              style="min-width: 0;"
              @click="setEditedIncomeItem(item, income.id)"
            />
            <VBtn icon="mdi-delete" variant="plain" class="pa-0" style="min-width: 0;" @click="deleteIncomeItem(item)" />
          </template>
        </VDataTable>
      </div>
      <VFormModal
        v-if="editedIncomeItem !== null"
        :title="t('budget.incomeItem.edit', editedIncomeItem?.name ?? '')"
        :onClose="setEditedIncomeItem"
        :onConfirm="editIncomeItem"
      >
        <VTextField
          v-model="editedIncomeItem.date"
          :rules="[v => !!v || t('required.validation.error')]"
          :label="t('budget.incomeItem.date')"
          type="date"
        />
        <VSelect
          v-model="editedIncomeItem.incomeId"
          :items="incomes"
          :itemValue="item => item.id"
          :itemTitle="item => item.name"
          :label="t('budget.incomeItem.income')"
        >
          <template v-slot:item="{ item, props }">
            <VListItem v-bind="props" :subtitle="item.value?.description" />
          </template>
        </VSelect>
        <VTextField
          v-model="editedIncomeItem.name"
          :rules="[v => !!v || t('required.validation.error')]"
          :label="t('budget.incomeItem.name')"
        />
        <VTextField
          v-model="editedIncomeItem.description"
          :label="t('budget.incomeItem.description')"
        />
        <VTextField
          v-model="editedIncomeItem.amount"
          :rules="[v => !!v || t('required.validation.error')]"
          :label="`${t('budget.incomeItem.amount')} (${t('budget.currency')})`"
          type="number"
        />
      </VFormModal>
    </VExpansionPanelText>
  </VExpansionPanel>
</template>
