import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './users';

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  sessionToken: varchar('session_token', { length: 512 }).notNull().unique(),
  expires: timestamp('expires').notNull(),
});
