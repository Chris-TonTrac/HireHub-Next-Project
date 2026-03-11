import { pgTable, uuid, varchar, text, integer, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { companiesTable } from './companies';

export const jobTypeEnum = pgEnum('job_type', ['full-time', 'part-time', 'contract', 'internship']);
export const experienceLevelEnum = pgEnum('experience_level', ['intern', 'junior', 'mid', 'senior', 'lead']);
export const jobStatusEnum = pgEnum('job_status', ['active', 'closed']);

export const jobsTable = pgTable('jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  companyId: uuid('company_id').notNull().references(() => companiesTable.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  requirements: text('requirements'),
  skills: varchar('skills', { length: 100 }).array(),
  type: jobTypeEnum('type').notNull(),
  experienceLevel: experienceLevelEnum('experience_level').notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  salaryMin: integer('salary_min'),
  salaryMax: integer('salary_max'),
  status: jobStatusEnum('status').notNull().default('active'),
  isFeatured: boolean('is_featured').notNull().default(false),
  deadline: timestamp('deadline'),
  postedAt: timestamp('posted_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
