import { pgTable, uuid, timestamp, unique } from 'drizzle-orm/pg-core';
import { usersTable } from './users';
import { jobsTable } from './jobs';

export const savedJobs = pgTable('saved_jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  jobId: uuid('job_id').notNull().references(() => jobsTable.id, { onDelete: 'cascade' }),
  savedAt: timestamp('saved_at').notNull().defaultNow(),
}, (t) => [
  unique().on(t.userId, t.jobId),
]);
