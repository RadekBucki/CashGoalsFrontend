<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useLocale } from 'vuetify';

import { VForm } from 'vuetify/components';

import CenteredLayout from '@/layouts/content/CenteredLayout.vue';

const { t } = useLocale();

type LoginInput = {
  email: string;
  password: string;
};

const form: Ref<LoginInput> = ref({
  email: '',
  password: '',
});

const formRef: Ref<VForm | null> = ref(null);

async function login() {
  const { valid } = await formRef?.value?.validate();
  if (valid) {
    console.log('login', form.value);
  } else {
    console.log('invalid');
  }
}
</script>

<template>
  <CenteredLayout>
    <VCard>
      <VCardTitle class="text-center">
        <span class="headline">{{ t('login') }}</span>
      </VCardTitle>

      <VForm ref="formRef" @submit.prevent="login">
        <VCardText>
          <VTextField
            v-model="form.email"
            :label="t('email')"
            required
          />

          <VTextField
            v-model="form.password"
            :label="t('password')"
            :rules="[(v: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || t('email.format.validation.error')]"
            type="password"
            required
          />
          <div>
            {{ t('dont.have.account') }}
            <RouterLink :to="{ name: 'Register' }">{{ t('register') }}</RouterLink>
          </div>
          <div>
            {{ t('forgot.password') }}
            <RouterLink :to="{ name: 'ForgotPassword' }">{{ t('reset.password') }}</RouterLink>
          </div>
        </VCardText>

        <VCardActions class="justify-center">
          <VBtn type="submit" color="secondary" variant="elevated">{{ t('login') }}</VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </CenteredLayout>
</template>
