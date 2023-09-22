<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useLocale } from 'vuetify';

import { CardForm, Field, useFormsStore, TextWithLink, useFieldsLibrary, useLinksLibrary } from '@/components/CardForm';
import CenteredLayout from '@/layouts/content/CenteredLayout.vue';

const { t } = useLocale();
const formsStore = useFormsStore();
const fieldsLibrary = useFieldsLibrary();
const linksLibrary = useLinksLibrary();

type LoginInput = {
  email: string;
  password: string;
};

formsStore.setForm('login', {
  email: '',
  password: '',
} as LoginInput);
const form: ComputedRef<LoginInput> = computed(() => formsStore.getForm('login') as LoginInput);

const fields: Field[] = [fieldsLibrary.EMAIL, fieldsLibrary.PASSWORD];
const links: TextWithLink[] = [linksLibrary.FORGOT_PASSWORD, linksLibrary.REGISTER];

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
