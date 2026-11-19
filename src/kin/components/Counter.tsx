"use client";

import { motion } from "motion/react";

import { showPlaceholderLabels } from "@/kin/config";
import { counter } from "@/kin/content/home";
import { counterVisible, useStock, type Stock } from "@/kin/lib/stock";

const fill = (tpl: string, s: Stock) =>
	tpl.replace("{remaining}", String(s.remaining)).replace("{total}", String(s.founderBatchSize));

const SampleTag = ({ stock }: { stock: Stock }) =>
	stock.sample && showPlaceholderLabels ? (
		<span className="kin-label !text-[9px] text-kin-fg-3 ml-1.5">({counter.sampleTag})</span>
	) : null;

/**
 * "63 of 100 founder spots left" chip. Hidden (renders a fixed-height spacer)
 * while loading, on error, or when config says so: never shows a wrong number.
 */
export const CounterChip = ({ className = "" }: { className?: string }) => {
	const stock = useStock();
	if (!counterVisible(stock)) return <span className={`inline-block h-8 ${className}`} aria-hidden />;
	const full = stock.remaining === 0;
	return (
		<motion.span
			initial={{ opacity: 0, y: 4 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.25, ease: [0.2, 0.9, 0.1, 1] }}
			className={`inline-flex items-center gap-2 h-8 px-3 bg-white/[0.05] shadow-[inset_0_0_0_1px_var(--kin-line)] kin-chamfer kin-chamfer-sm ${className}`}
			aria-live="polite"
		>
			<span className={`h-1.5 w-1.5 bg-kin-accent ${full ? "" : "kin-live-dot"}`} aria-hidden />
			<span className="kin-num text-[13px] text-kin-fg">
				{full ? counter.full : fill(counter.chip, stock)}
			</span>
			<SampleTag stock={stock} />
		</motion.span>
	);
};

/** Progress bar + "NN of 100 left" for the Founders section and order summary. */
export const CounterBar = ({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "paper" }) => {
	const stock = useStock();
	if (!counterVisible(stock)) return null;
	const taken = stock.paid / stock.founderBatchSize;
	return (
		<div className={className}>
			<div className="flex items-baseline justify-between mb-2">
				<span className={`kin-num text-sm ${tone === "paper" ? "text-kin-paper-fg" : "text-kin-fg"}`}>
					{stock.remaining === 0 ? counter.full : fill(counter.bar, stock)}
					<SampleTag stock={stock} />
				</span>
				<span className={`kin-label ${tone === "paper" ? "text-kin-paper-fg-2" : "text-kin-fg-3"}`}>
					{stock.paid}/{stock.founderBatchSize}
				</span>
			</div>
			<div
				className={`h-1.5 w-full overflow-hidden ${tone === "paper" ? "bg-black/10" : "bg-white/[0.08]"}`}
				role="progressbar"
				aria-valuemin={0}
				aria-valuemax={stock.founderBatchSize}
				aria-valuenow={stock.paid}
				aria-label="Founders spots taken"
			>
				<motion.div
					className="h-full bg-kin-accent origin-left"
					initial={{ scaleX: 0 }}
					whileInView={{ scaleX: taken }}
					viewport={{ once: true }}
					transition={{ duration: 0.9, ease: [0.2, 0.9, 0.1, 1] }}
				/>
			</div>
		</div>
	);
};

/** Current price + whether the Founders batch is full, for copy switches. */
export const useOffer = () => {
	const stock = useStock();
	return { stock, full: !!stock && stock.remaining === 0 };
};
