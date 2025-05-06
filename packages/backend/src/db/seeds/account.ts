import * as argon2 from 'argon2';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../schema';
import accounts from './data/accounts.json';

export default async function seed(db: NodePgDatabase) {
  const inserts = accounts.map(async (account) => {
    await db.insert(schema.account).values({ ...account, password: await argon2.hash(account.password) });
  });
  await Promise.all(inserts);
}
