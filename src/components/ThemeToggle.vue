<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useTheme } from 'vuetify';

import useAppStore from '@/configuration/appStore.ts';

const theme = useTheme();
const appStore = useAppStore();

const isThemeDark: ComputedRef<boolean> = computed(() => appStore.isDarkMode);
theme.global.name.value = isThemeDark.value ? 'dark' : 'light';

function toggleTheme() {
  theme.global.name.value = isThemeDark.value ? 'light' : 'dark';
  appStore.toggleDarkMode();
}
</script>

<template>
  <VSwitch color="accent" v-model="isThemeDark" @change="toggleTheme">
    <template #prepend>
      <VIcon :color="isThemeDark ? 'accent' : 'grey'" left>mdi-weather-sunny</VIcon>
    </template>

    <template #label>
      <VIcon :color="isThemeDark ? 'accent' : 'grey'" right>mdi-weather-night</VIcon>
    </template>
  </VSwitch>
</template>
