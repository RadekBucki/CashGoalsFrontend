<template>
  <VSwitch color="yellow" v-model="isThemeDark" @change="toggleTheme">
    <template #prepend>
      <VIcon :color="isThemeDark ? 'yellow' : 'grey'" left>mdi-weather-sunny</VIcon>
    </template>

    <template #label>
      <VIcon :color="isThemeDark ? 'yellow' : 'grey'" right>mdi-weather-night</VIcon>
    </template>
  </VSwitch>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useTheme } from 'vuetify';

import useAppStore from '@/store/app';

const theme = useTheme();
const appStore = useAppStore();

const isThemeDark: ComputedRef<boolean> = computed(() => appStore.isDarkMode);
theme.global.name.value = isThemeDark.value ? 'dark' : 'light';

function toggleTheme() {
  theme.global.name.value = isThemeDark.value ? 'light' : 'dark';
  appStore.toggleDarkMode();
}
</script>
