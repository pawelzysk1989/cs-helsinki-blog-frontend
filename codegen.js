module.exports = {
  schema: [
    {
      'https://quiet-sunfish-58.hasura.app/v1/graphql': {
        headers: {
          Authorization: 'Bearer ' + process.env.AUTH_TOKEN,
        },
      },
    },
  ],
  documents: ['./src/queries/*.tsx', './src/queries/*.ts'],
  overwrite: true,
  generates: {
    './src/generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
