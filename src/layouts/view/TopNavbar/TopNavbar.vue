<template>
  <VApp>
    <Navbar />
    <RouterView />
    <Modal />
    <Loader />
  </VApp>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import Navbar from './components/Navbar.vue';
import Loader from '@/components/Loader/Loader.vue';
import Modal from '@/components/Modal/Modal.vue';
import useApp from '@/composables/useApp';

const app = useApp();
const router = useRouter();

onMounted(async () => {
  if (app.isUserLoggedIn()) {
    await router.push({ name: 'Dashboard' });
  }
});
</script>
