# Adding media to the Kin site

Every image, video and animation on the Kin site is a **slot**. Empty slots show a dashed placeholder labelled with the slot ID, type, recommended size and what goes there. Filling one takes two steps.

## 1. Drop the files in

Put them in `public/kin/media/<slot-id>/`. For example:

```
public/kin/media/hero-loop/
  poster.jpg          desktop poster (1920×1080)
  poster-m.jpg        mobile poster (1080×1350)
  loop.mp4            H.264, desktop
  loop.webm           VP9/AV1, desktop
  loop-m.mp4          mobile crop
  loop-m.webm
```

Lower-case names, no spaces.

## 2. Add an `asset` to the slot in `src/kin/media.ts`

Find the slot and add `asset: { … }`. Paths start at `/kin/media/…`.

**Image** (AVIF + WebP + JPG fallback; width/height required so nothing jumps):
```ts
"object-detail-1": { ...,
  asset: { kind: "image", src: "/kin/media/object-detail-1/facets.jpg",
           avif: "/kin/media/object-detail-1/facets.avif", webp: "/kin/media/object-detail-1/facets.webp",
           width: 1080, height: 1350 } },
```
Optional: `mobile: { src, avif, webp, width, height }` for a different crop under 768px, or `srcSet: { avif, webp, fallback }` for multiple widths.

**Video loop** (muted, inline, loops in view, pauses off-screen; reduced motion / Save-Data get the poster only):
```ts
asset: { kind: "video", poster: "/kin/media/hero-loop/poster.jpg",
         mp4: "/kin/media/hero-loop/loop.mp4", webm: "/kin/media/hero-loop/loop.webm",
         mobile: { poster: "/kin/media/hero-loop/poster-m.jpg", mp4: "/kin/media/hero-loop/loop-m.mp4" } }
```

**Scroll sequence** (clip-on section). Pick one format:
```ts
// (a) image frames on <canvas>: f-0001.webp … f-0120.webp
asset: { kind: "frames", pattern: "/kin/media/clip-barbell-sequence/f-{i}.webp", pad: 4, count: 120,
         lowResPattern: "/kin/media/clip-barbell-sequence/lo/f-{i}.webp",
         poster: "/kin/media/clip-barbell-sequence/poster.jpg",
         fallbackLoop: { mp4: "/kin/media/clip-barbell-sequence/loop.mp4" } }
// (b) a scrubbed video, encoded with a keyframe on every frame:
//     ffmpeg -i in.mov -c:v libx264 -g 1 -crf 22 -pix_fmt yuv420p -an scrub.mp4
asset: { kind: "scrub-video", mp4: "/kin/media/clip-barbell-sequence/scrub.mp4",
         poster: "/kin/media/clip-barbell-sequence/poster.jpg" }
```
Also set `snapAt` on the slot (0–1): the scroll position where the pod seats. The accent pulse fires there.

**Rive / Lottie** (bento widgets, `how-logged`):
```ts
asset: { kind: "rive", src: "/kin/media/widget-velocity/velocity.riv", stateMachine: "loop", poster: "…/poster.png" }
asset: { kind: "lottie", src: "/kin/media/widget-reps/reps.json", poster: "…/poster.png" }
```

**SVG** (`logo-kin`, `logo-hustlex`): `asset: { kind: "svg", src: "/kin/media/logo-kin/kin.svg", width: 120, height: 32 }`

**360° turntable** (`object-360`, only shown once filled): `asset: { kind: "turntable", pattern: "/kin/media/object-360/t-{i}.webp", pad: 2, count: 48, poster: "…/t-01.webp" }`

Each slot's `alt` is its alt text / aria label. Edit it if the asset shows something different.

## Compression targets

| Type | Target |
|---|---|
| Hero loop | ≤ 8 s, < 3 MB desktop, < 1.5 MB mobile. `ffmpeg -i in.mov -vf scale=1920:-2 -c:v libx264 -crf 24 -preset slow -an -movflags +faststart loop.mp4` and `-c:v libvpx-vp9 -crf 34 -b:v 0 -an loop.webm` |
| Small loops (1:1, phone screens) | ≤ 4 s, < 1 MB |
| Images | AVIF ~q50, WebP ~q75, JPG ~q80. Hero render < 400 KB AVIF |
| Frames | WebP q70, 1920×1080 (+ 960×540 low-res set). 90–150 frames |
| Posters | Always provide one. It's what paints first and what reduced-motion users see |

## Preview modes

- `NEXT_PUBLIC_SHOW_MEDIA_PLACEHOLDER_LABELS=false` hides the placeholder labels and sample-data tags, for a clean preview build.
- The OG image (`og-image`) is picked up automatically by the page metadata once filled.
