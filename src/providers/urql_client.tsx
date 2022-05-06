import { useAuth0 } from '@auth0/auth0-react';
import {
  cacheExchange,
  createClient,
  dedupExchange,
  errorExchange,
  fetchExchange,
  subscriptionExchange,
} from '@urql/core';
import { devtoolsExchange } from '@urql/devtools';
import { createClient as createWSClient } from 'graphql-ws';
import React, { useEffect, useMemo, useState } from 'react';
import { Provider } from 'urql';

import { Unset } from '../types/unset';
import envConfig from '../utils/env_config';
import isSet from '../utils/is_set';
import isUnset from '../utils/is_unset';

const createUrqlClient = (authToken: string | Unset) => {
  const headers = { authorization: isSet(authToken) ? `Bearer ${authToken}` : '' };

  const wsClient = createWSClient({
    url: envConfig.GRAPHQL_WS,
    connectionParams: {
      headers,
    },
  });

  return createClient({
    url: envConfig.GRAPHQL_URL,
    fetchOptions: {
      headers,
    },
    exchanges: [
      devtoolsExchange,
      errorExchange({
        onError: (error) => {
          if (error.graphQLErrors.length)
            error.graphQLErrors.forEach(({ message, locations, path }) =>
              console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
              ),
            );

          if (error.networkError) console.error(`[Network error]: ${error.networkError}`);
        },
      }),
      dedupExchange,
      cacheExchange,
      fetchExchange,
      subscriptionExchange({
        forwardSubscription: (operation) => ({
          subscribe: (sink) => ({
            unsubscribe: wsClient.subscribe(operation, sink),
          }),
        }),
      }),
    ],
  });
};

const UrqlProvider = ({ children }: { children: React.ReactNode }) => {
  const { getAccessTokenSilently, isLoading, isAuthenticated, user } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | Unset>();

  useEffect(() => {
    const getAccessToken = async () => await getAccessTokenSilently();
    if (isSet(user)) {
      getAccessToken().then(setAccessToken).catch(console.error);
    }
  }, [getAccessTokenSilently, user]);

  const client = useMemo(() => createUrqlClient(accessToken), [accessToken]);

  if (isLoading || (isAuthenticated && isUnset(accessToken))) {
    return <div>Loading...</div>;
  }

  return <Provider value={client}>{children}</Provider>;
};
export default UrqlProvider;
