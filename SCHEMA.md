# HireHub — Database Schema

---

## `usersTable` — `lib/db/users.ts`

**Enum:** `roleEnum` → `'user' | 'admin'`

| Column | DB Column | Type | Constraints |
|--------|-----------|------|-------------|
| `id` | `id` | uuid | PRIMARY KEY, defaultRandom() |
| `name` | `name` | varchar(255) | NOT NULL |
| `email` | `email` | varchar(255) | NOT NULL, UNIQUE |
| `passwordHash` | `password_hash` | varchar(255) | nullable |
| `role` | `role` | roleEnum | NOT NULL, default `'user'` |
| `avatarUrl` | `avatar_url` | varchar(500) | nullable |
| `createdAt` | `created_at` | timestamp | NOT NULL, defaultNow() |
| `updatedAt` | `updated_at` | timestamp | NOT NULL, defaultNow() |

---

## `sessions` — `lib/db/sessions.ts`

| Column | DB Column | Type | Constraints |
|--------|-----------|------|-------------|
| `id` | `id` | uuid | PRIMARY KEY, defaultRandom() |
| `userId` | `user_id` | uuid | NOT NULL, FK → `users.id` (cascade delete) |
| `sessionToken` | `session_token` | varchar(512) | NOT NULL, UNIQUE |
| `expires` | `expires` | timestamp | NOT NULL |

---

## `verificationTokens` — `lib/db/verification-tokens.ts`

| Column | DB Column | Type | Constraints |
|--------|-----------|------|-------------|
| `identifier` | `identifier` | varchar(255) | NOT NULL |
| `token` | `token` | varchar(512) | NOT NULL, UNIQUE |
| `expires` | `expires` | timestamp | NOT NULL |

**Composite PK:** `(identifier, token)`

---

## `companiesTable` — `lib/db/companies.ts`

| Column | DB Column | Type | Constraints |
|--------|-----------|------|-------------|
| `id` | `id` | uuid | PRIMARY KEY, defaultRandom() |
| `name` | `name` | varchar(255) | NOT NULL, UNIQUE |
| `industry` | `industry` | varchar(255) | nullable |
| `description` | `description` | text | nullable |
| `logoUrl` | `logo_url` | varchar(500) | nullable |
| `location` | `location` | varchar(255) | nullable |
| `size` | `size` | varchar(100) | nullable |
| `websiteUrl` | `website_url` | varchar(500) | nullable |
| `createdAt` | `created_at` | timestamp | NOT NULL, defaultNow() |

---

## `jobsTable` — `lib/db/jobs.ts`

**Enums:**
- `jobTypeEnum` → `'full-time' | 'part-time' | 'contract' | 'internship'`
- `experienceLevelEnum` → `'intern' | 'junior' | 'mid' | 'senior' | 'lead'`
- `jobStatusEnum` → `'active' | 'closed'`

| Column | DB Column | Type | Constraints |
|--------|-----------|------|-------------|
| `id` | `id` | uuid | PRIMARY KEY, defaultRandom() |
| `companyId` | `company_id` | uuid | NOT NULL, FK → `companies.id` (cascade delete) |
| `title` | `title` | varchar(255) | NOT NULL |
| `description` | `description` | text | NOT NULL |
| `requirements` | `requirements` | text | nullable |
| `skills` | `skills` | varchar(100)[] | nullable array |
| `type` | `type` | jobTypeEnum | NOT NULL |
| `experienceLevel` | `experience_level` | experienceLevelEnum | NOT NULL |
| `location` | `location` | varchar(255) | NOT NULL |
| `salaryMin` | `salary_min` | integer | nullable |
| `salaryMax` | `salary_max` | integer | nullable |
| `status` | `status` | jobStatusEnum | NOT NULL, default `'active'` |
| `isFeatured` | `is_featured` | boolean | NOT NULL, default `false` |
| `deadline` | `deadline` | timestamp | nullable |
| `postedAt` | `posted_at` | timestamp | NOT NULL, defaultNow() |
| `updatedAt` | `updated_at` | timestamp | NOT NULL, defaultNow() |

---

## `applicationsTable` — `lib/db/applications.ts`

**Enum:** `applicationStatusEnum` → `'applied' | 'reviewing' | 'interview' | 'offer' | 'rejected'`

| Column | DB Column | Type | Constraints |
|--------|-----------|------|-------------|
| `id` | `id` | uuid | PRIMARY KEY, defaultRandom() |
| `userId` | `user_id` | uuid | NOT NULL, FK → `users.id` (cascade delete) |
| `jobId` | `job_id` | uuid | NOT NULL, FK → `jobs.id` (cascade delete) |
| `status` | `status` | applicationStatusEnum | NOT NULL, default `'applied'` |
| `appliedAt` | `applied_at` | timestamp | NOT NULL, defaultNow() |
| `updatedAt` | `updated_at` | timestamp | NOT NULL, defaultNow() |

**Unique constraint:** `(user_id, job_id)`

---

## `savedJobs` — `lib/db/saved-jobs.ts`

| Column | DB Column | Type | Constraints |
|--------|-----------|------|-------------|
| `id` | `id` | uuid | PRIMARY KEY, defaultRandom() |
| `userId` | `user_id` | uuid | NOT NULL, FK → `users.id` (cascade delete) |
| `jobId` | `job_id` | uuid | NOT NULL, FK → `jobs.id` (cascade delete) |
| `savedAt` | `saved_at` | timestamp | NOT NULL, defaultNow() |

**Unique constraint:** `(user_id, job_id)`

---

## Relationships

```
usersTable ──< applicationsTable >── jobsTable ──── companiesTable
usersTable ──< savedJobs >────────── jobsTable
usersTable ──< sessions
verificationTokens (standalone — keyed by identifier + token)
```
