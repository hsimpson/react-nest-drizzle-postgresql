import { fileURLToPath } from 'node:url';
import swc from 'unplugin-swc';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  oxc: false,

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      exclude: [
        './drizzle.config.ts',
        './src/auth/types',
        './src/db/',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },

  // Keep test transpilation on a SWC-supported target even if tsconfig uses newer ES target.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins: [swc.vite({ jsc: { target: 'es2022' } }) as any],
});
