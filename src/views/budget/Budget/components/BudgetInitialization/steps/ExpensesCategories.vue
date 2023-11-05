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
  console.log('acceptStep expenses categories');
};
defineExpose({ acceptStep });
</script>

<template>
  <h1>Budget Initialization Expenses Categories</h1>
</template>
