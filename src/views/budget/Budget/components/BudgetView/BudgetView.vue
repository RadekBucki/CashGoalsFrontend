<script setup lang="ts">
import { PropType, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { IncomesItems } from './components';
import { Budget } from '@/graphql';
import LeftLayout from '@/layouts/content/LeftLayout.vue';

defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
});

const { t } = useI18n();

const now = new Date();
const month: Ref<number> = ref(now.getMonth() + 1);
const editMonth: Ref<boolean> = ref(false);
const year: Ref<number> = ref(now.getFullYear());
const editYear: Ref<boolean> = ref(false);
</script>

<template>
  <LeftLayout :sm="12" :md="12" :lg="12" :xl="12">
    <h1>{{ t('budget') + ' ' + budget.name }}</h1>
    <h2 class="d-inline-flex">
      {{ t('budget.month') }}

      <VSelect
        v-if="editMonth"
        v-model="month"
        density="compact"
        :items="[
          { title: t('months.1'), value: 1 },
          { title: t('months.2'), value: 2 },
          { title: t('months.3'), value: 3 },
          { title: t('months.4'), value: 4 },
          { title: t('months.5'), value: 5 },
          { title: t('months.6'), value: 6 },
          { title: t('months.7'), value: 7 },
          { title: t('months.8'), value: 8 },
          { title: t('months.9'), value: 9 },
          { title: t('months.10'), value: 10 },
          { title: t('months.11'), value: 11 },
          { title: t('months.12'), value: 12 },
        ]"
      />
      <template v-else>{{ t('months.' + month) }}</template>
      <VBtn @click="editMonth = !editMonth" variant="plain" class="pa-0" style="min-width: 0;">
        <template v-if="editMonth">
          <VIcon icon="mdi-check" />
        </template>
        <template v-else>
          <sup>
            <VIcon icon="mdi-pencil" />
          </sup>
        </template>
      </VBtn>
      <VTextField v-if="editYear" v-model="year" type="number" density="compact" />
      <template v-else>{{ year }}</template>
      <VBtn @click="editYear = !editYear" variant="plain" class="pa-0 sup" style="min-width: 0;">
        <template v-if="editYear">
          <VIcon icon="mdi-check" />
        </template>
        <template v-else>
          <sup>
            <VIcon icon="mdi-pencil" />
          </sup>
        </template>
      </VBtn>
    </h2>
    <VExpansionPanels variant="accordion" multiple :model-value="['goals', 'incomes', 'expenses']">
      <VExpansionPanel value="goals">
        <VExpansionPanelTitle>
          <h3>{{ t('budget.goals') }}</h3>
        </VExpansionPanelTitle>
      </VExpansionPanel>
      <VExpansionPanel value="incomes">
        <VExpansionPanelTitle>
          <h3>{{ t('budget.incomes') }}</h3>
        </VExpansionPanelTitle>
        <VExpansionPanelText>
          <IncomesItems :budget="budget" :month="month" :year="year" />
        </VExpansionPanelText>
      </VExpansionPanel>
      <VExpansionPanel value="expenses">
        <VExpansionPanelTitle>
          <h3>{{ t('budget.expenses') }}</h3>
        </VExpansionPanelTitle>
      </VExpansionPanel>
    </VExpansionPanels>
  </LeftLayout>
</template>
