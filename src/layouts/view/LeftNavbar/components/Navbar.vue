<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useLocale } from 'vuetify';

import Logo from '@/components/Logo.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';

const { t } = useLocale();

const showFullNavigation: Ref<boolean> = ref(true);
</script>

<template>
  <VNavigationDrawer permanent :rail="!showFullNavigation">
    <VList>
      <VListItem style="padding: 0" class="text-center">
        <Logo :size="showFullNavigation ? 40 : 20" route-name="Dashboard" :slim="!showFullNavigation" />
      </VListItem>
      <VListItem v-show="showFullNavigation" class="text-center">Username</VListItem>
    </VList>

    <VSpacer />

    <VList>
      <VListItem prepend-icon="mdi-view-dashboard" title="Dashboard" :to="{ name: 'Dashboard' }" />
      <VListItem prepend-icon="mdi-account-box" title="Account" />
      <VListItem prepend-icon="mdi-gavel" title="Admin" />
    </VList>

    <template v-slot:append>
      <VList>
        <VListItem v-if="showFullNavigation" class="d-flex flex-column justify-center">
          <ThemeToggle class="mx-auto" />
        </VListItem>
        <VListItem prepend-icon="mdi-logout" :to="{ name: 'Home' }" title="Logout" />
        <VListItem
          :prepend-icon="showFullNavigation ? 'mdi-arrow-collapse-left' : 'mdi-arrow-expand-right'"
          @click="showFullNavigation = !showFullNavigation"
          title="Hide"
        />
      </VList>
    </template>
  </VNavigationDrawer>
</template>
