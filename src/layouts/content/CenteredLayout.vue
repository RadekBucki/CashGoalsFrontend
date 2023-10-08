<script setup lang="ts">
const props = defineProps({
  cols: {
    type: Number,
    default: 12,
  },
  sm: {
    type: Number,
    default: 8,
  },
  md: {
    type: Number,
    default: 6,
  },
});
</script>

<template>
  <VMain class="d-flex flex-column justify-center">
    <VContainer fluid>
      <VRow justify="center">
        <VCol :cols="props.cols" :sm="props.sm" :md="props.md" class="text-center">
          <slot />
        </VCol>
      </VRow>
    </VContainer>
  </VMain>
</template>
