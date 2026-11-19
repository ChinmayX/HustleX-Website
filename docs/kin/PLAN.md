# Kin site: plan

Source of truth for *what*: [`kin-website-build-spec.md`](../../kin-website-build-spec.md). This doc covers *where things live*.

## Scope of this phase

**Frontend only.** Every page, section, media slot, form and motion pattern from the spec is built with placeholder data and media. The backend (database, Razorpay, email, admin, Meta Conversions API, reminders) is deferred; every place it plugs in is stubbed with the final shape (see `src/kin/lib/api.ts` and `src/kin/lib/stock.ts`).

## Repo facts

- Next.js 15 App Router, React 19, TypeScript, Tailwind v4 (CSS-first `@theme`), `motion`, MDX for the old HustleX legal pages. Deployed on Vercel. pnpm.
- No database, auth or API routes existed before Kin.

## Layout

```
src/
  middleware.ts               / → /kin (307) while HUSTLEX_ROOT_REDIRECTS_TO_KIN is not "false"
  shared/                     reusable by the future HustleX company site
    site.ts                   siteUrl, root-redirect flag
    company.ts                legal entity, address, CIN/GSTIN
    fonts.ts                  Inter Tight / Inter / JetBrains Mono (self-hosted via next/font)
  app/
    layout.tsx                bare shared shell (html/body, metadataBase)
    (hustlex)/…               the original HustleX site, parked, untouched (route group, same URLs)
    kin/…                     every Kin route (see below)
    sitemap.ts, robots.ts     Kin-only sitemap while the redirect is on
  kin/
    config.ts                 ALL business values (prices, batch, links, toggles, basePath)
    media.ts                  media slot manifest (every image/video/animation)
    content/                  ALL copy: home, faq, specs, legal, pages, buildLog
    styles/kin.css            Kin design tokens (accent colour lives here, one token)
    lib/                      format, stock (counter), api stubs, validation, attribution, analytics, motion prefs
    components/               MediaSlot + renderers, Nav, StickyBar, Footer, Counter, Waitlist, forms, sections/, preorder/
```

Kin tokens are mapped to Tailwind utilities in `src/ui/globals.css` (`@theme inline`: `bg-kin-bg`, `text-kin-accent`, `font-display`, …).

## Routes

| Route | Status |
|---|---|
| `/` | 307 → `/kin` (flag) |
| `/kin` | built: all 16 sections in spec order |
| `/kin/pre-order` | built: summary + validated form; submit is stubbed ("reservations open soon") |
| `/kin/pre-order/success?r=` | built: all states; preview tokens `demo`, `demo-regular`, `demo-confirming` |
| `/kin/pre-order/status` | built: UI only, stubbed |
| `/kin/about`, `/kin/contact` | built (contact form opens mailto) |
| `/kin/legal/{terms,privacy,refunds,shipping}` | built: config-driven drafts, marked DRAFT |
| `/kin/admin`, `/api/kin/*` | **deferred (backend phase)** |

## Backend phase (next)

1. Postgres (Neon) + Drizzle schema for the four tables in spec §8.
2. Replace the stubs in `src/kin/lib/api.ts` and `fetchStock` in `src/kin/lib/stock.ts` with real endpoints.
3. Razorpay orders + checkout (`PreorderForm.tsx` has the TODO at the exact spot), webhook, atomic founder numbering.
4. Emails, admin, Meta CAPI, abandoned reminders.
