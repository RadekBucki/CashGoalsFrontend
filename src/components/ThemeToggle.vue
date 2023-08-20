<template>
  <v-switch
    color="yellow"
    v-model="isThemeDark"
    @change="toggleTheme"
  >
    <template #prepend>
      <v-icon
        :color="isThemeDark ? 'yellow' : 'grey'"
        left
      >
        mdi-weather-sunny
      </v-icon>
    </template>

    <template #label>
      <v-icon
        :color="isThemeDark ? 'yellow' : 'grey'"
        right
      >
        mdi-weather-night
      </v-icon>
    </template>
  </v-switch>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();

const isThemeDark: ComputedRef<boolean> = computed(() => theme.global.name.value === 'dark');

function toggleTheme() {
  theme.global.name.value = isThemeDark.value ? 'light' : 'dark';
}
</script>
