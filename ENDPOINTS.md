# HireHub — API Endpoints

All routes are Next.js App Router route handlers under `app/api/`.

---

## Auth

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Create new account (name, email, password) | Public |
| POST | `/api/auth/login` | Sign in with email + password | Public |
| POST | `/api/auth/logout` | Destroy session | Auth |
| POST | `/api/auth/forgot-password` | Send reset email | Public |
| POST | `/api/auth/reset-password` | Reset password with token | Public |

---

## Jobs

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/jobs` | List jobs — supports `?search=`, `?type=`, `?level=`, `?page=` | Public |
| GET | `/api/jobs/featured` | Get featured jobs for home page | Public |
| GET | `/api/jobs/[id]` | Get single job detail + company info | Public |
| POST | `/api/jobs` | Create a new job listing | Admin |
| PATCH | `/api/jobs/[id]` | Update job fields | Admin |
| DELETE | `/api/jobs/[id]` | Delete a job listing | Admin |

---

## Companies

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/companies` | List all companies | Public |
| GET | `/api/companies/[id]` | Get single company + its active jobs | Public |
| POST | `/api/companies` | Create a new company | Admin |
| PATCH | `/api/companies/[id]` | Update company details | Admin |
| DELETE | `/api/companies/[id]` | Delete a company | Admin |

---

## Applications

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/jobs/[id]/apply` | Apply to a job | Auth (user) |
| GET | `/api/applications` | Get current user's applications | Auth (user) |
| DELETE | `/api/applications/[id]` | Withdraw an application | Auth (user) |
| GET | `/api/admin/applications` | Get all applications across all jobs | Admin |
| PATCH | `/api/admin/applications/[id]` | Update application status (reviewing, interview, offer, rejected) | Admin |

---

## Saved Jobs

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/jobs/[id]/save` | Save a job (toggle — saves if not saved, unsaves if already saved) | Auth (user) |
| GET | `/api/saved-jobs` | Get current user's saved jobs | Auth (user) |
| DELETE | `/api/saved-jobs/[id]` | Remove a saved job | Auth (user) |

---

## Dashboard

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/dashboard/stats` | Get user stats: total applied, in interview, offers, saved count | Auth (user) |

---

## Admin

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/admin/stats` | Get admin overview stats: active jobs, total applicants, in interview, offers extended | Admin |
| GET | `/api/admin/users` | List all registered users | Admin |
| DELETE | `/api/admin/users/[id]` | Delete a user account | Admin |

---

## Access Levels

| Level | Description |
|-------|-------------|
| **Public** | No login required |
| **Auth** | Must be logged in (any role) |
| **Admin** | Must be logged in with `role = 'admin'` |
