"use client";

import { useRef, useState } from "react";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";

import { kinConfig } from "@/kin/config";
import { clip } from "@/kin/content/home";
import { trackUI } from "@/kin/lib/analytics";
import { useMotionPrefs } from "@/kin/lib/useMotionPrefs";
import { media } from "@/kin/media";

import { MediaSlot } from "../media/MediaSlot";
import { Container } from "../ui";

type Mode = "barbell" | "machine";

const Toggle = ({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) => (
	<div
		role="group"
		aria-label="Mounting"
		className="kin-chamfer kin-chamfer-sm relative inline-grid grid-cols-2 bg-white/[0.06] p-1 shadow-[inset_0_0_0_1px_var(--kin-line)]"
	>
		{(["barbell", "machine"] as Mode[]).map(m => (
			<button
				key={m}
				type="button"
				aria-pressed={mode === m}
				onClick={() => {
					onChange(m);
					trackUI("clip_toggle", { mode: m });
				}}
				className={`relative z-10 h-9 px-5 text-[14px] font-medium transition-colors duration-200 ${
					mode === m ? "text-kin-accent-ink" : "text-kin-fg-2 hover:text-kin-fg"
				}`}
			>
				{mode === m && (
					<motion.span
						layoutId="clip-toggle"
						className="kin-chamfer kin-chamfer-sm absolute inset-0 -z-10 bg-kin-accent"
						transition={{ type: "spring", stiffness: 700, damping: 40 }}
					/>
				)}
				{clip.toggle[m]}
			</button>
		))}
	</div>
);

/**
 * The signature section. Pinned and scroll-scrubbed (Apple-style).
 * Falls back to a plain loop/poster with listed captions under reduced motion,
 * Save-Data or on low-power devices.
 */
export const Clip = () => {
	const prefs = useMotionPrefs();
	const [mode, setMode] = useState<Mode>("barbell");
	// Render the pinned version by default (SSR + most devices) so scroll position doesn't jump.
	const scrub = !prefs.ready || (!prefs.reduced && !prefs.saveData && !prefs.lowPower);
	return scrub ? (
		<ClipScrub mode={mode} setMode={setMode} />
	) : (
		<ClipStatic mode={mode} setMode={setMode} />
	);
};

const Heading = ({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) => (
	<div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
		<div>
			<p className="kin-label text-kin-fg-3 mb-3">
				<span className="text-kin-accent mr-2" aria-hidden>
					■
				</span>
				{clip.label}
			</p>
			<h2 className="font-display font-semibold tracking-[-0.04em] leading-[0.95] text-[clamp(34px,5vw,64px)]">
				{clip.headline}
			</h2>
		</div>
		<Toggle mode={mode} onChange={setMode} />
	</div>
);

const stageWidth =
	"mx-auto w-[min(100%,calc((100svh_-_290px)*4/5))] md:w-[min(100%,calc((100svh_-_250px)*16/9))]";

const ClipScrub = ({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) => {
	const ref = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
	const slot = clip.slots[mode];
	const snapAt = media[slot].snapAt ?? 0.62;
	const captions = clip.captions[mode];

	const [active, setActive] = useState(-1);
	const [pulse, setPulse] = useState(0);
	const last = useRef(0);

	useMotionValueEvent(scrollYProgress, "change", p => {
		let idx = -1;
		captions.forEach((c, i) => p >= c.at && (idx = i));
		setActive(idx);
		if (last.current < snapAt && p >= snapAt) {
			setPulse(n => n + 1);
			if (kinConfig.clipHaptics) navigator.vibrate?.(10);
		}
		last.current = p;
	});

	const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

	return (
		<section id="clip" ref={ref} aria-labelledby="clip-title" className="relative h-[320vh]">
			<div className="sticky top-0 flex h-[100svh] flex-col pt-20 pb-6 md:pt-24 md:pb-8">
				<Container>
					<span id="clip-title" className="sr-only">
						{clip.headline}
					</span>
					<Heading mode={mode} setMode={setMode} />
				</Container>

				<Container className="mt-6 flex-1 min-h-0 flex items-center">
					<div className={`relative ${stageWidth}`}>
						<AnimatePresence mode="wait" initial={false}>
							<motion.div
								key={slot}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
							>
								<MediaSlot id={slot} progress={scrollYProgress} className="kin-chamfer bg-kin-raised" />
							</motion.div>
						</AnimatePresence>

						{/* Snap pulse in the accent colour at the frame where the pod seats */}
						<div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
							{pulse > 0 && (
								<span
									key={pulse}
									className="kin-snap-pulse block h-40 w-40 rounded-full border-2 border-kin-accent shadow-[0_0_80px_var(--kin-accent)]"
								/>
							)}
						</div>

						{/* Captions */}
						<div className="pointer-events-none absolute left-4 right-4 bottom-4 md:left-8 md:bottom-8" aria-live="polite">
							<AnimatePresence mode="wait">
								{active >= 0 && (
									<motion.p
										key={`${mode}-${active}`}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -6 }}
										transition={{ duration: 0.22, ease: [0.2, 0.9, 0.1, 1] }}
										className="inline-block max-w-[22ch] bg-[color-mix(in_srgb,var(--kin-bg)_70%,transparent)] backdrop-blur-md px-4 py-3 font-display text-[clamp(20px,2.4vw,32px)] font-semibold leading-tight tracking-[-0.03em]"
									>
										{captions[active].text}
									</motion.p>
								)}
							</AnimatePresence>
						</div>
					</div>
				</Container>

				{/* Scrub progress with the snap marker */}
				<Container className="mt-4">
					<div className={`relative h-px bg-kin-line ${stageWidth}`} aria-hidden>
						<motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-kin-fg-2" style={{ scaleX: bar }} />
						<span className="absolute -top-1 h-[9px] w-px bg-kin-accent" style={{ left: `${snapAt * 100}%` }} />
						<span className="kin-label !text-[9px] absolute top-2 -translate-x-1/2 text-kin-accent" style={{ left: `${snapAt * 100}%` }}>
							snap
						</span>
					</div>
				</Container>
			</div>
		</section>
	);
};

const ClipStatic = ({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) => {
	const slot = clip.slots[mode];
	return (
		<section id="clip" aria-labelledby="clip-title-static" className="py-24 md:py-32">
			<Container>
				<span id="clip-title-static" className="sr-only">
					{clip.headline}
				</span>
				<Heading mode={mode} setMode={setMode} />
				<div className="mt-8">
					<MediaSlot key={slot} id={slot} className="kin-chamfer bg-kin-raised" />
				</div>
				<ul className="mt-8 grid gap-4 md:grid-cols-3">
					{clip.captions[mode].map(c => (
						<li key={c.text} className="border-t border-kin-line pt-4 font-display text-xl font-semibold tracking-[-0.02em]">
							{c.text}
						</li>
					))}
				</ul>
			</Container>
		</section>
	);
};
