import { AppState, Auth0Provider } from '@auth0/auth0-react';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import envConfig from '../utils/env_config';

const Auth0ProviderWithHistory = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onRedirectCallback = useCallback((appState: AppState) => {
    navigate(appState?.returnTo || location.pathname);
  }, []);

  return (
    <Auth0Provider
      domain={envConfig.AUTH_DOMAIN}
      clientId={envConfig.AUTH_CLIENT_ID}
      audience={envConfig.AUTH_AUDIENCE}
      connection={envConfig.AUTH_CONNECTION}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
