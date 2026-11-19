# Kin launch checklist

## Must happen before taking money
- [ ] Backend built: DB, `/api/kin/stock`, reserve → Razorpay order → checkout → verify → webhook (spec §7–§8).
- [ ] **Counter reads real paid reservations.** Remove `SAMPLE_PAID` from `src/kin/lib/stock.ts`.
- [ ] Remove the preview success tokens (`demo*`) from `src/kin/lib/api.ts`.
- [ ] `kinConfig.paymentsLive = true`.
- [ ] Founders numbers capped at 100 under concurrent payments (tested).
- [ ] Confirmation email, admin + CSV export, Meta Pixel + CAPI dedup.
- [ ] Razorpay test mode end to end: UPI, card, netbanking, failure, dismissal. Test inside the Instagram in-app browser (Android + iOS).

## Content and config (`src/kin/config.ts`, `src/kin/content/*`, `src/shared/company.ts`)
- [ ] `shipWindow`, `refundable`, `refundTimeline`, `founderPerks`, `subscriptionNote`
- [ ] `supportEmail`, `instagramUrl`, `NEXT_PUBLIC_KIN_SUPPORT_WHATSAPP`, `NEXT_PUBLIC_KIN_WHATSAPP_COMMUNITY_URL`, `businessHours`
- [ ] `appStoreUrl` / `playStoreUrl` (badges appear automatically)
- [ ] Registered address, CIN, GSTIN
- [ ] Founder note + About copy rewritten (remove the TODO)
- [ ] FAQ: warranty answer; confirm exercise list
- [ ] Specs: confirm each row, set `target: false` only on measured values; fill Weight
- [ ] Bento: flip cards to `live` only once validated; remove or replace the illustrative stats
- [ ] Proof: add accuracy `results` once measured
- [ ] Build log: replace the placeholder entries
- [ ] `contentFlags.holdsThroughDrops` only once drop-tested
- [ ] Legal drafts reviewed by a lawyer, then set `draft: false` in `content/legal.ts`
- [ ] Final accent colour and fonts

## Media (see `docs/kin/MEDIA.md`)
- [ ] All slots filled, including `og-image` and `logo-kin`
- [ ] `NEXT_PUBLIC_SHOW_MEDIA_PLACEHOLDER_LABELS=false` in production

## Quality
- [ ] Mobile LCP < 2.5 s on throttled 4G (Lighthouse, mid-range Android profile); CLS ≈ 0
- [ ] Reduced motion: posters instead of scrubs/loops
- [ ] Keyboard: nav, toggle, FAQ, waitlist modal, form
- [ ] Widths 360, 390, 768, 1280, 1440
- [ ] Razorpay website review: About, Contact, pricing, Terms, Privacy, Refund, Shipping all linked in the footer
