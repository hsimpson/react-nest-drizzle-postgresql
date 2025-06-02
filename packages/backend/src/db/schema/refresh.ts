import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import account from './account';
import { timestamps } from './columns.helpers';

const refresh = pgTable('refresh', {
  id: uuid().primaryKey().defaultRandom(),
  hashedRefreshToken: varchar().notNull().unique(),
  accountId: uuid()
    .notNull()
    .references(() => account.id),

  ...timestamps,
});

export const refreshRelations = relations(refresh, ({ one }) => ({
  account: one(account, {
    fields: [refresh.accountId],
    references: [account.id],
  }),
}));

export type Refresh = typeof refresh.$inferSelect;

export default refresh;
