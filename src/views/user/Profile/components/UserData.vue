<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useLocale } from 'vuetify';

import { ApolloQueryResult, FetchResult } from '@apollo/client';

import { CardForm, Field, useFieldsLibrary, useFormsStore } from '@/components/CardForm';
import { useModalStore } from '@/components/Modal';
import useApp from '@/composables/useApp';
import {
  GetUserQueryOutput, UpdateUserInput, UpdateUserMutationOutput,
  useGetUserQuery,
  useUpdateUserMutation,
} from '@/graphql';

const fieldsLibrary = useFieldsLibrary();
const formsStore = useFormsStore();
const app = useApp();
const modalStore = useModalStore();
const { t } = useLocale();

const fields: Field[] = [
  fieldsLibrary.EMAIL,
  fieldsLibrary.NAME,
  fieldsLibrary.THEME,
  fieldsLibrary.LOCALE,
  fieldsLibrary.PASSWORD_WITHOUT_VALIDATION,
];
const cardForm = ref<typeof CardForm | null>(null);

formsStore.setForm('profile.data', {
  email: '',
  name: '',
  theme: '',
  locale: '',
  password: '',
});
const form: ComputedRef<UpdateUserInput> = computed(
  () => formsStore.getForm('profile.data') as UpdateUserInput,
);
const { onResult } = useGetUserQuery();
onResult((result: ApolloQueryResult<GetUserQueryOutput>) => {
  if (result.data?.user) {
    formsStore.setForm('profile.data', {
      ...result.data.user,
      password: '',
    } as UpdateUserInput);
  }
});

const { mutate, onDone, onError } = useUpdateUserMutation();
onError(({ graphQLErrors }) => {
  if (!cardForm.value) {
    return;
  }
  cardForm.value.handleValidationErrors(graphQLErrors);
});
onDone((result: FetchResult<UpdateUserMutationOutput>) => {
  if (!result.data?.updateUser) {
    return;
  }
  app.setUser(result.data.updateUser);
  modalStore.showModal({
    title: t('profile.updated.title'),
    content: t('profile.updated.content'),
    type: 'success',
  });
});
function updateUserData() {
  mutate({ input: form.value });
}
</script>

<template>
  <CardForm
    :submit-function="updateUserData"
    form-name="profile.data"
    :fields="fields"
    submit-text="update"
    variant="dashboard"
    ref="cardForm"
  />
</template>
