<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useLocale, useTheme } from 'vuetify';

import { CardForm, Field, useFieldsLibrary, useFormsStore } from '@/components/CardForm';
import { useModalStore } from '@/components/Modal';
import {
  GetUserQueryOutput, UpdateUserMutationOutput,
  UpdateUserMutationVariables,
  useGetUserQuery,
  useUpdateUserMutation,
} from '@/graphql';
import useAppStore from '@/stores/app.ts';

const fieldsLibrary = useFieldsLibrary();
const formsStore = useFormsStore();
const appStore = useAppStore();
const modalStore = useModalStore();
const { current } = useLocale();
const theme = useTheme();
const { t } = useLocale();

const fields: Field[] = [
  fieldsLibrary.EMAIL,
  fieldsLibrary.NAME,
  fieldsLibrary.THEME,
  fieldsLibrary.LOCALE,
  fieldsLibrary.PASSWORD,
];
const cardForm = ref<typeof CardForm | null>(null);

const form: ComputedRef<UpdateUserMutationVariables> = computed(
  () => formsStore.getForm('profile') as UpdateUserMutationVariables,
);
formsStore.setForm('profile', {
  email: '',
  name: '',
  theme: '',
  locale: '',
  password: '',
});
const { onResult } = useGetUserQuery();
onResult((result: GetUserQueryOutput) => {
  if (result.data?.user) {
    formsStore.setForm('profile', {
      ...result.data.user,
      password: '',
    } as UpdateUserMutationVariables);
  }
});

const { mutate, onDone, onError } = useUpdateUserMutation();
onError(({ graphQLErrors }) => {
  if (!cardForm.value) {
    return;
  }
  cardForm.value.handleValidationErrors(graphQLErrors);
});
onDone((result: UpdateUserMutationOutput) => {
  if (!result.data?.updateUser) {
    return;
  }
  appStore.setUser(result.data.updateUser);
  current.value = appStore.locale;
  theme.global.name.value = appStore.isDarkMode ? 'dark' : 'light';
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
  <VMain>
    <CardForm
      :submit-function="updateUserData"
      form-name="profile"
      :fields="fields"
      submit-text="update"
      variant="dashboard"
      ref="cardForm"
    />
  </VMain>
</template>
