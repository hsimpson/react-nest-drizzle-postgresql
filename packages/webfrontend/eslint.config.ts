import eslintReact from '@eslint-react/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import sharedConfig from '../../eslint.config';

export default defineConfig([
  ...sharedConfig,
  eslintReact.configs['strict-type-checked'],
  reactHooks.configs.flat.recommended,

  {
    ignores: ['./coverage/**/*', './dist/**/*'],
  },

  // typescript-eslint rules
  {},

  // customize eslint-plugin-react-hooks rules
  {
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]);
