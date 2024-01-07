<script setup lang="ts">
import { PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { Incomes } from '@/components/budget/steps';
import { Budget } from '@/graphql';

defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
});

const { t } = useI18n();

const incomesRef = ref<typeof Incomes | null>(null);

const save = () => {
  if (!incomesRef.value) {
    return;
  }
  incomesRef.value.acceptStep();
};
</script>

<template>
  <div>
    <Incomes :showTitle="false" :budget="budget" ref="incomesRef" />
    <VBtn class="mt-5" @click="save">{{ t('save') }}</VBtn>
  </div>
</template>
