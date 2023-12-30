<script setup lang="ts">
import { computed, onMounted, PropType, ref, Ref, WritableComputedRef } from 'vue';
import { useLocale } from 'vuetify';

import { ApolloQueryResult, FetchResult } from '@apollo/client';
import { VList } from 'vuetify/components/VList';

import { EditableCategoryTree } from './components';
import { CategorySelect, findCategory, findCategoryById, findCategoryParent } from '@/components/CategorySelect';
import {
  Budget,
  CategoriesQueryOutput,
  CategoriesQueryVariables,
  CategoryInput,
  UpdateCategoriesMutationOutput,
  useCategoriesQuery,
  useUpdateCategoriesMutation,
} from '@/graphql';

const props = defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
});

const { t } = useLocale();

const initialCategories: Ref<CategoryInput[]> = ref<CategoryInput[]>([]);
const categories: Ref<CategoryInput[]> = ref<CategoryInput[]>([]);
const selectedCategory: Ref<CategoryInput | null> = ref<CategoryInput | null>(null);
const selectedCategoryParent: WritableComputedRef<CategoryInput | null> = computed<CategoryInput | null>(
  () => {
    if (!selectedCategory.value) {
      return null;
    }
    return findCategoryParent(selectedCategory.value, categories.value);
  },
);
const removedCategoriesIds: Ref<number[]> = ref<number[]>([]);

onMounted(() => {
  const { onResult } = useCategoriesQuery({ budgetId: props.budget?.id } as CategoriesQueryVariables);
  onResult((result: ApolloQueryResult<CategoriesQueryOutput>) => {
    if (!result.data?.categories) {
      return;
    }
    initialCategories.value = structuredClone(result.data.categories);
    categories.value = structuredClone(result.data.categories);
  });
});

const removeCategory = (category: CategoryInput) => {
  categories.value = categories.value.filter((i) => i !== category);

  const filterChildren = (children: CategoryInput[]) => {
    children.forEach((child) => {
      if (child === category) {
        children.splice(children.indexOf(child), 1);
        if (selectedCategory.value === child) {
          selectedCategory.value = null;
        }
        if (child.id) {
          removedCategoriesIds.value.push(child.id);
        }
      } else {
        filterChildren(child.children);
      }
    });
  };
  categories.value.forEach((c) => filterChildren(c.children));

  if (selectedCategory.value === category) {
    selectedCategory.value = null;
  }
  if (category.id) {
    removedCategoriesIds.value.push(category.id);
  }
};

const addCategory = (parentCategory: CategoryInput | null = null) => {
  selectedCategory.value = {
    name: t('budget.expenses.categories.new'),
    description: '',
    parentId: parentCategory?.id ?? null,
    visible: true,
    children: [],
  };
  if (parentCategory) {
    parentCategory.children.push(selectedCategory.value);
  } else {
    categories.value.push(selectedCategory.value);
  }
};

const updateSelectedCategoryParent = (category: CategoryInput | null) => {
  if (!selectedCategory.value) {
    return;
  }
  const oldParent = findCategoryParent(selectedCategory.value, categories.value);
  if (oldParent) {
    oldParent.children.splice(oldParent.children.indexOf(selectedCategory.value), 1);
  } else {
    categories.value.splice(categories.value.indexOf(selectedCategory.value), 1);
  }
  if (category) {
    const categoryFromList = findCategory(category, categories.value);
    categoryFromList?.children.push(selectedCategory.value);
  } else {
    categories.value.push(selectedCategory.value);
  }
  selectedCategory.value.parentId = category?.id ?? null;
};

const { mutate, onDone } = useUpdateCategoriesMutation();
onDone((result: FetchResult<UpdateCategoriesMutationOutput>) => {
  if (!result.data?.updateCategories) {
    return;
  }
  initialCategories.value = structuredClone(result.data.updateCategories);
  categories.value = result.data.updateCategories;
  removedCategoriesIds.value = [];
});
const findInitialCategory = (category: CategoryInput): CategoryInput | null => (category.id ? findCategoryById(category.id, initialCategories.value) : null);

const acceptStep = () => {
  const modifiedCategories: CategoryInput[] = [];
  const filterModifiedCategories = (categoriesToBeFiltered: CategoryInput[]) => {
    categoriesToBeFiltered.forEach((category) => {
      const initialCategory = findInitialCategory(category);
      if (
        initialCategory
          && category.name === initialCategory.name
          && category.description === initialCategory.description
          && category.visible === initialCategory.visible
          && category.parentId === initialCategory.parentId
      ) {
        filterModifiedCategories(category.children);
        return;
      }
      if (category.id) {
        modifiedCategories.push({
          ...category,
          children: [],
        });
        filterModifiedCategories(category.children);
      } else {
        modifiedCategories.push(category);
      }
    });
  };
  filterModifiedCategories(categories.value);

  if (modifiedCategories.length === 0 && removedCategoriesIds.value.length === 0) {
    return;
  }
  mutate({
    budgetId: props.budget.id,
    categories: modifiedCategories,
    removedCategoryIds: removedCategoriesIds.value,
  });
};
defineExpose({ acceptStep });
</script>

<template>
  <div>
    <h1>{{ t('budget.expenses.categories.define') }}</h1>
    <VRow>
      <VCol cols="12" md="6">
        <VList ref="listRoot">
          <VListGroup v-for="category in categories" :key="category.id ?? category.name" subgroup>
            <template v-slot:activator="{ props }">
              <VListItem v-bind="props" @click="selectedCategory = category">
                <VListItemTitle>
                  {{ category.name }}
                  <VIcon style="float: right" @click="removeCategory(category)">mdi-trash-can-outline</VIcon>
                </VListItemTitle>
              </VListItem>
            </template>
            <EditableCategoryTree
              :onRemove="removeCategory"
              :onSelect="(onSelectCategory: CategoryInput) => selectedCategory = onSelectCategory"
              :onAdd="addCategory"
              :category="category"
            />
            <VListItem>
              <VListItemTitle>
                <VIcon @click="addCategory(category)">mdi-plus</VIcon>
                {{ t('budget.expenses.categories.add') }}
              </VListItemTitle>
            </VListItem>
          </VListGroup>
          <VListItem>
            <VListItemTitle>
              <VIcon @click="addCategory()">mdi-plus</VIcon>
              {{ t('budget.expenses.categories.add') }}
            </VListItemTitle>
          </VListItem>
        </VList>
      </VCol>
      <VCol cols="12" md="6" v-if="selectedCategory">
        <VTextField
          v-model="selectedCategory.name"
          :label="t('budget.expenses.categories.name')"
          outlined
          required
        />
        <VTextField
          v-model="selectedCategory.description"
          :label="t('budget.expenses.categories.description')"
          outlined
        />
        <VSwitch
          v-model="selectedCategory.visible"
          :label="t('budget.expenses.categories.visible')"
          color="accent"
          outlined
        />
        <CategorySelect
          :selectedCategory="selectedCategoryParent"
          :categories="categories"
          :disabledCategories="[selectedCategory]"
          :label="t('budget.expenses.categories.parent')"
          :update="updateSelectedCategoryParent"
          couldBeEmpty
        />
      </VCol>
    </VRow>
  </div>
</template>
