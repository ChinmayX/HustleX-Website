import type { ReactNode } from "react";

import type { Metadata } from "next";

import "@/kin/styles/kin.css";

import { KinAnalytics } from "@/kin/components/Analytics";
import { WaitlistProvider } from "@/kin/components/Waitlist";
import { kinUrl } from "@/kin/config";
import { seo } from "@/kin/content/home";
import { media } from "@/kin/media";
import { fontVariables } from "@/shared/fonts";

const og = media["og-image"].asset;
const ogImages = og && og.kind === "image" ? [{ url: og.src, width: 1200, height: 630, alt: seo.title }] : undefined;

export const metadata: Metadata = {
	title: { default: seo.title, template: "%s · Kin by HustleX" },
	description: seo.description,
	robots: { index: true, follow: true },
	alternates: { canonical: kinUrl() },
	openGraph: {
		type: "website",
		siteName: "Kin by HustleX",
		url: kinUrl(),
		title: seo.title,
		description: seo.description,
		images: ogImages,
		locale: "en_IN",
	},
	twitter: {
		card: "summary_large_image",
		title: seo.title,
		description: seo.description,
		images: ogImages,
	},
};

const KinLayout = ({ children }: { children: ReactNode }) => (
	<div className={`kin-root ${fontVariables} min-h-screen`}>
		<a
			href="#main"
			className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-kin-accent focus:px-4 focus:py-2 focus:text-kin-accent-ink"
		>
			Skip to content
		</a>
		<WaitlistProvider>{children}</WaitlistProvider>
		<KinAnalytics />
	</div>
);
export default KinLayout;
