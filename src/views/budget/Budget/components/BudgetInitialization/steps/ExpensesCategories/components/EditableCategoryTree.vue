<script lang="ts" setup>
import { PropType } from 'vue';
import { useLocale } from 'vuetify';

import { CategoryInput } from '@/graphql';

defineProps({
  category: {
    type: Object as PropType<CategoryInput>,
    required: true,
  },
  onSelect: {
    type: Function as PropType<(category: CategoryInput) => void>,
    required: true,
  },
  onRemove: {
    type: Function as PropType<(child: CategoryInput) => void>,
    required: true,
  },
  onAdd: {
    type: Function as PropType<(child: CategoryInput) => void>,
    required: true,
  },
});

const { t } = useLocale();
</script>

<template>
  <VListGroup v-for="child in category.children" :key="child.id ?? child.name" subgroup>
    <template v-slot:activator="{ props }">
      <VListItem v-bind="props" @click="onSelect(child)">
        <VListItemTitle>
          {{ child.name }}
          <VIcon style="float: right" @click="onRemove(child)">mdi-trash-can-outline</VIcon>
        </VListItemTitle>
      </VListItem>
    </template>
    <EditableCategoryTree :onRemove="onRemove" :onSelect="onSelect" :onAdd="onAdd" :category="child" />
    <VListItem>
      <VListItemTitle>
        <VIcon @click="onAdd(child)">mdi-plus</VIcon>
        {{ t('budget.expenses.categories.add') }}
      </VListItemTitle>
    </VListItem>
  </VListGroup>
</template>
