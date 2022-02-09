import React from 'react';
import { Navigate } from 'react-router-dom';

import auth from '../hooks/auth';
import isSet from '../utils/is_set';

function withAuthentication<T>(WrappedComponent: React.ComponentType<T>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name;

  const ComponentWithAuth = (props: T) => {
    const user = auth.useUser();
    if (isSet(user)) {
      return <WrappedComponent {...props} />;
    }
    return <Navigate to="/login" />;
  };

  ComponentWithAuth.displayName = `withAuthentication(${displayName})`;

  return ComponentWithAuth;
}

export default withAuthentication;
