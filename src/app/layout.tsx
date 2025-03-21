import React from "react";

import type { Metadata } from "next";

import "../ui/globals.css";

import { IconoirProvider } from "iconoir-react";

import { outfit } from "../ui/ui";

const title = "HustleX | Where Hustle Meets Rewards";
const description =
	"Not everyone gets rewarded for moving. But then again, not everyone is you. Earn Hustle Coins for every step, every streak, and every win. Redeem them for exclusive rewards. Make your fitness pay off.";
export const metadata: Metadata = {
	title,
	description,
	keywords: ["hustlex", "hustle", "rewards", "fitness", "health", "gamified", "app", "gym"],
	robots: "index, follow",
	icons: "/favicon.ico",
	creator: "XElite Studios Pvt. Ltd.",
	alternates: { canonical: "https://www.hustlex.club" },
	metadataBase: new URL("https://www.hustlex.club"),
	twitter: {
		card: "summary_large_image",
		site: "@hustlexclub",
		creator: "@ChinmayPDev",
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
			app_store_id: "123456789",
			url: "https://apps.apple.com/app/id/123456789",
			app_name: "HustleX",
		},
		android: {
			package: "com.hustlex.club",
			url: "https://play.google.com/store/apps/details?id=com.hustlex.club",
			app_name: "HustleX",
		},
	},
};

export default function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" />
				<title>HustleX | Where Hustle Meets Rewards</title>
			</head>
			<body>
				<IconoirProvider iconProps={{ width: 24, height: 24 }}>
					<main className={outfit.className}>{props.children}</main>
				</IconoirProvider>
			</body>
		</html>
	);
}
