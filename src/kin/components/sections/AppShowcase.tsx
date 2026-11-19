"use client";

import { useEffect, useRef, useState } from "react";

import { kinConfig } from "@/kin/config";
import { app } from "@/kin/content/home";

import { MediaSlot } from "../media/MediaSlot";
import { PhoneFrame } from "../PhoneFrame";
import { Container, SectionHeader } from "../ui";

const StoreBadge = ({ href, label, platform }: { href: string; label: string; platform: "ios" | "android" }) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className="kin-chamfer kin-chamfer-sm inline-flex h-12 items-center gap-3 bg-white/[0.06] px-4 shadow-[inset_0_0_0_1px_var(--kin-line-strong)] hover:bg-white/[0.1]"
	>
		<svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor" aria-hidden>
			{platform === "ios" ? (
				<path d="M13.6 10.6c0-1.7 1.4-2.5 1.5-2.6-.8-1.2-2.1-1.3-2.5-1.4-1.1-.1-2.1.6-2.6.6-.6 0-1.4-.6-2.3-.6-1.2 0-2.3.7-2.9 1.8-1.2 2.1-.3 5.3.9 7 .6.8 1.3 1.8 2.2 1.7.9 0 1.2-.6 2.3-.6s1.4.6 2.3.6c1 0 1.6-.9 2.1-1.7.7-1 1-1.9 1-2-.1 0-1.9-.7-2-2.8zM11.9 5.5c.5-.6.8-1.4.7-2.2-.7 0-1.5.5-2 1.1-.4.5-.8 1.3-.7 2.1.8.1 1.5-.4 2-1z" />
			) : (
				<path d="M3.6 2.3 11 9.7l-7.4 7.4c-.3-.2-.5-.5-.5-.9V3.2c0-.4.2-.7.5-.9zm8.1 8.1 1.9 1.9-8.7 5 6.8-6.9zm2.9-2.9 2.2 1.3c.6.4.6 1.2 0 1.6l-2.2 1.3-2.1-2.1 2.1-2.1zM4.9 1.7l8.7 5-1.9 1.9-6.8-6.9z" />
			)}
		</svg>
		<span className="text-[14px] font-medium">{label}</span>
	</a>
);

export const AppShowcase = () => {
	const [active, setActive] = useState(0);
	const refs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const mobile = window.matchMedia("(max-width: 767px)").matches;
		// Desktop: the block crossing the middle of the viewport wins.
		// Mobile: the sticky phone covers the top half, so watch the band below it.
		const io = new IntersectionObserver(
			entries => {
				for (const e of entries) {
					if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
				}
			},
			{ rootMargin: mobile ? "-66% 0px -30% 0px" : "-45% 0px -45% 0px" },
		);
		refs.current.forEach(el => el && io.observe(el));
		return () => io.disconnect();
	}, []);

	const hasStores = !!(kinConfig.appStoreUrl || kinConfig.playStoreUrl);

	return (
		<section id="app" aria-labelledby="app-title" className="py-24 md:py-36 border-t border-kin-line">
			<Container>
				<div id="app-title">
					<SectionHeader label={app.label} headline={app.headline} sub={app.sub} />
				</div>

				<div className="mt-10 md:mt-16 md:grid md:grid-cols-2 md:gap-16">
					{/* Sticky phone */}
					<div className="sticky top-16 z-10 -mx-4 bg-kin-bg px-4 py-4 md:static md:mx-0 md:bg-transparent md:p-0">
						<div className="md:sticky md:top-[calc(50vh-300px)] flex justify-center">
							<PhoneFrame className="h-[44svh] md:h-[600px] max-h-[600px] [&_.kin-placeholder]:pt-9">
								{app.screens.map((s, i) => (
									<div
										key={s.slot}
										aria-hidden={i !== active}
										className={`absolute inset-0 transition-[opacity,transform] duration-300 ease-snap ${
											i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
										}`}
									>
										<MediaSlot id={s.slot} fill active={i === active} className="text-kin-fg" />
									</div>
								))}
							</PhoneFrame>
						</div>
						{/* Step dots (mobile) */}
						<ol className="mt-3 flex justify-center gap-1.5 md:hidden" aria-hidden>
							{app.screens.map((s, i) => (
								<li key={s.slot} className={`h-1 transition-all duration-300 ${i === active ? "w-6 bg-kin-accent" : "w-2 bg-kin-line-strong"}`} />
							))}
						</ol>
					</div>

					{/* Text blocks */}
					<div className="relative">
						{app.screens.map((s, i) => (
							<div
								key={s.slot}
								ref={el => {
									refs.current[i] = el;
								}}
								data-index={i}
								className="flex min-h-[34svh] md:min-h-[72vh] flex-col justify-start pt-6 md:justify-center md:py-8"
							>
								<p className={`kin-num text-[13px] transition-colors duration-300 ${i === active ? "text-kin-accent" : "text-kin-fg-3"}`}>
									{String(i + 1).padStart(2, "0")} / {String(app.screens.length).padStart(2, "0")} · {s.title}
								</p>
								<p
									className={`mt-3 font-display font-semibold tracking-[-0.035em] leading-[1.02] text-[clamp(28px,3.6vw,48px)] transition-colors duration-300 ${
										i === active ? "text-kin-fg" : "text-kin-fg-3"
									}`}
								>
									{s.text}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className="mt-10 flex flex-col gap-4 border-t border-kin-line pt-8 md:flex-row md:items-center md:justify-between">
					<p className="text-[17px] text-kin-fg-2">{hasStores ? app.storeLine : app.storesSoon}</p>
					{hasStores && (
						<div className="flex flex-wrap gap-3">
							{kinConfig.appStoreUrl && <StoreBadge href={kinConfig.appStoreUrl} label={app.storeLabels.appStore} platform="ios" />}
							{kinConfig.playStoreUrl && (
								<StoreBadge href={kinConfig.playStoreUrl} label={app.storeLabels.playStore} platform="android" />
							)}
						</div>
					)}
				</div>
			</Container>
		</section>
	);
};
