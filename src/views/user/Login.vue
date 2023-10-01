<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useRouter } from 'vue-router';

import { CardForm, Field, useFormsStore, TextWithLink, useFieldsLibrary, useLinksLibrary } from '@/components/CardForm';
import { useLoginMutation, LoginMutationVariables, AuthorizationOutput } from '@/graphql';
import CenteredLayout from '@/layouts/content/CenteredLayout.vue';
import useAppStore from '@/stores/app.ts';

const formsStore = useFormsStore();
const appStore = useAppStore();
const fieldsLibrary = useFieldsLibrary();
const linksLibrary = useLinksLibrary();
const router = useRouter();

formsStore.setForm('login', {
  email: router.currentRoute.value.query.user ?? '',
  password: '',
} as LoginMutationVariables);
const form: ComputedRef<LoginMutationVariables> = computed(
  () => formsStore.getForm('login') as LoginMutationVariables,
);
const cardForm = ref<typeof CardForm | null>(null);

const fields: Field[] = [fieldsLibrary.EMAIL, fieldsLibrary.PASSWORD_WITHOUT_VALIDATION];
const links: TextWithLink[] = [linksLibrary.FORGOT_PASSWORD, linksLibrary.REGISTER];

const { mutate, onError, onDone } = useLoginMutation();
onError(({ graphQLErrors }) => {
  if (!cardForm.value) {
    return;
  }
  cardForm.value.handleValidationErrors(graphQLErrors);
});
onDone((result) => {
  appStore.setAuthorizationOutput(result.data?.login as AuthorizationOutput);
  router.push({ name: 'Dashboard' });
});
async function login() {
  await mutate(form.value);
}
</script>

<template>
  <CenteredLayout>
    <CardForm
      formName="login"
      :fields="fields"
      :links="links"
      :submitFunction="login"
      ref="cardForm"
    />
  </CenteredLayout>
</template>
