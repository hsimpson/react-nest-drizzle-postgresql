import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from './columns.helpers';

const account = pgTable('account', {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),

  ...timestamps,
});

export default account;
