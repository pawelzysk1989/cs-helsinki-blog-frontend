import {
  ApolloClient,
  ApolloProvider as Provider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import React from 'react';

import useAccessToken from '../hooks/use_access_token';
import { Unset } from '../types/unset';
import isSet from '../utils/is_set';

const createApolloClient = (authToken: string | Unset) => {
  const withAuth = isSet(authToken)
    ? {
        Authorization: `Bearer ${authToken}`,
      }
    : {};
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://quiet-sunfish-58.hasura.app/v1/graphql',
      headers: {
        ...withAuth,
      },
    }),
    cache: new InMemoryCache(),
  });
};

const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAccessToken();
  const client = createApolloClient(accessToken.value);

  return <Provider client={client}>{children}</Provider>;
};
export default ApolloProvider;
