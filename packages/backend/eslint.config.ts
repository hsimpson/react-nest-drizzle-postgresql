import { defineConfig } from 'eslint/config';
import sharedConfig from '../../eslint.config';

export default defineConfig([
  ...sharedConfig,

  {
    ignores: ['./coverage/**/*', './dist/**/*'],
  },

  // typescript-eslint rules
  {
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },

  // test files rules
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
    },
  },
]);
