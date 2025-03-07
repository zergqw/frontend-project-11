import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      indent: ['error', 2],
      semi: ['error', 'always'],
      'quote-props': ['error', 'as-needed'],
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'no-trailing-spaces': ['error'],
      'padded-blocks': ['error', 'never'],
      'space-infix-ops': ['error'],
    },
  },
];
