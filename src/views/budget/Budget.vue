<script setup lang="ts">
import LeftLayout from '@/layouts/content/LeftLayout.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <LeftLayout :sm="12" :md="12" :lg="12">
    <h1>Budget {{ props.id }}</h1>
  </LeftLayout>
</template>
