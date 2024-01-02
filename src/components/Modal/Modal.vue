<script setup lang="ts">
import { computed, ComputedRef } from 'vue';

import { QuestionModal, StandardModal } from './components';
import { useModalStore, Modal } from '@/components/Modal';

const modalStore = useModalStore();

const modal: ComputedRef<Modal> = computed(() => modalStore.modal);

const isQuestion = (m: Modal) => m.type === 'question';
const isStandard = (m: Modal) => ['success', 'error', 'info', 'warning'].includes(m.type);
</script>

<template>
  <StandardModal v-if="isStandard(modal)" />
  <QuestionModal v-if="isQuestion(modal)" />
</template>
