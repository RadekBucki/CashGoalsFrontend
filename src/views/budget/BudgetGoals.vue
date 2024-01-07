<script setup lang="ts">
import { PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { Budget } from '@/graphql';
import ExpensesCategories
  from '@/views/budget/Budget/components/BudgetInitialization/steps/ExpensesCategories/ExpensesCategories.vue';
import Goals from '@/views/budget/Budget/components/BudgetInitialization/steps/Goals.vue';

defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
});

const { t } = useI18n();

const goalsRef = ref<typeof Goals | null>(null);

const save = () => {
  if (!goalsRef.value) {
    return;
  }
  goalsRef.value.acceptStep();
};
</script>

<template>
  <div>
    <Goals :showTitle="false" :budget="budget" ref="goalsRef" />
    <VBtn class="mt-5" @click="save">{{ t('save') }}</VBtn>
  </div>
</template>
