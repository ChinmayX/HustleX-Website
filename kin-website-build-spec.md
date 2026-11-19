# Kin website: build spec for the coding agent

> **Who this is for:** an AI coding agent (Claude Code, Cursor, etc.) working inside the HustleX website repo.
> **What to build:** the product and pre-order site for **Kin** at `hustlex.club/kin`, plus the pre-order flow, payment, confirmation email and admin basics.
> **What you already know that this doc doesn't:** the current structure of the HustleX repo. Use it. Wherever this doc and the repo's existing conventions disagree on *how* (framework, folder layout, styling system, component patterns), follow the repo. This doc decides *what*.

---

## 0. Ground rules for the agent

1. **Inspect the repo first.** Before you write code, work out the framework, router, styling, any existing design tokens/components, the deploy target and env handling. Then write a short plan (`docs/kin/PLAN.md`) covering where things will live, and follow it.
2. **Do whatever is best structured.** If the repo is messy or out of date, you can build Kin as a clean, self-contained section of the app (its own route group, components folder and content files) rather than bending it around old code. Don't rewrite unrelated parts of the repo.
3. **Do not delete the HustleX site.** It will come back soon (see §2). Park it; don't remove it.
4. **Leave every image, video and animation blank.** Build the layout, motion and loading logic around **labelled placeholder slots** (see §6). The founder will drop in the real Blender renders, app screen recordings and footage later. Never use stock photos, AI images or random 3D models.
5. **All business values live in one config file** (prices, batch size, links, toggles). No hard-coded prices in components.
6. **All copy lives in content files**, not inside JSX/markup, so it can be edited without touching components. The copy in this doc is draft copy; use it as written unless it breaks the layout.
7. **Mobile first.** Most visitors arrive from Instagram's in-app browser on mid-range Android phones over 4G. Desktop must still look premium.
8. **Never fake scarcity.** The "X of 100 left" counter must come from real paid reservations in the database. Indian consumer-protection rules on dark patterns ban false urgency, and the audience (serious lifters) will notice.
9. When something here is ambiguous, pick the sensible default, write it down in `docs/kin/DECISIONS.md`, and keep going.

---

## 1. What Kin is (product context)

**Kin** is a small magnetic sensor pod for strength training, made by **XElite Studios Pvt Ltd** (Bengaluru, India) under its consumer brand **HustleX**. It's branded Apple-style: **Kin** is the product name, and HustleX sits quietly underneath as the parent brand ("HustleX Kin" in places like the footer and page title).

**What it does:** you clip Kin onto a **barbell** (it has a V-shaped groove that seats on the bar) or onto a **gym machine's weight stack** (magnets on the base). It carries a motion sensor (IMU) and Bluetooth. It streams your movement to the **Kin app** (iOS + Android), which:
- counts reps automatically
- measures rep quality: bar speed (peak and mean velocity), range of motion / depth, how consistent your reps are
- spots when your reps slow down near failure and estimates reps in reserve (RIR)
- **auto-logs every set into a workout tracker**, so you never type sets, reps or weights mid-workout

**Core promise:** *you lift, Kin logs it.* It sits between manual workout-logging apps (tedious) and expensive lab-grade velocity trackers (complex, pricey).

**The object:** shaped like a premium car key fob: sleek, faceted, good in the hand. No buttons. USB-C charging. A small projecting lanyard tab so it can hang on a keychain or gym bag. Footprint roughly 36 × 60 mm. The story: *the thing you carry to every session*, like your keys or your earbuds.

**How it behaves:** it sleeps by default. Starting a workout in the app wakes it and it connects automatically. No pairing dance mid-workout. Firmware updates arrive over the air through the app.

**Status (be honest about this on the site):** in active development. Prototypes and a test rig exist. Accuracy is being validated against a rotary-encoder rig as ground truth. Hardware specs on the site are **targets** until measured, and must be labelled that way.

**Audience:** gym-goers in India who train seriously: science-based lifters, intermediate/advanced trainees, coaches. They like data but hate logging. Mostly 18–35, Instagram-native, mostly Android, plenty of iPhone.

**Competitors (for orientation, don't name them on the site):** Gpath, RepOne, Output, Enode, Metric VBT. Kin's edge is the price, the clip-on simplicity (barbell *and* machines) and auto-logging into a full workout tracker.

**The app:** the Kin app will be live on the Play Store and App Store during pre-orders as a manual workout tracker, with Kin pre-order buttons inside it. Store links are config values (empty until live; hide the badges when empty).

---

## 2. Routing and the HustleX parent site

### Now
| Route | Purpose |
|---|---|
| `/` (hustlex.club) | **Temporary redirect (307/302) to `/kin`.** Not 301: the HustleX home page will come back, and browsers cache 301s. |
| `/kin` | Kin product page (the main page) |
| `/kin/pre-order` | Details form → Razorpay checkout |
| `/kin/pre-order/success` | Confirmation page (shown after payment) |
| `/kin/pre-order/status` | Optional: look up a reservation by email + WhatsApp number (low priority) |
| `/kin/about` | About XElite Studios / HustleX / the founder |
| `/kin/contact` | Contact details + simple form or mailto |
| `/kin/legal/terms` | Terms & conditions (incl. pre-order terms) |
| `/kin/legal/privacy` | Privacy policy |
| `/kin/legal/refunds` | Refund & cancellation policy |
| `/kin/legal/shipping` | Shipping & delivery policy |
| `/kin/admin` | Protected admin view (see §10) |
| `/api/kin/*` | Server endpoints (or the repo's equivalent) |

Razorpay's website review checks for About, Contact, pricing visible on the site, Terms, Privacy, Refund and Shipping pages. All of them must exist and be linked in the footer before going live.

### Later (build for it, don't build it)
The HustleX parent site will be revived as the company site, with entry points to several products: **Kin**, **GRIT** (a smart motorised resistance machine / digital weight stack), the **HustleX app**, and others.

- Put the redirect behind a config flag, e.g. `HUSTLEX_ROOT_REDIRECTS_TO_KIN=true`. Flipping it off should bring back whatever the root page is (existing HustleX page or a simple placeholder).
- Keep existing HustleX pages/routes in the repo but unreachable while the flag is on (redirect, or exclude from navigation and sitemap). Don't delete them.
- Structure Kin so it could later move to `kin.hustlex.club` or its own domain with minimal changes: base path and canonical URL in config.
- Shared things (fonts, base tokens, legal entity details, footer company info) should sit at a level the future HustleX site can reuse. Kin-specific things (accent colour, Kin components) sit under Kin.

### SEO / meta
- Kin pages: indexable. `<title>` like `Kin by HustleX: every rep, logged`. Meta description, Open Graph + Twitter card (OG image is a placeholder slot, 1200×630), canonical URLs, `sitemap.xml` with only the Kin routes while the redirect is on, and `robots.txt`.
- Admin, success and status pages: `noindex`.
- Product structured data (JSON-LD `Product` with `offers` in INR) on `/kin`, driven by config.

---

## 3. Business config (single source of truth)

Create one typed config (e.g. `config/kin.ts`) with at least these values. Values marked **TODO** are undecided; ship with the placeholder and make it obvious in the UI/admin that they need filling.

```ts
export const kinConfig = {
  productName: "Kin",
  parentBrand: "HustleX",
  legalEntity: "XElite Studios Pvt Ltd",
  city: "Bengaluru, India",

  currency: "INR",
  pricesIncludeGST: true,

  reservationAmount: 1000,        // ₹ paid now to reserve
  founderPrice: 5999,             // ₹ total price locked by reservation
  regularPrice: 8999,             // ₹ price after the founder batch
  founderBatchSize: 100,          // first N *paid* reservations get founderPrice
  balanceDueAt: "before shipping", // shown in copy; balance = price − reservation

  afterBatchBehaviour: "regular_price", // "regular_price" | "waitlist_only"

  shipWindow: "TODO",             // e.g. "Founders batch ships Q2 2027"
  refundable: true,               // TODO confirm; copy below assumes "refundable any time before shipping"
  founderPerks: [                 // TODO confirm
    "Founder price locked: ₹5,999",
    "Numbered Founders unit",
    "Early access to the app and new features",
  ],
  subscriptionNote: "TODO",       // app subscription model undecided; FAQ answer reads from this

  whatsappCommunityUrl: "",       // set via env; WhatsApp Community announcement group invite
  instagramUrl: "",               // TODO handle
  supportEmail: "",               // TODO
  supportPhone: "",               // optional
  appStoreUrl: "",                // hide badge if empty
  playStoreUrl: "",               // hide badge if empty

  showLiveCounter: true,          // shows "NN of 100 founder spots left" from DB
  counterHideAbove: null,         // optional: e.g. only show the number once fewer than 60 remain
};
```

Derived values (compute, don't store): `balanceDue = founderPrice − reservationAmount` (₹4,999), `foundersRemaining = founderBatchSize − paidReservations`, `currentPrice = foundersRemaining > 0 ? founderPrice : regularPrice`.

---

## 4. Design direction

### 4.1 Primary references (take heavy inspiration)

**rabbit r1** (rabbit.tech, especially the original r1 launch and pre-order period)
- One unmistakable signature accent colour against a dark or neutral base. The product *is* the hero, shot like an object on a plinth.
- Short, confident, declarative copy. Very few words per section. Playful but precise. (rabbit writes in all lowercase; consider it for headlines, but don't force it if it hurts readability.)
- Price and buy button sit right in the hero with a row of small **trust badges** next to them (e.g. "ships in 3 business days · 14-day returns"). Do the same: "₹1,000 to reserve · refundable · ships {shipWindow}".
- An industrial-design section that credits the design thinking behind the object.
- The pre-order launch era: numbered **batches**, a clear ship window per batch, the counter, the hype of "be first".
- Lesson: they overpromised. Kin's site must not. Label targets as targets.

**xBloom** (xbloom.com, the coffee machine brand)
- Calm, premium, appliance-grade product presentation: big clean packshots, generous whitespace, warm neutrals.
- **Video-backed product panels**: a muted looping video fills the panel with a still poster as fallback, and the CTA sits on top. Use this pattern for the clip-on and "the object" sections.
- A small "ships within …" reassurance line under every buy button.
- A trust strip: press/award logos and community numbers. Build the component now, keep it hidden by a flag until there's something real to show (tester count, gyms, press).
- Product + consumable + app ecosystem told as one system. For Kin that's pod + app + your training history.

### 4.2 Secondary references
- **Apple AirTag / AirPods Pro product pages:** the product animation scrubbed by scroll. This is the model for the clip-on section.
- **Linear (linear.app):** product UI as hero art, a crisp **bento grid** of features, small looping UI animations instead of static screenshots, precise typography, dark theme done right.
- **Whoop:** selling a small device through the data it produces.
- **Oura:** pairing a premium physical object with its app screens; calm photography.
- **Nothing:** brand personality, typographic confidence, first-batch "drop" energy.
- **Teenage Engineering:** product-as-object photography, tiny technical labels, spec-sheet aesthetics.
- **Raycast:** small, polished interface motion.
- **Ultrahuman:** Indian hardware sold direct: INR pricing, UPI-first checkout, Indian trust signals.

If you can browse, look at these sites before designing. If you can't, work from the descriptions above.

### 4.3 Visual system (proposal; adapt to existing HustleX tokens if they exist)
- **Theme:** dark-first. Near-black graphite background, off-white text, one signature accent colour for Kin used sparingly (CTAs, the counter, key data highlights in widgets). Pick a strong accent that reads on dark and looks good next to sport/data UI, and put it in a single token so the founder can change it in one place. Supporting greys plus a light "paper" section or two for rhythm (xBloom-style calm).
- **Type:** one display face with character for headlines (geometric or grotesk, tight tracking, large sizes) and one highly legible text face. A monospace or tabular-figure face for numbers and spec labels (velocities, rep counts, prices). Self-host fonts, subset them, `font-display: swap`.
- **Numbers are the hero of the data sections:** large tabular figures, small uppercase units (`m/s`, `reps`, `RIR`).
- **Shape language:** the pod has a faceted, asymmetric contour. Echo it subtly: chamfered corners on cards/buttons, angled section dividers. Don't overdo it.
- **Spacing:** generous. Sections breathe. Max content width ~1200 px, full-bleed media.
- **Motion:** purposeful and fast (150–400 ms UI, longer only for scroll-scrubbed sequences). Easing that feels mechanical and snappy, like a magnet snapping on. Respect `prefers-reduced-motion`: swap scroll-scrubs and loops for still posters.
- **Iconography:** thin, consistent line icons. No emoji in UI.

### 4.4 Voice
- Short sentences. Lifter language, not lab language. Lead with the pain (logging), then the magic (auto-logging), then the depth (velocity, RIR).
- Confident but honest: "in development", "target", "we're testing this now" are fine and build trust.
- Indian context: ₹ prices with Indian digit grouping (₹5,999, ₹1,00,000 if ever), UPI mentioned, made in Bengaluru.

---

## 5. `/kin` page: sections, top to bottom

Each section lists its **purpose**, **content**, **media slots** (see §6 for slot specs) and **behaviour**. Section IDs double as anchor links.

### 5.1 Nav (`#nav`)
- Left: Kin wordmark (placeholder SVG slot `logo-kin`) with a small "by HustleX".
- Center/right links: How it works · App · Specs · FAQ.
- Right: **Reserve** button (accent), always visible. On mobile the nav collapses to wordmark + Reserve + menu; also show a **sticky bottom bar** on mobile after the hero scrolls away: `Founders ₹5,999 · Reserve ₹1,000 →`.
- Turns translucent with a blur on scroll.

### 5.2 Hero (`#hero`)
- **Purpose:** in 3 seconds the visitor gets: a small thing clips on, it logs your lifts, here's the price, reserve now.
- **Headline (draft):** `Every rep, logged.`
- **Subhead:** `Kin clips onto any barbell or weight stack and tracks every set for you: reps, bar speed, range of motion. No typing. Just lift.`
- **Price block:** `Founders price ₹5,999` with `₹8,999` struck through or labelled "after first 100". Live counter chip: `63 of 100 founder spots left` (from DB, see §8.6).
- **Primary CTA:** `Reserve for ₹1,000` → `/kin/pre-order`
- **Secondary CTA:** `Join the waitlist` → opens waitlist modal (§7.4). Also `Watch the film` if `media.heroFilm` exists (opens a lightbox).
- **Trust badges row (small):** `Refundable reservation · UPI & cards · Made in Bengaluru · Ships {shipWindow}`
- **Media:** `hero-loop` (looping video: pod snapping onto a barbell, with a hint of the app reacting). Desktop 16:9, mobile 4:5 crop. Poster image required.
- **Behaviour:** the headline and media must show without waiting for JS. The video autoplays muted, inline and looped; the poster shows instantly.

### 5.3 Problem strip (`#problem`)
- Three short lines, big type, revealed one by one on scroll:
  - `You came to lift, not to type.`
  - `Logging sets mid-workout breaks your focus.`
  - `And "felt heavy" isn't data.`
- No media. Pure typography on dark.

### 5.4 Clip-on, the signature section (`#clip`)
- **Purpose:** show how dead-simple it is to attach, on both a barbell and a machine.
- **Toggle:** `Barbell | Machine` segmented control at the top of the section.
- **Media:**
  - `clip-barbell-sequence`: scroll-scrubbed sequence (Apple-style) of the pod approaching a barbell, rotating, seating in the V-groove, magnet "snap".
  - `clip-stack-sequence`: same idea on a weight-stack plate.
- **Implementation:** pin the section and scrub frames with scroll. Support **two asset formats** and pick whichever the founder provides: (a) an image sequence drawn onto `<canvas>` (preload progressively, low-res first), or (b) a short H.264/WebM video scrubbed by `currentTime`. On mobile or low-power devices, or with reduced motion, fall back to a plain autoplay loop or the poster.
- **Overlaid captions that appear at points in the scroll:**
  - `Magnetic. Snaps on in a second.`
  - `V-groove seats on any Olympic bar.`
  - `Holds tight through drops and reracks.` *(only if true after testing: put it behind a content flag)*
- **The snap moment:** at the frame where it seats, a subtle UI pulse/flash in the accent colour. Optionally a tiny haptic (`navigator.vibrate(10)` on Android, tied to user scroll, off by default).

### 5.5 How it works (`#how`)
- Three steps, horizontal on desktop, stacked on mobile, each with a small looping media slot:
  1. **Clip.** `Snap Kin onto the bar or the stack.`, slot `how-clip`
  2. **Lift.** `Train like you always do. Kin wakes when you start your workout.`, slot `how-lift`
  3. **Logged.** `Reps, weight and quality land in your log automatically.`, slot `how-logged`

### 5.6 What it measures, the bento grid (`#metrics`)
- **Purpose:** show the depth of data, Linear-style. A grid of cards in mixed sizes; each card has a title, one line of copy and an **animated app widget** slot (Rive animation, Lottie or a looping video; support all three, the founder decides per card).
- **Cards (draft):**
  | Card | Line | Slot | Status flag |
  |---|---|---|---|
  | Auto rep count | `Every rep counted. You just lift.` | `widget-reps` | validated? |
  | Bar speed | `Peak and mean velocity, every rep.` | `widget-velocity` | validated? |
  | Range of motion | `See if you're hitting depth, set after set.` | `widget-rom` | validated? |
  | Fatigue / last-rep slowdown | `Know when the bar starts slowing down.` | `widget-fatigue` | validated? |
  | Reps in reserve | `An honest estimate of what's left in the tank.` | `widget-rir` | validated? |
  | Auto-logged sets | `Sets, reps and weight logged for you.` | `widget-autolog` | validated? |
  | Progress & PRs | `Watch strength trends build over weeks.` | `widget-progress` | validated? |
- **Each card has a `status` in content: `live` | `in-development`.** `in-development` cards show a small tag "In development". Default every card to `in-development`. The founder flips them as accuracy is validated. This is a hard requirement: never claim a metric works before it's validated.
- Hover (desktop) / in-view (mobile) starts each widget's loop; off-screen loops pause.

### 5.7 The app (`#app`)
- **Purpose:** show the Kin app as a polished product in its own right.
- **Layout:** a sticky phone mockup on one side; text blocks scroll past on the other. As each text block enters, the phone screen changes (cross-fade or slide). On mobile: phone on top, text below, swipe or scroll-step through the screens.
- **Screens (each a slot, video loop or still):**
  1. `app-live-set`: `Live set view. Reps and bar speed in real time.`
  2. `app-set-summary`: `Every set summarised the moment you rack it.`
  3. `app-history`: `Your whole training history, without typing a thing.`
  4. `app-progress`: `Trends that tell you when to push and when to back off.`
  5. `app-machines`: `Works with machines too. Pick the station, clip, go.`
- **Phone frame:** build the device frame in CSS/SVG (generic modern phone, no brand). The screen area is the slot.
- **Below:** App Store / Play Store badges (only when URLs exist) and the line `Already lifting? Start logging in the Kin app today, free.`

### 5.8 The object (`#object`)
- **Purpose:** desire. This is the Teenage Engineering / Nothing / xBloom moment.
- **Layout:** a full-bleed render (`object-hero`), then a 2–3 image row of close-ups (`object-detail-1..3`: the faceted cover, the V-groove, USB-C + lanyard tab), then the "carry it everywhere" story with a lifestyle slot (`object-carry`: on a keyring next to car keys and earbuds, clipped to a gym bag).
- **Copy (draft):**
  - Headline: `Built to be carried.`
  - `Shaped like a key fob. No buttons. USB-C. A lanyard tab so it lives on your keys, not in a drawer.`
  - `Charge it once, train all week.` *(battery claim reads from specs; label as target)*
- **Optional:** a small interactive 360° viewer if the founder later supplies a turntable image sequence (`object-360`, 36–72 frames, drag to rotate). Build the component; show it only if the slot is filled. No live WebGL/3D model in v1.

### 5.9 Proof: how we test (`#proof`)
- **Purpose:** earn trust for a pre-order from strangers.
- **Content:** `We test Kin against a rotary encoder, a lab-grade reference, rep by rep.` Slot `proof-rig` (video of the encoder rig). A results block that shows **"Accuracy results coming soon"** until real numbers are entered in content (e.g. `velocity error ±X m/s vs encoder over N reps`). Link to the build log / Instagram.
- **Optional "Build log" teaser:** the 3 latest updates (title, date, image slot) from a simple content file. Later this can become `/kin/build`.

### 5.10 Founders batch: the offer (`#founders`)
- **Purpose:** close. Make the offer crystal clear.
- **Content:**
  - Big: `Founders batch: first 100`
  - Price: `₹5,999` (vs `₹8,999` regular)
  - Counter: progress bar + `NN of 100 left` (live)
  - What you get: `founderPerks` from config, as a checklist
  - How it works, in plain words:
    1. `Pay ₹1,000 today to reserve your Founders unit.`
    2. `We'll keep you posted on WhatsApp and email as we build.`
    3. `Before we ship, pay the balance of ₹4,999.`
    4. `Changed your mind? Your ₹1,000 is refundable any time before shipping.` *(reads from config; must match the refund policy page)*
  - Ship window line from config.
  - CTA: `Reserve for ₹1,000`
- **When the batch is full:** this section switches to `Founders batch is full. Reserve at ₹8,999` (or waitlist-only, per `afterBatchBehaviour`).

### 5.11 Founder note (`#founder`)
- A short, personal note from the founder: who's building Kin and why. Slot `founder-portrait` (photo or short video), with name and title from content.
- Draft placeholder text in content, clearly marked `TODO founder to rewrite`.

### 5.12 Specs (`#specs`)
- Spec-sheet aesthetic (Teenage Engineering). A two-column table of labels and values, with a "target" tag on any unmeasured value.
- **Rows (draft, all marked target until confirmed):**
  - Size: ~36 × 60 mm *(target)*
  - Mounting: magnetic; V-groove for barbells, flat magnetic base for weight stacks
  - Sensors: 6-axis IMU *(TODO confirm)*
  - Connectivity: Bluetooth Low Energy
  - Battery: ~10 one-hour sessions per charge *(target)*
  - Charging: USB-C
  - Controls: none. Wakes from the app.
  - Updates: over-the-air via the app
  - App: iOS and Android
  - Weight: TODO
  - In the box: Kin, USB-C cable, lanyard *(TODO confirm)*

### 5.13 FAQ (`#faq`)
- An accordion. Answers live in content; anything undecided shows the config TODO. Draft questions:
  1. Does it work with iPhone and Android?
  2. Which exercises does it track? (barbell lifts + machine/stack exercises; list examples)
  3. Will it stay on my bar during drops and reracks?
  4. How long does the battery last?
  5. Do I need a subscription? *(reads `subscriptionNote`)*
  6. How accurate is it?
  7. Will my gym let me use it?
  8. What exactly am I paying ₹1,000 for? Is it refundable?
  9. When does it ship? What if it's delayed?
  10. Do you ship across India? Outside India?
  11. Warranty?
  12. Can I get a GST invoice?
- Add FAQ JSON-LD.

### 5.14 Final CTA (`#cta`)
- Full-width, accent-tinted. `Lift more. Log nothing.` + counter + `Reserve for ₹1,000` + `Join the waitlist`.

### 5.15 Trust strip (`#trust`), hidden by default
- Press logos / "N testers", "N gyms" / quotes. A flag in content turns it on. Build it, ship it hidden.

### 5.16 Footer
- Kin by HustleX wordmark, the one-line promise.
- Links: How it works, App, Specs, FAQ, About, Contact.
- Legal: Terms, Privacy, Refunds, Shipping.
- Social: Instagram (and others if set).
- `© {year} XElite Studios Pvt Ltd · Bengaluru, India`. Optional: registered address/CIN/GSTIN from config (Razorpay and invoices like having these visible).

---

## 6. Media slots: leave them blank, build them right

Every image/video/animation on the site goes through **one reusable component** (e.g. `<MediaSlot id="hero-loop" />`) backed by a **media manifest** (e.g. `content/kin/media.ts`).

### 6.1 Placeholder behaviour
When a slot has no asset, render a tasteful placeholder **at the correct aspect ratio**: a subtle dark surface with a thin dashed border showing
- the slot ID (`hero-loop`)
- its type (`video loop`, `scroll sequence`, `image`, `rive`, `lottie`)
- recommended dimensions/format
- a one-line description of what goes there

Add a config/env flag so placeholders can show **only the empty surface** (no labels) for a clean preview build.

### 6.2 When the asset is filled
- **image:** responsive `<picture>` with AVIF/WebP + fallback, `srcset`, width/height set (no layout shift), lazy below the fold, `alt` from the manifest.
- **video loop:** `muted playsinline loop autoplay`, poster required, WebM (VP9/AV1) + MP4 (H.264) sources, separate mobile/desktop sources allowed, pause when off-screen (IntersectionObserver), poster only under reduced motion or Save-Data.
- **scroll sequence:** canvas image-sequence *or* scrubbed video (see §5.4); progressive frame preloading; poster fallback.
- **rive / lottie:** lazy-load the runtime only when a slot of that type is on the page; play in view, pause out of view.
- **360 viewer:** drag-to-rotate image sequence (optional).

### 6.3 Slot manifest (initial)
| Slot ID | Type | Aspect / size | What goes there |
|---|---|---|---|
| `logo-kin` | svg | — | Kin wordmark |
| `logo-hustlex` | svg | — | HustleX mark (small) |
| `og-image` | image | 1200×630 | Social share image |
| `hero-loop` | video loop | 16:9 desktop, 4:5 mobile | Pod snapping onto a barbell; app reacting |
| `hero-film` | video (lightbox) | 16:9 | Optional launch film |
| `clip-barbell-sequence` | scroll sequence | 16:9 / 4:5 | Pod seating onto barbell, magnet snap |
| `clip-stack-sequence` | scroll sequence | 16:9 / 4:5 | Pod seating onto a weight-stack plate |
| `how-clip` | video loop | 1:1 | Clipping on |
| `how-lift` | video loop | 1:1 | Lifting |
| `how-logged` | video loop / rive | 1:1 | Set appearing in the log |
| `widget-reps` … `widget-progress` | rive / lottie / video | per bento card | Animated app widgets (7 slots) |
| `app-live-set` … `app-machines` | video loop / image | phone screen ~9:19.5 | App screen recordings (5 slots) |
| `object-hero` | image | 21:9 desktop, 4:5 mobile | Hero render of the object |
| `object-detail-1..3` | image | 4:5 | Close-ups: facets, V-groove, USB-C + tab |
| `object-carry` | image / video | 16:9 | Lifestyle: on keys / gym bag |
| `object-360` | image sequence | 1:1, 36–72 frames | Optional turntable |
| `proof-rig` | video loop | 16:9 | Encoder test rig |
| `founder-portrait` | image / video | 4:5 | Founder |
| `build-log-1..3` | image | 16:9 | Build-log thumbnails |

Put asset files under a clear folder, e.g. `public/kin/media/<slot-id>/…`, and write `docs/kin/MEDIA.md` explaining how to add or replace an asset (file naming, formats, recommended compression, where to update the manifest). The founder will hand assets over by following that doc.

---

## 7. `/kin/pre-order`: reservation flow

### 7.1 Page layout
- Left (desktop) / top (mobile): a compact order summary: Kin thumbnail slot, `Founders unit`, `Total price ₹5,999 · Pay today ₹1,000 · Balance ₹4,999 before shipping`, live counter, refund line, ship window.
- Right / below: the form.
- Minimal distractions: no full nav, just the wordmark (links back to `/kin`) and a help/WhatsApp contact link.

### 7.2 Form fields
| Field | Required | Notes |
|---|---|---|
| Full name | yes | |
| WhatsApp number | yes | Indian mobile by default (+91, 10 digits, starts 6–9); allow changing the country code. Normalise to E.164. |
| Email | yes | Validate format. |
| Pincode | yes | 6 digits; optionally autofill city/state from a pincode lookup (graceful if unavailable). |
| City | yes (auto if possible) | |
| What do you train on? | yes | Barbell / Machines / Both |
| Your phone | yes | iPhone / Android |
| How did you hear about Kin? | no | Instagram / Friend / Gym / Creator / Other (free text) |
| Consent: updates | yes to proceed | "I agree to receive order updates on WhatsApp and email." |
| Consent: marketing | no, unticked | "Also send me Kin news and offers." |
| Terms | yes | "I agree to the pre-order Terms and Refund policy" (links) |

Also capture silently: UTM params (store from the first landing in a first-party cookie/localStorage and attach them), referrer, a `ref` referral code if present, user agent, timestamp.

### 7.3 Submit → payment
1. **Validate on client and server.**
2. **Save first, pay second.** On submit, the server upserts a `reservation` with `status = "started"`, even if payment never happens. These leads matter.
3. The server creates a **Razorpay Order** (`amount = reservationAmount × 100` paise, `currency = "INR"`, `receipt = reservation.id`, notes with reservation id and email), stores `razorpay_order_id` on the reservation, and returns it with the public key id.
4. The client opens **Razorpay Checkout** (standard checkout script), prefilled with name/email/contact, UPI shown first where configurable, themed with the Kin accent colour.
5. On the checkout success handler, the client posts `razorpay_order_id`, `razorpay_payment_id` and `razorpay_signature` to the server. The server **verifies the signature** (HMAC-SHA256 of `order_id|payment_id` with the key secret) and moves the reservation to `status = "payment_verified_client"`, then redirects to `/kin/pre-order/success?r=<public reservation token>`.
6. **The source of truth is the webhook.** A Razorpay webhook (`payment.captured` and/or `order.paid`) hits `/api/kin/razorpay/webhook`. Verify `X-Razorpay-Signature` against the **raw request body** with the webhook secret. Process idempotently (store the event id; ignore duplicates). On capture:
   - set `status = "paid"`, store payment id, method, amount and captured time
   - **assign the Founders number atomically** (inside one DB transaction or with a sequence/row lock), only while paid count < `founderBatchSize`; flag `is_founder = true` and `locked_price = founderPrice`. Once the batch is full, `is_founder = false` and `locked_price = regularPrice`. A race between the last two buyers must never produce 101 founders.
   - send the confirmation email (§9)
   - fire the server-side Purchase conversion event (§11)
7. Handle failures and dismissals: on a failed payment or a closed modal, keep the user on the page with a clear message and a "Try again" button (a new Razorpay order on retry is fine; keep the same reservation). Show "Having trouble? Message us on WhatsApp" with the support link.
8. **Duplicate protection:** if the same email + WhatsApp number already has a `paid` reservation, warn ("You've already reserved Founder #023. Want to reserve another unit?") rather than silently creating a second one. Multiple units per person are allowed, but they must be intentional.

### 7.4 Waitlist (secondary CTA)
- Modal or inline form: name, WhatsApp number, email, consent. Saved as `waitlist` with source/UTM. Success state: `You're on the list. We'll tell you before anyone else.` plus the WhatsApp Community link.
- Fire a Lead event.

### 7.5 Success page `/kin/pre-order/success`
- Look up the reservation by an unguessable public token (never by sequential id).
- If `paid` (or `payment_verified_client` and the webhook hasn't landed yet: poll for a few seconds, then show a "Payment received, confirming…" state):
  - Big: `You're in. Founder #023.` (or `You're in.` if not a Founders unit)
  - Summary: paid ₹1,000, locked price, balance due before shipping, ship window, refund line
  - **Join the WhatsApp updates** button (`whatsappCommunityUrl`)
  - Referral: a share link with their `ref` code (`hustlex.club/kin?ref=ABC123`), with WhatsApp share and copy-link buttons. (Rewards for referrals: TODO; just track for now.)
  - `Check your email for the confirmation.`
- If not paid: friendly message + retry link.

### 7.6 Abandoned reservations
- Reservations stuck at `started` for more than ~1 hour, where the person ticked the updates consent: queue **one** reminder email (and a second at ~24 h). Build it as a scheduled job / cron route the hosting platform can trigger. Include an unsubscribe link. Keep the logic simple and easy to switch off (`ENABLE_ABANDON_REMINDERS`).

---

## 8. Data model

Use the repo's existing database/ORM if it has one; otherwise choose a managed Postgres (e.g. Supabase or Neon) with a typed client and migrations. Minimum tables:

### 8.1 `kin_reservations`
`id` (uuid), `public_token` (random, unique), `created_at`, `updated_at`,
`name`, `email`, `whatsapp_e164`, `pincode`, `city`, `state`,
`trains_on` (barbell|machines|both), `phone_os` (ios|android),
`heard_from`, `heard_from_other`,
`consent_updates` (bool), `consent_marketing` (bool), `terms_accepted_at`,
`status` (started|payment_verified_client|paid|failed|refunded|cancelled),
`amount_paise`, `currency`,
`razorpay_order_id`, `razorpay_payment_id`, `payment_method`, `paid_at`,
`is_founder` (bool), `founder_number` (int, unique when not null), `locked_price` (int, ₹),
`ref_code` (their own, unique), `referred_by_code`,
`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `referrer`, `landing_path`, `user_agent`,
`reminder_count`, `last_reminder_at`, `notes` (admin).

### 8.2 `kin_waitlist`
`id`, `created_at`, `name`, `email`, `whatsapp_e164`, `consent_marketing`, UTM fields, `ref`, `converted_reservation_id` (nullable).

### 8.3 `kin_payment_events`
`id`, `razorpay_event_id` (unique), `event_type`, `payload` (jsonb), `received_at`, `processed_at`, `error`.

### 8.4 `kin_email_log`
`id`, `reservation_id`, `type` (confirmation|reminder|update), `to`, `provider_message_id`, `sent_at`, `status`.

### 8.5 Security & privacy
- All writes through server endpoints; no direct client DB access with write permissions. If you use Supabase, enable RLS and use the service role only on the server.
- Rate-limit form and waitlist endpoints; add a honeypot field and/or a lightweight bot check (e.g. Cloudflare Turnstile) without hurting conversion.
- Secrets only in env vars: Razorpay key id/secret, webhook secret, DB URL, email API key, admin credentials, Meta CAPI token.
- India's Digital Personal Data Protection Act applies: clear consent wording, a privacy policy that says what's collected and why, and a contact for deletion requests. Don't collect anything not listed above.

### 8.6 Counter endpoint
`GET /api/kin/stock` → `{ founderBatchSize, paid, remaining, currentPrice }`. Cache for a short time (e.g. 30–60 s) at the edge. Used by the hero, the Founders section, the pre-order summary and the sticky bar. If it fails, hide the counter instead of showing a wrong number.

---

## 9. Emails

Use a transactional provider (e.g. Resend or Postmark, or whatever the repo already uses) with a verified sending domain on `hustlex.club` (SPF/DKIM/DMARC). Build the templates with a component-based email library if it fits the stack; keep them simple and dark-mode safe.

**Confirmation email** (sent on webhook capture, exactly once):
- Subject: `You're in. Kin Founder #023` (or `Your Kin reservation is confirmed`)
- Body: thank you; what they paid (₹1,000, payment id); locked price; balance due before shipping; ship window; refund line + how to request a refund; **Join WhatsApp updates** button; referral link; support contact; footer with legal entity and address.
- Plain-text version included.

**Abandoned reminder** (optional, §7.6): `Your Kin Founders spot is still waiting` + resume link (prefilled `/kin/pre-order?r=<token>`).

**Admin notification:** a short email (or webhook to a configurable URL) to the founder on every paid reservation.

---

## 10. Admin (`/kin/admin`)

Simple and protected (basic auth from env, or the repo's existing auth). No fancy UI needed.
- Totals: started, paid, founders remaining, waitlist count, revenue collected, conversion (started → paid).
- Table of reservations with filters (status, founder, date, source) and search.
- Table of waitlist entries.
- **CSV export** for both (for WhatsApp/email outreach and accounting).
- Mark refunded / add notes. (Doing the refund itself happens in the Razorpay dashboard; the admin just records it, or optionally calls the Razorpay refund API behind a confirmation.)
- `noindex`, never linked publicly.

---

## 11. Analytics & tracking

- **Meta Pixel + Meta Conversions API** (server-side) with event deduplication via a shared `event_id`:
  - `PageView` (all), `ViewContent` (`/kin`), `InitiateCheckout` (form submitted / Razorpay opened), `Lead` (waitlist), **`Purchase`** (webhook capture; value 1000, currency INR).
- Optional privacy-friendly product analytics (Vercel Analytics, Plausible or PostHog) for scroll depth and section engagement: which sections people reach, toggle use, CTA clicks by position (hero / sticky bar / founders / final).
- Capture UTMs on first landing (§7.2) so every reservation records its source. Creator/influencer links will use `utm_source=creator&utm_content=<name>` or `?ref=`.
- IDs (Pixel id, CAPI token, etc.) come from env. When unset, tracking no-ops without errors.

---

## 12. Legal pages (draft content, marked for review)

Write sensible first drafts in content files, clearly marked `DRAFT: review before launch`, using config values so they stay consistent with the offer:
- **Terms:** pre-order nature of the product; product in development; specs are targets and may change; the reservation amount and what it secures; balance payment before shipping; Founders pricing and the 100-unit cap; what happens if the product is delayed or cancelled (full refund of the reservation); governing law India / Bengaluru courts; entity details.
- **Refunds:** reservation refundable any time before shipping (per config), how to request (email/WhatsApp), refund timeline (e.g. 5–7 business days to source), post-delivery returns/warranty TBD.
- **Shipping:** India-wide shipping, ship window, how dispatch is communicated, address changes before dispatch.
- **Privacy:** data collected (the form fields + analytics), purpose, processors (Razorpay, email provider, hosting, Meta), retention, user rights and contact.
- **About / Contact:** company, founder, Bengaluru, support email and WhatsApp, business hours.

---

## 13. Performance, accessibility, quality bar

- **Performance budget (mobile, 4G, mid-range Android):** hero text and poster visible in under ~2.5 s (LCP), CLS ≈ 0, INP good. Ship the minimum JS above the fold; load animation libraries (scroll scrubbing, Rive/Lottie) only when their section is near the viewport. Video only starts after first paint; respect `Save-Data`.
- **No live WebGL/3D in v1.** All 3D comes in as pre-rendered video/image sequences.
- **Instagram in-app browser:** test that autoplay, sticky elements, the Razorpay checkout modal and UPI intent/collect all work there. If the Razorpay modal misbehaves in-app, offer an "Open in browser" hint.
- **Accessibility:** semantic landmarks, focus states, keyboard-operable toggle/accordion/modals, `alt` text from the manifest, captions/aria labels for meaningful videos, colour contrast AA, `prefers-reduced-motion` honoured everywhere.
- **Responsive:** 360 px to 1920 px+. Test 360×800, 390×844, 768×1024, 1280×800, 1440×900.
- **Formatting:** ₹ amounts with Indian grouping (`Intl.NumberFormat('en-IN')`).
- **Error states:** every API call has loading, success and failure UI. No dead ends.

---

## 14. Suggested stack (only if the repo doesn't already decide)

- Next.js (App Router) + TypeScript, deployed on Vercel
- Tailwind CSS (or the repo's styling system) with design tokens as CSS variables
- Motion (Framer Motion) for UI motion; GSAP ScrollTrigger (or an equivalent) for pinned scroll-scrub sections; Lenis smooth scroll only if it doesn't hurt mobile performance
- Rive and/or Lottie runtimes, lazy-loaded
- Postgres (Supabase/Neon) + an ORM with migrations
- Razorpay Orders API + Checkout + webhooks
- Resend/Postmark + React Email (or equivalent)
- Zod for validation on client and server
- Cron via the hosting platform for reminders

---

## 15. Environment variables (document them in `.env.example`)

```
NEXT_PUBLIC_SITE_URL=https://hustlex.club
HUSTLEX_ROOT_REDIRECTS_TO_KIN=true
SHOW_MEDIA_PLACEHOLDER_LABELS=true

DATABASE_URL=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
NEXT_PUBLIC_RAZORPAY_KEY_ID=

EMAIL_PROVIDER_API_KEY=
EMAIL_FROM="Kin by HustleX <hello@hustlex.club>"
ADMIN_NOTIFY_EMAIL=

KIN_WHATSAPP_COMMUNITY_URL=
KIN_SUPPORT_WHATSAPP=

ADMIN_USER=
ADMIN_PASSWORD=

NEXT_PUBLIC_META_PIXEL_ID=
META_CAPI_ACCESS_TOKEN=

ENABLE_ABANDON_REMINDERS=false
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

(Rename to match the repo's conventions.)

---

## 16. Build order

1. Read the repo → `docs/kin/PLAN.md`.
2. Routing + root redirect flag + Kin layout, nav, footer, tokens, fonts.
3. `MediaSlot` component + media manifest + placeholders.
4. `/kin` sections in order, with content files and config wiring.
5. Motion: hero loop, the clip-on scroll scrub, bento widgets, sticky app phone, reduced-motion fallbacks.
6. DB schema + migrations.
7. `/kin/pre-order` form → save → Razorpay order → checkout → client verify → success page.
8. Webhook + idempotency + atomic Founders numbering + confirmation email.
9. Counter endpoint + live counter everywhere.
10. Waitlist.
11. Legal/about/contact pages.
12. Admin + CSV export.
13. Analytics (Pixel + CAPI).
14. Abandoned reminders (behind flag).
15. Performance + accessibility pass, in-app browser testing.
16. Docs: `README` section for Kin, `docs/kin/MEDIA.md`, `docs/kin/DECISIONS.md`, `.env.example`, a launch checklist.

---

## 17. Acceptance checklist

- [ ] `hustlex.club` redirects (temporarily) to `/kin`; turning the flag off restores the root; no HustleX code deleted.
- [ ] Every section in §5 exists, in order, responsive, with placeholder slots at the right aspect ratios.
- [ ] Swapping a placeholder for a real asset only needs a file drop + a manifest entry (documented in `MEDIA.md`).
- [ ] All prices, counts, links and perks come from config; nothing hard-coded.
- [ ] Bento metrics default to "In development" and can be flipped per card.
- [ ] Specs show "target" tags until confirmed.
- [ ] The pre-order form saves the lead **before** payment; abandoned leads are visible in admin.
- [ ] Razorpay test mode works end-to-end: UPI, card and netbanking succeed; failure and dismissal are handled.
- [ ] The webhook verifies signatures, is idempotent, and is the source of truth for `paid`.
- [ ] Founders numbers are unique and capped at 100 under concurrent payments (test it).
- [ ] The confirmation email arrives with the correct founder number, amounts and WhatsApp link.
- [ ] The success page works on refresh and doesn't expose other people's data.
- [ ] The counter reflects real paid reservations and hides itself on error.
- [ ] The waitlist works and fires Lead.
- [ ] Meta Pixel + CAPI fire with dedup (verify in Events Manager test mode).
- [ ] Legal, About and Contact pages exist and are linked in the footer.
- [ ] Mobile LCP < ~2.5 s on a throttled 4G profile; no layout shift from media.
- [ ] Reduced-motion mode shows posters instead of scroll-scrubs/loops.
- [ ] Tested inside the Instagram in-app browser (Android + iOS).
- [ ] Admin is protected and exports CSV.

---

## 18. Open items the founder will fill in (leave TODOs, don't block on them)

- Signature accent colour and final fonts (propose defaults)
- Ship window
- Refund terms confirmation
- Founders perks final list
- App subscription model (FAQ)
- Instagram handle, support email/WhatsApp, WhatsApp Community link
- Accuracy numbers for the Proof section
- All media assets (renders, sequences, app recordings, photos)
- Founder note text and portrait
- Registered address / CIN / GSTIN for the footer and invoices
