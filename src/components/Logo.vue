<script setup lang="ts">
defineProps({
  size: {
    type: Number,
    default: 30,
  },
  routeName: {
    type: String,
    default: 'Home',
  },
  slim: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <RouterLink style="color: inherit; text-decoration: none" :to="{ name: routeName }">
    <span class="font-weight-light" :style="`font-size: ${size}px`">{{ slim ? 'C' : 'Cash' }}</span>
    <span class="font-weight-bold goals-text-shadow text-accent" :style="`font-size: ${size}px`">
      {{ slim ? 'G' : 'Goals' }}
    </span>
  </RouterLink>
</template>

<style scoped>
/*noinspection CssUnusedSymbol*/
.v-theme--light .goals-text-shadow {
  text-shadow: 0 0 5px #000000;
}
</style>
