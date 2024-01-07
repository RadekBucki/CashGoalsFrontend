<script setup lang="ts">
import { PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { Budget } from '@/graphql';
import ExpensesCategories
  from '@/views/budget/Budget/components/BudgetInitialization/steps/ExpensesCategories/ExpensesCategories.vue';

defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
});

const { t } = useI18n();

const expensesCategoriesRef = ref<typeof ExpensesCategories | null>(null);

const save = () => {
  if (!expensesCategoriesRef.value) {
    return;
  }
  expensesCategoriesRef.value.acceptStep();
};
</script>

<template>
  <div>
    <ExpensesCategories :showTitle="false" :budget="budget" ref="expensesCategoriesRef" />
    <VBtn class="mt-5" @click="save">{{ t('save') }}</VBtn>
  </div>
</template>
