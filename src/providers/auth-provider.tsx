import { AppState, Auth0Provider } from '@auth0/auth0-react';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Auth0ProviderWithHistory = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onRedirectCallback = useCallback((appState: AppState) => {
    navigate(appState?.returnTo || location.pathname);
  }, []);

  return (
    <Auth0Provider
      domain="dev-ylszmrl7.us.auth0.com"
      clientId="ICuysb9o15KnGcPmxC8UPyuojwt0rI5Q"
      audience="blog_api"
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
