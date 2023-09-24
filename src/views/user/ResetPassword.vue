<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLocale } from 'vuetify';

import { CardForm, Field, useFieldsLibrary, useFormsStore } from '@/components/CardForm';
import { Modal, useModalStore } from '@/components/Modal';
import { ResetPasswordMutationVariables, useResetPasswordMutation } from '@/graphql';
import CenteredLayout from '@/layouts/content/CenteredLayout.vue';

const { t } = useLocale();
const router = useRouter();
const formsStore = useFormsStore();
const modalStore = useModalStore();
const fieldsLibrary = useFieldsLibrary();

formsStore.setForm('resetPassword', {
  email: router.currentRoute.value.query.user ?? '',
  token: router.currentRoute.value.query.code ?? '',
  password: '',
} as ResetPasswordMutationVariables);
const form: ComputedRef<ResetPasswordMutationVariables> = computed(
  () => formsStore.getForm('resetPassword') as ResetPasswordMutationVariables,
);
const cardForm = ref<typeof CardForm | null>(null);

const fields: Field[] = [fieldsLibrary.EMAIL, fieldsLibrary.TOKEN, fieldsLibrary.PASSWORD];

const { mutate, onError, onDone } = useResetPasswordMutation();
onError(({ graphQLErrors }) => {
  if (!cardForm.value) {
    return;
  }
  cardForm.value.handleValidationErrors(graphQLErrors);
});
onDone(() => {
  modalStore.showModal({
    title: t('password.reset'),
    content: t('password.reset.message'),
    type: 'success',
    onClose: () => {
      const url = router.resolve({ name: 'Login' }).href;
      const queryParameters = new URLSearchParams({ user: form.value.email });
      router.push(`${url}?${queryParameters.toString()}`);
    },
  } as Modal);
});
async function resetPassword() {
  await mutate(form.value);
}
</script>

<template>
  <CenteredLayout>
    <CardForm
      :title="t('reset.password')"
      :fields="fields"
      formName="resetPassword"
      :submitFunction="resetPassword"
      ref="cardForm"
    />
  </CenteredLayout>
</template>
