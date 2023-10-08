<script setup lang="ts">
import { Ref, ref } from 'vue';

import useApp from '@/composables/useApp';

const app = useApp();
const isDark: Ref<boolean> = ref<boolean>(app.isDarkMode());
</script>

<template>
  <VSwitch color="accent" v-model="isDark" @change="app.toggleDarkMode()">
    <template #prepend>
      <VIcon :color="app.isDarkMode() ? 'accent' : 'grey'" left>mdi-weather-sunny</VIcon>
    </template>

    <template #label>
      <VIcon :color="app.isDarkMode() ? 'accent' : 'grey'" right>mdi-weather-night</VIcon>
    </template>
  </VSwitch>
</template>
