<script setup lang="ts">
import { ref, Ref } from 'vue';
import LangFlag from 'vue-lang-code-flags';
import { useLocale } from 'vuetify';

import useAppStore from '@/configuration/appStore.ts';

const { current } = useLocale();
const appStore = useAppStore();
current.value = appStore.locale;
function updateLocale(locale: string) {
  appStore.setLocale(locale);
  current.value = locale;
}

const locales: Ref<string[]> = ref(appStore.localeNames);
</script>

<template>
  <VSelect
    variant="plain"
    density="comfortable"
    v-model="appStore.locale"
    @update:model-value="updateLocale"
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
