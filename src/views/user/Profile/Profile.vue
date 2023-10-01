<script setup lang="ts">
import { UserData, UserPassword } from './components';
import LeftLayout from '@/layouts/content/LeftLayout.vue';
</script>

<template>
  <LeftLayout :sm="12">
    <UserData />
    <UserPassword />
  </LeftLayout>
</template>
