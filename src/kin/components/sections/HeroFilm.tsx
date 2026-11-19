"use client";

import { useEffect, useRef, useState } from "react";

import { media } from "@/kin/media";

import { buttonClass } from "../ui";

/** "Watch the film" button + lightbox. Only rendered when the hero-film slot has an asset. */
export const HeroFilm = ({ label }: { label: string }) => {
	const [open, setOpen] = useState(false);
	const closeRef = useRef<HTMLButtonElement>(null);
	const asset = media["hero-film"].asset;

	useEffect(() => {
		if (!open) return;
		closeRef.current?.focus();
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open]);

	if (!asset || asset.kind !== "video") return null;
	return (
		<>
			<button type="button" onClick={() => setOpen(true)} className={`${buttonClass("ghost", "lg")} w-full sm:w-auto`}>
				<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
					<path d="M4 2.5v11l9-5.5z" fill="currentColor" />
				</svg>
				{label}
			</button>
			{open && (
				<div
					role="dialog"
					aria-modal="true"
					aria-label={media["hero-film"].alt}
					className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4"
					onClick={() => setOpen(false)}
				>
					<button
						ref={closeRef}
						type="button"
						onClick={() => setOpen(false)}
						className="absolute right-4 top-4 kin-label text-kin-fg h-10 px-3"
					>
						Close
					</button>
					<video
						src={asset.mp4}
						poster={asset.poster}
						controls
						autoPlay
						playsInline
						className="w-full max-w-5xl aspect-video bg-black"
						onClick={e => e.stopPropagation()}
					/>
				</div>
			)}
		</>
	);
};
