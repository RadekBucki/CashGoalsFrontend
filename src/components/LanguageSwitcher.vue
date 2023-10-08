<script setup lang="ts">
import { ref, Ref } from 'vue';
import LangFlag from 'vue-lang-code-flags';

import useApp from '@/composables/useApp';

const { setLocale, localeNames, locale } = useApp();
const locales: Ref<string[]> = ref(localeNames);
const localeRef: Ref<string> = ref(locale);
</script>

<template>
  <VSelect
    variant="plain"
    density="comfortable"
    v-model="localeRef"
    @update:model-value="setLocale"
    :items="locales"
  >
    <template v-slot:selection="{ item }">
      <LangFlag :iso="item.value" :squared="false" />
    </template>
    <template v-slot:item="{ item, props }">
      <VListItem v-bind="props">
        <template v-slot:title>
          <LangFlag :iso="item.value" :squared="false" />
        </template>
      </VListItem>
    </template>
  </VSelect>
</template>
