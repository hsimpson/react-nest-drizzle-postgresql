import { databaseSchema } from '../schema';

type InsertAccount = typeof databaseSchema.account.$inferInsert;

export const accountSeed: InsertAccount[] = [
  {
    email: 'admin@example.com',
  },
  {
    email: 'user@example.com',
  },
];
