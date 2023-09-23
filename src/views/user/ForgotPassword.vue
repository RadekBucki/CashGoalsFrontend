<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLocale } from 'vuetify';

import { useMutation } from '@vue/apollo-composable';

import { CardForm, Field, useFieldsLibrary, useFormsStore } from '@/components/CardForm';
import { Modal, useModalStore } from '@/components/Modal';
import RequestPasswordResetMutation from '@/graphql/user/RequestPasswordResetMutation.ts';
import CenteredLayout from '@/layouts/content/CenteredLayout.vue';

const { t } = useLocale();
const router = useRouter();
const formsStore = useFormsStore();
const fieldsLibrary = useFieldsLibrary();
const modalStore = useModalStore();

type ForgotPasswordInput = {
  email: string;
  resetUrl: string;
};

formsStore.setForm('forgotPassword', {
  email: '',
  resetUrl: window.location.origin + router.resolve({ name: 'ResetPassword' }).href,
} as ForgotPasswordInput);
const form: ComputedRef<ForgotPasswordInput> = computed(() => formsStore.getForm('forgotPassword') as ForgotPasswordInput);
const cardForm = ref<typeof CardForm | null>(null);

const fields: Field[] = [fieldsLibrary.EMAIL];

const { mutate, onError, onDone } = useMutation(RequestPasswordResetMutation);
onError(({ graphQLErrors }) => {
  if (!cardForm.value) {
    return;
  }
  cardForm.value.handleValidationErrors(graphQLErrors);
});
onDone(() => {
  modalStore.showModal({
    title: t('password.reset.requested'),
    content: t('password.reset.requested.message'),
    type: 'success',
    onClose: () => {
      const url = router.resolve({ name: 'ResetPassword' }).href;
      const queryParameters = new URLSearchParams({ user: form.value.email });
      router.push(`${url}?${queryParameters.toString()}`);
    },
  } as Modal);
});

async function requestPasswordReset() {
  await mutate(form.value);
}
</script>

<template>
  <CenteredLayout>
    <CardForm
      :title="t('forgot.password')"
      :fields="fields"
      formName="forgotPassword"
      :submitFunction="requestPasswordReset"
      ref="cardForm"
    />
  </CenteredLayout>
</template>
