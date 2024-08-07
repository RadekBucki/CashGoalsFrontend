import { LocaleInstance } from 'vuetify';

import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';

import { useLoaderStore } from '@/components/Loader';
import { useModalStore } from '@/components/Modal';
import useAuthorization from '@/composables/useApp/useAuthorization.ts';
import useAppStore from '@/configuration/appStore.ts';
import router from '@/configuration/plugins/router.ts';

export default function useApolloClient(locale: LocaleInstance) {
  const appStore = useAppStore();
  const modalStore = useModalStore();
  const loaderStore = useLoaderStore();
  const authorization = useAuthorization();
  const { t } = locale;

  function getErrorHandler() {
    return onError((errorResponse) => {
      if (errorResponse.networkError) {
        modalStore.showModal({
          title: t('network.error.title'),
          type: 'error',
          content: errorResponse.networkError.message,
          closeable: false,
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
          authorization.authorize()
            .then((r: boolean) => {
              if (r) {
                errorResponse.forward(errorResponse.operation);
              } else {
                router.push({ name: 'Login' })
                  .then(() => router.go(0));
              }
            });
          break;
        default:
          const stacktrace: {
            fileName: string;
            methodName: string;
            lineNumber: number;
          }[] = [];
          if (import.meta.env.DEV) {
            stacktrace.push(...(error.extensions?.stacktrace as []));
          }
          modalStore.showModal({
            type: 'error',
            title: import.meta.env.DEV
              ? `${error.extensions.exception} - ${error.extensions.message}`
              : error.message,
            content: stacktrace
              .map((line) => `${line.fileName}::${line.methodName}():${line.lineNumber}`)
              .slice(0, 10)
              .join('\n'),
          });
      }
    });
  }

  function getApolloClient() {
    const httpLink = createHttpLink({
      uri: import.meta.env.VITE_BACKEND_GRAPHQL_URL,
      headers: {
        'Accept-Language': appStore.locale,
      },
    });
    const errorHandler = getErrorHandler();

    const authMiddleware = new ApolloLink((operation, forward) => {
      loaderStore.showLoader();

      const headersCopy = { ...operation.getContext().headers };
      if (appStore.isUserLoggedIn()) {
        headersCopy.Authorization = `Bearer ${appStore.getAccessToken()}`;
        operation.setContext({ headers: headersCopy });
      }
      return forward(operation)
        .map((response) => {
          loaderStore.hideLoader();
          return response;
        });
    });

    return new ApolloClient({
      link: authMiddleware.concat(errorHandler).concat(httpLink),
      cache: new InMemoryCache({ addTypename: false }),
      connectToDevTools: true,
    });
  }
  return getApolloClient;
}
