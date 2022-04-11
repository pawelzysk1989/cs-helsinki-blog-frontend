import React, { useRef } from 'react';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query';

import useHandleApiError from '../hooks/use_handle_api_error';

const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
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
    <QueryClientProvider client={queryClient.current}>{children}</QueryClientProvider>
  );
};
export default ReactQueryClientProvider;
