<script setup lang="ts">
import { PropType, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { Budget } from '@/graphql';
import Incomes from '@/views/budget/Budget/components/BudgetInitialization/steps/Incomes.vue';
import UsersRights from '@/views/budget/Budget/components/BudgetInitialization/steps/UsersRights.vue';

defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
});

const { t } = useI18n();

const usersRightsRef = ref<typeof UsersRights | null>(null);

const save = () => {
  if (!usersRightsRef.value) {
    return;
  }
  usersRightsRef.value.acceptStep();
};
</script>

<template>
  <div>
    <UsersRights :budget="budget" ref="usersRightsRef" />
    <VBtn class="mt-5" @click="save">{{ t('save') }}</VBtn>
  </div>
</template>
