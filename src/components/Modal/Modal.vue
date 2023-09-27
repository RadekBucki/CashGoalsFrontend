<script setup lang="ts">
import { computed, ComputedRef } from 'vue';

import { useModalStore, Modal } from '@/components/Modal';
import CenteredLayout from '@/layouts/content/CenteredLayout.vue';

const modalStore = useModalStore();

const modal: ComputedRef<Modal> = computed(() => modalStore.modal);
const visible: ComputedRef<boolean> = computed(() => modalStore.visible);
function close() {
  modalStore.hideModal();
  if (modal.value.onClose) {
    modal.value.onClose();
  }
}
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
        <VCardItem class="text-center">
          <VIcon v-if="modal.type === 'success'" color="success" size="50">mdi-check-circle-outline</VIcon>
          <VIcon v-if="modal.type === 'error'" color="error" size="50">mdi-alert-circle-outline</VIcon>
          <VIcon v-if="modal.type === 'info'" color="info" size="50">mdi-information-outline</VIcon>
          <VIcon v-if="modal.type === 'warning'" color="warning" size="50">mdi-alert-outline</VIcon>
        </VCardItem>
        <VCardTitle class="mt-10 text-center text-wrap">{{ modal.title }}</VCardTitle>
        <VCardText class="d-flex flex-column justify-center mt-10 text-center">{{ modal.content }}</VCardText>
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
