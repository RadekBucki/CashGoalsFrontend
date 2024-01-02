<script setup lang="ts">
import { ref, Ref } from 'vue';

import { VForm } from 'vuetify/components';

import CustomModal from '@/components/Modal/CustomModal.vue';

const props = defineProps({
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
const formRef: Ref<VForm | null> = ref(null);
const confirm = async () => {
  if (!formRef.value) {
    return;
  }
  const { valid } = await formRef.value.validate();
  if (!valid) {
    return;
  }
  props.onConfirm();
};
</script>

<template>
  <CustomModal :title="title" :on-confirm="confirm" :on-close="onClose">
    <VForm ref="formRef">
      <slot />
    </VForm>
  </CustomModal>
</template>
