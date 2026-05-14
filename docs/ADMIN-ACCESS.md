# Admin Access & Operations

This document tracks who has access to backend systems for the Entrepreneur
Valley website, what their privileges are, and the playbooks for common
operational tasks.

**Update this file whenever access changes.** The git history is the audit log.

---

## Access matrix

Only the people listed here have backend credentials. No exceptions.

| System | Owner | President | 2FA enforced? | Notes |
|--------|-------|-----------|---------------|-------|
| GitHub repo (`Safkatul-Islam/entrepreneur-valley-web`) | Safkat (admin) | Member | YES (required for all) | |
| Vercel project | Safkat (owner) | Member | YES | Production env vars only |
| Supabase project | Safkat (owner) | Owner | YES | |
| Cloudflare account (DNS + Registrar) | Safkat (super admin) | Member | YES | Domain registered here |
| Resend account | Safkat (owner) | Member | YES | Sender domain verified |
| Sentry (error tracking) | Safkat (owner) | Member | YES | Phase 5 |

**Anyone not in the list above must not have direct backend access.** If a
new board member needs visibility, give them a Supabase read-only view scoped
to a non-PII column subset, never the dashboard.

---

## Credentials storage

- **Password manager:** All admin credentials and API keys live in a shared
  vault (1Password / Bitwarden) accessible to Safkat and the President only.
- **Never** in Discord DMs, email bodies, GitHub issues, Notion, or
  screenshots.
- Each shared item must have a clear note describing its purpose and
  rotation date.

---

## Sensitive environment variables

These exist only in the Vercel project (Production scope) and the password
manager. They are never committed and never logged.

| Var | Where used | Rotation cadence |
|-----|------------|------------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side only (`lib/supabase.ts`) | Rotate immediately on suspected leak; otherwise yearly |
| `TURNSTILE_SECRET_KEY` | Server-side only (`lib/turnstile.ts`) | Rotate yearly or on leak |
| `RESEND_API_KEY` | Server-side only (`lib/email.ts`) | Rotate yearly or on leak |
| `SENTRY_DSN` | Server + client; semi-public by design | No rotation needed |

`NEXT_PUBLIC_*` vars are bundled into the client and considered public; treat
them as such.

---

## Key-rotation playbook

### Supabase service-role key

1. Supabase dashboard → Settings → API → "service_role" → **Reveal & Copy** the new key (Supabase rotates by regenerating).
2. In Vercel → Project → Settings → Environment Variables → update
   `SUPABASE_SERVICE_ROLE_KEY` (Production scope).
3. **Trigger a redeploy** (Deployments → latest → Redeploy) so the new key is picked up.
4. Update the password manager entry.
5. Revoke the old key in Supabase if not auto-revoked.
6. Smoke test: submit a test registration on the live site; confirm row in DB.

### Turnstile / Resend keys

1. Generate new key in the respective dashboard.
2. Update Vercel env var, redeploy.
3. Update password manager entry.
4. Revoke old key.
5. Smoke test (Turnstile: trigger a registration challenge; Resend: confirm email lands).

---

## Suspected breach response

1. **Stop the bleeding.** Rotate all secrets per playbooks above.
2. **Assess scope.** In Supabase SQL editor:
   ```sql
   select count(*) from registrations where created_at > '<incident-window-start>';
   select * from registrations where created_at > '<incident-window-start>'
     order by created_at desc limit 100;
   ```
   Look for spikes, garbage entries, suspicious IPs.
3. **Tighten temporarily.** If actively under attack, drop registration rate
   limit to 1/hour by editing `RATE_LIMIT` in `app/api/register/route.ts` and
   redeploying. Optionally make Turnstile interactive (`size: "normal"` non-flexible).
4. **Notify if PII was accessed.** Email everyone in `registrations` whose
   data may have been exposed. Be honest about scope.
5. **Postmortem.** Write up what happened in `docs/INCIDENTS/<date>.md` and
   commit it.

---

## Routine operations

### Export registrations (e.g. before an event)

In Supabase SQL editor:
```sql
copy (
  select full_name, email, phone, school, major, video_url, created_at
  from registrations
  where event_slug = 'sharks-valley'
  order by created_at
) to stdout with csv header;
```
Or use the Supabase dashboard → Table Editor → registrations → Export → CSV.

### Mark a registration deleted (user request)

```sql
delete from registrations where id = '<uuid>';
```
Or from the dashboard. Confirm via `select count(*) from registrations`.

### Verify PII purge is running

Once a week:
```sql
select count(*) from registrations
where created_at < now() - interval '30 days'
  and (ip is not null or user_agent is not null);
```
Should return 0 if the scheduled `purge_old_pii()` job is healthy. If non-zero,
check Database → Cron in the Supabase dashboard.

---

## Future hardening (not blocking launch)

- **Limited-permission Postgres role for the API route.** Today the API uses
  the full `service_role` key. A custom `app_inserter` role with INSERT-only
  grants on `registrations` and `rate_limits`, surfaced via a signed JWT,
  would limit blast radius if the key ever leaked. Implementation requires
  custom JWT signing through PostgREST — non-trivial; defer until justified.
- **Audit log table.** Append-only log of every admin action against the
  database (deletions, exports). Useful if the board grows.
- **Staging Supabase project.** Separate DB for Vercel preview deploys so
  PR previews don't write to prod.
