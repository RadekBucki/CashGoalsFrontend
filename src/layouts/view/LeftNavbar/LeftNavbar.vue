<template>
  <VApp>
    <Navbar />
    <RouterView />
    <Modal />
  </VApp>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import Navbar from './components/Navbar.vue';
import Modal from '@/components/Modal/Modal.vue';
import useAuthorization from '@/composables/useAuthorization';

const router = useRouter();
const { authorize } = useAuthorization();
onMounted(async () => {
  if (!await authorize()) {
    await router.push({ name: 'Login' });
  }
});
</script>
