<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useRouter } from 'vue-router';

import { FetchResult } from '@apollo/client';

import { CardForm, Field, useFieldsLibrary, useFormsStore } from '@/components/CardForm';
import {
  CreateBudgetMutationVariables,
  useCreateBudgetMutation,
  CreateBudgetMutationOutput,
} from '@/graphql';
import LeftLayout from '@/layouts/content/LeftLayout.vue';

const router = useRouter();
const formsStore = useFormsStore();
const fieldsLibrary = useFieldsLibrary();

formsStore.setForm('budget.create.name', { name: '' } as CreateBudgetMutationVariables);
const form: ComputedRef<CreateBudgetMutationVariables> = computed(
  () => formsStore.getForm('budget.create.name') as CreateBudgetMutationVariables,
);
const cardForm = ref<typeof CardForm | null>(null);

const fields: Field[] = [fieldsLibrary.BUDGET_NAME];

const { mutate, onError, onDone } = useCreateBudgetMutation();
onError(({ graphQLErrors }) => {
  if (!cardForm.value) {
    return;
  }
  cardForm.value.handleValidationErrors(graphQLErrors);
});
onDone((result: FetchResult<CreateBudgetMutationOutput>) => {
  if (!result.data?.createBudget.id) {
    return;
  }
  router.push({ name: 'Budget', params: { id: result.data?.createBudget.id } });
});
async function createBudget() {
  await mutate(form.value);
}
</script>

<template>
  <LeftLayout :sm="12" :md="6" :lg="6">
    <CardForm
      formName="budget.create.name"
      submit-text="next"
      :fields="fields"
      :submitFunction="createBudget"
      variant="dashboard"
      ref="cardForm"
    />
  </LeftLayout>
</template>
