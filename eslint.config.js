import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      quotes: ['error', 'single'],
      'quote-props': ['error', 'as-needed'],
      'no-param-reassign': ['error', { props: false }],
      'space-in-parens': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      indent: ['error', 2],
      semi: ['error', 'always'],
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'no-trailing-spaces': ['error'],
      'space-infix-ops': ['error'],
      'import/newline-after-import': ['error', { count: 1 }],
    },
  },
];
