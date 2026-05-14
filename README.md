# Entrepreneur Valley — Website

The public brand site for the Entrepreneur Valley student club. Built with Next.js, Tailwind, Framer Motion, GSAP ScrollTrigger, Lenis, and Supabase (for Sharks' Valley registration).

## Local development

```bash
cp .env.local.example .env.local   # then fill in Supabase keys
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | client + server | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Service role for inserting registrations |
| `NEXT_PUBLIC_SITE_URL` | client | Canonical URL for OG/sitemap |
| `NEXT_PUBLIC_REGISTER_URL` | client | Optional override for registration CTA links |
| `NEXT_PUBLIC_DISCORD_INVITE` | client | Discord invite link shown in CTAs |
| `NEXT_PUBLIC_LUMA_EVENT_URL` | client | Attendee registration link |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | client | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | **server only** | Cloudflare Turnstile verification secret |
| `RESEND_API_KEY` | **server only** | Resend API key for transactional emails |
| `RESEND_FROM_EMAIL` | server | Verified sender used by Resend |
| `ADMIN_NOTIFICATION_EMAILS` | server | Comma-separated admin recipients |

## Supabase setup

1. Create a new Supabase project (free tier is fine).
2. Open SQL editor, paste and run `supabase/schema.sql`.
3. Copy `Project URL` and `service_role` key into `.env.local` and the Vercel project env vars.

The service-role key is a secret — never expose it to the client. The `lib/supabase.ts` module throws if it's imported from a client bundle.

## Content

Edit the files in `content/` to update:

- `board.ts` — 12 board members (photo, name, role, bio, LinkedIn)
- `faq.ts` — FAQ accordion questions
- `testimonials.ts` — member quotes for the marquee
- `sharks-valley.ts` — event stats, gallery, copy

Drop board headshots into `public/board/*.jpg` and event photos into `public/sharks-valley/*.jpg` matching the paths referenced in content files.

## Deploy

```bash
# First-time
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add NEXT_PUBLIC_REGISTER_URL
vercel env add NEXT_PUBLIC_DISCORD_INVITE
vercel env add NEXT_PUBLIC_LUMA_EVENT_URL
vercel env add NEXT_PUBLIC_TURNSTILE_SITE_KEY
vercel env add TURNSTILE_SECRET_KEY
vercel env add RESEND_API_KEY
vercel env add RESEND_FROM_EMAIL
vercel env add ADMIN_NOTIFICATION_EMAILS

# Every push to main
vercel --prod
```

Attach a custom domain from the Vercel project settings once the club buys one.

## Scripts

- `npm run dev` — dev server with Turbopack
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run typecheck` — TS type check
