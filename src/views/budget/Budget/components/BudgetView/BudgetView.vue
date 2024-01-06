<script setup lang="ts">
import { PropType, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify';

import { IncomesItems } from './components';
import { Budget } from '@/graphql';
import LeftLayout from '@/layouts/content/LeftLayout.vue';
import Expenses from '@/views/budget/Budget/components/BudgetView/components/Expenses.vue';
import GoalsResults from '@/views/budget/Budget/components/BudgetView/components/GoalsResults.vue';

defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
});

const { t } = useI18n();
const { mobile } = useDisplay();

const now = new Date();
const month: Ref<number> = ref(now.getMonth() + 1);
const year: Ref<number> = ref(now.getFullYear());
const editDate: Ref<boolean> = ref(false);
</script>

<template>
  <LeftLayout :sm="12" :md="12" :lg="12" :xl="12">
    <h1>{{ t('budget') + ' ' + budget.name }}</h1>
    <h2 :class="mobile ? 'd-inline-block' : 'd-inline-flex'">
      {{ t('budget.month') }}
      <template v-if="editDate">
        <VSelect
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
        <VTextField v-model="year" type="number" density="compact" />
      </template>
      <template v-else>{{ t('months.' + month) }}&nbsp;{{ year }}</template>
      <VBtn
        @click="editDate = !editDate"
        :variant="mobile && editDate ? 'elevated' : 'plain'"
        class="mb-5"
        style="min-width: 0;"
      >
        <template v-if="editDate">
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
      <GoalsResults :budget="budget" :month="month" :year="year" />
      <IncomesItems :budget="budget" :month="month" :year="year" />
      <Expenses :budget="budget" :month="month" :year="year" />
    </VExpansionPanels>
  </LeftLayout>
</template>
