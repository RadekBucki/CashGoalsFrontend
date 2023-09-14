<script setup lang="ts">
import { useLocale } from 'vuetify';

import Logo from '@/components/Logo.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';

const { t } = useLocale();

const items = [
  {
    title: t('register'),
    routeName: 'Register',
  },
  {
    title: t('login'),
    routeName: 'Login',
  },
];
</script>

<template>
  <VAppBar app color="primary" dark flat prominent>
    <VToolbarTitle>
      <Logo />
    </VToolbarTitle>
    <VSpacer />
    <div class="my-auto">
      <ThemeToggle />
    </div>
    <VMenu open-on-hover>
      <template v-slot:activator="{ props }">
        <VBtn variant="text" v-bind="props">
          <VIcon>mdi-account</VIcon>
          {{ t('your.account') }}
        </VBtn>
      </template>

      <VList>
        <VListItem v-for="(item, index) in items" :key="index">
          <VListItemTitle>
            <RouterLink :to="{ name: item.routeName }">{{ item.title }}</RouterLink>
          </VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </VAppBar>
</template>
