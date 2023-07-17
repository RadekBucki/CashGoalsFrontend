module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  plugins: [
    'vue',
    'vuejs-accessibility',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 0,
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
        ],
        pathGroups: [
          {
            pattern: 'vue*',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: [
          'vue',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'newline-per-chained-call': [
      'error',
      {
        ignoreChainWithDepth: 1,
      },
    ],
    'import/no-relative-parent-imports': [
      'error',
      {
        ignore: [
          '^@/',
        ],
      },
    ],
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts',
        },
      },
    ],
    'vue/block-tag-newline': [
      'error',
      {
        singleline: 'consistent',
        multiline: 'always',
        maxEmptyLines: 0,
      },
    ],
    'vue/component-api-style': [
      'error',
      [
        'script-setup',
        'composition',
      ],
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true,
        ignores: [],
      },
    ],
    'vue/component-options-name-casing': [
      'error',
      'PascalCase',
    ],
    'vue/html-button-has-type': 'error',
    'vue/html-comment-content-newline': 'error',
    'vue/html-comment-content-spacing': 'error',
    'vue/html-comment-indent': 'error',
    'vue/match-component-file-name': [
      'error',
      {
        shouldMatchCase: true,
      },
    ],
    'vue/no-empty-component-block': 'error',
    'vue/no-potential-component-option-typo': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/padding-lines-in-component-definition': 'error',
    'vue/prefer-separate-static-class': 'error',
    'vue/prefer-true-attribute-shorthand': 'error',
    'vue/require-direct-export': 'error',
    'vue/require-name-property': 'error',
    'vue/require-typed-ref': 'error',
    'vue/static-class-names-order': 'error',
    'vue/v-on-handler-style': 'error',
    'import/no-unresolved': 'off',
    'vue/multi-word-component-names': 'off',
    'import/extensions': 'off',
  },
};
