"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { nav } from "@/kin/content/home";
import { trackUI } from "@/kin/lib/analytics";

import { ArrowRight, KinLink } from "./ui";

/**
 * Mobile-only bottom bar: appears once the hero has scrolled away,
 * hides again over the Founders offer, the final CTA and the footer (they carry their own CTA).
 */
export const StickyBar = () => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const hero = document.getElementById("hero");
		const hide = ["clip", "founders", "cta", "kin-footer"]
			.map(id => document.getElementById(id))
			.filter(Boolean) as HTMLElement[];
		if (!hero) return;
		let heroGone = false;
		const covering = new Set<Element>();
		const update = () => setShow(heroGone && covering.size === 0);

		const heroIO = new IntersectionObserver(([e]) => {
			heroGone = !e.isIntersecting;
			update();
		});
		heroIO.observe(hero);
		const hideIO = new IntersectionObserver(entries => {
			for (const e of entries) (e.isIntersecting ? covering.add(e.target) : covering.delete(e.target));
			update();
		});
		hide.forEach(el => hideIO.observe(el));
		return () => {
			heroIO.disconnect();
			hideIO.disconnect();
		};
	}, []);

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					initial={{ y: "110%" }}
					animate={{ y: 0 }}
					exit={{ y: "110%" }}
					transition={{ duration: 0.28, ease: [0.2, 0.9, 0.1, 1] }}
					className="md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-kin-bg via-kin-bg/90 to-transparent"
				>
					<KinLink
						href="/pre-order"
						onClick={() => trackUI("cta_reserve", { position: "sticky_bar" })}
						className="kin-chamfer kin-chamfer-sm flex h-14 items-center justify-between bg-kin-accent px-5 text-kin-accent-ink"
					>
						<span className="kin-num text-[14px]">{nav.sticky.label}</span>
						<span className="flex items-center gap-2 font-display font-semibold">
							{nav.sticky.cta} <ArrowRight />
						</span>
					</KinLink>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
