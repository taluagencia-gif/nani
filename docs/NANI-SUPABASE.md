# NANI: Supabase

Project: `xudtctbdnupdlzpdamtm` (São Paulo).

The catalog reads products and WhatsApp settings from Supabase. Row-level security allows public reads of visible products. Only members of `public.nani_admins` may edit catalog data and upload to the `nani-products` bucket. Administrators can see hidden products. User-editable metadata does not grant access.

`/admin` validates the user with Supabase Auth and checks membership on the server. Every write endpoint repeats that check and validates the request origin. `/login` uses email/password, HttpOnly session cookies, and `proxy.ts` refreshes sessions. The panel supports sign-out and password changes. No service-role key is used by the application.

## First administrator (pending)

In Supabase Authentication → Users, create `talu.agencia@gmail.com` with a strong password. Once the account is confirmed, the project owner can authorize it with:

```sql
insert into public.nani_admins (user_id)
select id from auth.users
where email = 'talu.agencia@gmail.com'
  and email_confirmed_at is not null
on conflict do nothing
returning user_id;
```

Confirm one matching member exists. Test login, updating a product, uploading a photo, password change, and sign-out. Account creation was not completed in this implementation; authenticated end-to-end checks remain pending.

## Configuration and hosting

Copy `.env.example` into `.env` for local development. Use the same public project URL and publishable key on the target host. Never expose a secret/service-role key.

The website remains hosted with Sites. Supabase stores the four product records, WhatsApp number, and new photo uploads. Existing `/images` assets remain packaged with the website; the existing `/media` photo still uses its original storage binding. Moving the website to Vercel also requires replacing that remaining Cloudflare media route and adapting the build. Do not assume the current Vinext deployment can be imported unchanged into Vercel.

Remote database migrations: `nani_catalog_auth`, `separate_public_catalog_policy`. Initial records were copied without deleting the original database. Three are visible and the test product remains hidden.

Validation: TypeScript and production build passed; Supabase public REST reads returned three visible products, anonymous insertion was denied, and the security advisor returned no alerts. Local preview was unreachable, so browser interaction checks were not completed.
