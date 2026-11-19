# Kin: decisions log

Defaults picked where the spec was open. Change any of them freely.

| # | Decision | Why / where to change |
|---|---|---|
| 1 | **Frontend first; backend deferred** (founder's call). Forms validate fully but don't save or charge. | Stubs in `src/kin/lib/api.ts`. The pre-order submit shows "Reservations open soon. Nothing has been charged." |
| 2 | **The founder counter shows a sample number (37 paid → "63 of 100 left")**, tagged "(sample data)" while placeholder labels are on. | `SAMPLE_PAID` in `src/kin/lib/stock.ts`. **Must be swapped for `/api/kin/stock` before launch** (spec §0.8: never fake scarcity). |
| 3 | Accent **#C8FF2E** (electric volt-lime) on graphite #0B0B0C. Not rabbit's orange, to avoid looking like a copy. | One token: `--kin-accent` in `src/kin/styles/kin.css`. |
| 4 | Fonts: **Inter Tight** (display), **Inter** (text), **JetBrains Mono** (numbers/labels), self-hosted via `next/font`. | `src/shared/fonts.ts`. |
| 5 | Sentence-case headlines, not all-lowercase. Wordmark is lowercase `kin`. | Readability; copy lives in `src/kin/content/home.ts`. |
| 6 | HustleX pages moved into the `(hustlex)` route group. URLs unchanged. Only `/` redirects; old pages stay reachable but out of the sitemap. | App-store listings likely still link `/privacy` and `/terms`. |
| 7 | Redirect lives in `src/middleware.ts` (runtime env), defaults **on** when unset. | Set `HUSTLEX_ROOT_REDIRECTS_TO_KIN=false` to restore the HustleX home. |
| 8 | Scroll-scrub uses `motion`'s `useScroll` (already a dependency) instead of adding GSAP. | `src/kin/components/sections/Clip.tsx`. |
| 9 | Rive/Lottie runtimes load from a pinned CDN URL only when a slot of that type is near the viewport. No npm dependency yet. | `RUNTIMES` in `src/kin/components/media/AnimationPlayer.tsx`. |
| 10 | Until `logo-kin` is supplied, the nav shows a text wordmark rather than a dashed placeholder (it reads better at nav size). | `Wordmark` in `src/kin/components/ui.tsx`. |
| 11 | The waitlist needs one consent tick ("Send me Kin updates and offers…"). It's required, because joining a waitlist *is* asking to be messaged (DPDP: explicit consent). | `Waitlist.tsx`. |
| 12 | Pincode → city/state autofill uses India Post's public API (`api.postalpincode.in`), 3.5 s timeout, fails silently. Listed as a processor in the privacy draft. | `lookupPincode` in `src/kin/lib/validation.ts`. |
| 13 | Paper (light) sections: **How it works** and **Specs**, with angled top edges, for xBloom-style rhythm. | `kin-paper` class on those sections. |
| 14 | The mobile sticky bar hides over the clip-on section, the Founders offer, the final CTA and the footer. | `StickyBar.tsx`. |
| 15 | Contact form opens the visitor's email app (`mailto:`) and is disabled until `supportEmail` is set. | `ContactForm.tsx`. |
| 16 | Founder note and About use the founder name from the existing HustleX team page, marked **TODO founder to rewrite**. | `founderNote` in `content/home.ts`, `about` in `content/pages.ts`. |
| 17 | Bento cards show an illustrative stat (e.g. `0.62 m/s`) so the data feel comes through before widgets exist. The note "Figures on cards are illustrative" shows in preview mode. | `metrics.cards[].stat`. Remove the stats or replace them with real widgets before launch. |
| 18 | Every bento card is `in-development` and every spec row is `target: true`. | Flip per card/row only once validated. |
| 19 | The `"regular_price"` after-batch behaviour is wired: when the batch is full, Founders copy and the order summary switch to ₹8,999. `"waitlist_only"` swaps the CTA for the waitlist. | `afterBatchBehaviour` in `config.ts`. |
| 20 | Admin (`/kin/admin`) is not built in this phase. It needs the DB. | Backend phase. |
