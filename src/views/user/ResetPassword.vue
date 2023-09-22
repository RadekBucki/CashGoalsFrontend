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

type ResetPasswordInput = {
  email: string;
  token: string;
  password: string;
};

formsStore.setForm('resetPassword', {
  email: router.currentRoute.value.query.user ?? '',
  token: router.currentRoute.value.query.code ?? '',
  password: '',
} as ResetPasswordInput);
const form: ComputedRef<ResetPasswordInput> = computed(() => formsStore.getForm('resetPassword') as ResetPasswordInput);

const fields: Field[] = [fieldsLibrary.EMAIL, fieldsLibrary.TOKEN, fieldsLibrary.PASSWORD];

async function resetPassword() {
  console.log('resetPassword', form.value);
}
</script>

<template>
  <CenteredLayout>
    <CardForm
      :title="t('reset.password')"
      :fields="fields"
      formName="resetPassword"
      :submitFunction="resetPassword"
    />
  </CenteredLayout>
</template>
