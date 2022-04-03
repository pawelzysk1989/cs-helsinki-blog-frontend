import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useMemo, useState } from 'react';

import isSet from '../utils/is_set';

function useAccessToken() {
  const [idToken, setIdToken] = useState<string | null>(null);
  const { user, getAccessTokenSilently, isLoading } = useAuth0();
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setIdToken(accessToken);
      } catch (error) {
        console.error(error);
        setIdToken(null);
      }
    };

    if (isSet(user) && !isLoading) {
      getAccessToken();
    } else {
      setIdToken(null);
    }
  }, [getAccessTokenSilently, user, isLoading]);

  const token = useMemo(() => ({ value: idToken, isLoading }), [idToken, isLoading]);

  return token;
}

export default useAccessToken;
