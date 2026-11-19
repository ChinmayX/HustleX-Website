# HustleX-Website

> https://hustlex.club
>
> https://hustlex-website.vercel.app

## Kin (`/kin`)

The Kin product and pre-order site. While `HUSTLEX_ROOT_REDIRECTS_TO_KIN` isn't `"false"`, `/` temporarily redirects to `/kin`. The original HustleX pages are parked, unchanged, in `src/app/(hustlex)/`.

- **Prices, batch size, links, toggles:** `src/kin/config.ts`
- **All copy:** `src/kin/content/`
- **Media slots:** `src/kin/media.ts` (how to add assets: [`docs/kin/MEDIA.md`](docs/kin/MEDIA.md))
- **Accent colour and tokens:** `src/kin/styles/kin.css`
- **Plan, decisions, launch checklist:** [`docs/kin/`](docs/kin/)
- **Env vars:** [`.env.example`](.env.example)

Status: frontend complete with placeholder media and data. Backend (DB, Razorpay, email, admin) is next; stubs live in `src/kin/lib/api.ts` and `src/kin/lib/stock.ts`.

```sh
pnpm dev   # http://localhost:3000/kin
```
