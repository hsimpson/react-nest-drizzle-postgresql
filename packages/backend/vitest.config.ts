import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      exclude: ['./drizzle.config.ts', './src/auth/types', './src/db/', ...coverageConfigDefaults.exclude],
    },
  },

  //FIXME: This is a workaround for the issue with swc and tsconfig paths. Due to incompatibility between swc and vite-tsconfig-paths, we need to use both plugins.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [swc.vite() as any, tsconfigPaths() as any],
});
