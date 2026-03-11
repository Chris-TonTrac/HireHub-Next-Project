import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const companiesTable = pgTable('companies', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  industry: varchar('industry', { length: 255 }),
  description: text('description'),
  logoUrl: varchar('logo_url', { length: 500 }),
  location: varchar('location', { length: 255 }),
  size: varchar('size', { length: 100 }),
  websiteUrl: varchar('website_url', { length: 500 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
