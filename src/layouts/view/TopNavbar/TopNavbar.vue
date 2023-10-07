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
import useAppStore from '@/configuration/appStore.ts';

const appStore = useAppStore();
const router = useRouter();

onMounted(async () => {
  if (appStore.isUserLoggedIn()) {
    await router.push({ name: 'Dashboard' });
  }
});
</script>
