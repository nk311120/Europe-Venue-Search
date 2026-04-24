# Architecture Decisions

## Stack

**Next.js 16 (App Router)** — Server Components and Server Actions reduce client-side JS. The App Router's nested layout model maps cleanly onto the venue → inquiry hierarchy.

**Supabase** — Managed Postgres with built-in Auth, Row Level Security, and realtime. Avoids running a separate auth service. Service-role client is used only in Server Actions and API routes; browser client uses anon key with RLS enforced.

**BaseUI (`@base-ui/react`)** — Unstyled, accessible primitives from the MUI team. Chosen over Radix because it has native CSS animation via `data-*` attributes (no Framer Motion) and ships Dialog/Menu/Slider in one package. The `asChild` composition pattern is handled via BaseUI's `render` prop, wrapped in a thin compatibility shim in each component so callers can continue using the Radix-style `asChild` API.

**Tailwind CSS v4** — PostCSS-only config (no `tailwind.config.js`). CSS variables for theming, `tw-animate-css` for animations.

**Resend** — Transactional email. Sends venue inquiry copies to both the couple and the venue. Templates built with `@react-email/components` so they render consistently across email clients.

**Zod v4** — Schema-first validation, shared between server actions and API routes. The same schema validates form input client-side (via `@hookform/resolvers`) and data server-side.

---

## Data model choices

**Venues are slugged, not ID-routed** — `/venues/villa-serafina-tuscany` is shareable and readable. Slugs are set at insert time and not editable to avoid breaking links.

**Shortlist is a join table, not a user array** — `shortlists(user_id, venue_id)` with a PK on both columns. Simple upsert/delete semantics, no JSONB arrays to manage.

**Reviews are moderated** — `status` is `pending | approved | rejected`. Only `approved` reviews appear in public queries. RLS enforces this so the moderation state can never be bypassed by a clever API call.

**Inquiry status machine** — `pending → sent → replied → closed`. `pending` means created but email not yet confirmed; `sent` means email dispatched. The transition happens in the server action, not a separate cron.

---

## Auth

Sessions are managed by Supabase Auth with `@supabase/ssr` cookie helpers. The Next.js proxy checks session cookies and redirects unauthenticated users away from protected routes (`/account`, `/inquiries`, `/admin`). Admin role enforcement uses the `profiles.role` column, checked in both the proxy and each admin layout component as defence-in-depth.

The proxy only does an optimistic session check (fast, no DB round-trip for most requests). The admin layout does a real DB query to verify the role — this is the authoritative check.

---

## Testing

**Vitest** for unit tests of pure functions (`lib/format.ts`, `lib/filters.ts`, `lib/schemas.ts`). These functions have zero side effects and no framework dependencies, making them ideal unit test targets.

**Playwright** for e2e tests. Tests run against a real running server. The e2e suite checks the happy path for venue browsing and form submission, and verifies 404 handling for unknown slugs.

---

## API routes

Only one API route exists: `POST /api/inquiries/[id]/reply`. This is for venue owners to submit a reply from their own systems (e.g., a webhook from their CRM). It uses a shared `ADMIN_API_TOKEN` for auth — simple and sufficient for a single-tenant admin workflow.

All other mutations go through Next.js Server Actions.

---

## Rate limiting

An in-memory LRU-style map tracks inquiry submission counts per IP. This is intentionally simple — no Redis, no persistent state. It resets on server restart. Sufficient to stop casual abuse; a production deployment behind a load balancer would need a distributed store.
