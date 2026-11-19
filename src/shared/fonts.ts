import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";

// Shared type system (reusable by the future HustleX company site).
// next/font self-hosts and subsets these at build time, with font-display: swap.
// Exposed as CSS variables; see src/kin/styles/kin.css for how they're used.

export const fontDisplay = Inter_Tight({
	subsets: ["latin"],
	weight: ["500", "600", "700"],
	variable: "--ff-display",
	display: "swap",
});

export const fontText = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--ff-text",
	display: "swap",
});

export const fontMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--ff-mono",
	display: "swap",
});

export const fontVariables = `${fontDisplay.variable} ${fontText.variable} ${fontMono.variable}`;
