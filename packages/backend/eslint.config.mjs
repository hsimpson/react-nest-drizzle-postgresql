import { defineConfig } from 'eslint/config';
import sharedConfig from '../../shared/eslint.config.mjs';

export default defineConfig([
  ...sharedConfig,

  {
    ignores: ['./coverage/**/*', './dist/**/*', './eslint.config.mjs', './prettier.config.mjs'],
  },

  // typescript-eslint rules
  {
    rules: {
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
