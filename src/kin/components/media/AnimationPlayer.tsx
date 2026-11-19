"use client";

import { useEffect, useRef, useState } from "react";

import type { LottieAsset, RiveAsset } from "@/kin/media";
import { readMotionPrefs } from "@/kin/lib/useMotionPrefs";

// Rive / Lottie runtimes are loaded lazily, only when a slot of that type is
// near the viewport, so they never touch the initial bundle.
// Pinned versions; bump here (or swap to npm packages) when needed.
const RUNTIMES = {
	lottie: "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie_light.min.js",
	rive: "https://unpkg.com/@rive-app/canvas@2.21.6/rive.js",
};

type LottieAnim = { play(): void; pause(): void; destroy(): void };
type RiveInstance = { play(): void; pause(): void; cleanup(): void };
declare global {
	interface Window {
		lottie?: {
			loadAnimation(o: {
				container: Element;
				renderer: "svg";
				loop: boolean;
				autoplay: boolean;
				path: string;
			}): LottieAnim;
		};
		rive?: {
			Rive: new (o: {
				src: string;
				canvas: HTMLCanvasElement;
				autoplay: boolean;
				stateMachines?: string;
				onLoad?: () => void;
			}) => RiveInstance & { resizeDrawingSurfaceToCanvas(): void };
		};
	}
}

const scriptCache = new Map<string, Promise<void>>();
const loadScript = (src: string) => {
	if (!scriptCache.has(src)) {
		scriptCache.set(
			src,
			new Promise((resolve, reject) => {
				const s = document.createElement("script");
				s.src = src;
				s.async = true;
				s.onload = () => resolve();
				s.onerror = reject;
				document.head.appendChild(s);
			}),
		);
	}
	return scriptCache.get(src)!;
};

/**
 * Plays a Rive or Lottie animation while in view (and `active`, if given).
 * Reduced motion → shows the poster (if any) and never loads the runtime.
 */
export const AnimationPlayer = ({
	asset,
	alt,
	active,
}: {
	asset: RiveAsset | LottieAsset;
	alt: string;
	active?: boolean;
}) => {
	const wrapRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const playerRef = useRef<{ play(): void; pause(): void } | null>(null);
	const [near, setNear] = useState(false);
	const [inView, setInView] = useState(false);
	const [reduced, setReduced] = useState(false);

	useEffect(() => setReduced(readMotionPrefs().reduced), []);

	useEffect(() => {
		const el = wrapRef.current;
		if (!el) return;
		const io = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) setNear(true);
				setInView(e.intersectionRatio > 0);
			},
			{ rootMargin: "300px 0px", threshold: [0, 0.01] },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	useEffect(() => {
		if (!near || reduced) return;
		let destroy: (() => void) | undefined;
		let cancelled = false;
		(async () => {
			try {
				if (asset.kind === "lottie") {
					await loadScript(RUNTIMES.lottie);
					if (cancelled || !window.lottie || !wrapRef.current) return;
					const anim = window.lottie.loadAnimation({
						container: wrapRef.current,
						renderer: "svg",
						loop: true,
						autoplay: false,
						path: asset.src,
					});
					playerRef.current = anim;
					destroy = () => anim.destroy();
				} else {
					await loadScript(RUNTIMES.rive);
					if (cancelled || !window.rive || !canvasRef.current) return;
					const r = new window.rive.Rive({
						src: asset.src,
						canvas: canvasRef.current,
						autoplay: false,
						stateMachines: asset.stateMachine,
						onLoad: () => r.resizeDrawingSurfaceToCanvas(),
					});
					playerRef.current = r;
					destroy = () => r.cleanup();
				}
			} catch {
				/* runtime failed to load: poster stays */
			}
		})();
		return () => {
			cancelled = true;
			destroy?.();
			playerRef.current = null;
		};
	}, [near, reduced, asset]);

	useEffect(() => {
		const p = playerRef.current;
		if (!p) return;
		if (inView && active !== false) p.play();
		else p.pause();
	});

	return (
		<div ref={wrapRef} role="img" aria-label={alt || undefined} aria-hidden={!alt} className="absolute inset-0">
			{asset.poster && (reduced || !near) && (
				// eslint-disable-next-line @next/next/no-img-element
				<img src={asset.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
			)}
			{asset.kind === "rive" && <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />}
		</div>
	);
};
