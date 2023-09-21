<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useLocale } from 'vuetify';

import { CardForm, Field, useFormsStore, TextWithLink } from '@/components/CardForm';
import CenteredLayout from '@/layouts/content/CenteredLayout.vue';

const { t } = useLocale();
const formsStore = useFormsStore();

type LoginInput = {
  email: string;
  password: string;
};

formsStore.setForm('login', {
  email: '',
  password: '',
} as LoginInput);
const form: ComputedRef<LoginInput> = computed(() => formsStore.getForm('login') as LoginInput);

const fields: Field[] = [
  {
    label: t('email'),
    name: 'email',
    rules: [(v: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || t('email.format.validation.error')],
    required: true,
  },
  {
    label: t('password'),
    name: 'password',
    required: true,
    type: 'password',
  },
];

const links: TextWithLink[] = [
  {
    textBefore: t('dont.have.account'),
    text: t('register'),
    routeName: 'Register',
  },
  {
    textBefore: t('forgot.password'),
    text: t('reset.password'),
    routeName: 'ForgotPassword',
  },
];

async function login() {
  console.log('login', form.value);
}
</script>

<template>
  <CenteredLayout>
    <CardForm
      :title="t('login')"
      :fields="fields"
      :links="links"
      formName="login"
      :submitFunction="login"
    />
  </CenteredLayout>
</template>
