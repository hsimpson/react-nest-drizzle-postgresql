import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

import configPrettier from 'eslint-config-prettier';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,

  {
    ignores: [],
  },

  // configuration for rules that require type information
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },

  // customize eslint-rules
  {
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'off',
      'no-warning-comments': 'warn',
      eqeqeq: 'error',
    },
  },

  // customize typescript-eslint rules
  {
    rules: {
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
      // '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      // '@typescript-eslint/no-parameter-properties': ['off'],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: false,
          vars: 'all',
        },
      ],
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/promise-function-async': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
    },
  },

  // prettier should come last
  configPrettier,
  pluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': 'error',
    },
  },
);
