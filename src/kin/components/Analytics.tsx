"use client";

import { useEffect } from "react";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import Script from "next/script";

import { kinPath } from "@/kin/config";
import { newEventId, trackMeta } from "@/kin/lib/analytics";
import { captureAttribution } from "@/kin/lib/attribution";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Kin analytics: first-touch UTM capture, Vercel Analytics, Meta Pixel (only if
 * NEXT_PUBLIC_META_PIXEL_ID is set; otherwise nothing loads and trackMeta no-ops).
 */
export const KinAnalytics = () => {
	const pathname = usePathname();

	useEffect(() => {
		captureAttribution();
	}, []);

	useEffect(() => {
		if (!PIXEL_ID) return;
		window.fbq?.("track", "PageView");
		if (pathname === kinPath("/") || pathname === kinPath()) trackMeta("ViewContent", { content_name: "Kin" }, newEventId());
	}, [pathname]);

	return (
		<>
			<VercelAnalytics />
			{PIXEL_ID && (
				<Script id="meta-pixel" strategy="afterInteractive">
					{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');`}
				</Script>
			)}
		</>
	);
};
