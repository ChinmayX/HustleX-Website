// ─────────────────────────────────────────────────────────────────────────────
// Kin business config: the single source of truth for prices, batch size,
// links and toggles. Components never hard-code any of these.
// Values marked TODO are undecided; the UI shows them as "TBA" until filled.
// ─────────────────────────────────────────────────────────────────────────────

import { company } from "@/shared/company";
import { siteUrl } from "@/shared/site";

export const TODO = "TODO";

export const kinConfig = {
	productName: "Kin",
	parentBrand: company.parentBrand,
	legalEntity: company.legalEntity,
	city: company.city,

	/** Where Kin lives. Change this (and move src/app/kin) to host Kin elsewhere. */
	basePath: "/kin",
	/** Canonical origin for Kin pages. Change to e.g. https://kin.hustlex.club later. */
	canonicalOrigin: siteUrl,

	currency: "INR",
	pricesIncludeGST: true,

	reservationAmount: 1000, // ₹ paid now to reserve
	founderPrice: 5999, // ₹ total price locked by reservation
	regularPrice: 8999, // ₹ price after the founder batch
	founderBatchSize: 100, // first N *paid* reservations get founderPrice
	balanceDueAt: "before shipping", // balance = price − reservation

	afterBatchBehaviour: "regular_price" as "regular_price" | "waitlist_only",

	shipWindow: TODO as string, // e.g. "Q2 2027"
	refundable: true, // TODO confirm; copy assumes "refundable any time before shipping"
	refundTimeline: "5–7 business days", // TODO confirm
	founderPerks: [
		// TODO confirm
		"Founder price locked: ₹5,999",
		"Numbered Founders unit",
		"Early access to the app and new features",
	],
	subscriptionNote: TODO as string, // app subscription model undecided; FAQ reads this

	whatsappCommunityUrl: process.env.NEXT_PUBLIC_KIN_WHATSAPP_COMMUNITY_URL || "",
	supportWhatsapp: process.env.NEXT_PUBLIC_KIN_SUPPORT_WHATSAPP || "", // E.164 digits, e.g. 9198xxxxxxxx
	instagramUrl: "", // TODO handle
	supportEmail: "", // TODO
	supportPhone: "", // optional
	businessHours: "Mon–Sat, 10am–7pm IST", // TODO confirm
	appStoreUrl: "", // hide badge if empty
	playStoreUrl: "", // hide badge if empty

	showLiveCounter: true, // "NN of 100 founder spots left"
	counterHideAbove: null as number | null, // e.g. 60 → only show once fewer than 60 remain

	/** Payments aren't wired up yet (frontend-only build). The pre-order form validates but doesn't charge. */
	paymentsLive: false,

	/** Off by default: tiny vibration at the clip-on "snap" moment (Android, tied to user scroll). */
	clipHaptics: false,
};

/**
 * Preview mode: shows labels on empty media slots and a "sample data" tag on
 * placeholder numbers. Set NEXT_PUBLIC_SHOW_MEDIA_PLACEHOLDER_LABELS=false for a clean preview.
 */
export const showPlaceholderLabels = process.env.NEXT_PUBLIC_SHOW_MEDIA_PLACEHOLDER_LABELS !== "false";

/** True when a config value is still an undecided placeholder. */
export const isTodo = (v: unknown) => v === TODO || v === "" || v == null;

/** Display helper for TODO values. */
export const orTBA = (v: string, fallback = "TBA") => (isTodo(v) ? fallback : v);

// Derived values (computed, never stored)
export const balanceDue = kinConfig.founderPrice - kinConfig.reservationAmount;

/** Prefix a path with Kin's base path: kinPath("/pre-order") → "/kin/pre-order". */
export const kinPath = (p = "") =>
	`${kinConfig.basePath}${p === "/" ? "" : p.startsWith("/#") ? p.slice(1) : p}`;
export const kinUrl = (p = "") => `${kinConfig.canonicalOrigin}${kinPath(p)}`;

export const whatsappSupportLink = () =>
	kinConfig.supportWhatsapp ? `https://wa.me/${kinConfig.supportWhatsapp.replace(/\D/g, "")}` : "";
