<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { useLocale } from 'vuetify';

import { CardForm, Field, useFieldsLibrary, useFormsStore } from '@/components/CardForm';
import CenteredLayout from '@/layouts/content/CenteredLayout.vue';

const { t } = useLocale();
const router = useRouter();
const formsStore = useFormsStore();
const fieldsLibrary = useFieldsLibrary();

type ForgotPasswordInput = {
  email: string;
  resetUrl: string;
};

formsStore.setForm('forgotPassword', {
  email: '',
  resetUrl: window.location.origin + router.resolve({ name: 'ResetPassword' }).href,
} as ForgotPasswordInput);
const form: ComputedRef<ForgotPasswordInput> = computed(() => formsStore.getForm('forgotPassword') as ForgotPasswordInput);

const fields: Field[] = [fieldsLibrary.EMAIL];

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
