<template>
  <VApp>
    <Navbar />
    <RouterView />
    <Modal />
  </VApp>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Modal from '@/components/Modal/Modal.vue';
</script>
