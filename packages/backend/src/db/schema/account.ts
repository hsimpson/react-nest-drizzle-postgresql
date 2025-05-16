import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from './columns.helpers';
import refresh from './refresh';

const account = pgTable('account', {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),

  ...timestamps,
});

export const accountRelations = relations(account, ({ many }) => ({
  refreshes: many(refresh),
}));

export default account;
