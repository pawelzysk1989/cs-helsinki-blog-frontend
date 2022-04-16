import {
  ApolloClient,
  ApolloProvider as Provider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import React, { useMemo } from 'react';

import useAccessToken from '../hooks/use_access_token';
import { Unset } from '../types/unset';
import envConfig from '../utils/env_config';
import isSet from '../utils/is_set';

const createApolloClient = (authToken: string | Unset) => {
  const withAuth = isSet(authToken)
    ? {
        Authorization: `Bearer ${authToken}`,
      }
    : {};
  return new ApolloClient({
    link: new HttpLink({
      uri: envConfig.GRAPH_QL_URL,
      headers: {
        ...withAuth,
      },
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
    },
  });
};

const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAccessToken();
  const client = useMemo(() => createApolloClient(accessToken.value), [accessToken]);

  return <Provider client={client}>{children}</Provider>;
};
export default ApolloProvider;
