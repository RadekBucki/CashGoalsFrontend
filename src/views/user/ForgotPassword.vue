<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { useLocale } from 'vuetify';

import CardForm from '@/components/CardForm.vue';
import CenteredLayout from '@/layouts/content/CenteredLayout.vue';
import useFormsStore from '@/store/forms';

const { t } = useLocale();
const router = useRouter();

const formsStore = useFormsStore();

type ForgotPasswordInput = {
  email: string;
  resetUrl: string;
};

formsStore.setForm('forgotPassword', {
  email: '',
  resetUrl: window.location.origin + router.resolve({ name: 'ResetPassword' }).href,
} as ForgotPasswordInput);
const form: ComputedRef<ForgotPasswordInput> = computed(() => formsStore.getForm('forgotPassword') as ForgotPasswordInput);

const fields = [
  {
    label: t('email'),
    name: 'email',
    rules: [(v: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || t('email.format.validation.error')],
    required: true,
  },
];

async function requestPasswordReset() {
  console.log('requestPasswordReset', form.value);
}
</script>

<template>
  <CenteredLayout>
    <CardForm
      :title="t('forgot.password')"
      :fields="fields"
      formName="forgotPassword"
      :submitFunction="requestPasswordReset"
    />
  </CenteredLayout>
</template>
