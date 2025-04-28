import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { reset } from 'drizzle-seed';
import * as schema from './schema';
import { accountSeed } from './seeds/account';

async function main() {
  dotenv.config(); // Load environment variables from .env file

  const db = drizzle(process.env.DATABASE_URL ?? '');

  await reset(db, schema);

  await db.insert(schema.account).values(accountSeed);
}

void main();
