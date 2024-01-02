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
const formRef: Ref<VForm | null> = ref<VForm | null>(null);
const confirm = () => {
  if (!formRef.value && !formRef.value?.validate()) {
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
