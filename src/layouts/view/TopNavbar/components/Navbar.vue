<script setup lang="ts">
import { useLocale } from 'vuetify';

import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
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
      <div class="d-none d-sm-inline">
        <Logo />
      </div>
      <div class="d-inline d-sm-none">
        <Logo :size="20" />
      </div>
    </VToolbarTitle>
    <VSpacer />
    <div class="my-auto">
      <ThemeToggle />
    </div>
    <div class="ml-4 my-auto">
      <LanguageSwitcher />
    </div>
    <VMenu open-on-hover open-on-click>
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
