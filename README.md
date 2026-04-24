# Wedding Venue Directory

A curated directory of European wedding venues — villas, castles, châteaux, and estates across Italy, France, Spain, Portugal, and the UK. Couples can browse, shortlist, and send inquiries directly to venues.

## Features

- **Browse & filter** — filter by country, region, venue type, capacity, price band, season, and amenities
- **Venue detail pages** — full descriptions, photo gallery, key details, and approved reviews
- **Shortlist** — authenticated users can save venues and send bulk inquiries
- **Inquiry forms** — rate-limited, validated inquiries sent to venue contact email with a confirmation copy to the couple
- **Reviews** — couples can submit reviews which go through moderation before publishing
- **Admin panel** — manage venues, review moderation queue, and view inquiry history
- **Auth** — email/password sign-up and sign-in via Supabase Auth

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Database & Auth | Supabase (Postgres + Row Level Security) |
| UI primitives | BaseUI (`@base-ui/react`) |
| Styling | Tailwind CSS v4 |
| Email | Resend + React Email |
| Validation | Zod v4 |
| Forms | React Hook Form |
| Unit tests | Vitest |
| E2E tests | Playwright |

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.local.example` to `.env.local` (or create it) and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=hello@yourdomain.com
ADMIN_API_TOKEN=a-random-secret-for-the-reply-api
```

### 3. Run database migrations

Apply the SQL migrations in order:

```bash
supabase db push
# or apply manually via the Supabase dashboard
```

Migration files are in `supabase/migrations/`.

### 4. Seed the database

```bash
# Via Supabase CLI
supabase db seed

# Or run seed.sql directly in the Supabase SQL editor
```

The seed inserts 50 venues across IT, FR, ES, PT, and UK.

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run type-check` | TypeScript type check |
| `npm run lint` | ESLint |
| `npm run test` | Unit tests (Vitest) |
| `npm run test:watch` | Unit tests in watch mode |
| `npm run test:e2e` | End-to-end tests (Playwright) |
| `npm run test:e2e:ui` | Playwright UI mode |

## Project structure

```
app/                  # Next.js App Router pages
  venues/[slug]/      # Venue detail page
  admin/              # Admin panel (protected)
  api/                # API routes
components/           # Shared React components
  ui/                 # BaseUI-based primitive components
emails/               # React Email templates
lib/                  # Utilities (filters, format, schemas, etc.)
  supabase/           # Supabase client factories
server-actions/       # Next.js Server Actions
supabase/
  migrations/         # SQL migration files
  seed.sql            # Seed data (50 venues)
tests/
  unit/               # Vitest unit tests
  e2e/                # Playwright e2e tests
types/
  database.ts         # Supabase generated types
  venue.ts            # App-level venue types and constants
```

## Architecture notes

See [DECISIONS.md](./DECISIONS.md) for the reasoning behind key architectural choices.
