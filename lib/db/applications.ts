import { pgTable, uuid, timestamp, pgEnum, unique } from 'drizzle-orm/pg-core';
import { usersTable } from './users';
import { jobsTable } from './jobs';

export const applicationStatusEnum = pgEnum('application_status', ['applied', 'reviewing', 'interview', 'offer', 'rejected']);

export const applicationsTable = pgTable('applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  jobId: uuid('job_id').notNull().references(() => jobsTable.id, { onDelete: 'cascade' }),
  status: applicationStatusEnum('status').notNull().default('applied'),
  appliedAt: timestamp('applied_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (t) => [
  unique().on(t.userId, t.jobId),
]);
