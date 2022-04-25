import {
  ApolloClient,
  ApolloProvider as Provider,
  from,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useMemo, useState } from 'react';

import { Unset } from '../types/unset';
import envConfig from '../utils/env_config';
import isSet from '../utils/is_set';

const createApolloClient = (authToken: string | Unset) => {
  const withAuth = isSet(authToken)
    ? {
        Authorization: `Bearer ${authToken}`,
      }
    : {};

  const httpLink = new HttpLink({
    uri: envConfig.GRAPHQL_URL,
    headers: {
      ...withAuth,
    },
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );

    if (networkError) console.error(`[Network error]: ${networkError}`);
  });

  return new ApolloClient({
    link: from([errorLink, httpLink]),
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
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | Unset>();

  useEffect(() => {
    const getAccessToken = async () => await getAccessTokenSilently();
    getAccessToken().then(setAccessToken).catch(console.error);
  }, [getAccessTokenSilently]);

  const client = useMemo(() => createApolloClient(accessToken), [accessToken]);

  if (isLoading || (isAuthenticated && !accessToken)) {
    return <div>Loading...</div>;
  }

  return <Provider client={client}>{children}</Provider>;
};
export default ApolloProvider;
