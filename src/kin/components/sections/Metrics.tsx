"use client";

import { useEffect, useState } from "react";

import { showPlaceholderLabels } from "@/kin/config";
import { metrics } from "@/kin/content/home";

import { MediaSlot } from "../media/MediaSlot";
import { Reveal } from "../Reveal";
import { Container, SectionHeader, Tag } from "../ui";

type Card = (typeof metrics.cards)[number];

const span: Record<string, string> = {
	regular: "md:col-span-2",
	wide: "md:col-span-4",
	tall: "md:col-span-2 md:row-span-2",
	full: "md:col-span-6",
};

/** Hover-to-play on devices with a real pointer; in-view play on touch. */
const useHoverDevice = () => {
	const [hover, setHover] = useState(false);
	useEffect(() => setHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches), []);
	return hover;
};

const BentoCard = ({ card, hoverDevice }: { card: Card; hoverDevice: boolean }) => {
	const [hovered, setHovered] = useState(false);
	const tall = card.size === "tall";
	return (
		<div
			className={`kin-card group ${span[card.size]}`}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div className="kin-card-inner flex flex-col p-5 md:p-6">
				<div className="flex items-start justify-between gap-3">
					<h3 className="font-display text-[20px] font-semibold tracking-[-0.02em]">{card.title}</h3>
					{card.status === "live" ? (
						<Tag tone="accent">{metrics.liveTag}</Tag>
					) : (
						<Tag>{metrics.inDevelopmentTag}</Tag>
					)}
				</div>
				<p className="mt-1.5 text-[15px] text-kin-fg-2 max-w-[38ch]">{card.line}</p>

				<div className="mt-5 flex items-baseline gap-2" aria-hidden>
					<span className="kin-num text-[44px] md:text-[52px] leading-none tracking-[-0.04em] text-kin-fg">
						{card.stat.value}
					</span>
					<span className="kin-label text-kin-accent">{card.stat.unit}</span>
				</div>

				<div className={`relative mt-5 flex-1 ${tall ? "min-h-[220px] md:min-h-[320px]" : "min-h-[120px] md:min-h-[180px]"}`}>
					<MediaSlot id={card.slot} fill active={hoverDevice ? hovered : undefined} className="kin-chamfer kin-chamfer-sm" />
				</div>
			</div>
		</div>
	);
};

export const Metrics = () => {
	const hoverDevice = useHoverDevice();
	return (
		<section id="metrics" aria-labelledby="metrics-title" className="py-24 md:py-36">
			<Container>
				<div id="metrics-title">
					<SectionHeader label={metrics.label} headline={metrics.headline} sub={metrics.sub} />
				</div>
				<Reveal className="mt-14 grid gap-3 md:grid-cols-6 md:grid-flow-dense md:gap-4">
					{metrics.cards.map(c => (
						<BentoCard key={c.title} card={c} hoverDevice={hoverDevice} />
					))}
				</Reveal>
				{showPlaceholderLabels && <p className="mt-4 kin-label text-kin-fg-3">{metrics.sampleNote}</p>}
			</Container>
		</section>
	);
};
