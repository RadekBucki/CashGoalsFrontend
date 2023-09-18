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

type ActivateUserInput = {
  email: string;
  token: string;
};

formsStore.setForm('activateUser', {
  email: router.currentRoute.value.query.user ?? '',
  token: router.currentRoute.value.query.code ?? '',
} as ActivateUserInput);
const form: ComputedRef<ActivateUserInput> = computed(() => formsStore.getForm('activateUser') as ActivateUserInput);

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
];

async function activateUser() {
  console.log('activateUser', form.value);
}
</script>

<template>
  <CenteredLayout>
    <CardForm
      :title="t('activate.account')"
      :fields="fields"
      formName="activateUser"
      :submitFunction="activateUser"
      :auto-submit="Boolean(form.email && form.token)"
    />
  </CenteredLayout>
</template>
