<template>
  <VApp>
    <Navbar />
    <VMain>
      <RouterView />
    </VMain>
  </VApp>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>
