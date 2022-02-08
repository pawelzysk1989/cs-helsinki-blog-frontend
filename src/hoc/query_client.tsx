import React, { useRef } from 'react';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query';

import useHandleApiError from '../hooks/use_handle_api_error';

function withQueryClientProvider<T>(WrappedComponent: React.ComponentType<T>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name;

  const ComponentWithQueryClientProvider = (props: T) => {
    const handleApiError = useHandleApiError();

    const queryClient = useRef(
      new QueryClient({
        queryCache: new QueryCache({
          onError: handleApiError,
        }),
        mutationCache: new MutationCache({
          onError: handleApiError,
        }),
      }),
    );
    return (
      <QueryClientProvider client={queryClient.current}>
        <WrappedComponent {...props} />
      </QueryClientProvider>
    );
  };

  ComponentWithQueryClientProvider.displayName = `withQueryClientProvider(${displayName})`;

  return ComponentWithQueryClientProvider;
}

export default withQueryClientProvider;
