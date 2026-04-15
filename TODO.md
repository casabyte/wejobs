# WeJobs API — TODO

## ✅ Done

- [x] Monorepo setup with pnpm workspaces
- [x] NestJS app scaffolded at `@wejobs/api`
- [x] Environment config with `@nestjs/config` + `joi` validation
- [x] Prisma v7 setup with PostgreSQL
- [x] `PrismaModule` globally available via `@Global()`
- [x] `UsersModule` — CRUD + `UserResponseDto` (password excluded)
- [x] `AuthModule` — register, login, JWT strategy, `JwtAuthGuard`, `@CurrentUser()` decorator
- [x] `CompaniesModule` — CRUD, ownership enforcement, public `GET /companies`
- [x] Swagger setup at `/api/docs`

---

## 🔜 Up Next

### 1. 💼 Jobs Module
- [ ] `Job` model already in schema — run `make prisma-migrate`
- [ ] `CreateJobDto` — title, description, location, salary, jobType
- [ ] `UpdateJobDto` — via `PartialType`
- [ ] `JobResponseDto` — includes company info
- [ ] `JobsService` — create, findAll, findOne, update, remove
- [ ] `JobsController` — REST endpoints:
  - `POST /jobs` — EMPLOYER only, links job to their company
  - `GET /jobs` — public, with filtering + pagination
  - `GET /jobs/:id` — public
  - `PATCH /jobs/:id` — owner or ADMIN only
  - `DELETE /jobs/:id` — owner or ADMIN only
- [ ] `GET /companies/:id/jobs` — list jobs for a specific company

---

### 2. 📋 Applications Module
- [ ] Uncomment & finalize `Application` model in `schema.prisma`
- [ ] Add `ApplicationStatus` enum: `PENDING`, `REVIEWED`, `ACCEPTED`, `REJECTED`
- [ ] `CreateApplicationDto`
- [ ] `UpdateApplicationStatusDto` — for employer to update status
- [ ] `ApplicationsService` — create, findByJob, findByUser, updateStatus
- [ ] `ApplicationsController` — REST endpoints:
  - `POST /jobs/:id/apply` — CANDIDATE only, one application per job
  - `GET /applications/me` — candidate sees their own applications
  - `GET /jobs/:id/applications` — employer sees applicants for their job
  - `PATCH /applications/:id/status` — employer updates application status

---

### 3. 🛡 Roles & Authorization
- [ ] Create `@Roles(...roles)` decorator
- [ ] Create `RolesGuard` — checks `req.user.role` against required roles
- [ ] Register `RolesGuard` globally or per-module
- [ ] Apply role restrictions:
  - `EMPLOYER` only — create jobs, view applications for their jobs, update application status
  - `CANDIDATE` only — apply to jobs, view own applications
  - `ADMIN` only — delete anything, access all resources

---

### 4. 🔍 Search & Filtering (Jobs)
- [ ] Query params DTO: `search`, `location`, `minSalary`, `maxSalary`, `jobType`
- [ ] Prisma `where` clause with dynamic filters
- [ ] Full-text search on `title` and `description`
- [ ] Sorting by `createdAt`, `salary`

---

### 5. 📄 Pagination
- [ ] Generic `PaginationDto` — `page`, `limit`
- [ ] Generic `PaginatedResponseDto<T>` — `data`, `meta` (total, page, lastPage)
- [ ] Apply to `GET /jobs` and `GET /companies`

---

### 6. 📁 File Uploads
- [ ] Install `@nestjs/platform-express` + `multer`
- [ ] `PATCH /users/me/avatar` — upload profile picture
- [ ] `PATCH /users/me/cv` — CANDIDATE uploads PDF resume
- [ ] Store files in S3 (via `@aws-sdk/client-s3`) or Cloudinary
- [ ] Validate file type (images only for avatar, PDF only for CV) and max size

---

### 7. 📧 Email Notifications
- [ ] Install `@nestjs-modules/mailer` + `nodemailer`
- [ ] Configure SMTP (SendGrid or Resend recommended)
- [ ] Create `MailModule` + `MailService`
- [ ] Trigger emails on:
  - Welcome email on register
  - Application received (to employer)
  - Application status updated (to candidate)

---

### 8. 🚦 Security & Rate Limiting
- [ ] Install `@nestjs/throttler` — rate limit auth endpoints (`/auth/login`, `/auth/register`)
- [ ] Install `helmet` — secure HTTP headers
- [ ] Configure CORS in `main.ts`
- [ ] Add request logging middleware

---

### 9. 🧪 Testing
- [ ] Unit tests for `AuthService` — register, login, error cases
- [ ] Unit tests for `UsersService` — CRUD
- [ ] Unit tests for `CompaniesService` — ownership checks
- [ ] E2E tests for full auth flow
- [ ] E2E tests for jobs + applications flow
- [ ] Set up a separate test database

---

### 10. 🐳 Docker & Deployment
- [ ] `Dockerfile` for `@wejobs/api`
- [ ] `docker-compose.yml` — API + PostgreSQL
- [ ] `.env.production` config
- [ ] CI/CD pipeline (GitHub Actions) — lint, test, build, deploy
- [ ] Run `make prisma-migrate-deploy` on startup in production

---

## 📌 Reminders

- Always run `make prisma-generate` after any schema change
- Never expose `password` in API responses — use `UserResponseDto`
- Keep all shared types in `packages/types` for frontend reuse
- `GET` list endpoints should always support pagination before going to production