const {
  VITE_AUTH_AUDIENCE,
  VITE_AUTH_DOMAIN,
  VITE_AUTH_CLIENT_ID,
  VITE_AUTH_CONNECTION,
  VITE_GRAPHQL_URL,
} = import.meta.env;

if (!VITE_AUTH_AUDIENCE || typeof VITE_AUTH_AUDIENCE !== 'string') {
  throw Error('AUTH_AUDIENCE is missing');
}

if (!VITE_AUTH_DOMAIN || typeof VITE_AUTH_DOMAIN !== 'string') {
  throw Error('AUTH_DOMAIN is missing');
}

if (!VITE_AUTH_CLIENT_ID || typeof VITE_AUTH_CLIENT_ID !== 'string') {
  throw Error('AUTH_CLIENT_ID is missing');
}

if (!VITE_AUTH_CONNECTION || typeof VITE_AUTH_CONNECTION !== 'string') {
  throw Error('VITE_AUTH_CONNECTION is missing');
}
if (!VITE_GRAPHQL_URL || typeof VITE_GRAPHQL_URL !== 'string') {
  throw Error('VITE_GRAPHQL_URL is missing');
}

export default {
  AUTH_AUDIENCE: VITE_AUTH_AUDIENCE,
  AUTH_DOMAIN: VITE_AUTH_DOMAIN,
  AUTH_CLIENT_ID: VITE_AUTH_CLIENT_ID,
  AUTH_CONNECTION: VITE_AUTH_CONNECTION,
  GRAPHQL_URL: VITE_GRAPHQL_URL,
};
