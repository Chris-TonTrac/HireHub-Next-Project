# HireHub API Test Results

> Tested: 2026-03-10 | Environment: `http://localhost:3000` | DB: Docker PostgreSQL (empty)

---

## Summary

| Category | Count |
|---|---|
| Critical Bugs | 3 |
| Medium Bugs | 6 |
| Missing Endpoints | 19 |
| Passing Validation Tests | 10 |

---

## Critical Bugs

### BUG-1: `ssl: true` breaks ALL database connections
**File:** `lib/db.ts:9`

The Drizzle client is configured with `ssl: true`, but the local Docker PostgreSQL instance does not have SSL enabled. Every single endpoint that touches the database returns a 500 error.

```ts
// lib/db.ts — current (broken)
const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
    ssl: true   // ← causes all DB calls to fail locally
  }
});
```

**Impact:** ALL endpoints — `GET /api/jobs`, `GET /api/companies`, `GET /api/users`, `POST /api/users`, `POST /api/companies`, `POST /api/jobs` — return 500.

**Fix:** Change `ssl: true` to `ssl: false` for local development, or use an environment variable to toggle it.

---

### BUG-2: `params` not awaited — all dynamic `[id]` routes break
**File:** `app/api/jobs/[id]/job.route.ts:19,46,144`

In Next.js 15+, `params` is a **Promise** and must be awaited. The current code accesses `params.id` synchronously, which returns `undefined`. `UUID_REGEX.test(undefined)` coerces to `UUID_REGEX.test("undefined")` → always `false` → every request returns `{"error":"Invalid job id."}` regardless of the UUID passed.

```ts
// Current (broken) — params.id is undefined in Next.js 15+
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params;          // ← id is undefined
  if (!UUID_REGEX.test(id)) { ... }
```

**Tested:** `GET /api/jobs/550e8400-e29b-41d4-a716-446655440000` → `{"error":"Invalid job id."}` HTTP 400 ❌

**Impact:** `GET`, `PATCH`, `DELETE /api/jobs/[id]` are completely broken.

**Fix:** Add `Promise<...>` type and `await params`:
```ts
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
```

---

### BUG-3: Login DB query not wrapped in try/catch → unhandled 500
**File:** `app/api/auth/user.login.ts:23`

The `db.select()` query is outside any try/catch block. When the database throws (e.g. SSL error, connection refused), the error propagates unhandled and Next.js returns a generic 500 with no JSON body.

```ts
// Current (broken)
const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
// ↑ No try/catch — DB error = raw 500, not {"error":"..."}
```

**Tested:** `POST /api/auth/login` with `{"email":"nobody@test.com","password":"pass"}` → blank body, HTTP 500 ❌

**Fix:** Wrap the DB query in try/catch and return `{ error: "Internal server error." }` with status 500.

---

## Medium Bugs

### BUG-4: Companies `[id]` error response returns HTTP 200
**File:** `app/api/companies/[id]/company.route.ts:13`

The `catch` block returns `NextResponse.json({ error: "..." })` without a status code — defaults to HTTP 200. Errors should return 4xx or 5xx.

```ts
// Current (wrong status)
} catch(err) {
  return NextResponse.json({ error: "Failed to fetch the company." });
  //                                                                 ↑ missing { status: 500 }
}
```

**Tested:** `GET /api/companies/some-id` → `{"error":"Failed to fetch the company."}` **HTTP 200** ❌

---

### BUG-5: Companies `[id]` — `params` not awaited
**File:** `app/api/companies/[id]/company.route.ts:7`

Same Next.js 15+ async params issue as BUG-2. `params.id` is `undefined`, so the DB query runs with `WHERE id = undefined`, returning no company.

---

### BUG-6: Companies `[id]` — no 404 when company not found
**File:** `app/api/companies/[id]/company.route.ts`

When the company is not found, the destructured `company` is `undefined`. The response is `{ "company": null }` with HTTP 200 instead of a 404.

```ts
const [company] = await db.select()...   // undefined if not found
return NextResponse.json({ company });   // returns {"company":null} with 200
```

**Fix:** Check `if (!company)` and return `{ status: 404 }`.

---

### BUG-7: Companies `GET` error uses status 400 instead of 500
**File:** `app/api/companies/companies.routes.ts:8`

A database failure is a server error (5xx), not a client error (4xx).

```ts
} catch(err) {
  return NextResponse.json({ error: "Failed getting companies." }, { status: 400 });
  //                                                                         ↑ should be 500
}
```

---

### BUG-8: `POST /api/users` returns raw Drizzle metadata instead of useful data
**File:** `app/api/users/users.routes.ts:49`

`db.insert()` without `.returning()` returns a `QueryResult` object (row count, oid, etc.), not the created user. The response `return NextResponse.json(user, { status: 201 })` sends back the raw Drizzle/pg driver metadata.

**Fix:** Add `.returning({ userId: usersTable.id })` to the insert, or at minimum return `{ success: true }`.

---

### BUG-9: `GET /api/jobs/featured` hits `[id]` route and returns 400
**File:** `app/api/jobs/[id]/job.route.ts`

`ENDPOINTS.md` specifies `GET /api/jobs/featured` as a dedicated endpoint. No such route file exists. The path `/api/jobs/featured` is matched by the `[id]` dynamic segment with `id = "featured"`, and since "featured" is not a valid UUID, it returns:

**Tested:** `GET /api/jobs/featured` → `{"error":"Invalid job id."}` HTTP 400 ❌

The featured jobs are only accessible via `GET /api/jobs?featured=true`.

---

## Test Results by Endpoint

### Auth

| Endpoint | Method | Expected | Actual | Status |
|---|---|---|---|---|
| `/api/auth/login` | POST | 400 — invalid JSON | `{"error":"Invalid request body."}` HTTP 400 | ✅ |
| `/api/auth/login` | POST | 400 — non-string types | `{"error":"email and password must be strings."}` HTTP 400 | ✅ |
| `/api/auth/login` | POST | 401 — user not found | HTTP 500 blank body (DB error uncaught) | ❌ BUG-3 |
| `/api/auth/register` | POST | — | 404 HTML page | ❌ NOT IMPLEMENTED |
| `/api/auth/logout` | POST | — | 404 HTML page | ❌ NOT IMPLEMENTED |
| `/api/auth/forgot-password` | POST | — | 404 HTML page | ❌ NOT IMPLEMENTED |
| `/api/auth/reset-password` | POST | — | 404 HTML page | ❌ NOT IMPLEMENTED |

### Jobs

| Endpoint | Method | Expected | Actual | Status |
|---|---|---|---|---|
| `/api/jobs` | GET | 200 — empty array | `{"error":"Failed to fetch jobs."}` HTTP 500 | ❌ BUG-1 |
| `/api/jobs?featured=true` | GET | 200 — empty array | `{"error":"Failed to fetch jobs."}` HTTP 500 | ❌ BUG-1 |
| `/api/jobs/featured` | GET | 200 — featured jobs | `{"error":"Invalid job id."}` HTTP 400 | ❌ BUG-9 |
| `/api/jobs` | POST | 400 — missing fields | `{"error":"Missing required fields."}` HTTP 400 | ✅ |
| `/api/jobs` | POST | 400 — invalid type | `{"error":"Invalid type. Must be one of: ..."}` HTTP 400 | ✅ |
| `/api/jobs` | POST | 400 — invalid UUID | `{"error":"Invalid companyId format."}` HTTP 400 | ✅ |
| `/api/jobs` | POST | 400 — float salary | `{"error":"salaryMin must be an integer."}` HTTP 400 | ✅ |
| `/api/jobs` | POST | 201 — creates job | `{"error":"Failed to create job."}` HTTP 500 | ❌ BUG-1 |
| `/api/jobs/[id]` | GET | 400 — invalid UUID | `{"error":"Invalid job id."}` HTTP 400 | ✅ |
| `/api/jobs/[id]` | GET | 404 — job not found | `{"error":"Invalid job id."}` HTTP 400 | ❌ BUG-2 |
| `/api/jobs/[id]` | PATCH | 400 — no fields | `{"error":"Invalid job id."}` HTTP 400 | ❌ BUG-2 |
| `/api/jobs/[id]` | PATCH | 200 — updates job | `{"error":"Invalid job id."}` HTTP 400 | ❌ BUG-2 |
| `/api/jobs/[id]` | DELETE | 404 — not found | `{"error":"Invalid job id."}` HTTP 400 | ❌ BUG-2 |

### Companies

| Endpoint | Method | Expected | Actual | Status |
|---|---|---|---|---|
| `/api/companies` | GET | 200 — empty array | `{"error":"Failed getting companies."}` HTTP 500 | ❌ BUG-1 |
| `/api/companies` | POST | 400 — missing name | `{"error":"name must be a string."}` HTTP 400 | ✅ |
| `/api/companies` | POST | 201 — creates company | `{"error":"Failed creating company."}` HTTP 500 | ❌ BUG-1 |
| `/api/companies/[id]` | GET | 404 — not found | `{"error":"Failed to fetch the company."}` HTTP 200 | ❌ BUG-4/5/6 |
| `/api/companies/[id]` | PATCH | — | 404 HTML page | ❌ NOT IMPLEMENTED |
| `/api/companies/[id]` | DELETE | — | 404 HTML page | ❌ NOT IMPLEMENTED |

### Users

| Endpoint | Method | Expected | Actual | Status |
|---|---|---|---|---|
| `/api/users` | GET | 200 — empty array | `{"error":"Failed to fetch users."}` HTTP 500 | ❌ BUG-1 |
| `/api/users` | POST | 400 — missing fields | `{"error":"name, email and password must be strings."}` HTTP 400 | ✅ |
| `/api/users` | POST | 201 — creates user | `{"error":"Failed to create user."}` HTTP 500 | ❌ BUG-1 |
| `/api/users/[id]` | GET | — | Empty route file — no handler | ❌ NOT IMPLEMENTED |

### Not Implemented (per ENDPOINTS.md)

| Endpoint | Method | Notes |
|---|---|---|
| `/api/jobs/[id]/apply` | POST | No route file |
| `/api/applications` | GET | No route file |
| `/api/applications/[id]` | DELETE | No route file |
| `/api/admin/applications` | GET | No route file — returns 404 |
| `/api/admin/applications/[id]` | PATCH | No route file |
| `/api/jobs/[id]/save` | POST | No route file |
| `/api/saved-jobs` | GET | No route file — returns 404 |
| `/api/saved-jobs/[id]` | DELETE | No route file |
| `/api/dashboard/stats` | GET | No route file — returns 404 |
| `/api/admin/stats` | GET | No route file — returns 404 |
| `/api/admin/users` | GET | No route file — returns 404 |
| `/api/admin/users/[id]` | DELETE | No route file |

---

## Additional Observations

### No Auth/Session System
The login endpoint (`POST /api/auth/login`) doesn't create a session or return a token. There is a `sessions` table in the schema and a `verification-tokens` table, but neither is used anywhere. Without session management:
- All "Auth" protected endpoints can't verify identity
- All "Admin" protected endpoints can't verify role
- There is no middleware to protect routes

### UUID Regex Mismatch
`jobs.routes.ts` (POST) uses a looser UUID regex:
```
/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
```
While `job.route.ts` (GET/PATCH/DELETE) uses a strict RFC 4122 regex:
```
/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
```
This inconsistency means a job could be created with a `companyId` UUID that is technically version 0 (e.g. `00000000-0000-0000-0000-000000000000`), but `GET /api/jobs/[id]` would reject that same UUID format as the job's own ID if Postgres ever generated it.

---

## Fix Priority

| Priority | Bug | File | Fix |
|---|---|---|---|
| 🔴 P0 | BUG-1: SSL breaks all DB | `lib/db.ts:9` | `ssl: false` |
| 🔴 P0 | BUG-2: params not awaited | `app/api/jobs/[id]/job.route.ts` | `await params` |
| 🔴 P0 | BUG-3: login uncaught DB error | `app/api/auth/user.login.ts:23` | Wrap in try/catch |
| 🟡 P1 | BUG-4: company error returns 200 | `app/api/companies/[id]/company.route.ts:13` | Add `{ status: 500 }` |
| 🟡 P1 | BUG-5: company params not awaited | `app/api/companies/[id]/company.route.ts:7` | `await params` |
| 🟡 P1 | BUG-6: company no 404 | `app/api/companies/[id]/company.route.ts` | Check `!company` |
| 🟡 P1 | BUG-7: companies GET error 400 | `app/api/companies/companies.routes.ts:8` | `status: 500` |
| 🟡 P1 | BUG-8: POST users bad response | `app/api/users/users.routes.ts:49` | `.returning()` |
| 🟡 P1 | BUG-9: /jobs/featured 400 | Route missing | Add `app/api/jobs/featured/route.ts` |
