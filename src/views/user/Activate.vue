<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLocale } from 'vuetify';

import { CardForm, Field, useFieldsLibrary, useFormsStore } from '@/components/CardForm';
import { Modal, useModalStore } from '@/components/Modal';
import { useActivateUserMutation, ActivateUserMutationVariables } from '@/graphql';
import CenteredLayout from '@/layouts/content/CenteredLayout.vue';

const { t } = useLocale();
const router = useRouter();
const formsStore = useFormsStore();
const fieldsLibrary = useFieldsLibrary();
const modalStore = useModalStore();

formsStore.setForm('activateUser', {
  email: router.currentRoute.value.query.user ?? '',
  token: router.currentRoute.value.query.code ?? '',
} as ActivateUserMutationVariables);
const form: ComputedRef<ActivateUserMutationVariables> = computed(
  () => formsStore.getForm('activateUser') as ActivateUserMutationVariables,
);
const cardForm = ref<typeof CardForm | null>(null);

const fields: Field[] = [fieldsLibrary.EMAIL, fieldsLibrary.TOKEN];

const { mutate, onError, onDone } = useActivateUserMutation();
onError(({ graphQLErrors }) => {
  if (!cardForm.value) {
    return;
  }
  cardForm.value.handleValidationErrors(graphQLErrors);
});
onDone(() => {
  modalStore.showModal({
    title: t('account.activated'),
    content: t('account.activated.message'),
    type: 'success',
    onClose: () => {
      const url = router.resolve({ name: 'Login' }).href;
      const queryParameters = new URLSearchParams({ user: form.value.email });
      router.push(`${url}?${queryParameters.toString()}`);
    },
  } as Modal);
});
async function activateUser() {
  await mutate(form.value);
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
      ref="cardForm"
    />
  </CenteredLayout>
</template>
