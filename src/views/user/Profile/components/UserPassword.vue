<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useLocale } from 'vuetify';

import { FetchResult } from '@apollo/client';

import { CardForm, Field, useFieldsLibrary, useFormsStore } from '@/components/CardForm';
import { useModalStore } from '@/components/Modal';
import {
  UpdateUserPasswordMutationOutput, UpdateUserPasswordMutationVariables,
  useUpdateUserPasswordMutation,
} from '@/graphql';

const fieldsLibrary = useFieldsLibrary();
const formsStore = useFormsStore();
const modalStore = useModalStore();
const { t } = useLocale();

formsStore.setForm('profile.password', {
  oldPassword: '',
  newPassword: '',
  passwordConfirmation: '',
});
const form: ComputedRef<UpdateUserPasswordMutationVariables> = computed(
  () => formsStore.getForm('profile.password') as UpdateUserPasswordMutationVariables,
);

const fields: Field[] = [
  fieldsLibrary.getWithNewName(fieldsLibrary.PASSWORD_WITHOUT_VALIDATION, 'oldPassword'),
  fieldsLibrary.getWithNewName(fieldsLibrary.PASSWORD, 'newPassword'),
  {
    name: 'passwordConfirmation',
    rules: [(v: string) => v === form.value.newPassword || 'password.confirmation.validation.error'],
    required: true,
    type: 'password',
  },
];
const cardForm = ref<typeof CardForm | null>(null);

const { mutate, onDone, onError } = useUpdateUserPasswordMutation();
onError(({ graphQLErrors }) => {
  if (!cardForm.value) {
    return;
  }
  cardForm.value.handleValidationErrors(graphQLErrors);
});
onDone((result: FetchResult<UpdateUserPasswordMutationOutput>) => {
  if (!result.data?.updateUserPassword) {
    return;
  }
  modalStore.showModal({
    title: t('profile.updated.title'),
    content: t('profile.updated.content'),
    type: 'success',
  });
});
function updateUserPassword() {
  mutate(form.value);
}
</script>

<template>
  <CardForm
    :submit-function="updateUserPassword"
    form-name="profile.password"
    :fields="fields"
    submit-text="update"
    variant="dashboard"
    ref="cardForm"
  />
</template>
