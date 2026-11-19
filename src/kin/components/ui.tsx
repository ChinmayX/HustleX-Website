import type { ComponentProps, ReactNode } from "react";

import Link from "next/link";

import { kinPath } from "@/kin/config";
import { media } from "@/kin/media";

type ButtonVariant = "primary" | "ghost" | "ink";

const buttonBase =
	"kin-chamfer kin-chamfer-sm inline-flex items-center justify-center gap-2 font-display font-semibold tracking-[-0.01em] whitespace-nowrap transition-[background-color,color,transform] duration-200 ease-snap active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none";

const buttonVariants: Record<ButtonVariant, string> = {
	primary: "bg-kin-accent text-kin-accent-ink hover:bg-[color-mix(in_srgb,var(--kin-accent)_85%,white)]",
	ghost: "bg-white/[0.06] text-kin-fg hover:bg-white/[0.12] shadow-[inset_0_0_0_1px_var(--kin-line-strong)]",
	ink: "bg-kin-paper-fg text-kin-paper hover:bg-black",
};

const buttonSizes = { sm: "h-9 px-4 text-[14px]", md: "h-12 px-6 text-[15px]", lg: "h-14 px-7 text-base" };

export const buttonClass = (variant: ButtonVariant = "primary", size: keyof typeof buttonSizes = "md") =>
	`${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]}`;

/** Internal Kin link (path is relative to the Kin base path). */
export const KinLink = ({
	href,
	className,
	children,
	...rest
}: { href: string; className?: string; children: ReactNode } & Omit<
	ComponentProps<typeof Link>,
	"href"
>) => (
	<Link href={href.startsWith("http") || href.startsWith("#") ? href : kinPath(href)} className={className} {...rest}>
		{children}
	</Link>
);

export const ArrowRight = ({ className = "" }: { className?: string }) => (
	<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden className={className} fill="none">
		<path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
	</svg>
);

export const Check = ({ className = "" }: { className?: string }) => (
	<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden className={className} fill="none">
		<path d="m3 8.5 3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
	</svg>
);

export const Plus = ({ className = "" }: { className?: string }) => (
	<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden className={className} fill="none">
		<path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="1.5" />
	</svg>
);

/** Small mono tag, e.g. "In development", "target". */
export const Tag = ({
	children,
	tone = "muted",
	className = "",
}: {
	children: ReactNode;
	tone?: "muted" | "accent" | "paper";
	className?: string;
}) => {
	const tones = {
		muted: "text-kin-fg-2 shadow-[inset_0_0_0_1px_var(--kin-line-strong)]",
		accent: "text-kin-accent shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--kin-accent)_45%,transparent)]",
		paper: "text-kin-paper-fg-2 shadow-[inset_0_0_0_1px_var(--kin-paper-line)]",
	};
	return (
		<span className={`kin-label !text-[10px] inline-flex items-center h-5 px-1.5 ${tones[tone]} ${className}`}>
			{children}
		</span>
	);
};

/** Section eyebrow + headline. */
export const SectionHeader = ({
	label,
	headline,
	sub,
	className = "",
	tone = "dark",
}: {
	label: string;
	headline: string;
	sub?: string;
	className?: string;
	tone?: "dark" | "paper";
}) => (
	<header className={`max-w-3xl ${className}`}>
		<p className={`kin-label mb-4 ${tone === "paper" ? "text-kin-paper-fg-2" : "text-kin-fg-3"}`}>
			<span className={`mr-2 ${tone === "paper" ? "text-kin-paper-fg" : "text-kin-accent"}`} aria-hidden>
				■
			</span>
			{label}
		</p>
		<h2 className="font-display font-semibold tracking-[-0.035em] leading-[0.98] text-[clamp(36px,6vw,72px)]">
			{headline}
		</h2>
		{sub && (
			<p
				className={`mt-5 text-[17px] md:text-lg leading-relaxed max-w-xl ${
					tone === "paper" ? "text-kin-paper-fg-2" : "text-kin-fg-2"
				}`}
			>
				{sub}
			</p>
		)}
	</header>
);

export const Container = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
	<div className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8 ${className}`}>{children}</div>
);

/** Kin wordmark. Uses the logo-kin SVG once supplied; text wordmark until then. */
export const Wordmark = ({ byline, className = "" }: { byline?: string; className?: string }) => {
	const logo = media["logo-kin"].asset;
	return (
		<span className={`inline-flex items-baseline gap-2 ${className}`} data-media-slot="logo-kin">
			{logo && logo.kind === "svg" ? (
				// eslint-disable-next-line @next/next/no-img-element
				<img src={logo.src} width={logo.width} height={logo.height} alt="Kin" className="h-6 w-auto" />
			) : (
				<span className="font-display font-bold text-[22px] tracking-[-0.06em] leading-none">kin</span>
			)}
			{byline && <span className="kin-label !text-[10px] text-kin-fg-3 normal-case tracking-[0.02em]">{byline}</span>}
		</span>
	);
};
