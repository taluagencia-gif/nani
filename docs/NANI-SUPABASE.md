# NANI: Supabase

Project: `xudtctbdnupdlzpdamtm` (São Paulo).

The catalog reads products and WhatsApp settings from Supabase. Row-level security allows public reads of visible products. Only members of `public.nani_admins` may edit catalog data and upload to the `nani-products` bucket. Administrators can see hidden products. User-editable metadata does not grant access.

`/admin` validates the user with Supabase Auth and checks membership on the server. Every write endpoint repeats that check and validates the request origin. `/login` uses email/password, HttpOnly session cookies, and `proxy.ts` refreshes sessions. The panel supports sign-out and password changes. No service-role key is used by the application.

## Administrator

The account `talu.agencia@gmail.com` was created and authorized on September 30, 2026. Passwords and session tokens are never stored in this repository. Sign in at `/login` and open `/admin`. The panel's **Contraseña** button changes the password.

For a future administrator, create the account in Supabase Authentication → Users. Once confirmed, the project owner can authorize it with:

```sql
insert into public.nani_admins (user_id)
select id from auth.users
where email = 'talu.agencia@gmail.com'
  and email_confirmed_at is not null
on conflict do nothing
returning user_id;
```

Confirm one matching member exists. Authentication and administrator membership were verified against Supabase, and an authenticated photo upload succeeded. Changes to the account happen in Supabase, not in GitHub.

## Configuration and hosting

Copy `.env.example` into `.env` for local development. Use the same public project URL and publishable key on the target host. Never expose a secret/service-role key.

This GitHub checkout targets Next.js on Vercel: `pnpm run build` runs `next build` and `pnpm start` runs `next start`. `vercel.json` declares the Next.js preset and `.next` output. The old Sites/Vinext scaffolding is retained for reference but is not the application build entrypoint.

Supabase stores the four product records, WhatsApp number, and uploaded photos. Existing `/images` assets remain packaged with the website. The existing legacy photo was copied to `nani-products` under the same filename; `/media/[key]` now redirects to Supabase Storage without importing Cloudflare runtime modules. The original object was preserved.

In Vercel, use the repository root, Node.js 24, and the settings in `vercel.json`. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from `.env.example` in Production and Preview. The code also contains these public values as defaults. No service-role key is needed by the website. A push to the linked production branch triggers deployment; if automatic deployment is unavailable, create a deployment from the latest `main` commit.

Remote database migrations: `nani_catalog_auth`, `separate_public_catalog_policy`. Initial records were copied without deleting the original database. Three are visible and the test product remains hidden.

Validation for the Vercel migration: the original `next build` failed on `cloudflare:workers` in `/media/[key]`; after the migration, Next.js production compilation and TypeScript checking pass. Supabase login, administrator membership, and authenticated Storage upload were verified. The built Next.js server passed HTTP integration checks for login, admin rendering, public/hidden product access, saving an unchanged product, cross-origin rejection, WhatsApp checkout generation, and logout. Browser verification could not run because the browser download failed in the execution environment. A live Vercel deployment still requires verification; the connected Vercel account did not have access to the target team during this migration.
