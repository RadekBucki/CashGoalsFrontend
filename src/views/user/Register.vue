<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLocale } from 'vuetify';

import { useMutation } from '@vue/apollo-composable';

import CardForm from '@/components/CardForm.vue';
import { CreateUserInput } from '@/graphql/types';
import CreateUserMutation from '@/graphql/user/CreateUserMutation.ts';
import CenteredLayout from '@/layouts/content/CenteredLayout.vue';
import useFormsStore from '@/store/forms';

const { t } = useLocale();
const router = useRouter();

const formsStore = useFormsStore();

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
const fields = [
  {
    label: t('email'),
    name: 'email',
    rules: [(v: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || t('email.format.validation.error')],
    required: true,
  },
  {
    label: t('name'),
    name: 'name',
    rules: [(v: string) => /^.{2,100}$/.test(v) || t('name.length.validation.error')],
    required: true,
  },
  {
    label: t('password'),
    name: 'password',
    rules: [(v: string) => /^(?=.*[A-Z])(?=.*[\W_]).{5,}$/.test(v) || t('password.format.validation.error')],
    required: true,
    type: 'password',
  },
  {
    label: t('password.confirmation'),
    name: 'passwordConfirmation',
    rules: [(v: string) => v === form.value.password || t('password.confirmation.validation.error')],
    required: true,
    type: 'password',
  },
];

const links = [
  {
    textBefore: t('already.have.account'),
    text: t('login'),
    routeName: 'Login',
  },
  {
    textBefore: t('forgot.password'),
    text: t('reset.password'),
    routeName: 'ForgotPassword',
  },
];

const cardForm = ref<typeof CardForm | null>(null);
const { mutate, onError, onDone } = useMutation(CreateUserMutation);
onError(({ graphQLErrors }) => {
  if (!cardForm.value) {
    return;
  }
  cardForm.value.handleValidationErrors(graphQLErrors);
});
onDone((data) => {
  console.log(data);
});
function register() {
  if (!cardForm.value) {
    return;
  }
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
      :title="t('register')"
      :fields="fields"
      :links="links"
      form-name="register"
      :submit-function="register"
      ref="cardForm"
    />
  </CenteredLayout>
</template>
