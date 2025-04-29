import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { reset } from 'drizzle-seed';
import { databaseSchema } from './schema';
import { accountSeed } from './seeds/account';

async function main() {
  dotenv.config(); // Load environment variables from .env file

  const db = drizzle(process.env.DATABASE_URL ?? '');

  await reset(db, databaseSchema);

  await db.insert(databaseSchema.account).values(accountSeed);
}

void main();
