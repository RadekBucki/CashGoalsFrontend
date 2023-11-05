<script setup lang="ts">
import { PropType } from 'vue';

import { Budget } from '@/graphql';

defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
});

const acceptStep = () => {
  console.log('acceptStep users rights');
};
defineExpose({ acceptStep });
</script>

<template>
  <h1>Budget Initialization Users Rights</h1>
</template>
