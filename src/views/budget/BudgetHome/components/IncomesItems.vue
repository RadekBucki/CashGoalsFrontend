<script setup lang="ts">
import { PropType, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { FetchResult } from '@apollo/client';

import { useModalStore } from '@/components/Modal';
import VFormModal from '@/components/Modal/VFormModal.vue';
import {
  Income,
  IncomeItem, IncomeItemInput,
  UpdateIncomeItemMutationOutput, useDeleteIncomeItemMutation,
  useUpdateIncomeItemMutation,
} from '@/graphql';

const props = defineProps({
  budgetId: {
    type: String as PropType<string>,
    required: true,
  },
  editable: {
    type: Boolean,
    default: true,
  },
  incomesItems: {
    type: Array as PropType<IncomeItem[]>,
    required: true,
  },
  incomes: {
    type: Array as PropType<Income[]>,
    required: true,
  },
  updateIncomesItems: {
    type: Function as PropType<(incomeItems: IncomeItem[]) => void>,
    required: true,
  },
});

const { t } = useI18n();
const modalStore = useModalStore();

const editedIncomeItem: Ref<IncomeItemInput | null> = ref<IncomeItemInput | null>(null);
const setEditedIncomeItem = (incomeItem: IncomeItem | null = null) => {
  if (incomeItem) {
    editedIncomeItem.value = {
      date: incomeItem.date,
      description: incomeItem.description,
      amount: incomeItem.amount,
      incomeId: incomeItem.income?.id,
    };
    if (incomeItem.id) {
      editedIncomeItem.value.id = incomeItem.id;
    }
  } else {
    editedIncomeItem.value = null;
  }
};
const { mutate: updateItem, onDone: onUpdateItem } = useUpdateIncomeItemMutation();
onUpdateItem((result: FetchResult<UpdateIncomeItemMutationOutput>) => {
  if (!result.data?.updateIncomeItem) {
    return;
  }
  let { incomesItems } = props;
  if (editedIncomeItem.value?.id) {
    incomesItems = props.incomesItems.map((item: IncomeItem) => {
      if (item.id === result.data?.updateIncomeItem?.id) {
        return result.data?.updateIncomeItem;
      }
      return item;
    });
  } else {
    incomesItems.push(result.data?.updateIncomeItem);
  }
  props.updateIncomesItems(incomesItems);
  editedIncomeItem.value = null;
});
const editIncomeItem = () => {
  if (!editedIncomeItem.value) {
    return;
  }
  updateItem({
    budgetId: props.budgetId,
    incomeItem: editedIncomeItem.value,
  });
};

const { mutate: deleteItem } = useDeleteIncomeItemMutation();
const deleteIncomeItem = (incomeItem: IncomeItem) => {
  modalStore.showQuestionModal({
    title: t('$vuetify.delete'),
    type: 'question',
    onConfirm: () => {
      deleteItem({
        budgetId: props.budgetId,
        incomeItemId: incomeItem.id,
      })
        .then(() => {
          props.updateIncomesItems(props.incomesItems.filter((item: IncomeItem) => item.id !== incomeItem.id));
          editedIncomeItem.value = null;
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
  items: readonly ({ raw: IncomeItem })[],
};
type GroupHeaderSlotFixed = {
  item: GroupHeaderSlotItem
  columns: { length: number }
  toggleGroup: (group: GroupHeaderSlotItem) => void,
  isGroupOpen: (group: GroupHeaderSlotItem) => boolean,
};
</script>

<template>
  <VExpansionPanel value="incomes">
    <VExpansionPanelTitle>
      <h3>{{
        t('budget.incomes')
          + ': '
          + incomesItems
            .map((incomeItem: IncomeItem) => incomeItem.amount)
            .reduce((a: number, b: number) => a + b, 0)
          + ' ' + t('budget.currency')
      }}</h3>
    </VExpansionPanelTitle>
    <VExpansionPanelText>
      <VDataTable
        :headers="[
          { title: t('budget.incomeItem.date'), value: 'date', sortable: true },
          { title: t('budget.incomeItem.description'), value: 'description' },
          { title: `${t('budget.incomeItem.amount')} (${t('budget.currency')})`, value: 'amount', sortable: true },
          { value: 'actions', align: 'end' },
        ]"
        :items="incomesItems"
        :groupBy="[{ key: 'income.id' }]"
      >
        <template v-slot:[`header.data-table-group`]>
          <tr>
            <th class="w-0" scope="col" />
          </tr>
        </template>
        <template v-slot:[`header.actions`]>
          <VBtn
            v-if="editable"
            variant="plain"
            class="pa-0"
            style="min-width: 0;"
            @click="setEditedIncomeItem({ description: '', amount: 0.0, date: '' } as IncomeItem)"
          >
            <VIcon icon="mdi-plus" />
            {{ t('budget.incomeItem.add') }}
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
                  {{ item.items[0].raw.income.name }}
                  <br />
                  <small>{{ item.items[0].raw.income.description }}</small>
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
                v-if="editable"
                variant="plain"
                class="pa-0"
                style="min-width: 0;"
                @click="setEditedIncomeItem(
                  {
                    description: '', amount: 0.0, date: '', income: { id: item.items[0].raw.income.id },
                  } as IncomeItem,
                )"
              >
                <VIcon icon="mdi-plus" />
                {{ t('budget.incomeItem.add') }}
              </VBtn>
            </td>
          </tr>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <VBtn
            v-if="editable"
            icon="mdi-pencil"
            variant="plain"
            class="pa-0"
            style="min-width: 0;"
            @click="setEditedIncomeItem(item)"
          />
          <VBtn
            v-if="editable"
            icon="mdi-delete"
            variant="plain"
            class="pa-0"
            style="min-width: 0;"
            @click="deleteIncomeItem(item)"
          />
        </template>
      </VDataTable>
      <VFormModal
        v-if="editedIncomeItem !== null"
        :title="editedIncomeItem.id ? t('budget.incomeItem.edit') : t('budget.incomeItem.add')"
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
          :rules="[v => !!v || t('required.validation.error')]"
        >
          <template v-slot:item="{ item, props }">
            <VListItem v-bind="props" :subtitle="item.value?.description" />
          </template>
        </VSelect>
        <VTextField
          v-model="editedIncomeItem.description"
          :label="t('budget.incomeItem.description')"
        />
        <VTextField
          v-model.number="editedIncomeItem.amount"
          type="number"
          :rules="[v => !!v || t('required.validation.error')]"
          :label="`${t('budget.incomeItem.amount')} (${t('budget.currency')})`"
        />
      </VFormModal>
    </VExpansionPanelText>
  </VExpansionPanel>
</template>
