import React from "react";

import type { Metadata } from "next";

import { GoogleAnalytics } from "@next/third-parties/google";
import { IconoirProvider } from "iconoir-react";

import { outfit } from "@/ui/fonts";

// The original HustleX site. Parked while HUSTLEX_ROOT_REDIRECTS_TO_KIN is on
// (see src/middleware.ts). Nothing here is deleted; it comes back when the flag is off.

const title = "HustleX | Where Hustle Meets Rewards";
const description =
	"Not everyone gets rewarded for moving. But then again, not everyone is you. Earn Hustle Coins for every step, every streak, and every win. Redeem them for exclusive rewards. Make your fitness pay off.";
export const metadata: Metadata = {
	title,
	description,
	keywords: [
		"hustlex",
		"hustle",
		"rewards",
		"fitness",
		"health",
		"gamified",
		"app",
		"gym",
		"club",
	],
	robots: "index, follow",
	alternates: { canonical: "https://www.hustlex.club" },
	twitter: {
		card: "summary_large_image",
		site: "@hustlexclub",
		creator: "@hustlexclub",
		title,
		description,
		images: { url: "/favicon.ico", alt: title },
	},
	openGraph: {
		type: "website",
		url: "https://www.hustlex.club",
		title,
		description,
		images: { url: "/favicon.ico", alt: title },
	},
	appLinks: {
		ios: {
			app_store_id: "6740470392",
			url: "https://apps.apple.com/in/app/hustlex-rewards-ai-fitness/id6740470392",
			app_name: "HustleX",
		},
		android: {
			package: "com.hustlex.club",
			url: "https://play.google.com/store/apps/details?id=com.hustlex.club",
			app_name: "HustleX",
		},
	},
};

const HustleXLayout = (props: Readonly<{ children: React.ReactNode }>) => (
	<>
		<IconoirProvider iconProps={{ width: 24, height: 24 }}>
			<main className={outfit.className}>{props.children}</main>
		</IconoirProvider>
		<GoogleAnalytics gaId="G-HLK7XTH9J3" />
	</>
);
export default HustleXLayout;
