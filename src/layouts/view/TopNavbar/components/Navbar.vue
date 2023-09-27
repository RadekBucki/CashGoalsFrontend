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
    <VToolbarTitle style="flex: auto">
      <Logo />
    </VToolbarTitle>
    <VSpacer />
    <div class="my-auto">
      <ThemeToggle />
    </div>
    <VMenu open-on-hover>
      <template v-slot:activator="{ props }">
        <VBtn variant="text" v-bind="props">
          <VIcon size="25">mdi-account</VIcon>
          <span class="d-none d-sm-inline">{{ t('your.account') }}</span>
        </VBtn>
      </template>

      <VList>
        <VListItem v-for="(item, index) in items" :key="index">
          <VListItemTitle>
            <VBtn :to="{ name: item.routeName }">{{ item.title }}</VBtn>
          </VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </VAppBar>
</template>
