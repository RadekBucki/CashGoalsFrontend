// noinspection TypeScriptUnresolvedVariable

module.exports = {
  client: {
    service: {
      name: 'cashgoals',
      url: import.meta.env.VITE_BACKEND_GRAPHQL_URL,
    },
    includes: [
      'src/**/*.vue',
      'src/**/*.ts',
      'src/**/*.js',
    ],
  },
};
