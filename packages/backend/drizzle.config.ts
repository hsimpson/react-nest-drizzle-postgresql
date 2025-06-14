import { resolveDatabaseUrl } from '@/db/connection';
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: resolveDatabaseUrl(),
  },
  // use snake_case for the database columns
  casing: 'snake_case',
});
