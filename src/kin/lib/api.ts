"use client";

// ─────────────────────────────────────────────────────────────────────────────
// FRONTEND STUBS. The backend (database, Razorpay, email) is not built yet.
// Every function here has the shape the real endpoint will have, so wiring the
// backend later only means replacing these bodies with fetch() calls:
//   submitWaitlist      → POST /api/kin/waitlist
//   startReservation    → POST /api/kin/reserve  (save lead, create Razorpay order)
//   getReservation      → GET  /api/kin/reservation?r=<public token>
//   lookupReservation   → POST /api/kin/reservation/lookup
// ─────────────────────────────────────────────────────────────────────────────

import type { Attribution } from "@/kin/lib/attribution";

const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

export type WaitlistInput = {
	name: string;
	email: string;
	whatsapp_e164: string;
	consent_marketing: boolean;
	attribution: Attribution;
	website?: string; // honeypot
};

export const submitWaitlist = async (
	_input: WaitlistInput,
): Promise<{ ok: true } | { ok: false; error: string }> => {
	await wait(700);
	// TODO(backend): POST /api/kin/waitlist
	return { ok: true };
};

export type ReservationInput = {
	name: string;
	whatsapp_e164: string;
	email: string;
	pincode: string;
	city: string;
	state: string;
	trains_on: "barbell" | "machines" | "both";
	phone_os: "ios" | "android";
	heard_from: string;
	heard_from_other: string;
	consent_updates: boolean;
	consent_marketing: boolean;
	terms_accepted: boolean;
	attribution: Attribution;
	user_agent: string;
	website?: string; // honeypot
};

export type StartReservationResult =
	| { ok: true; reservationToken: string; razorpayOrderId: string; keyId: string; amountPaise: number }
	| { ok: false; reason: "payments_not_live" | "duplicate" | "error"; founderNumber?: number; message?: string };

export const startReservation = async (
	_input: ReservationInput,
): Promise<StartReservationResult> => {
	await wait(800);
	// TODO(backend): POST /api/kin/reserve, then open Razorpay Checkout with the returned order.
	return { ok: false, reason: "payments_not_live" };
};

export type ReservationView = {
	status: "started" | "payment_verified_client" | "paid" | "failed" | "refunded" | "cancelled";
	isFounder: boolean;
	founderNumber: number | null;
	amountPaid: number;
	lockedPrice: number;
	refCode: string;
};

/** Preview tokens so the success page states can be seen before the backend exists. */
const PREVIEW: Record<string, ReservationView> = {
	demo: {
		status: "paid",
		isFounder: true,
		founderNumber: 23,
		amountPaid: 1000,
		lockedPrice: 5999,
		refCode: "ABC123",
	},
	"demo-regular": {
		status: "paid",
		isFounder: false,
		founderNumber: null,
		amountPaid: 1000,
		lockedPrice: 8999,
		refCode: "XYZ789",
	},
	"demo-confirming": {
		status: "payment_verified_client",
		isFounder: false,
		founderNumber: null,
		amountPaid: 1000,
		lockedPrice: 5999,
		refCode: "",
	},
};

export const getReservation = async (token: string): Promise<ReservationView | null> => {
	await wait(400);
	// TODO(backend): GET /api/kin/reservation?r=<token>. Look up by unguessable public token only.
	return PREVIEW[token] ?? null;
};

export const lookupReservation = async (_email: string, _whatsapp: string) => {
	await wait(700);
	// TODO(backend): POST /api/kin/reservation/lookup → emails the person their status link.
	return { ok: false as const, reason: "not_live" as const };
};
