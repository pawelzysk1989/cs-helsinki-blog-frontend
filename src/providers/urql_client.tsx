import { useAuth0 } from '@auth0/auth0-react';
import {
  cacheExchange,
  createClient,
  dedupExchange,
  errorExchange,
  fetchExchange,
} from '@urql/core';
import { devtoolsExchange } from '@urql/devtools';
import React, { useEffect, useMemo, useState } from 'react';
import { Provider } from 'urql';

import { Unset } from '../types/unset';
import envConfig from '../utils/env_config';
import isSet from '../utils/is_set';

const createUrqlClient = (authToken: string | Unset) => {
  return createClient({
    url: envConfig.GRAPHQL_URL,
    fetchOptions: {
      headers: { authorization: isSet(authToken) ? `Bearer ${authToken}` : '' },
    },
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange,
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
      fetchExchange,
    ],
  });
};

const UrqlProvider = ({ children }: { children: React.ReactNode }) => {
  const { getAccessTokenSilently, isLoading, isAuthenticated, user } = useAuth0();
  const [accessToken, setAccessToken] = useState<string | Unset>();

  useEffect(() => {
    const getAccessToken = async () => await getAccessTokenSilently();
    getAccessToken().then(setAccessToken).catch(console.error);
  }, [getAccessTokenSilently, user]);

  const client = useMemo(() => createUrqlClient(accessToken), [accessToken]);

  if (isLoading || (isAuthenticated && !accessToken)) {
    return <div>Loading...</div>;
  }

  return <Provider value={client}>{children}</Provider>;
};
export default UrqlProvider;
