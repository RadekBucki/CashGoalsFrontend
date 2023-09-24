<script setup lang="ts">
import { useLocale } from 'vuetify';

import Logo from '@/components/Logo.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';

const { t } = useLocale();
</script>

<template>
  <VNavigationDrawer temporary>
    <template v-slot:prepend>
      <div class="pt-5 text-center">
        <Logo size="40" route-name="Dashboard" />
      </div>
      <div class="text-center">Username</div>
    </template>

    <VList>
      <VListItem prepend-icon="mdi-view-dashboard" title="Dashboard" :to="{ name: 'Dashboard' }" />
      <VListItem prepend-icon="mdi-account-box" title="Account" />
      <VListItem prepend-icon="mdi-gavel" title="Admin" />
    </VList>

    <template v-slot:append>
      <VContainer fluid>
        <VRow>
          <VCol cols="12" class="d-flex flex-column justify-center">
            <ThemeToggle class="mx-auto" />
            <VBtn :to="{ name: 'Home' }">Logout</VBtn>
          </VCol>
        </VRow>
      </VContainer>
    </template>
  </VNavigationDrawer>
</template>
