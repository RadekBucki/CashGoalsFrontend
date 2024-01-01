<script setup lang="ts">
import { onMounted, PropType, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ExpensesCategories from './steps/ExpensesCategories/ExpensesCategories.vue';
import Goals from './steps/Goals.vue';
import Incomes from './steps/Incomes.vue';
import UsersRights from './steps/UsersRights.vue';
import { Budget, Step } from '@/graphql';
import LeftLayout from '@/layouts/content/LeftLayout.vue';

const { t } = useI18n();

const props = defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
});
const emit = defineEmits(['initialized']);

const stepsRefs: { [key in Step]: Ref<typeof ExpensesCategories | typeof Goals | typeof Incomes | typeof UsersRights | null> } = {
  INCOMES: ref<typeof Incomes | null>(null),
  EXPENSES_CATEGORIES: ref<typeof ExpensesCategories | null>(null),
  GOALS: ref<typeof Goals | null>(null),
  USERS_AND_RIGHTS: ref<typeof UsersRights | null>(null),
  FINISHED: ref<null>(null),
};
const steps = Object.keys(stepsRefs) as Step[];

const currentStep: Ref<Step> = ref<Step>('INCOMES');
onMounted(() => {
  if (!props.budget?.initializationStep) {
    return;
  }
  currentStep.value = props.budget.initializationStep;
});
const acceptCurrentStep = async (): Promise<boolean> => {
  const currentStepRef = stepsRefs[currentStep.value];
  if (currentStepRef.value) {
    return currentStepRef.value.acceptStep();
  }
  return true;
};
const nextStep = async () => {
  if (!await acceptCurrentStep()) {
    return;
  }
  const currentStepIndexValue = steps.indexOf(currentStep.value);
  if (currentStepIndexValue < steps.length - 1) {
    currentStep.value = steps[currentStepIndexValue + 1];
  }
  if (currentStep.value === 'FINISHED') {
    emit('initialized');
  }
};
const previousStep = async () => {
  if (!await acceptCurrentStep()) {
    return;
  }
  const currentStepIndexValue = steps.indexOf(currentStep.value);
  if (currentStepIndexValue > 0) {
    currentStep.value = steps[currentStepIndexValue - 1];
  }
};
</script>

<template>
  <LeftLayout :sm="12" :md="12" :lg="12">
    <Incomes v-show="currentStep === 'INCOMES'" :budget="budget" :ref="stepsRefs.INCOMES" />
    <ExpensesCategories v-show="currentStep == 'EXPENSES_CATEGORIES'" :budget="budget" :ref="stepsRefs.EXPENSES_CATEGORIES" />
    <Goals v-show="currentStep == 'GOALS'" :budget="budget" :ref="stepsRefs.GOALS" />
    <UsersRights v-show="currentStep == 'USERS_AND_RIGHTS'" :budget="budget" :ref="stepsRefs.USERS_AND_RIGHTS" />
    <VBtn
      v-if="currentStep != 'INCOMES'"
      @click="previousStep"
      color="primary"
      prepend-icon="mdi-chevron-left"
      location="center"
    >
      {{ t('back') }}
    </VBtn>
    <VBtn @click="nextStep" color="primary" append-icon="mdi-chevron-right" location="center">
      {{ currentStep === 'USERS_AND_RIGHTS' ? t('finish') : t('next') }}
    </VBtn>
  </LeftLayout>
</template>
