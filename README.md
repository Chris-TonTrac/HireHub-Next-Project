# HireHub

HireHub is a full-stack job board and applicant tracking app built with Next.js App Router, Drizzle ORM, and PostgreSQL.

It supports two roles:

- User: browse jobs, apply, save jobs, view dashboard stats.
- Admin: manage job listings, review applicants, update application status, manage users.

## Core Features

- Public job browsing and job detail pages.
- User authentication with JWT.
- Role-based routing behavior:
	- Admin login redirects to admin dashboard.
	- User login redirects to home.
- User dashboard:
	- Applications overview
	- Saved jobs
	- Stats
- Admin dashboard:
	- Overview metrics
	- Job management
	- Applicant status updates
	- User management
- Saved jobs and application tracking.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS + DaisyUI + shadcn/ui
- Drizzle ORM
- PostgreSQL
- JWT (jsonwebtoken)

## Project Structure

- app: pages, UI components, API routes, client actions.
- app/actions: frontend action layer for API calls.
- app/api: backend route handlers.
- app/middleware/auth.middleware.ts: bearer token verification and role extraction.
- lib/db: Drizzle schema definitions.
- scripts/seed.mjs: API-based seeding script.
- SCHEMA.md: table and relationship reference.
- ENDPOINTS.md: endpoint catalog.
- PROJECT_LOGIC.md: architecture and implementation details.

## Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL

## Environment Variables

Create a .env file in project root:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5436/hire_hub_api
JWT_SECRET=replace-with-strong-secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Notes:

- DATABASE_URL and JWT_SECRET are required.
- NEXT_PUBLIC_BASE_URL is used by server-side action fetch helpers.

## Local Development

1. Install dependencies

```bash
pnpm install
```

2. Start Postgres (Docker)

```bash
docker compose up -d
```

3. Push schema with Drizzle

```bash
pnpm db:push
```

4. Run the app

```bash
pnpm dev
```

5. Open browser

- http://localhost:3000

## Seed Demo Data

With the app running, seed users, companies, and jobs:

```bash
node scripts/seed.mjs
```

The seed script hits API endpoints, so dev server must be running on localhost:3000.

Default seeded admin account:

- Email: admin@hirehub.dev
- Password: Admin123!

## Available Scripts

- pnpm dev: run development server
- pnpm build: build for production
- pnpm start: start production server
- pnpm lint: run ESLint
- pnpm db:push: push Drizzle schema to DB
- pnpm db:studio: open Drizzle Studio

## Authentication and Token Flow

- Login endpoint returns a signed JWT with id, role, and email.
- Frontend stores token in localStorage under hirehub_token.
- Protected requests send Authorization: Bearer <token>.
- Backend verifies token with JWT_SECRET in auth middleware.
- UI reads decoded token for role-based navigation and display only.

Security boundary:

- Backend authorization checks are the source of truth.
- Frontend token decoding is only for UX decisions.

## Implemented API Routes (Current)

Auth:

- POST /api/auth/login

Users:

- GET /api/users
- POST /api/users

Jobs:

- GET /api/jobs
- POST /api/jobs
- GET /api/jobs/[id]
- PATCH /api/jobs/[id]
- DELETE /api/jobs/[id]
- POST /api/jobs/[id]/apply
- POST /api/jobs/[id]/save

Companies:

- GET /api/companies
- POST /api/companies
- GET /api/companies/[id]

Applications:

- GET /api/applications
- GET /api/admin/applications
- PATCH /api/admin/applications

Saved Jobs:

- GET /api/saved-jobs

Dashboard/Admin:

- GET /api/dashboard/stats
- GET /api/admin/stats
- GET /api/admin/users
- DELETE /api/admin/users/[id]

## Notes

- The generic template sections from create-next-app were replaced with project-specific documentation.
