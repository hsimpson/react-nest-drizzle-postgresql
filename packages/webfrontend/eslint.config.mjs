import pluginReact from 'eslint-plugin-react';
import reactPlugin from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import sharedConfig from '../../shared/eslint.config.mjs';

export default defineConfig([
  ...sharedConfig,

  {
    ignores: [
      './coverage/**/*',
      './dist/**/*',
      './eslint.config.mjs',
      './prettier.config.mjs',
      'tailwind.config.js',
      'vite.config.mjs',
    ],
  },

  // typescript-eslint rules
  {},

  // plugin-react and plugin-react-hooks
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      react: pluginReact,
      'react-hooks': reactPlugin,
    },
    rules: {
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]);
