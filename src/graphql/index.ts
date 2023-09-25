/* eslint-disable */
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols
// noinspection JSUnusedGlobalSymbols

import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import type * as VueCompositionApi from '@vue/composition-api';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type ReactiveFunction<TParam> = () => TParam;

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
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    refreshToken
    accessToken
    user {
      name
      email
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
};

export type CreateUserInput = {
  activationUrl: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginOutput = {
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  activateUser: Scalars['Boolean']['output'];
  createUser: User;
  login: LoginOutput;
  refreshToken: LoginOutput;
  requestPasswordReset: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  updateUser: User;
};


export type MutationActivateUserArgs = {
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
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


export type MutationUpdateUserArgs = {
  input: UserInput;
};

export type Query = {
  user: User;
};

export type User = {
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ActivateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type ActivateUserMutationOutput = { activateUser: boolean };

export type CreateUserMutationVariables = Exact<{
  userInput: CreateUserInput;
}>;


export type CreateUserMutationOutput = { createUser: { name: string, email: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutationOutput = { login: { refreshToken: string, accessToken: string, user: { name: string, email: string } } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokenMutationOutput = { refreshToken: { refreshToken: string, accessToken: string, user: { name: string, email: string } } };

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
