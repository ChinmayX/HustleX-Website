"use client";

import { useEffect, useRef, useState } from "react";

import type { TurntableAsset } from "@/kin/media";

const framePath = (pattern: string, i: number, pad = 2) =>
	pattern.replace("{i}", String(i + 1).padStart(pad, "0"));

/** Drag (or arrow keys) to rotate a turntable image sequence. */
export const Turntable = ({ asset, alt }: { asset: TurntableAsset; alt: string }) => {
	const [frame, setFrame] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const drag = useRef<{ x: number; f: number } | null>(null);

	useEffect(() => {
		const imgs = [...Array(asset.count).keys()].map(i => {
			const img = new Image();
			img.src = framePath(asset.pattern, i, asset.pad);
			return img;
		});
		Promise.all(imgs.map(i => i.decode().catch(() => null))).then(() => setLoaded(true));
	}, [asset]);

	const step = (d: number) => setFrame(f => (f + d + asset.count) % asset.count);

	return (
		<div
			role="slider"
			tabIndex={0}
			aria-label={`${alt}. Use arrow keys to rotate.`}
			aria-valuemin={1}
			aria-valuemax={asset.count}
			aria-valuenow={frame + 1}
			onKeyDown={e => {
				if (e.key === "ArrowRight") step(1);
				if (e.key === "ArrowLeft") step(-1);
			}}
			onPointerDown={e => {
				(e.target as Element).setPointerCapture(e.pointerId);
				drag.current = { x: e.clientX, f: frame };
			}}
			onPointerMove={e => {
				if (!drag.current) return;
				const w = (e.currentTarget as HTMLElement).clientWidth;
				const d = Math.round(((e.clientX - drag.current.x) / w) * asset.count);
				setFrame((((drag.current.f - d) % asset.count) + asset.count) % asset.count);
			}}
			onPointerUp={() => (drag.current = null)}
			className="absolute inset-0 cursor-grab touch-pan-y select-none active:cursor-grabbing"
		>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={loaded ? framePath(asset.pattern, frame, asset.pad) : asset.poster}
				alt=""
				draggable={false}
				className="absolute inset-0 h-full w-full object-contain"
			/>
		</div>
	);
};
