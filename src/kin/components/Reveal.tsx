"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion } from "motion/react";

/** Fade/slide-in on scroll. Fast and mechanical; disabled under reduced motion. */
export const Reveal = ({
	children,
	delay = 0,
	y = 16,
	className,
	as = "div",
}: {
	children: ReactNode;
	delay?: number;
	y?: number;
	className?: string;
	as?: "div" | "li" | "p";
}) => {
	const reduce = useReducedMotion();
	const M = motion[as];
	if (reduce) {
		const T = as;
		return <T className={className}>{children}</T>;
	}
	return (
		<M
			className={className}
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "0px 0px -10% 0px" }}
			transition={{ duration: 0.4, delay, ease: [0.2, 0.9, 0.1, 1] }}
		>
			{children}
		</M>
	);
};
