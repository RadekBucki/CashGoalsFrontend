<script setup lang="ts">
import { onMounted, PropType, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { ApolloQueryResult, FetchResult } from '@apollo/client';

import { findCategoryById } from '@/components/CategorySelect';
import CategorySelect from '@/components/CategorySelect/CategorySelect.vue';
import { useModalStore } from '@/components/Modal';
import VFormModal from '@/components/Modal/VFormModal.vue';
import {
  Budget,
  Category,
  Expense,
  ExpenseInput,
  ExpensesQueryOutput,
  UpdateExpenseMutationOutput, useDeleteExpenseMutation,
  useExpensesQuery,
  useUpdateExpenseMutation,
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

const expenses: Ref<Expense[]> = ref<Expense[]>([]);
const categories: Ref<Category[]> = ref<Category[]>([]);
onMounted(async () => {
  const { onResult } = useExpensesQuery({ budgetId: props.budget.id, month: props.month, year: props.year });
  onResult((result: ApolloQueryResult<ExpensesQueryOutput>) => {
    if (!result.data?.expenses) {
      return;
    }
    expenses.value = JSON.parse(JSON.stringify(result.data.expenses));
    categories.value = JSON.parse(JSON.stringify(result.data.visibleCategories));
  });
});

const editedExpense: Ref<ExpenseInput | null> = ref<ExpenseInput | null>(null);
const setEditedExpense = (expense: Expense | null = null) => {
  if (expense) {
    editedExpense.value = {
      date: expense.date,
      description: expense.description,
      amount: expense.amount,
      categoryId: expense.category?.id,
    };
    if (expense.id) {
      editedExpense.value.id = expense.id;
    }
  } else {
    editedExpense.value = null;
  }
};

const { mutate: updateExpense, onDone: onUpdateExpense } = useUpdateExpenseMutation();
onUpdateExpense((result: FetchResult<UpdateExpenseMutationOutput>) => {
  if (!result.data?.updateExpense) {
    return;
  }
  if (editedExpense.value?.id) {
    expenses.value = expenses.value.map((expense) => {
      if (expense.id === editedExpense.value?.id) {
        return result.data?.updateExpense as Expense;
      }
      return expense;
    });
  } else {
    expenses.value.push(result.data?.updateExpense as Expense);
  }
  editedExpense.value = null;
});
const editExpense = () => {
  if (!editedExpense.value) {
    return;
  }
  updateExpense({ budgetId: props.budget.id, expense: editedExpense.value });
};

const { mutate: deleteExpenseMutate } = useDeleteExpenseMutation();
const deleteExpense = (expense: Expense) => {
  modalStore.showQuestionModal({
    title: t('$vuetify.delete'),
    type: 'question',
    onConfirm: () => {
      deleteExpenseMutate({ budgetId: props.budget.id, expenseId: expense.id })
        .then(() => {
          expenses.value = expenses.value.filter((e) => e.id !== expense.id);
        });
    },
  });
};

// This type is not exported by Vuetify, so we need to define it here
type GroupHeaderSlotItem = {
  type: 'group';
  depth: number;
  id: string;
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  items: readonly ({ raw: Expense })[],
};
type GroupHeaderSlotFixed = {
  item: GroupHeaderSlotItem
  columns: { length: number }
  toggleGroup: (group: GroupHeaderSlotItem) => void,
  isGroupOpen: (group: GroupHeaderSlotItem) => boolean,
};
</script>

<template>
  <VExpansionPanel value="expenses">
    <VExpansionPanelTitle>
      <h3>{{ t('budget.expenses') }}</h3>
    </VExpansionPanelTitle>
    <VExpansionPanelText>
      <VDataTable
        :headers="[
          { title: t('budget.expense.date'), value: 'date', sortable: true },
          { title: t('budget.expense.description'), value: 'description' },
          { title: `${t('budget.expense.amount')} (${t('budget.currency')})`, value: 'amount', sortable: true },
          { value: 'actions', align: 'end' },
        ]"
        :items="expenses"
        :group-by="[{ key: 'categories' }]"
      >

        <template v-slot:[`header.data-table-group`]>
          <tr>
            <th class="w-0" scope="col" />
          </tr>
        </template>
        <template v-slot:[`header.actions`]>
          <VBtn
            variant="plain"
            class="pa-0"
            style="min-width: 0;"
            @click="setEditedExpense({ description: '', amount: 0.0, date: '' } as Expense)"
          >
            <VIcon icon="mdi-plus" />
            {{ t('budget.expense.add') }}
          </VBtn>
        </template>
        <template
          v-slot:group-header="{
            item, columns, toggleGroup, isGroupOpen,
          }: GroupHeaderSlotFixed"
        >
          <tr>
            <td :colspan="columns.length - 2">
              <VBtn variant="text" @click="toggleGroup(item)">
                <VIcon :icon="isGroupOpen(item) ? '$expand' : '$next'" />
                <div>
                  {{ item.value }}
                </div>
              </VBtn>
            </td>
            <td>
              <strong>
                {{ item.items.map((i) => i.raw.amount).reduce((a: number, b: number) => a + b, 0) }}
              </strong>
            </td>
            <td class="text-end">
              <VBtn
                variant="plain"
                class="pa-0"
                style="min-width: 0;"
                @click="setEditedExpense({ description: '', amount: 0.0, date: '' } as Expense)"
              >
                <VIcon icon="mdi-plus" />
                {{ t('budget.expense.add') }}
              </VBtn>
            </td>
          </tr>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <VBtn
            icon="mdi-pencil"
            variant="plain"
            class="pa-0"
            style="min-width: 0;"
            @click="setEditedExpense(item)"
          />
          <VBtn icon="mdi-delete" variant="plain" class="pa-0" style="min-width: 0;" @click="deleteExpense(item)" />
        </template>
      </VDataTable>
      <VFormModal
        v-if="editedExpense !== null"
        :title="editedExpense.id ? t('budget.expense.edit') : t('budget.expense.add')"
        :onClose="setEditedExpense"
        :onConfirm="editExpense"
      >
        <VTextField
          v-model="editedExpense.date"
          :label="t('budget.expense.date')"
          :rules="[v => !!v || t('required.validation.error')]"
          type="date"
        />
        <CategorySelect
          :label="t('budget.expense.category')"
          :categories="categories"
          :selectedCategory="findCategoryById(editedExpense.categoryId, categories)"
          :update="category => {
            if (!editedExpense) {
              return;
            }
            editedExpense.categoryId = category?.id as number;
          }"
        />
        <VTextField
          v-model="editedExpense.description"
          :label="t('budget.expense.description')"
          :rules="[v => !!v || t('required.validation.error')]"
        />
        <VTextField
          v-model.number="editedExpense.amount"
          :label="t('budget.expense.amount')"
          :rules="[v => !!v || t('required.validation.error')]"
          type="number"
        />
      </VFormModal>
    </VExpansionPanelText>
  </VExpansionPanel>
</template>
