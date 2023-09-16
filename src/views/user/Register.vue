<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLocale } from 'vuetify';

import { VForm } from 'vuetify/components';

import CenteredLayout from '@/layouts/content/CenteredLayout.vue';

const { t } = useLocale();
const router = useRouter();

type RegisterInput = {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  activationUrl: string;
};

const form: Ref<RegisterInput> = ref({
  email: '',
  password: '',
  passwordConfirmation: '',
  name: '',
  activationUrl: router.resolve({ name: 'Login' }).href,
});

const formRef: Ref<VForm | null> = ref(null);

async function register() {
  const { valid } = await formRef?.value?.validate();
  if (valid) {
    console.log('register', form.value);
  } else {
    console.log('invalid');
  }
}
</script>

<template>
  <CenteredLayout>
    <VCard>
      <VCardTitle class="text-center">{{ t('register') }}</VCardTitle>

      <VForm ref="formRef" @submit.prevent="register">
        <VCardText>
          <VTextField
            v-model="form.email"
            :label="t('email')"
            :rules="[(v: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || t('email.format.validation.error')]"
            validate-on="blur"
            required
          />
          <VTextField
            v-model="form.name"
            :label="t('name')"
            :rules="[(v: string) => /^.{2,100}$/.test(v) || t('name.length.validation.error')]"
            validate-on="blur"
            required
          />
          <VTextField
            v-model="form.password"
            :label="t('password')"
            type="password"
            :rules="[(v: string) => /^(?=.*[A-Z])(?=.*[\W_]).{5,}$/.test(v) || t('password.format.validation.error')]"
            validate-on="blur"
            required
          />
          <VTextField
            v-model="form.passwordConfirmation"
            :label="t('password.confirmation')"
            :rules="[(v: string) => v === form.password || t('password.confirmation.validation.error')]"
            validate-on="blur"
            type="password"
            required
          />
          <div>
            {{ t('already.have.account') }}
            <RouterLink :to="{ name: 'Login' }">{{ t('login') }}</RouterLink>
          </div>
          <div>
            {{ t('forgot.password') }}
            <RouterLink :to="{ name: 'ForgotPassword' }">{{ t('reset.password') }}</RouterLink>
          </div>
        </VCardText>
        <VCardActions class="justify-center">
          <VBtn type="submit" color="secondary" variant="elevated">{{ t('register') }}</VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </CenteredLayout>
</template>
