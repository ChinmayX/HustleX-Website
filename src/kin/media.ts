// ─────────────────────────────────────────────────────────────────────────────
// Kin media manifest. Every image, video and animation on the Kin site goes
// through <MediaSlot id="…" />, which reads its entry here.
//
// Empty slot (no `asset`) → a labelled placeholder at the correct aspect ratio.
// To fill a slot: drop files in public/kin/media/<slot-id>/ and add an `asset`.
// Full how-to: docs/kin/MEDIA.md
// ─────────────────────────────────────────────────────────────────────────────

/** Width / height, e.g. 16 / 9. */
type Ratio = [number, number];

export type ImageAsset = {
	kind: "image";
	/** Fallback (JPEG/PNG). Required. */
	src: string;
	avif?: string;
	webp?: string;
	/** Optional `srcset` strings per format, e.g. "/kin/media/x/x-800.webp 800w, /kin/media/x/x-1600.webp 1600w". */
	srcSet?: { avif?: string; webp?: string; fallback?: string };
	/** Optional mobile art-direction (used below 768px). */
	mobile?: { src: string; avif?: string; webp?: string; width: number; height: number };
	width: number;
	height: number;
};

export type VideoAsset = {
	kind: "video";
	/** Still shown instantly, and only this under reduced motion / Save-Data. Required. */
	poster: string;
	mp4: string;
	webm?: string;
	/** Optional separate mobile sources (used below 768px). */
	mobile?: { poster?: string; mp4: string; webm?: string };
};

/** Scroll-scrubbed image sequence drawn onto <canvas>. */
export type FramesAsset = {
	kind: "frames";
	/** Path pattern with {i} (1-based, zero-padded to `pad`), e.g. "/kin/media/clip-barbell-sequence/f-{i}.webp". */
	pattern: string;
	/** Optional low-res pattern, loaded first for fast scrubbing. */
	lowResPattern?: string;
	count: number;
	pad?: number;
	poster: string;
	/** Optional mobile frames (smaller crop). */
	mobile?: { pattern: string; lowResPattern?: string; count: number; poster: string };
	/** Fallback loop for low-power / mobile devices. */
	fallbackLoop?: { mp4: string; webm?: string };
};

/** Short video scrubbed by currentTime (encode with keyframe every frame for smooth scrubbing). */
export type ScrubVideoAsset = {
	kind: "scrub-video";
	mp4: string;
	webm?: string;
	poster: string;
	mobile?: { mp4: string; webm?: string; poster?: string };
};

export type RiveAsset = { kind: "rive"; src: string; stateMachine?: string; poster?: string };
export type LottieAsset = { kind: "lottie"; src: string; poster?: string };
export type SvgAsset = { kind: "svg"; src: string; width: number; height: number };

/** Drag-to-rotate turntable. */
export type TurntableAsset = { kind: "turntable"; pattern: string; count: number; pad?: number; poster: string };

export type MediaAsset =
	| ImageAsset
	| VideoAsset
	| FramesAsset
	| ScrubVideoAsset
	| RiveAsset
	| LottieAsset
	| SvgAsset
	| TurntableAsset;

export type SlotType =
	| "svg"
	| "image"
	| "video loop"
	| "video (lightbox)"
	| "scroll sequence"
	| "rive / lottie / video"
	| "image / video"
	| "image sequence";

export type MediaSlotDef = {
	type: SlotType;
	/** Aspect ratio on desktop (≥768px) and, optionally, mobile. Omit for slots that fill their container. */
	aspect?: { desktop: Ratio; mobile?: Ratio };
	/** Recommended dimensions / format, shown on the placeholder. */
	recommended: string;
	/** What goes there, shown on the placeholder. */
	description: string;
	/** Alt text / aria-label. Empty string = decorative. */
	alt: string;
	asset?: MediaAsset;
	/** Scroll sequences: progress (0–1) at which the pod seats and the "snap" pulse fires. */
	snapAt?: number;
};

const slots = {
	"logo-kin": {
		type: "svg",
		recommended: "SVG, single colour (currentColor), ~120×32",
		description: "Kin wordmark",
		alt: "Kin",
	},
	"logo-hustlex": {
		type: "svg",
		recommended: "SVG, single colour, ~80×20",
		description: "HustleX mark (small)",
		alt: "HustleX",
	},
	"og-image": {
		type: "image",
		aspect: { desktop: [1200, 630] },
		recommended: "1200×630 JPG/PNG, < 300 KB",
		description: "Social share image",
		alt: "Kin by HustleX",
	},
	"hero-loop": {
		type: "video loop",
		aspect: { desktop: [16, 9], mobile: [4, 5] },
		recommended: "1920×1080 desktop + 1080×1350 mobile · MP4 (H.264) + WebM · ≤ 8 s · < 3 MB · poster JPG",
		description: "Pod snapping onto a barbell, with a hint of the app reacting",
		alt: "Kin clipping onto a barbell",
	},
	"hero-film": {
		type: "video (lightbox)",
		aspect: { desktop: [16, 9] },
		recommended: "1920×1080 MP4 (H.264), with audio, captions file optional",
		description: "Optional launch film. The 'Watch the film' button only appears once this is filled",
		alt: "Kin launch film",
	},
	"clip-barbell-sequence": {
		type: "scroll sequence",
		aspect: { desktop: [16, 9], mobile: [4, 5] },
		recommended: "90–150 WebP frames 1920×1080 (+ low-res 960×540) or 1 scrub video · poster",
		description: "Pod approaching a barbell, rotating, seating in the V-groove, magnet snap",
		alt: "Kin seating onto a barbell's V-groove",
		snapAt: 0.62,
	},
	"clip-stack-sequence": {
		type: "scroll sequence",
		aspect: { desktop: [16, 9], mobile: [4, 5] },
		recommended: "90–150 WebP frames 1920×1080 (+ low-res 960×540) or 1 scrub video · poster",
		description: "Pod seating onto a weight-stack plate, magnet snap",
		alt: "Kin snapping onto a weight-stack plate",
		snapAt: 0.62,
	},
	"how-clip": {
		type: "video loop",
		aspect: { desktop: [1, 1] },
		recommended: "1080×1080 MP4 + WebM · ≤ 4 s · < 1 MB · poster",
		description: "Clipping on",
		alt: "Clipping Kin onto the bar",
	},
	"how-lift": {
		type: "video loop",
		aspect: { desktop: [1, 1] },
		recommended: "1080×1080 MP4 + WebM · ≤ 4 s · < 1 MB · poster",
		description: "Lifting",
		alt: "A lifter training with Kin",
	},
	"how-logged": {
		type: "rive / lottie / video",
		aspect: { desktop: [1, 1] },
		recommended: "1080×1080 loop, or .riv / Lottie JSON",
		description: "A set appearing in the log",
		alt: "A set appearing in the Kin app log",
	},
	"widget-reps": widget("Auto rep count widget: rep counter ticking up"),
	"widget-velocity": widget("Bar speed widget: peak / mean velocity per rep"),
	"widget-rom": widget("Range of motion widget: depth per rep"),
	"widget-fatigue": widget("Fatigue widget: velocity dropping on the last reps"),
	"widget-rir": widget("Reps-in-reserve widget: estimate updating"),
	"widget-autolog": widget("Auto-logged set widget: set row sliding into the log"),
	"widget-progress": widget("Progress widget: strength trend over weeks, PR marker"),
	"app-live-set": phone("Live set view: reps and bar speed in real time"),
	"app-set-summary": phone("Set summary the moment you rack it"),
	"app-history": phone("Training history list"),
	"app-progress": phone("Trends / progress charts"),
	"app-machines": phone("Machine station picker, clip, go"),
	"object-hero": {
		type: "image",
		aspect: { desktop: [21, 9], mobile: [4, 5] },
		recommended: "2520×1080 desktop + 1080×1350 mobile · AVIF + WebP + JPG",
		description: "Hero render of the object",
		alt: "Kin, the sensor pod",
	},
	"object-detail-1": detail("Close-up: the faceted cover", "Kin's faceted cover"),
	"object-detail-2": detail("Close-up: the V-groove", "Kin's V-shaped groove"),
	"object-detail-3": detail("Close-up: USB-C port + lanyard tab", "Kin's USB-C port and lanyard tab"),
	"object-carry": {
		type: "image / video",
		aspect: { desktop: [16, 9] },
		recommended: "1920×1080 image (AVIF/WebP/JPG) or short loop",
		description: "Lifestyle: on a keyring next to car keys and earbuds, clipped to a gym bag",
		alt: "Kin on a keyring next to car keys and earbuds",
	},
	"object-360": {
		type: "image sequence",
		aspect: { desktop: [1, 1] },
		recommended: "36–72 frames 1200×1200 WebP, transparent or matching bg",
		description: "Optional turntable. Only shown once filled",
		alt: "Kin, drag to rotate",
	},
	"proof-rig": {
		type: "video loop",
		aspect: { desktop: [16, 9] },
		recommended: "1920×1080 MP4 + WebM · ≤ 10 s · poster",
		description: "Rotary-encoder test rig running reps against Kin",
		alt: "Kin on the rotary-encoder test rig",
	},
	"founder-portrait": {
		type: "image / video",
		aspect: { desktop: [4, 5] },
		recommended: "1080×1350 image or short loop",
		description: "Founder portrait",
		alt: "Kin's founder",
	},
	"build-log-1": buildLog(),
	"build-log-2": buildLog(),
	"build-log-3": buildLog(),
	"preorder-thumb": {
		type: "image",
		aspect: { desktop: [1, 1] },
		recommended: "800×800 AVIF/WebP/JPG, transparent or dark bg",
		description: "Kin thumbnail for the order summary",
		alt: "Kin Founders unit",
	},
} satisfies Record<string, MediaSlotDef>;

function widget(description: string): MediaSlotDef {
	return {
		type: "rive / lottie / video",
		recommended: ".riv (state machine 'loop') / Lottie JSON / MP4 loop, sized to the card",
		description,
		alt: "",
	};
}

function phone(description: string): MediaSlotDef {
	return {
		type: "image / video",
		aspect: { desktop: [9, 19.5] },
		recommended: "1179×2556 screen recording (MP4) or PNG, no device frame",
		description,
		alt: description,
	};
}

function detail(description: string, alt: string): MediaSlotDef {
	return {
		type: "image",
		aspect: { desktop: [4, 5] },
		recommended: "1080×1350 AVIF + WebP + JPG",
		description,
		alt,
	};
}

function buildLog(): MediaSlotDef {
	return {
		type: "image",
		aspect: { desktop: [16, 9] },
		recommended: "1280×720 AVIF/WebP/JPG",
		description: "Build-log thumbnail",
		alt: "",
	};
}

export type SlotId = keyof typeof slots;
export const media: Record<SlotId, MediaSlotDef> = slots;
export const hasAsset = (id: SlotId) => !!media[id].asset;
