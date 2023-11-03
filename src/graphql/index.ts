/* eslint-disable */
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedGlobalSymbols

import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import type * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type ReactiveFunction<TParam> = () => TParam;

export const BudgetsDocument = gql`
    query Budgets {
  budgets {
    id
    name
    initializationStep
  }
}
    `;

/**
 * __useBudgetsQuery__
 *
 * To run a query within a Vue component, call `useBudgetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBudgetsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useBudgetsQuery();
 */
export function useBudgetsQuery(options: VueApolloComposable.UseQueryOptions<BudgetsQueryOutput, BudgetsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<BudgetsQueryOutput, BudgetsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<BudgetsQueryOutput, BudgetsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<BudgetsQueryOutput, BudgetsQueryVariables>(BudgetsDocument, {}, options);
}
export function useBudgetsLazyQuery(options: VueApolloComposable.UseQueryOptions<BudgetsQueryOutput, BudgetsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<BudgetsQueryOutput, BudgetsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<BudgetsQueryOutput, BudgetsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<BudgetsQueryOutput, BudgetsQueryVariables>(BudgetsDocument, {}, options);
}
export type BudgetsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<BudgetsQueryOutput, BudgetsQueryVariables>;
export const CreateBudgetDocument = gql`
    mutation CreateBudget($name: String!) {
  createBudget(name: $name) {
    id
  }
}
    `;

/**
 * __useCreateBudgetMutation__
 *
 * To run a mutation, you first call `useCreateBudgetMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateBudgetMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateBudgetMutation({
 *   variables: {
 *     name: // value for 'name'
 *   },
 * });
 */
export function useCreateBudgetMutation(options: VueApolloComposable.UseMutationOptions<CreateBudgetMutationOutput, CreateBudgetMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateBudgetMutationOutput, CreateBudgetMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateBudgetMutationOutput, CreateBudgetMutationVariables>(CreateBudgetDocument, options);
}
export type CreateBudgetMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateBudgetMutationOutput, CreateBudgetMutationVariables>;
export const ActivateUserDocument = gql`
    mutation activateUser($email: String!, $token: String!) {
  activateUser(email: $email, token: $token)
}
    `;

/**
 * __useActivateUserMutation__
 *
 * To run a mutation, you first call `useActivateUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useActivateUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useActivateUserMutation({
 *   variables: {
 *     email: // value for 'email'
 *     token: // value for 'token'
 *   },
 * });
 */
export function useActivateUserMutation(options: VueApolloComposable.UseMutationOptions<ActivateUserMutationOutput, ActivateUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ActivateUserMutationOutput, ActivateUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<ActivateUserMutationOutput, ActivateUserMutationVariables>(ActivateUserDocument, options);
}
export type ActivateUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ActivateUserMutationOutput, ActivateUserMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($userInput: CreateUserInput!) {
  createUser(input: $userInput) {
    name
    email
  }
}
    `;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateUserMutation({
 *   variables: {
 *     userInput: // value for 'userInput'
 *   },
 * });
 */
export function useCreateUserMutation(options: VueApolloComposable.UseMutationOptions<CreateUserMutationOutput, CreateUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateUserMutationOutput, CreateUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateUserMutationOutput, CreateUserMutationVariables>(CreateUserDocument, options);
}
export type CreateUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateUserMutationOutput, CreateUserMutationVariables>;
export const GetUserDocument = gql`
    query getUser {
  user {
    name
    email
    theme
    locale
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a Vue component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetUserQuery();
 */
export function useGetUserQuery(options: VueApolloComposable.UseQueryOptions<GetUserQueryOutput, GetUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetUserQueryOutput, GetUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUserQueryOutput, GetUserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetUserQueryOutput, GetUserQueryVariables>(GetUserDocument, {}, options);
}
export function useGetUserLazyQuery(options: VueApolloComposable.UseQueryOptions<GetUserQueryOutput, GetUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetUserQueryOutput, GetUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUserQueryOutput, GetUserQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetUserQueryOutput, GetUserQueryVariables>(GetUserDocument, {}, options);
}
export type GetUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetUserQueryOutput, GetUserQueryVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    refreshToken
    accessToken
    user {
      name
      email
      theme
      locale
    }
  }
}
    `;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutationOutput, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutationOutput, LoginMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LoginMutationOutput, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutationOutput, LoginMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation refreshToken($refreshToken: String!) {
  refreshToken(token: $refreshToken) {
    refreshToken
    accessToken
    user {
      name
      email
      theme
      locale
    }
  }
}
    `;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRefreshTokenMutation({
 *   variables: {
 *     refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshTokenMutation(options: VueApolloComposable.UseMutationOptions<RefreshTokenMutationOutput, RefreshTokenMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RefreshTokenMutationOutput, RefreshTokenMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RefreshTokenMutationOutput, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
}
export type RefreshTokenMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RefreshTokenMutationOutput, RefreshTokenMutationVariables>;
export const RequestPasswordResetDocument = gql`
    mutation requestPasswordReset($email: String!, $resetUrl: String!) {
  requestPasswordReset(email: $email, resetUrl: $resetUrl)
}
    `;

/**
 * __useRequestPasswordResetMutation__
 *
 * To run a mutation, you first call `useRequestPasswordResetMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRequestPasswordResetMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRequestPasswordResetMutation({
 *   variables: {
 *     email: // value for 'email'
 *     resetUrl: // value for 'resetUrl'
 *   },
 * });
 */
export function useRequestPasswordResetMutation(options: VueApolloComposable.UseMutationOptions<RequestPasswordResetMutationOutput, RequestPasswordResetMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RequestPasswordResetMutationOutput, RequestPasswordResetMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RequestPasswordResetMutationOutput, RequestPasswordResetMutationVariables>(RequestPasswordResetDocument, options);
}
export type RequestPasswordResetMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RequestPasswordResetMutationOutput, RequestPasswordResetMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation resetPassword($email: String!, $token: String!, $password: String!) {
  resetPassword(email: $email, token: $token, password: $password)
}
    `;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useResetPasswordMutation({
 *   variables: {
 *     email: // value for 'email'
 *     token: // value for 'token'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(options: VueApolloComposable.UseMutationOptions<ResetPasswordMutationOutput, ResetPasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ResetPasswordMutationOutput, ResetPasswordMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<ResetPasswordMutationOutput, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
}
export type ResetPasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ResetPasswordMutationOutput, ResetPasswordMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    name
    email
    theme
    locale
  }
}
    `;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateUserMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(options: VueApolloComposable.UseMutationOptions<UpdateUserMutationOutput, UpdateUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateUserMutationOutput, UpdateUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateUserMutationOutput, UpdateUserMutationVariables>(UpdateUserDocument, options);
}
export type UpdateUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateUserMutationOutput, UpdateUserMutationVariables>;
export const UpdateUserPasswordDocument = gql`
    mutation updateUserPassword($oldPassword: String!, $newPassword: String!) {
  updateUserPassword(oldPassword: $oldPassword, newPassword: $newPassword)
}
    `;

/**
 * __useUpdateUserPasswordMutation__
 *
 * To run a mutation, you first call `useUpdateUserPasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateUserPasswordMutation({
 *   variables: {
 *     oldPassword: // value for 'oldPassword'
 *     newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useUpdateUserPasswordMutation(options: VueApolloComposable.UseMutationOptions<UpdateUserPasswordMutationOutput, UpdateUserPasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateUserPasswordMutationOutput, UpdateUserPasswordMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateUserPasswordMutationOutput, UpdateUserPasswordMutationVariables>(UpdateUserPasswordDocument, options);
}
export type UpdateUserPasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateUserPasswordMutationOutput, UpdateUserPasswordMutationVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Time: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type AuthorizationOutput = {
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type Budget = {
  id: Scalars['UUID']['output'];
  initializationStep?: Maybe<Step>;
  name: Scalars['String']['output'];
  rights?: Maybe<Array<Right>>;
};

export type Category = {
  children: Array<Category>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  visible: Scalars['Boolean']['output'];
};

export type CategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['ID']['input']>;
  visible: Scalars['Boolean']['input'];
};

export type CreateUserInput = {
  activationUrl: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  theme: Theme;
};

export type Frequency = {
  period: Period;
  value: Scalars['Int']['output'];
};

export type FrequencyInput = {
  period: Period;
  value: Scalars['Int']['input'];
};

export type Goal = {
  category: Category;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: GoalType;
  value: Scalars['Float']['output'];
};

export type GoalInput = {
  category: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  type: GoalType;
  value: Scalars['Float']['input'];
};

export type GoalType =
  | 'AMOUNT_MAX'
  | 'AMOUNT_MIN'
  | 'PERCENTAGE_MAX'
  | 'PERCENTAGE_MIN';

export type Income = {
  amount: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  frequency: Frequency;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type IncomeInput = {
  amount: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  frequency?: InputMaybe<FrequencyInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
};

export type Mutation = {
  activateUser: Scalars['Boolean']['output'];
  createBudget: Budget;
  createUser: User;
  login: AuthorizationOutput;
  refreshToken: AuthorizationOutput;
  requestPasswordReset: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  setUsersRights: Array<UserRights>;
  updateCategories: Array<Category>;
  updateGoals: Array<Goal>;
  updateIncomes: Array<Income>;
  updateUser: User;
  updateUserPassword: Scalars['Boolean']['output'];
};


export type MutationActivateUserArgs = {
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationCreateBudgetArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String']['input'];
  resetUrl: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSetUsersRightsArgs = {
  budgetId: Scalars['UUID']['input'];
  usersRights: Array<UserRightsInput>;
};


export type MutationUpdateCategoriesArgs = {
  budgetId: Scalars['UUID']['input'];
  categories: Array<CategoryInput>;
};


export type MutationUpdateGoalsArgs = {
  budgetId: Scalars['UUID']['input'];
  goals: Array<GoalInput>;
};


export type MutationUpdateIncomesArgs = {
  budgetId: Scalars['UUID']['input'];
  incomes: Array<IncomeInput>;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserPasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type Period =
  | 'DAY'
  | 'MONTH'
  | 'WEEK'
  | 'YEAR';

export type Query = {
  budget?: Maybe<Budget>;
  budgets: Array<Budget>;
  categories: Array<Category>;
  goals: Array<Goal>;
  incomes: Array<Income>;
  user: User;
  usersRights: Array<UserRights>;
  visibleCategories: Array<Category>;
};


export type QueryBudgetArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryCategoriesArgs = {
  budgetId: Scalars['UUID']['input'];
};


export type QueryGoalsArgs = {
  budgetId: Scalars['UUID']['input'];
};


export type QueryIncomesArgs = {
  budgetId: Scalars['UUID']['input'];
};


export type QueryUsersRightsArgs = {
  budgetId: Scalars['UUID']['input'];
};


export type QueryVisibleCategoriesArgs = {
  budgetId: Scalars['UUID']['input'];
};

export type Right =
  | 'EDIT_CATEGORIES'
  | 'EDIT_EXPENSES'
  | 'EDIT_GOALS'
  | 'EDIT_INCOMES'
  | 'EDIT_USERS_AND_RIGHTS'
  | 'OWNER'
  | 'VIEW';

export type Step =
  | 'EXPENSES_CATEGORIES'
  | 'FINISHED'
  | 'GOALS'
  | 'INCOMES'
  | 'USERS_AND_RIGHTS';

export type Theme =
  | 'DARK'
  | 'LIGHT'
  | 'SYSTEM';

export type UpdateUserInput = {
  email: Scalars['String']['input'];
  locale: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  theme: Theme;
};

export type User = {
  email: Scalars['String']['output'];
  locale: Scalars['String']['output'];
  name: Scalars['String']['output'];
  theme: Theme;
};

export type UserRights = {
  rights: Array<Right>;
  user: User;
};

export type UserRightsInput = {
  email: Scalars['String']['input'];
  rights: Array<Right>;
};

export type BudgetsQueryVariables = Exact<{ [key: string]: never; }>;


export type BudgetsQueryOutput = { budgets: Array<{ id: any, name: string, initializationStep?: Step | null }> };

export type CreateBudgetMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateBudgetMutationOutput = { createBudget: { id: any } };

export type ActivateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type ActivateUserMutationOutput = { activateUser: boolean };

export type CreateUserMutationVariables = Exact<{
  userInput: CreateUserInput;
}>;


export type CreateUserMutationOutput = { createUser: { name: string, email: string } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQueryOutput = { user: { name: string, email: string, theme: Theme, locale: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutationOutput = { login: { refreshToken: string, accessToken: string, user: { name: string, email: string, theme: Theme, locale: string } } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokenMutationOutput = { refreshToken: { refreshToken: string, accessToken: string, user: { name: string, email: string, theme: Theme, locale: string } } };

export type RequestPasswordResetMutationVariables = Exact<{
  email: Scalars['String']['input'];
  resetUrl: Scalars['String']['input'];
}>;


export type RequestPasswordResetMutationOutput = { requestPasswordReset: boolean };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ResetPasswordMutationOutput = { resetPassword: boolean };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutationOutput = { updateUser: { name: string, email: string, theme: Theme, locale: string } };

export type UpdateUserPasswordMutationVariables = Exact<{
  oldPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type UpdateUserPasswordMutationOutput = { updateUserPassword: boolean };
