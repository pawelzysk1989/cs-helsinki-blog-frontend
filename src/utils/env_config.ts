const { VITE_AUTH_AUDIENCE, VITE_AUTH_DOMAIN, VITE_AUTH_CLIENT_ID } = import.meta.env;

if (!VITE_AUTH_AUDIENCE || typeof VITE_AUTH_AUDIENCE !== 'string') {
  throw Error('AUTH_AUDIENCE is missing');
}

if (!VITE_AUTH_DOMAIN || typeof VITE_AUTH_DOMAIN !== 'string') {
  throw Error('AUTH_DOMAIN is missing');
}

if (!VITE_AUTH_CLIENT_ID || typeof VITE_AUTH_CLIENT_ID !== 'string') {
  throw Error('AUTH_CLIENT_ID is missing');
}

export default {
  AUTH_AUDIENCE: VITE_AUTH_AUDIENCE,
  AUTH_DOMAIN: VITE_AUTH_DOMAIN,
  AUTH_CLIENT_ID: VITE_AUTH_CLIENT_ID,
};
