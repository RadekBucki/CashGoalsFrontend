<script setup lang="ts">
import { computed, ComputedRef, PropType, WritableComputedRef } from 'vue';

import { CategoryInputWrapper } from './types.ts';
import { CategoryInput } from '@/graphql';

const props = defineProps({
  selectedCategory: {
    type: Object as PropType<CategoryInput | null>,
    required: false,
    default: null,
  },
  categories: {
    type: Array as PropType<CategoryInput[]>,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  noDataLabel: {
    type: String,
    required: true,
  },
  updateParent: {
    type: Function as PropType<(category: CategoryInput | null) => void>,
    required: true,
  },
});

const mapCategoryToWrappedCategory = (categories: CategoryInput[], parent: CategoryInput | null = null, level = 1) => {
  const wrappedCategories: CategoryInputWrapper[] = [];
  categories.forEach((category) => {
    wrappedCategories.push({
      category,
      parent,
      level,
    });
    if (category.children) {
      wrappedCategories.push(...mapCategoryToWrappedCategory(category.children, category, level + 1));
    }
  });
  return wrappedCategories;
};

const wrappedCategories: ComputedRef<CategoryInputWrapper[]> = computed<CategoryInputWrapper[]>(
  () => mapCategoryToWrappedCategory(props.categories),
);
const selectedCategoryParent: WritableComputedRef<CategoryInputWrapper | null> = computed<CategoryInputWrapper | null>(
  () => {
    if (!props.selectedCategory) {
      return null;
    }
    return wrappedCategories.value
      .find((wrappedCategory) => wrappedCategory.category.children?.includes(props.selectedCategory as CategoryInput))
      ?? null;
  },
);
const updateModelValue = (category: CategoryInputWrapper | null) => {
  props.updateParent(category?.category ?? null);
};
</script>

<template>
  <!-- TODO: Simplify when https://github.com/vuetifyjs/vuetify/issues/3049 will be done -->
  <VAutocomplete
    v-model="selectedCategoryParent"
    @update:modelValue="updateModelValue"
    :label="label"
    :noDataText="noDataLabel"
    outlined
    :items="wrappedCategories"
    clearable
    :itemChildren="item => item?.category?.children ?? []"
    :itemTitle="item => item.category?.name ?? noDataLabel"
    :itemValue="item => item"
  >
    <template v-slot:item="{ item, props }">
      <VListItem
        v-bind="props"
        :disabled="item.value?.category === selectedCategory"
        :subtitle="item.value?.category.description ?? ''"
        :style="`padding-left: ${item.value?.level * 16}px`"
      />
    </template>
  </VAutocomplete>
</template>
