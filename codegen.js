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
  documents: ['./src/queries/*.graphql'],
  overwrite: true,
  generates: {
    './src/generated/queries/index.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
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
