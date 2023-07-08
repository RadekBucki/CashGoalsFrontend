<template>
  <VApp>
    <VRow class="text-center">
      <VCol
        cols="12"
        class="mb-5"
      >
        <VImg
          :src="logo"
          class="my-3"
          contain
          height="200"
        />
      </VCol>
      <VCol
        cols="12"
        class="mb-5"
      >
        <RouterLink to="/">
          Home
        </RouterLink>
        <VSpacer />
        <RouterLink to="/about">
          About
        </RouterLink>
      </VCol>
    </VRow>
    <VMain>
      <router-view />
    </VMain>
  </VApp>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.svg';
</script>
