"use client";

import { track as vercelTrack } from "@vercel/analytics";

// Thin, no-op-safe tracking layer. Meta Pixel is only present when
// NEXT_PUBLIC_META_PIXEL_ID is set (see components/Analytics.tsx).
// Server-side Conversions API + dedup lands with the backend.

type MetaEvent = "ViewContent" | "InitiateCheckout" | "Lead" | "Purchase";

declare global {
	interface Window {
		fbq?: (...args: unknown[]) => void;
	}
}

export const newEventId = () =>
	typeof crypto !== "undefined" && "randomUUID" in crypto
		? crypto.randomUUID()
		: `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const trackMeta = (event: MetaEvent, params?: Record<string, unknown>, eventId?: string) => {
	try {
		window.fbq?.("track", event, params ?? {}, eventId ? { eventID: eventId } : undefined);
	} catch {
		/* no-op */
	}
};

/** Product analytics: section reach, toggle use, CTA clicks by position. */
export const trackUI = (name: string, props?: Record<string, string | number | boolean>) => {
	try {
		vercelTrack(name, props);
	} catch {
		/* no-op */
	}
};
