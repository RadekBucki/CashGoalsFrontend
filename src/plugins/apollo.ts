// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ApolloClient, createHttpLink, InMemoryCache,
} from '@apollo/client/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_BACKEND_GRAPHQL_URL,
});

const errorHandler = onError(({ graphQLErrors, networkError }) => {
  // Global errors will be handled here
  // eslint-disable-next-line no-console
  console.log('graphQLErrors', graphQLErrors);
  // eslint-disable-next-line no-console
  console.log('networkError', networkError);
});

export default new ApolloClient({
  link: errorHandler.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
