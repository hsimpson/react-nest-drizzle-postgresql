import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const account = pgTable('account', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
});
