import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:8080/graphql',
  documents: './src/graphql/**/*.graphql',
  generates: {
    './src/graphql/index.ts': {
      plugins: [
        'typescript-vue-apollo',
        'typescript',
        'typescript-operations',
        {
          add: {
            content: '/* eslint-disable */\n'
              + '// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedGlobalSymbols,DuplicatedCode\n',
          },
        },
      ],
      config: {
        useTypeImports: true,
        enumsAsTypes: true,
        operationResultSuffix: 'Output',
        skipTypename: true,
        vueCompositionApiImportFrom: 'vue',
        scalars: {
          ID: {
            input: 'number',
            output: 'number',
          },
          UUID: {
            input: 'string',
            output: 'string',
          },
        },
      },
    },
  },
};

export default config;
