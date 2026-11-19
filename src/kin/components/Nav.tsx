"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { nav } from "@/kin/content/home";
import { trackUI } from "@/kin/lib/analytics";

import { buttonClass, KinLink, Wordmark } from "./ui";

export const Nav = () => {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const on = () => setScrolled(window.scrollY > 8);
		on();
		window.addEventListener("scroll", on, { passive: true });
		return () => window.removeEventListener("scroll", on);
	}, []);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open]);

	const solid = scrolled || open;
	return (
		<header
			id="nav"
			className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
				solid
					? "bg-[color-mix(in_srgb,var(--kin-bg)_72%,transparent)] backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_0_var(--kin-line)]"
					: "bg-transparent"
			}`}
		>
			<nav aria-label="Main" className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 md:px-8">
				<KinLink href="/" aria-label="Kin by HustleX, home" className="shrink-0">
					<Wordmark byline={nav.byline} />
				</KinLink>

				<ul className="hidden md:flex items-center gap-8">
					{nav.links.map(l => (
						<li key={l.href}>
							<KinLink href={l.href} className="text-[14px] text-kin-fg-2 hover:text-kin-fg transition-colors duration-150">
								{l.label}
							</KinLink>
						</li>
					))}
				</ul>

				<div className="flex items-center gap-2">
					<KinLink
						href="/pre-order"
						onClick={() => trackUI("cta_reserve", { position: "nav" })}
						className={buttonClass("primary", "sm")}
					>
						{nav.reserve}
					</KinLink>
					<button
						type="button"
						className="md:hidden grid h-9 w-9 place-items-center text-kin-fg"
						aria-expanded={open}
						aria-controls="kin-mobile-menu"
						aria-label={open ? nav.close : nav.menu}
						onClick={() => setOpen(o => !o)}
					>
						<svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden>
							{open ? (
								<path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" />
							) : (
								<path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth="1.5" />
							)}
						</svg>
					</button>
				</div>
			</nav>

			<AnimatePresence>
				{open && (
					<motion.div
						id="kin-mobile-menu"
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.18 }}
						className="md:hidden border-t border-kin-line"
					>
						<ul className="px-4 py-3">
							{nav.links.map(l => (
								<li key={l.href}>
									<KinLink
										href={l.href}
										onClick={() => setOpen(false)}
										className="flex h-12 items-center font-display text-2xl font-semibold tracking-[-0.03em]"
									>
										{l.label}
									</KinLink>
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};
