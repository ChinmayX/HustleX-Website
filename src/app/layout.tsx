import React from "react";

import type { Metadata, Viewport } from "next";

import "@/ui/globals.css";

import { siteUrl } from "@/shared/site";

// Shared shell for every brand on the domain (HustleX, Kin, future products).
// Brand-specific metadata, fonts and analytics live in each brand's own layout:
//   src/app/(hustlex)/layout.tsx  and  src/app/kin/layout.tsx
export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	icons: "/favicon.ico",
	creator: "XElite Studios Pvt. Ltd.",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#0b0b0c",
};

const RootLayout = (props: Readonly<{ children: React.ReactNode }>) => (
	<html lang="en">
		<body>{props.children}</body>
	</html>
);
export default RootLayout;
