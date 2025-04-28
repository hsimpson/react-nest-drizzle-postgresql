import { account } from '../schema';

type InsertAccount = typeof account.$inferInsert;

export const accountSeed: InsertAccount[] = [
  {
    email: 'admin@example.com',
  },
  {
    email: 'user@example.com',
  },
];
