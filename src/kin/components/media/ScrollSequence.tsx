"use client";

import { useEffect, useRef } from "react";

import { useMotionValueEvent, type MotionValue } from "motion/react";

import type { FramesAsset, ScrubVideoAsset } from "@/kin/media";

const framePath = (pattern: string, i: number, pad = 4) =>
	pattern.replace("{i}", String(i + 1).padStart(pad, "0"));

/** Draw `img` into the canvas with object-fit: cover. */
const drawCover = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
	const { width: cw, height: ch } = ctx.canvas;
	const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
	const w = img.naturalWidth * s;
	const h = img.naturalHeight * s;
	ctx.clearRect(0, 0, cw, ch);
	ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
};

/**
 * Image sequence on <canvas>, scrubbed by a 0–1 progress value.
 * Preloads progressively: every low-res frame first (fast, coarse), then hi-res.
 * Always draws the best frame loaded so far, nearest to the requested index.
 */
const FrameScrubber = ({
	asset,
	progress,
	alt,
}: {
	asset: FramesAsset;
	progress: MotionValue<number>;
	alt: string;
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const framesRef = useRef<(HTMLImageElement | null)[]>([]);
	const currentRef = useRef(0);

	const draw = () => {
		const ctx = canvasRef.current?.getContext("2d");
		const frames = framesRef.current;
		if (!ctx || !frames.length) return;
		const want = currentRef.current;
		for (let d = 0; d < frames.length; d++) {
			const f = frames[want - d] ?? frames[want + d];
			if (f?.complete && f.naturalWidth) return drawCover(ctx, f);
		}
	};

	useEffect(() => {
		const mobile = window.matchMedia("(max-width: 767px)").matches && asset.mobile;
		const src = mobile ? asset.mobile! : asset;
		const count = src.count;
		framesRef.current = new Array(count).fill(null);
		let cancelled = false;

		const canvas = canvasRef.current!;
		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = canvas.clientWidth * dpr;
			canvas.height = canvas.clientHeight * dpr;
			draw();
		};
		resize();
		window.addEventListener("resize", resize);

		const load = (pattern: string, i: number) =>
			new Promise<void>(res => {
				const img = new Image();
				img.decoding = "async";
				img.onload = () => {
					if (!cancelled) {
						framesRef.current[i] = img;
						if (Math.abs(i - currentRef.current) < 3) draw();
					}
					res();
				};
				img.onerror = () => res();
				img.src = framePath(pattern, i, asset.pad);
			});

		(async () => {
			// Coarse pass first (every 4th frame), then fill in, low-res before hi-res.
			const order = [...Array(count).keys()].sort((a, b) => (a % 4) - (b % 4) || a - b);
			const passes = [src.lowResPattern, src.pattern].filter(Boolean) as string[];
			for (const pattern of passes) {
				for (let k = 0; k < order.length && !cancelled; k += 6) {
					await Promise.all(order.slice(k, k + 6).map(i => load(pattern, i)));
				}
			}
		})();

		return () => {
			cancelled = true;
			window.removeEventListener("resize", resize);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [asset]);

	useMotionValueEvent(progress, "change", p => {
		const n = framesRef.current.length;
		const i = Math.min(n - 1, Math.max(0, Math.round(p * (n - 1))));
		if (i !== currentRef.current) {
			currentRef.current = i;
			requestAnimationFrame(draw);
		}
	});

	return (
		<>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={asset.poster} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
			<canvas
				ref={canvasRef}
				role="img"
				aria-label={alt}
				className="absolute inset-0 h-full w-full"
			/>
		</>
	);
};

/** Short video scrubbed by currentTime. */
const VideoScrubber = ({
	asset,
	progress,
	alt,
}: {
	asset: ScrubVideoAsset;
	progress: MotionValue<number>;
	alt: string;
}) => {
	const ref = useRef<HTMLVideoElement>(null);
	const raf = useRef(0);
	useMotionValueEvent(progress, "change", p => {
		cancelAnimationFrame(raf.current);
		raf.current = requestAnimationFrame(() => {
			const v = ref.current;
			if (v && v.duration) v.currentTime = Math.min(v.duration - 0.05, p * v.duration);
		});
	});
	const m = asset.mobile;
	return (
		<video
			ref={ref}
			muted
			playsInline
			preload="auto"
			poster={asset.poster}
			aria-label={alt}
			className="absolute inset-0 h-full w-full object-cover"
		>
			{m?.webm && <source media="(max-width: 767px)" src={m.webm} type="video/webm" />}
			{m?.mp4 && <source media="(max-width: 767px)" src={m.mp4} type="video/mp4" />}
			{asset.webm && <source src={asset.webm} type="video/webm" />}
			<source src={asset.mp4} type="video/mp4" />
		</video>
	);
};

export const ScrollSequence = ({
	asset,
	progress,
	alt,
}: {
	asset: FramesAsset | ScrubVideoAsset;
	progress: MotionValue<number>;
	alt: string;
}) =>
	asset.kind === "frames" ? (
		<FrameScrubber asset={asset} progress={progress} alt={alt} />
	) : (
		<VideoScrubber asset={asset} progress={progress} alt={alt} />
	);
