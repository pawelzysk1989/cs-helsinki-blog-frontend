import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import auth from '../hooks/auth';
import isSet from '../utils/is_set';

function withAuthentication<T>(WrappedComponent: React.ComponentType<T>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name;

  const ComponentWithAuth = (props: T) => {
    const user = auth.useUser();
    const from = useLocation();
    if (isSet(user)) {
      return <WrappedComponent {...props} />;
    }
    return <Navigate to="/login" state={{ from }} replace />;
  };

  ComponentWithAuth.displayName = `withAuthentication(${displayName})`;

  return ComponentWithAuth;
}

export default withAuthentication;
