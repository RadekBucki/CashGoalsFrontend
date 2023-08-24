/* eslint-disable */
// noinspection TypeScriptUnresolvedVariable

import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:8080/graphql',
  generates: {
    './src/graphql/types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-vue-apollo-smart-ops',
        'typescript-vue-apollo',
        {
          add: {
            content: '/* eslint-disable */\n' +
              '// noinspection ES6UnusedImports,JSUnusedGlobalSymbols',
          }
        }
      ],
      config: {
        useTypeImports: true,
        preResolveTypes: true,
        onlyOperationTypes: true,
        avoidOptionals: true,
        enumsAsTypes: true,
        withSmartOperationFunctions: false,
        withCompositionFunctions: true,
        vueApolloComposableImportFrom: 'vue',
      },
    },
  },
};

export default config;
