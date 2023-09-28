<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLocale } from 'vuetify';

import { CardForm, Field, useFormsStore, TextWithLink, useFieldsLibrary, useLinksLibrary } from '@/components/CardForm';
import { useModalStore, Modal } from '@/components/Modal';
import { useCreateUserMutation, CreateUserInput } from '@/graphql';
import CenteredLayout from '@/layouts/content/CenteredLayout.vue';

const { t } = useLocale();
const router = useRouter();
const modalStore = useModalStore();
const formsStore = useFormsStore();
const fieldsLibrary = useFieldsLibrary();
const linksLibrary = useLinksLibrary();

type RegisterInput = {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  activationUrl: string;
};

formsStore.setForm('register', {
  email: '',
  password: '',
  passwordConfirmation: '',
  name: '',
  activationUrl: window.location.origin + router.resolve({ name: 'Activate' }).href,
} as RegisterInput);
const form: ComputedRef<RegisterInput> = computed(() => formsStore.getForm('register') as RegisterInput);

const fields: Field[] = [
  fieldsLibrary.EMAIL,
  fieldsLibrary.NAME,
  fieldsLibrary.PASSWORD,
  {
    name: 'password.confirmation',
    rules: [(v: string) => v === form.value.password || 'password.confirmation.validation.error'],
    required: true,
    type: 'password',
  },
];
const links: TextWithLink[] = [linksLibrary.LOGIN, linksLibrary.FORGOT_PASSWORD];

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
  } as Modal);
});
function register() {
  mutate({
    userInput: {
      email: form.value.email,
      password: form.value.password,
      name: form.value.name,
      activationUrl: form.value.activationUrl,
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
