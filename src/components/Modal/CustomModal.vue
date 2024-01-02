<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import CenteredLayout from '@/layouts/content/CenteredLayout.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
  onConfirm: {
    type: Function,
    required: true,
  },
});

const { t } = useI18n();
</script>

<template>
  <VDialog activator="parent" :onclose="onClose">
    <CenteredLayout :sm="12" :md="6">
      <VCard class="pa-10">
        <VCardTitle class="mt-10 text-center text-wrap">{{ title }}</VCardTitle>
        <VCardText class="d-flex flex-column justify-center mt-10 text-center">
          <slot />
        </VCardText>
        <VCardActions class="d-flex justify-center mt-10">
          <VBtn color="error" @click="onClose()">{{ t('$vuetify.cancel') }}</VBtn>
          <VBtn color="success" @click="onConfirm()">{{ t('$vuetify.confirm') }}</VBtn>
        </VCardActions>
      </VCard>
    </CenteredLayout>
  </VDialog>
</template>
