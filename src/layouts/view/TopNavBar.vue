<template>
  <VApp>
    <Navbar />
    <RouterView />
    <Modal />
  </VApp>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal/Modal.vue';
import Navbar from '@/components/Navbar.vue';
</script>
