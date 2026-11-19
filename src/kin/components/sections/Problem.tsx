"use client";

import { useRef } from "react";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { problem } from "@/kin/content/home";

import { Container } from "../ui";

/** One line that lights up as it scrolls into the middle of the screen. */
const Line = ({ text }: { text: string }) => {
	const ref = useRef<HTMLParagraphElement>(null);
	const reduce = useReducedMotion();
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.45"] });
	const opacity = useTransform(scrollYProgress, [0, 1], [0.14, 1]);
	const y = useTransform(scrollYProgress, [0, 1], [24, 0]);
	return (
		<motion.p
			ref={ref}
			style={reduce ? undefined : { opacity, y }}
			className="max-w-[15ch] font-display font-semibold tracking-[-0.045em] leading-[0.98] text-[clamp(40px,7.4vw,104px)] text-balance"
		>
			{text}
		</motion.p>
	);
};

export const Problem = () => (
	<section id="problem" aria-label={problem.label} className="py-28 md:py-44">
		<Container>
			<p className="kin-label text-kin-fg-3 mb-10">
				<span className="text-kin-accent mr-2" aria-hidden>
					■
				</span>
				{problem.label}
			</p>
			<div className="space-y-10 md:space-y-16">
				{problem.lines.map(l => (
					<Line key={l} text={l} />
				))}
			</div>
		</Container>
	</section>
);
