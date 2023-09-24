/* eslint-disable */
// noinspection TypeScriptUnresolvedVariable

import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:8080/graphql',
  documents: './src/graphql/**/*.graphql',
  generates: {
    './src/graphql/index.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-vue-apollo',
        {
          add: {
            content: '/* eslint-disable */\n' +
              '// noinspection ES6UnusedImports,JSUnusedGlobalSymbols\n' +
              '// noinspection JSUnusedGlobalSymbols\n',
          },
        }
      ],
      config: {
        useTypeImports: true,
        preResolveTypes: true,
        onlyOperationTypes: true,
        avoidOptionals: true,
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
