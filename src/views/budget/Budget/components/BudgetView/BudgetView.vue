<script setup lang="ts">
import { PropType } from 'vue';

import { Budget } from '@/graphql';
import LeftLayout from '@/layouts/content/LeftLayout.vue';

defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
});
</script>

<template>
  <LeftLayout>
    <h1>BudgetView</h1>
  </LeftLayout>
</template>
