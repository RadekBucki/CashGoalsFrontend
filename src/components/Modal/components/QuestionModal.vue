<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';

import { QuestionModal, useModalStore } from '@/components/Modal';
import CenteredLayout from '@/layouts/content/CenteredLayout.vue';

const { t } = useI18n();
const modalStore = useModalStore();

const modal: ComputedRef<QuestionModal> = computed(() => modalStore.modal);
const visible: ComputedRef<boolean> = computed(() => modalStore.visible);

const close = () => {
  modalStore.hideModal();
  if (modal.value.onClose) {
    modal.value.onClose();
  }
};
const confirm = () => {
  modalStore.hideModal();
  if (modal.value.onConfirm) {
    modal.value.onConfirm();
  }
};
</script>

<template>
  <VDialog v-model="visible" close-on-back close-on-content-click>
    <CenteredLayout :sm="12" :md="6">
      <VCard class="pa-10">
        <VCardActions class="close-button">
          <VSpacer />
          <VBtn icon @click="close">
            <VIcon>mdi-close</VIcon>
          </VBtn>
        </VCardActions>
        <VCardTitle class="mt-10 text-center text-wrap">{{ modal.title }}</VCardTitle>
        <VCardActions class="d-flex justify-center mt-10">
          <VBtn color="error" @click="close">{{ t('$vuetify.cancel') }}</VBtn>
          <VBtn color="success" @click="confirm">{{ t('$vuetify.confirm') }}</VBtn>
        </VCardActions>
      </VCard>
    </CenteredLayout>
  </VDialog>
</template>

<style scoped>
.close-button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
