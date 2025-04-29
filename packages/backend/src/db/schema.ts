import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const account = pgTable('account', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  public_id: uuid().defaultRandom().notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
});
