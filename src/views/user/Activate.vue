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

type ActivateUserInput = {
  email: string;
  token: string;
};

formsStore.setForm('activateUser', {
  email: router.currentRoute.value.query.user ?? '',
  token: router.currentRoute.value.query.code ?? '',
} as ActivateUserInput);
const form: ComputedRef<ActivateUserInput> = computed(() => formsStore.getForm('activateUser') as ActivateUserInput);

const fields: Field[] = [fieldsLibrary.EMAIL, fieldsLibrary.TOKEN];

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
