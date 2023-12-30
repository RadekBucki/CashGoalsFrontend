<script setup lang="ts">
import { computed, ComputedRef, onMounted, PropType, ref, Ref } from 'vue';
import { useLocale } from 'vuetify';

import { ApolloQueryResult } from '@apollo/client';

import { findCategoryById } from '@/components/CategorySelect';
import CategorySelect from '@/components/CategorySelect/CategorySelect.vue';
import {
  Budget,
  Category,
  CategoryInput,
  GoalInput,
  GoalsQueryOutput,
  GoalsQueryVariables,
  useGoalsQuery, useUpdateGoalsMutation,
} from '@/graphql';

const props = defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
});

const { t } = useLocale();
const categories: Ref<Category[]> = ref<Category[]>([]);

const initialGoals: Ref<GoalInput[]> = ref<GoalInput[]>([]);
const goals: Ref<GoalInput[]> = ref<GoalInput[]>([]);
const selectedGoal: Ref<GoalInput|null> = ref<GoalInput|null>(null);
const selectedGoalCategory: ComputedRef<Category | null> = computed<Category | null>(() => {
  if (!selectedGoal.value) {
    return null;
  }
  return findCategoryById(selectedGoal.value.categoryId, categories.value);
});
const removedGoalsIds: Ref<number[]> = ref<number[]>([]);

onMounted(() => {
  const { onResult } = useGoalsQuery({ budgetId: props.budget?.id } as GoalsQueryVariables);
  onResult((result: ApolloQueryResult<GoalsQueryOutput>) => {
    if (result.loading || !result.data?.goals) {
      return;
    }
    initialGoals.value = result.data.goals.map(
      (goal) => {
        const goalInput: GoalInput = {
          id: goal.id,
          name: goal.name,
          description: goal.description,
          type: goal.type,
          min: goal.min,
          max: goal.max,
          categoryId: goal.category.id,
        };
        return goalInput;
      },
    );
    goals.value = JSON.parse(JSON.stringify(initialGoals.value));
    categories.value = JSON.parse(JSON.stringify(result.data.visibleCategories)) as Category[];
  });
});

const addGoal = () => {
  selectedGoal.value = {
    name: t('budget.goals.new'),
    description: '',
    type: 'AMOUNT',
    min: null,
    max: null,
    categoryId: categories.value[0].id,
  };
  goals.value.push(selectedGoal.value);
};

const removeGoal = (goal: GoalInput) => {
  goals.value = goals.value.filter((i) => i !== goal);
  if (selectedGoal.value === goal) {
    selectedGoal.value = null;
  }
  if (goal.id) {
    removedGoalsIds.value.push(goal.id);
  }
};

const updateCategoryId = (category: CategoryInput | null) => {
  if (!selectedGoal.value || !category) {
    return;
  }
  selectedGoal.value.categoryId = (category as Category).id;
};

const { mutate, onDone } = useUpdateGoalsMutation();
onDone((result) => {
  if (!result.data?.updateGoals) {
    return;
  }
  initialGoals.value = JSON.parse(JSON.stringify(result.data.updateGoals));
  goals.value = JSON.parse(JSON.stringify(result.data.updateGoals));
  removedGoalsIds.value = [];
});
const acceptStep = () => {
  const modifiedGoals: GoalInput[] = goals.value.filter((goal) => {
    const initialGoal = initialGoals.value.find((i) => i.id === goal.id);
    return !initialGoal
      || goal.name !== initialGoal.name
      || goal.description !== initialGoal.description
      || goal.type !== initialGoal.type
      || goal.min !== initialGoal.min
      || goal.max !== initialGoal.max
      || goal.categoryId !== initialGoal.categoryId;
  });
  if (modifiedGoals.length === 0 && removedGoalsIds.value.length === 0) {
    return;
  }
  mutate({
    budgetId: props.budget.id,
    goals: modifiedGoals,
    removedGoalsIds: removedGoalsIds.value,
  });
};
defineExpose({ acceptStep });
</script>

<template>
  <div>
    <h1>{{ t('budget.goals.define') }}</h1>
    <VRow>
      <VCol cols="12" md="6">
        <VList>
          <VListItem
            v-for="goal in goals"
            :key="goal.id ?? goal.name"
            :value="goal"
            @click="selectedGoal = goal"
          >
            <VListItemTitle>
              {{ goal.name }}
              <VIcon style="float: right" @click="removeGoal(goal)">mdi-trash-can-outline</VIcon>
            </VListItemTitle>
          </VListItem>
          <VListItem>
            <VListItemTitle>
              <VIcon @click="addGoal">mdi-plus</VIcon>
              {{ t('budget.goals.add') }}
            </VListItemTitle>
          </VListItem>
        </VList>
      </VCol>
      <VCol cols="12" md="6" v-if="selectedGoal">
        <VTextField
          v-model="selectedGoal.name"
          :label="t('budget.goals.name')"
          outlined
          required
        />
        <VTextField
          v-model="selectedGoal.description"
          :label="t('budget.goals.description')"
          outlined
        />
        <VSelect
          v-model="selectedGoal.type"
          :label="t('budget.goals.type')"
          :items="[
            { value: 'AMOUNT', title: t('budget.goals.types.amount') },
            { value: 'PERCENTAGE', title: t('budget.goals.types.percentage') },
          ]"
          outlined
          required
        />
        <VTextField
          v-model="selectedGoal.min"
          @update:modelValue="selectedGoal.min = $event ? Number($event) : null"
          type="number"
          :label="t('budget.goals.min')"
          outlined
        />
        <VTextField
          v-model="selectedGoal.max"
          @update:modelValue="selectedGoal.min = $event ? Number($event) : null"
          :label="t('budget.goals.max')"
          outlined
        />
        <CategorySelect
          :selectedCategory="selectedGoalCategory as CategoryInput"
          :categories="categories as CategoryInput[]"
          :update="updateCategoryId"
          :label="t('budget.goals.category')"
        />
      </VCol>
    </VRow>
  </div>
</template>
