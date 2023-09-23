<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLocale } from 'vuetify';

import { useMutation } from '@vue/apollo-composable';

import { CardForm, Field, useFieldsLibrary, useFormsStore } from '@/components/CardForm';
import { Modal, useModalStore } from '@/components/Modal';
import ActivateUserMutation from '@/graphql/user/ActivateUserMutation.ts';
import CenteredLayout from '@/layouts/content/CenteredLayout.vue';

const { t } = useLocale();
const router = useRouter();
const formsStore = useFormsStore();
const fieldsLibrary = useFieldsLibrary();
const modalStore = useModalStore();

type ActivateUserInput = {
  email: string;
  token: string;
};

formsStore.setForm('activateUser', {
  email: router.currentRoute.value.query.user ?? '',
  token: router.currentRoute.value.query.code ?? '',
} as ActivateUserInput);
const form: ComputedRef<ActivateUserInput> = computed(() => formsStore.getForm('activateUser') as ActivateUserInput);
const cardForm = ref<typeof CardForm | null>(null);

const fields: Field[] = [fieldsLibrary.EMAIL, fieldsLibrary.TOKEN];

const { mutate, onError, onDone } = useMutation(ActivateUserMutation);
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
function activateUser() {
  mutate(form.value);
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
