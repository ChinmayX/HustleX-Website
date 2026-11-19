"use client";

import { useEffect, useRef, useState } from "react";

import type { VideoAsset } from "@/kin/media";
import { readMotionPrefs } from "@/kin/lib/useMotionPrefs";

const MOBILE = "(max-width: 767px)";

/**
 * Muted, inline, looping video with an instant poster.
 * - The poster is a plain <img> (server-rendered), so it paints before any JS.
 * - The video only loads/plays after first paint, while in view; pauses off-screen.
 * - Reduced motion or Save-Data → poster only, video never loads.
 * - `active` (optional) gates playback, e.g. hover-to-play on bento cards.
 */
export const VideoLoop = ({
	asset,
	alt,
	priority,
	active,
}: {
	asset: VideoAsset;
	alt: string;
	priority?: boolean;
	active?: boolean;
}) => {
	const ref = useRef<HTMLVideoElement>(null);
	const [allowed, setAllowed] = useState(false);
	const [inView, setInView] = useState(false);
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		const p = readMotionPrefs();
		setAllowed(!p.reduced && !p.saveData);
	}, []);

	useEffect(() => {
		const el = ref.current;
		if (!el || !allowed) return;
		const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
			rootMargin: "200px 0px",
		});
		io.observe(el);
		return () => io.disconnect();
	}, [allowed]);

	useEffect(() => {
		const el = ref.current;
		if (!el || !allowed) return;
		const shouldPlay = inView && active !== false;
		if (shouldPlay) {
			if (el.preload !== "auto") {
				el.preload = "auto";
				el.load();
			}
			el.play().catch(() => {
				/* autoplay blocked: poster stays */
			});
		} else {
			el.pause();
		}
	}, [inView, active, allowed]);

	const m = asset.mobile;
	return (
		<>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<picture>
				{m?.poster && <source media={MOBILE} srcSet={m.poster} />}
				<img
					src={asset.poster}
					alt={playing ? "" : alt}
					aria-hidden={playing || !alt}
					loading={priority ? "eager" : "lazy"}
					fetchPriority={priority ? "high" : "auto"}
					decoding="async"
					className="absolute inset-0 h-full w-full object-cover"
				/>
			</picture>
			{allowed && (
				<video
					ref={ref}
					muted
					playsInline
					loop
					preload="none"
					aria-label={alt || undefined}
					aria-hidden={!alt}
					onPlaying={() => setPlaying(true)}
					className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
						playing ? "opacity-100" : "opacity-0"
					}`}
				>
					{m?.webm && <source media={MOBILE} src={m.webm} type="video/webm" />}
					{m?.mp4 && <source media={MOBILE} src={m.mp4} type="video/mp4" />}
					{asset.webm && <source src={asset.webm} type="video/webm" />}
					<source src={asset.mp4} type="video/mp4" />
				</video>
			)}
		</>
	);
};
