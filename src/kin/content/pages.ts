// Copy for About, Contact, pre-order, success and status pages.

import { balanceDue, kinConfig, orTBA } from "@/kin/config";
import { formatINR } from "@/kin/lib/format";
import { company } from "@/shared/company";

const reserve = formatINR(kinConfig.reservationAmount);

export const about = {
	title: "About",
	description: `Kin is built by ${company.legalEntity} in Bengaluru, the company behind ${company.parentBrand}.`,
	label: "About",
	headline: "Built in Bengaluru, for people who lift.",
	sections: [
		{
			heading: company.legalEntity,
			body: `${company.legalEntity} is a Bengaluru company building fitness hardware and software. ${company.parentBrand} is our consumer brand; Kin is its first piece of hardware.`,
		},
		{
			heading: company.parentBrand,
			body: `${company.parentBrand} started as a fitness rewards app. We're now building a family of products for people who train seriously: Kin first, more to follow.`,
		},
		{
			heading: "Why Kin",
			body: "Serious lifters want their data, but nobody wants to type sets between reps. Lab-grade velocity trackers are expensive and fiddly. Kin sits in between: clip it on, lift, and your set is already logged.",
		},
		{
			heading: "How we work",
			body: "We test against lab-grade references, publish what we find, and label anything unproven as a target. If something slips, you'll hear it from us first.",
		},
	],
	founderLabel: "Founder",
	// TODO founder to confirm
	founderName: "Chinmay P Dev",
	founderTitle: "Founder, HustleX",
};

export const contact = {
	title: "Contact",
	description: "Get in touch with the Kin team.",
	label: "Contact",
	headline: "Talk to a human.",
	sub: "Questions about Kin, your reservation, or your gym? Message us.",
	whatsapp: "WhatsApp",
	email: "Email",
	phone: "Phone",
	hours: "Hours",
	address: "Registered office",
	todo: "TBA",
	form: {
		title: "Send a message",
		name: "Name",
		email: "Email",
		message: "Message",
		submit: "Open in email",
		note: "This opens your email app with the message filled in.",
		noEmail: "Our support email will be listed here soon.",
	},
};

export const preorder = {
	title: "Reserve Kin",
	description: `Reserve your Kin Founders unit for ${reserve}. Refundable any time before shipping.`,
	back: "Back to Kin",
	help: "Need help?",
	summary: {
		label: "Order summary",
		item: "Kin · Founders unit",
		itemRegular: "Kin",
		total: "Total price",
		today: "Pay today",
		balance: "Balance",
		balanceWhen: `before shipping`,
		refund: kinConfig.refundable
			? `Your ${reserve} is refundable any time before shipping.`
			: "See the refund policy.",
		ship: `Ships ${orTBA(kinConfig.shipWindow, "soon")}`,
		gst: "Prices include GST.",
	},
	form: {
		title: "Your details",
		sub: "We'll use these to keep you posted and to ship your Kin.",
		name: "Full name",
		whatsapp: "WhatsApp number",
		whatsappHint: "Order updates come here.",
		email: "Email",
		pincode: "Pincode",
		city: "City",
		cityHint: "Filled in from your pincode when possible.",
		trainsOn: "What do you train on?",
		trainsOnOptions: [
			{ value: "barbell", label: "Barbell" },
			{ value: "machines", label: "Machines" },
			{ value: "both", label: "Both" },
		],
		phoneOs: "Your phone",
		phoneOsOptions: [
			{ value: "android", label: "Android" },
			{ value: "ios", label: "iPhone" },
		],
		heardFrom: "How did you hear about Kin?",
		heardFromOptions: ["Instagram", "Friend", "Gym", "Creator", "Other"],
		heardFromOther: "Tell us where",
		consentUpdates: "I agree to receive order updates on WhatsApp and email.",
		consentMarketing: "Also send me Kin news and offers.",
		termsPre: "I agree to the pre-order ",
		termsLink: "Terms",
		termsMid: " and ",
		refundLink: "Refund policy",
		submit: `Pay ${reserve} and reserve`,
		submitting: "Saving your details…",
		secure: "Secure checkout by Razorpay · UPI, cards, netbanking",
	},
	errors: {
		name: "Please enter your full name.",
		whatsapp: "Enter a valid WhatsApp number (10 digits for India).",
		email: "Enter a valid email address.",
		pincode: "Enter a 6-digit pincode.",
		city: "Please enter your city.",
		trainsOn: "Pick one.",
		phoneOs: "Pick one.",
		consentUpdates: "We need this to send you order updates.",
		terms: "Please accept the terms to continue.",
		generic: "Something went wrong. Please try again.",
	},
	notLive: {
		title: "Reservations open soon.",
		body: "Payments aren't live yet, so nothing has been charged. Join the waitlist and we'll tell you the moment reservations open.",
		cta: "Join the waitlist",
		preview: "Preview the success page",
	},
	failed: {
		title: "Payment didn't go through.",
		body: "No money was taken. Your details are saved, so you can try again.",
		retry: "Try again",
		whatsapp: "Having trouble? Message us on WhatsApp",
		inApp: "Payment window not opening? Open this page in your browser (⋯ → Open in browser) and try again.",
	},
	duplicate: (n: number) => `You've already reserved Founder #${String(n).padStart(3, "0")}. Want to reserve another unit?`,
	duplicateConfirm: "Yes, reserve another",
};

export const success = {
	title: "You're in",
	loading: "Looking up your reservation…",
	confirming: "Payment received, confirming…",
	confirmingSub: "This usually takes a few seconds. You can safely refresh.",
	headlineFounder: (n: string) => `You're in. Founder ${n}.`,
	headline: "You're in.",
	paid: "Paid today",
	locked: "Your price",
	balance: "Balance due",
	balanceWhen: "before shipping",
	ship: "Ships",
	shipValue: orTBA(kinConfig.shipWindow, "to be announced"),
	refund: kinConfig.refundable
		? `Your ${reserve} is refundable any time before shipping.`
		: "See the refund policy.",
	whatsapp: "Join the WhatsApp updates",
	referTitle: "Bring a training partner",
	referBody: "Share your link. We're tracking referrals now; rewards to be announced.",
	copy: "Copy link",
	copied: "Copied",
	shareWhatsapp: "Share on WhatsApp",
	shareText: "I just reserved Kin: it clips on the bar and logs every rep. Check it out:",
	email: "Check your email for the confirmation.",
	notFoundTitle: "We couldn't find that reservation.",
	notFoundBody: "If you've just paid, give it a minute and refresh. Otherwise, try reserving again or message us.",
	retry: "Back to reservation",
	previewNote: "Preview data: the backend isn't connected yet.",
	balanceFor: (locked: number) => formatINR(locked - kinConfig.reservationAmount),
};

export const status = {
	title: "Reservation status",
	description: "Look up your Kin reservation.",
	headline: "Check your reservation.",
	sub: "Enter the email and WhatsApp number you reserved with. We'll send your status link to that email.",
	submit: "Send my status link",
	notLive: "Lookups open when reservations do. Until then, there's nothing to look up.",
	sent: "If we find a reservation, we'll email you a link in a minute.",
};

export const balanceText = formatINR(balanceDue);
