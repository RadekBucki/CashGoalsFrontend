<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLocale } from 'vuetify';

import { CardForm, Field, useFormsStore, Link, useFieldsLibrary, useLinksLibrary } from '@/components/CardForm';
import { useModalStore } from '@/components/Modal';
import useApp from '@/composables/useApp';
import { useCreateUserMutation, CreateUserInput } from '@/graphql';
import CenteredLayout from '@/layouts/content/CenteredLayout.vue';

const { t } = useLocale();
const router = useRouter();
const modalStore = useModalStore();
const formsStore = useFormsStore();
const app = useApp();
const fieldsLibrary = useFieldsLibrary();
const linksLibrary = useLinksLibrary();

type RegisterInput = {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
};

formsStore.setForm('register', {
  email: '',
  password: '',
  passwordConfirmation: '',
  name: '',
} as RegisterInput);
const form: ComputedRef<RegisterInput> = computed(() => formsStore.getForm('register') as RegisterInput);

const fields: Field[] = [
  fieldsLibrary.EMAIL,
  fieldsLibrary.NAME,
  fieldsLibrary.PASSWORD,
  {
    name: 'passwordConfirmation',
    rules: [(v: string) => v === form.value.password || 'password.confirmation.validation.error'],
    required: true,
    type: 'password',
  },
];
const links: Link[] = [linksLibrary.LOGIN, linksLibrary.FORGOT_PASSWORD];

const cardForm = ref<typeof CardForm | null>(null);
const { mutate, onError, onDone } = useCreateUserMutation();
onError(({ graphQLErrors }) => {
  if (!cardForm.value) {
    return;
  }
  cardForm.value.handleValidationErrors(graphQLErrors);
});
onDone(() => {
  modalStore.showModal({
    title: t('register.success.title'),
    content: t('register.success.content'),
    type: 'success',
    onClose: () => {
      const url = router.resolve({ name: 'Activate' }).href;
      const queryParameters = new URLSearchParams({ user: form.value.email });
      router.push(`${url}?${queryParameters.toString()}`);
    },
  });
});
function register() {
  mutate({
    userInput: {
      email: form.value.email,
      password: form.value.password,
      name: form.value.name,
      theme: app.isDarkMode() ? 'DARK' : 'LIGHT',
      activationUrl: window.location.origin + router.resolve({ name: 'Activate' }).href,
    } as CreateUserInput,
  });
}
</script>

<template>
  <CenteredLayout>
    <CardForm
      form-name="register"
      :fields="fields"
      :links="links"
      :submit-function="register"
      ref="cardForm"
    />
  </CenteredLayout>
</template>
