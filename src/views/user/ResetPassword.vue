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

const fields = [
  {
    label: t('email'),
    name: 'email',
    rules: [(v: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || t('email.format.validation.error')],
    required: true,
  },
  {
    label: t('token'),
    name: 'token',
    required: true,
  },
  {
    label: t('password'),
    name: 'password',
    rules: [(v: string) => /^(?=.*[A-Z])(?=.*[\W_]).{5,}$/.test(v) || t('password.format.validation.error')],
    required: true,
    type: 'password',
  },
];

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
