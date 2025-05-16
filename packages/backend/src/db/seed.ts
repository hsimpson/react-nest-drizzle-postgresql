import { resolveDatabaseUrl } from '@/db/connection';
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { reset } from 'drizzle-seed';
import * as schema from './schema';
import * as seeds from './seeds';

async function main() {
  dotenv.config(); // Load environment variables from .env file

  // use snake_case for the database columns
  const db = drizzle({ connection: resolveDatabaseUrl(), casing: 'snake_case' });

  await reset(db, schema);
  await seeds.account(db);
}

void main();
