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
  lg: {
    type: Number,
    default: 4,
  },
});
</script>

<template>
  <VMain>
    <VContainer fluid>
      <VRow>
        <VCol :cols="props.cols" :sm="props.sm" :md="props.md" :lg="props.lg">
          <slot />
        </VCol>
      </VRow>
    </VContainer>
  </VMain>
</template>
