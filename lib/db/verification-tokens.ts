import { pgTable, varchar, timestamp, primaryKey } from 'drizzle-orm/pg-core';

export const verificationTokens = pgTable('verification_tokens', {
  identifier: varchar('identifier', { length: 255 }).notNull(),
  token: varchar('token', { length: 512 }).notNull().unique(),
  expires: timestamp('expires').notNull(),
}, (t) => [
  primaryKey({ columns: [t.identifier, t.token] }),
]);
