<script setup lang="ts">
import { computed, ComputedRef, PropType } from 'vue';

import { CategoryInputWrapper } from './types.ts';
import { Category, CategoryInput } from '@/graphql';

const props = defineProps({
  selectedCategory: {
    type: Object as PropType<CategoryInput | Category | null>,
    required: false,
    default: null,
  },
  disabledCategories: {
    type: Array as PropType<CategoryInput[] | Category[]>,
    required: false,
    default: () => [],
  },
  categories: {
    type: Array as PropType<CategoryInput[] | Category[]>,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  couldBeEmpty: {
    type: Boolean,
    required: false,
    default: false,
  },
  update: {
    type: Function as PropType<(category: CategoryInput | Category | null) => void>,
    required: true,
  },
});

const mapCategoryToWrappedCategory = (categories: CategoryInput[], parent: CategoryInput | Category | null = null, level = 1) => {
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
const selectedCategoryWrapped: ComputedRef<CategoryInputWrapper | null> = computed<CategoryInputWrapper | null>(
  () => {
    if (!props.selectedCategory) {
      return null;
    }
    return wrappedCategories.value
      .find((wrappedCategory) => wrappedCategory.category === props.selectedCategory) ?? null;
  },
);
const updateModelValue = (category: CategoryInputWrapper | null) => {
  props.update(category?.category ?? null);
};
</script>

<template>
  <!-- TODO: Simplify when https://github.com/vuetifyjs/vuetify/issues/3049 will be done -->
  <VAutocomplete
    v-model="selectedCategoryWrapped"
    @update:modelValue="updateModelValue"
    :label="label"
    outlined
    :items="wrappedCategories"
    :clearable="couldBeEmpty"
    :itemChildren="item => item?.category?.children ?? []"
    :itemTitle="item => item.category?.name"
    :itemValue="item => item"
  >
    <template v-slot:item="{ item, props }">
      <VListItem
        v-bind="props"
        :disabled="disabledCategories.includes(item.value?.category)"
        :subtitle="item.value?.category.description ?? ''"
        :style="`padding-left: ${item.value?.level * 16}px`"
      />
    </template>
  </VAutocomplete>
</template>
