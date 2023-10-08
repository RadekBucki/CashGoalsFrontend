<script setup lang="ts">
import { computed, ComputedRef } from 'vue';

import useLoaderStore from '@/components/Loader';
import CenteredLayout from '@/layouts/content/CenteredLayout.vue';

const loaderStore = useLoaderStore();
const showLoader: ComputedRef<boolean> = computed<boolean>(() => loaderStore.visible);
</script>

<template>
  <VDialog v-model="showLoader" persistent>
    <CenteredLayout :sm="12" :md="12">
      <VProgressCircular color="accent" size="50" width="5" indeterminate />
    </CenteredLayout>
  </VDialog>
</template>
