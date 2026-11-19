import type { CSSProperties, ReactNode } from "react";

import type { MotionValue } from "motion/react";

import { media, type SlotId } from "@/kin/media";

import { AnimationPlayer } from "./AnimationPlayer";
import { Picture } from "./Picture";
import { Placeholder } from "./Placeholder";
import { ScrollSequence } from "./ScrollSequence";
import { Turntable } from "./Turntable";
import { VideoLoop } from "./VideoLoop";

type Props = {
	id: SlotId;
	className?: string;
	/** Fill the parent instead of using the manifest's aspect ratio. */
	fill?: boolean;
	/** Above the fold: load eagerly with high priority. */
	priority?: boolean;
	/** Optional playback gate for loops/animations (e.g. hover-to-play). */
	active?: boolean;
	/** Scroll sequences: 0–1 scrub progress. */
	progress?: MotionValue<number>;
	sizes?: string;
};

/**
 * The one component every image / video / animation on the Kin site goes through.
 * Empty slot → labelled placeholder at the correct aspect ratio (no layout shift).
 * See src/kin/media.ts and docs/kin/MEDIA.md.
 */
export const MediaSlot = ({ id, className = "", fill, priority, active, progress, sizes }: Props) => {
	const def = media[id];
	const a = def.aspect;
	const style =
		!fill && a
			? ({
					"--ar-d": `${a.desktop[0]} / ${a.desktop[1]}`,
					...(a.mobile ? { "--ar-m": `${a.mobile[0]} / ${a.mobile[1]}` } : {}),
				} as CSSProperties)
			: undefined;

	const asset = def.asset;
	let content: ReactNode;
	if (!asset) content = <Placeholder id={id} def={def} />;
	else
		switch (asset.kind) {
			case "image":
				content = <Picture asset={asset} alt={def.alt} priority={priority} sizes={sizes} />;
				break;
			case "svg":
				content = (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={asset.src}
						width={asset.width}
						height={asset.height}
						alt={def.alt}
						className="absolute inset-0 h-full w-full object-contain"
					/>
				);
				break;
			case "video":
				content = <VideoLoop asset={asset} alt={def.alt} priority={priority} active={active} />;
				break;
			case "frames":
			case "scrub-video":
				content = progress ? (
					<ScrollSequence asset={asset} progress={progress} alt={def.alt} />
				) : asset.kind === "frames" && asset.fallbackLoop ? (
					<VideoLoop
						asset={{ kind: "video", poster: asset.poster, ...asset.fallbackLoop }}
						alt={def.alt}
					/>
				) : (
					// eslint-disable-next-line @next/next/no-img-element
					<img src={asset.poster} alt={def.alt} className="absolute inset-0 h-full w-full object-cover" />
				);
				break;
			case "rive":
			case "lottie":
				content = <AnimationPlayer asset={asset} alt={def.alt} active={active} />;
				break;
			case "turntable":
				content = <Turntable asset={asset} alt={def.alt} />;
				break;
		}

	return (
		<div
			className={`relative overflow-hidden ${fill || !a ? "h-full w-full" : "kin-slot w-full"} ${className}`}
			style={style}
			data-media-slot={id}
		>
			{content}
		</div>
	);
};
