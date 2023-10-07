<script setup lang="ts">
import { useLocale } from 'vuetify';

import { Link } from '@/components/CardForm';

const { t } = useLocale();

defineProps({
  link: {
    type: Object as () => Link,
    required: true,
  },
});
</script>

<template>
  <div>
    {{ link.textBefore ? t(link.textBefore) : '' }}
    <RouterLink :to="{ name: link.routeName }">{{ t(link.text) }}</RouterLink>
    {{ link.textAfter ? t(link.textAfter) : '' }}
  </div>
</template>
