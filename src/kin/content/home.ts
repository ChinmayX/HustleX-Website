// ─────────────────────────────────────────────────────────────────────────────
// /kin page copy. Edit words here; components only lay them out.
// Prices, counts and links come from src/kin/config.ts, never typed in here.
// ─────────────────────────────────────────────────────────────────────────────

import { balanceDue, kinConfig, orTBA } from "@/kin/config";
import { formatINR } from "@/kin/lib/format";
import type { SlotId } from "@/kin/media";

const reserve = formatINR(kinConfig.reservationAmount);
const founder = formatINR(kinConfig.founderPrice);
const regular = formatINR(kinConfig.regularPrice);
const balance = formatINR(balanceDue);
const ship = orTBA(kinConfig.shipWindow, "soon");

export const seo = {
	title: "Kin by HustleX: every rep, logged",
	description: `Kin clips onto any barbell or weight stack and logs every set for you: reps, bar speed, range of motion. Founders price ${founder}. Reserve for ${reserve}, refundable.`,
};

export const nav = {
	byline: "by HustleX",
	links: [
		{ label: "How it works", href: "/#how" },
		{ label: "App", href: "/#app" },
		{ label: "Specs", href: "/#specs" },
		{ label: "FAQ", href: "/#faq" },
	],
	reserve: "Reserve",
	menu: "Menu",
	close: "Close",
	sticky: { label: `Founders ${founder}`, cta: `Reserve ${reserve}` },
};

export const hero = {
	eyebrow: "Kin · Founders batch",
	headline: "Every rep, logged.",
	subhead:
		"Kin clips onto any barbell or weight stack and tracks every set for you: reps, bar speed, range of motion. No typing. Just lift.",
	priceLabel: "Founders price",
	regularNote: `${regular} after first ${kinConfig.founderBatchSize}`,
	primaryCta: `Reserve for ${reserve}`,
	waitlistCta: "Join the waitlist",
	filmCta: "Watch the film",
	trust: [
		"Refundable reservation",
		"UPI & cards",
		"Made in Bengaluru",
		`Ships ${ship}`,
	],
};

export const counter = {
	/** `{remaining}` and `{total}` are filled in from live data. */
	chip: "{remaining} of {total} founder spots left",
	bar: "{remaining} of {total} left",
	full: "Founders batch is full",
	sampleTag: "sample data",
};

export const problem = {
	label: "The problem",
	lines: [
		"You came to lift, not to type.",
		"Logging sets mid-workout breaks your focus.",
		"And “felt heavy” isn't data.",
	],
};

/** Set `holdsThroughDrops` true only once drop/rerack testing confirms it. */
export const contentFlags = {
	holdsThroughDrops: false,
	showTrustStrip: false,
	showBuildLog: true,
};

export const clip = {
	label: "Clip on",
	headline: "On the bar in a second.",
	toggle: { barbell: "Barbell", machine: "Machine" },
	captions: {
		barbell: [
			{ at: 0.15, text: "Magnetic. Snaps on in a second." },
			{ at: 0.45, text: "V-groove seats on any Olympic bar." },
			...(contentFlags.holdsThroughDrops
				? [{ at: 0.75, text: "Holds tight through drops and reracks." }]
				: []),
		],
		machine: [
			{ at: 0.15, text: "Magnetic. Snaps on in a second." },
			{ at: 0.45, text: "Flat magnetic base sits on any weight-stack plate." },
			{ at: 0.75, text: "Pick the station in the app, clip, go." },
		],
	},
	slots: {
		barbell: "clip-barbell-sequence" as SlotId,
		machine: "clip-stack-sequence" as SlotId,
	},
};

export const how = {
	label: "How it works",
	headline: "Clip. Lift. Logged.",
	steps: [
		{ n: "01", title: "Clip.", text: "Snap Kin onto the bar or the stack.", slot: "how-clip" as SlotId },
		{
			n: "02",
			title: "Lift.",
			text: "Train like you always do. Kin wakes when you start your workout.",
			slot: "how-lift" as SlotId,
		},
		{
			n: "03",
			title: "Logged.",
			text: "Reps, weight and quality land in your log automatically.",
			slot: "how-logged" as SlotId,
		},
	],
};

export type MetricStatus = "live" | "in-development";

export const metrics = {
	label: "What it measures",
	headline: "More than a rep counter.",
	sub: "Every rep becomes data you can train with.",
	inDevelopmentTag: "In development",
	liveTag: "Live",
	/**
	 * `status` is a hard rule: never flip a card to "live" until that metric
	 * is validated against the encoder rig. `size` controls the bento layout.
	 */
	cards: [
		{
			title: "Auto rep count",
			line: "Every rep counted. You just lift.",
			slot: "widget-reps" as SlotId,
			status: "in-development" as MetricStatus,
			size: "wide",
			stat: { value: "8", unit: "reps" },
		},
		{
			title: "Bar speed",
			line: "Peak and mean velocity, every rep.",
			slot: "widget-velocity" as SlotId,
			status: "in-development" as MetricStatus,
			size: "tall",
			stat: { value: "0.62", unit: "m/s" },
		},
		{
			title: "Range of motion",
			line: "See if you're hitting depth, set after set.",
			slot: "widget-rom" as SlotId,
			status: "in-development" as MetricStatus,
			size: "regular",
			stat: { value: "48", unit: "cm" },
		},
		{
			title: "Fatigue",
			line: "Know when the bar starts slowing down.",
			slot: "widget-fatigue" as SlotId,
			status: "in-development" as MetricStatus,
			size: "regular",
			stat: { value: "−18", unit: "%" },
		},
		{
			title: "Reps in reserve",
			line: "An honest estimate of what's left in the tank.",
			slot: "widget-rir" as SlotId,
			status: "in-development" as MetricStatus,
			size: "regular",
			stat: { value: "2", unit: "RIR" },
		},
		{
			title: "Auto-logged sets",
			line: "Sets, reps and weight logged for you.",
			slot: "widget-autolog" as SlotId,
			status: "in-development" as MetricStatus,
			size: "wide",
			stat: { value: "4×8", unit: "100 kg" },
		},
		{
			title: "Progress & PRs",
			line: "Watch strength trends build over weeks.",
			slot: "widget-progress" as SlotId,
			status: "in-development" as MetricStatus,
			size: "full",
			stat: { value: "+7.5", unit: "kg" },
		},
	] as const,
	sampleNote: "Figures on cards are illustrative.",
};

export const app = {
	label: "The app",
	headline: "The Kin app.",
	sub: "A workout tracker that fills itself in.",
	screens: [
		{ slot: "app-live-set" as SlotId, title: "Live set", text: "Live set view. Reps and bar speed in real time." },
		{ slot: "app-set-summary" as SlotId, title: "Set summary", text: "Every set summarised the moment you rack it." },
		{ slot: "app-history" as SlotId, title: "History", text: "Your whole training history, without typing a thing." },
		{ slot: "app-progress" as SlotId, title: "Progress", text: "Trends that tell you when to push and when to back off." },
		{ slot: "app-machines" as SlotId, title: "Machines", text: "Works with machines too. Pick the station, clip, go." },
	],
	storeLine: "Already lifting? Start logging in the Kin app today, free.",
	storeLabels: { appStore: "Download on the App Store", playStore: "Get it on Google Play" },
	storesSoon: "Coming soon to the App Store and Google Play.",
};

export const object = {
	label: "The object",
	headline: "Built to be carried.",
	body: "Shaped like a key fob. No buttons. USB-C. A lanyard tab so it lives on your keys, not in a drawer.",
	battery: "Charge it once, train all week.",
	batteryTag: "target",
	details: [
		{ slot: "object-detail-1" as SlotId, label: "Faceted cover" },
		{ slot: "object-detail-2" as SlotId, label: "V-groove" },
		{ slot: "object-detail-3" as SlotId, label: "USB-C + lanyard tab" },
	],
	carryHeadline: "The thing you carry to every session.",
	carryBody: "Keys. Earbuds. Kin. Clip it to your keyring or your gym bag and it's there when you need it.",
	turntableHint: "Drag to rotate",
};

export const proof = {
	label: "How we test",
	headline: "Measured against the real thing.",
	body: "We test Kin against a rotary encoder, a lab-grade reference, rep by rep.",
	/** Fill these in once validated. While empty, "Accuracy results coming soon" shows. */
	results: [] as { metric: string; value: string; detail: string }[],
	comingSoon: "Accuracy results coming soon",
	comingSoonSub: "We'll publish the numbers here, warts and all, once testing is done.",
	followCta: "Follow the build",
	buildLogLabel: "Build log",
};

export const founders = {
	label: "Founders batch",
	headline: `Founders batch: first ${kinConfig.founderBatchSize}`,
	regularLabel: "regular",
	perksTitle: "What you get",
	stepsTitle: "How it works",
	steps: [
		`Pay ${reserve} today to reserve your Founders unit.`,
		"We'll keep you posted on WhatsApp and email as we build.",
		`Before we ship, pay the balance of ${balance}.`,
		kinConfig.refundable
			? `Changed your mind? Your ${reserve} is refundable any time before shipping.`
			: `Your ${reserve} reservation is non-refundable. See the refund policy.`,
	],
	shipLabel: "Ships",
	ship: orTBA(kinConfig.shipWindow, "to be announced"),
	cta: `Reserve for ${reserve}`,
	fullHeadline: `Founders batch is full. Reserve at ${regular}`,
	fullWaitlistHeadline: "Founders batch is full. Join the waitlist",
	waitlistCta: "Join the waitlist",
};

export const founderNote = {
	label: "From the founder",
	// TODO founder to rewrite
	todo: "TODO founder to rewrite",
	paragraphs: [
		"I've spent years logging every set on my phone between reps. Half the time I'd forget, or guess. The data I cared about most, how fast the bar was moving, never made it in at all.",
		"Kin is the thing I wanted in my own bag: clip it on, lift, and the set is already logged when I rack the bar. We're building it in Bengaluru, testing it against lab-grade gear, and we'll be honest with you about what works and what doesn't yet.",
	],
	name: "Chinmay P Dev",
	title: "Founder, HustleX",
};

export const finalCta = {
	headline: "Lift more. Log nothing.",
	primary: `Reserve for ${reserve}`,
	secondary: "Join the waitlist",
};

export const trust = {
	/** Hidden until there's something real. Toggle with contentFlags.showTrustStrip. */
	stats: [
		{ value: "N", label: "testers" },
		{ value: "N", label: "gyms" },
	],
	quotes: [] as { quote: string; name: string; role: string }[],
	pressLabel: "As seen in",
};

export const footer = {
	promise: "Every rep, logged.",
	explore: "Explore",
	company: "Company",
	legal: "Legal",
	links: [
		{ label: "How it works", href: "/#how" },
		{ label: "App", href: "/#app" },
		{ label: "Specs", href: "/#specs" },
		{ label: "FAQ", href: "/#faq" },
	],
	companyLinks: [
		{ label: "About", href: "/about" },
		{ label: "Contact", href: "/contact" },
		{ label: "Reservation status", href: "/pre-order/status" },
	],
	legalLinks: [
		{ label: "Terms", href: "/legal/terms" },
		{ label: "Privacy", href: "/legal/privacy" },
		{ label: "Refunds", href: "/legal/refunds" },
		{ label: "Shipping", href: "/legal/shipping" },
	],
	social: "Instagram",
};

export const waitlist = {
	title: "Join the waitlist",
	sub: "Be the first to hear about Founders spots, batches and the app.",
	fields: { name: "Full name", whatsapp: "WhatsApp number", email: "Email" },
	consent: "Send me Kin updates and offers on WhatsApp and email. Unsubscribe any time.",
	consentError: "Please agree so we can tell you when spots open.",
	submit: "Join the waitlist",
	submitting: "Joining…",
	successTitle: "You're on the list.",
	successBody: "We'll tell you before anyone else.",
	community: "Join the WhatsApp Community",
	close: "Close",
	error: "Something went wrong. Please try again.",
};
