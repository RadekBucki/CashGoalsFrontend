<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLocale } from 'vuetify';

import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import Logo from '@/components/Logo.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import useApp from '@/composables/useApp';
import { Budget, useBudgetsQuery } from '@/graphql';

const app = useApp();
const { t } = useLocale();
const { currentRoute } = useRouter();

const showFullNavigation: Ref<boolean> = ref(true);

const budgets: Ref<Budget[]> = ref<Budget[]>([]);
const { onResult } = useBudgetsQuery();
onResult((result) => {
  if (!result.data?.budgets) {
    return;
  }
  budgets.value = result.data.budgets;
});
</script>

<template>
  <VNavigationDrawer permanent :rail="!showFullNavigation">
    <VList>
      <VListItem style="padding: 0" class="text-center">
        <Logo :size="showFullNavigation ? 40 : 20" route-name="Dashboard" :slim="!showFullNavigation" />
      </VListItem>
      <VListItem v-show="showFullNavigation" class="text-center">
        {{ t('hello.username', app.getUserName()) }}
      </VListItem>
    </VList>

    <VSpacer />

    <VList>
      <VListItem
        :active="currentRoute.fullPath === '/'"
        prepend-icon="mdi-view-dashboard"
        :title="t('dashboard')"
        :to="{ name: 'Dashboard' }"
      />
      <VListItem prepend-icon="mdi-account-edit" :title="t('profile.data')" :to="{ name: 'Profile' }" />
      <VListGroup>
        <template v-slot:activator="{ props }">
          <VListItem v-bind="props" prepend-icon="mdi-wallet-bifold" :title="t('budgets')" />
        </template>
        <VListItem
          v-for="budget in budgets"
          :key="budget.id"
          :title="budget.name"
          :to="{ name: 'Budget', params: { id: budget.id } }"
        />
        <VListItem prepend-icon="mdi-plus" :title="t('budget.create')" :to="{ name: 'BudgetCreate' }" />
      </VListGroup>
    </VList>

    <template v-slot:append>
      <VList>
        <VListItem v-if="showFullNavigation" class="d-flex justify-center">
          <ThemeToggle class="mx-auto" />
        </VListItem>
        <VListItem v-if="showFullNavigation" class="d-flex justify-center">
          <LanguageSwitcher class="mx-auto" />
        </VListItem>
        <VListItem prepend-icon="mdi-logout" :to="{ name: 'Home' }" @click="app.logout()" :title="t('logout')" />
        <VListItem
          :prepend-icon="showFullNavigation ? 'mdi-arrow-collapse-left' : 'mdi-arrow-expand-right'"
          @click="showFullNavigation = !showFullNavigation"
          :title="t('hide')"
        />
      </VList>
    </template>
  </VNavigationDrawer>
</template>
