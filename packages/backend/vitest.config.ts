import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      exclude: [
        './drizzle.config.ts',
        './src/**/*.dto.ts',
        './src/auth/guards',
        './src/auth/types',
        './src/db/',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },

  plugins: [swc.vite(), tsconfigPaths()],
});
