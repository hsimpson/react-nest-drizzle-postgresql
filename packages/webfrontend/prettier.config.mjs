import sharedConfig from '../../shared/prettier.config.mjs';

export default {
  ...sharedConfig,

  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/index.css',
  tailwindConfig: './tailwind.config.js',
};
