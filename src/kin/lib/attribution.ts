"use client";

// First-touch attribution: stored on the first landing, attached to every form submit.
// localStorage is first-party and per-device; failures are swallowed (private mode etc.).

const KEY = "kin_attribution_v1";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
	ref?: string;
	referrer?: string;
	landing_path?: string;
	first_seen_at?: string;
};

export const captureAttribution = () => {
	try {
		const params = new URLSearchParams(window.location.search);
		const existing = readAttribution();
		const incoming: Attribution = {};
		for (const k of UTM_KEYS) {
			const v = params.get(k);
			if (v) incoming[k] = v.slice(0, 200);
		}
		const ref = params.get("ref");
		if (ref) incoming.ref = ref.slice(0, 40);

		if (!existing.first_seen_at) {
			window.localStorage.setItem(
				KEY,
				JSON.stringify({
					...incoming,
					referrer: document.referrer.slice(0, 500) || undefined,
					landing_path: window.location.pathname + window.location.search,
					first_seen_at: new Date().toISOString(),
				}),
			);
		} else if (incoming.ref && !existing.ref) {
			// A referral code arriving later still counts.
			window.localStorage.setItem(KEY, JSON.stringify({ ...existing, ref: incoming.ref }));
		}
	} catch {
		/* storage unavailable */
	}
};

export const readAttribution = (): Attribution => {
	try {
		return JSON.parse(window.localStorage.getItem(KEY) || "{}");
	} catch {
		return {};
	}
};
