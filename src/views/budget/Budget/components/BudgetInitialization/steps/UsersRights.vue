<script setup lang="ts">
import { onMounted, PropType, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { FetchResult } from '@apollo/client';
import { VTextField } from 'vuetify/components';

import {
  Budget, Right, SetUsersRightsMutationOutput,
  UserRightsInput,
  UsersRightsQueryOutput,
  UsersRightsQueryVariables, useSetUsersRightsMutation,
  useUsersRightsQuery,
} from '@/graphql';

const props = defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
});

const { t } = useI18n();

const usersRights: Ref<UserRightsInput[]> = ref<UserRightsInput[]>([]);
const newUserEmail: Ref<string> = ref<string>('');

onMounted(() => {
  const { onResult } = useUsersRightsQuery({ budgetId: props.budget?.id } as UsersRightsQueryVariables);
  onResult((result: FetchResult<UsersRightsQueryOutput>) => {
    if (!result.data?.usersRights) {
      return;
    }
    usersRights.value = result.data.usersRights.map(
      (userRight) => {
        const userRightsInput: UserRightsInput = {
          email: userRight.user.email,
          rights: [...userRight.rights],
        };
        return userRightsInput;
      },
    );
  });
});

const newUserEmailRef = ref<VTextField | null>(null);
const addUser = async () => {
  if (!newUserEmail.value) {
    return;
  }
  const valid = await newUserEmailRef.value?.validate();
  if (!valid) {
    return;
  }
  usersRights.value.push({
    email: newUserEmail.value,
    rights: [],
  });
  newUserEmail.value = '';
  newUserEmailRef.value?.reset();
};

const { mutate, onDone } = useSetUsersRightsMutation();
onDone((result: FetchResult<SetUsersRightsMutationOutput>) => {
  if (!result.data?.setUsersRights) {
    return;
  }
  usersRights.value = result.data.setUsersRights.map(
    (userRight) => {
      const userRightsInput: UserRightsInput = {
        email: userRight.user.email,
        rights: [...userRight.rights],
      };
      return userRightsInput;
    },
  );
});
const acceptStep = () => {
  mutate({
    budgetId: props.budget?.id,
    usersRights: usersRights.value,
  });
};
defineExpose({ acceptStep });
</script>

<template>
  <div>
    <h1>{{ t('budget.usersRights.define') }}</h1>
    <VTable>
      <thead>
        <tr>
          <th scope="col">{{ t('budget.usersRights.email') }}</th>
          <th scope="col">{{ t('budget.usersRights.rights.view') }}</th>
          <th scope="col">{{ t('budget.usersRights.rights.editCategories') }}</th>
          <th scope="col">{{ t('budget.usersRights.rights.editExpenses') }}</th>
          <th scope="col">{{ t('budget.usersRights.rights.editGoals') }}</th>
          <th scope="col">{{ t('budget.usersRights.rights.editIncomes') }}</th>
          <th scope="col">{{ t('budget.usersRights.rights.editUsersAndRights') }}</th>
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in usersRights" :key="item.email">
          <td>{{ item.email }}</td>
          <td
            v-for="right in ['VIEW', 'EDIT_CATEGORIES', 'EDIT_EXPENSES', 'EDIT_GOALS', 'EDIT_INCOMES', 'EDIT_USERS_AND_RIGHTS']"
            :key="right"
          >
            <VCheckbox
              class="align-center d-flex justify-center"
              :model-value="item.rights.includes(right as Right)"
              @update:modelValue="() => {
                if (item.rights.includes(right as Right)) {
                  item.rights = item.rights.filter((r) => r !== right);
                } else {
                  item.rights.push(right as Right);
                }
              }"
            />
          </td>
          <td>
            <VBtn
              prepend-icon="mdi-delete"
              @click="usersRights = usersRights.filter((userRight) => userRight.email !== item.email)"
            />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">
            <VTextField
              v-model="newUserEmail"
              ref="newUserEmailRef"
              :label="t('budget.usersRights.email')"
              type="email"
              :rules="[
                (v: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || t('email.format.validation.error'),
                (v: string) => !usersRights.find((userRight) => userRight.email === v) || t('email.userRights.email.validation.error'),
              ]"
              variant="underlined"
            />
          </td>
          <td colspan="6">
            <VBtn
              prepend-icon="mdi-plus"
              :text="t('budget.usersRights.addUser')"
              @click="addUser"
            />
          </td>
        </tr>
      </tfoot>
    </VTable>
  </div>
</template>
