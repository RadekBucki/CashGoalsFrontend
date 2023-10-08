<template>
  <VApp>
    <Navbar />
    <RouterView class="ml-3" />
    <Modal />
  </VApp>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import Navbar from './components/Navbar.vue';
import Modal from '@/components/Modal/Modal.vue';
import useApp from '@/composables/useApp';

const router = useRouter();
const { authorize } = useApp();
onMounted(async () => {
  if (!await authorize()) {
    await router.push({ name: 'Login' });
  }
});
</script>
