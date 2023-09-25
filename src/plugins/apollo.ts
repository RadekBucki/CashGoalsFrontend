// eslint-disable-next-line import/no-extraneous-dependencies
import { LocaleInstance } from 'vuetify';

// eslint-disable-next-line import/no-extraneous-dependencies
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { onError } from '@apollo/client/link/error';

import { useModalStore } from '@/components/Modal';
import useAuthorization from '@/composables/useAuthorization.ts';
import router from '@/plugins/router.ts';
import useAppStore from '@/stores/app.ts';

export default function useApolloClient(locale: LocaleInstance) {
  const appStore = useAppStore();
  const modalStore = useModalStore();
  const authorization = useAuthorization();
  const { t } = locale;
  function getApolloClient() {
    const httpLink = createHttpLink({
      uri: import.meta.env.VITE_BACKEND_GRAPHQL_URL,
    });

    const errorHandler = onError(async (errorResponse) => {
      if (errorResponse.networkError) {
        modalStore.showModal({
          title: t('network.error.title'),
          type: 'error',
          message: errorResponse.networkError.message,
        });
      }
      if (errorResponse.graphQLErrors?.length !== 1) {
        return;
      }
      const error = errorResponse.graphQLErrors[0];
      switch (error.extensions?.classification) {
        case 'BAD_REQUEST':
        case 'NOT_FOUND':
          modalStore.showModal({
            type: 'warning',
            title: error.message,
          });
          break;
        case 'UNAUTHORIZED':
        case 'FORBIDDEN':
          if (await authorization.authorize()) {
            errorResponse.forward(errorResponse.operation);
          } else {
            await router.push({ name: 'Login' });
          }
          break;
        default:
          modalStore.showModal({
            type: 'error',
            title: import.meta.env.DEV ? `${error.extensions.exception} - ${error.extensions.message}` : error.message,
            content: import.meta.env.DEV
              ? error.extensions.stacktrace
                .map((line: string) => `${line.fileName}::${line.methodName}():${line.lineNumber}`)
                .slice(0, 10)
                .join('\n')
              : undefined,
          });
      }
    });

    const authMiddleware = new ApolloLink((operation, forward) => {
      const headersCopy = { ...operation.getContext().headers };
      if (appStore.isUserLoggedIn()) {
        headersCopy.Authorization = `Bearer ${appStore.getAccessToken()}`;
        operation.setContext({ headers: headersCopy });
      }
      return forward(operation);
    });
    return new ApolloClient({
      link: authMiddleware.concat(errorHandler).concat(httpLink),
      cache: new InMemoryCache(),
      connectToDevTools: true,
    });
  }
  return getApolloClient;
}
