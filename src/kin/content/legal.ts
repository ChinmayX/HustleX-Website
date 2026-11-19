// ─────────────────────────────────────────────────────────────────────────────
// Legal drafts. DRAFT: review before launch (have a lawyer check them).
// They read from config so the offer, refund and shipping terms always match
// what the rest of the site says.
// ─────────────────────────────────────────────────────────────────────────────

import { balanceDue, isTodo, kinConfig, orTBA } from "@/kin/config";
import { formatINR } from "@/kin/lib/format";
import { company } from "@/shared/company";

export type LegalBlock = string | { list: string[] };
export type LegalDoc = {
	title: string;
	description: string;
	updated: string;
	draft: boolean;
	intro?: string;
	sections: { heading: string; body: LegalBlock[] }[];
};

const reserve = formatINR(kinConfig.reservationAmount);
const founder = formatINR(kinConfig.founderPrice);
const regular = formatINR(kinConfig.regularPrice);
const balance = formatINR(balanceDue);
const ship = orTBA(kinConfig.shipWindow, "the ship window announced on the Kin website");
const contactLine = [
	kinConfig.supportEmail && `email ${kinConfig.supportEmail}`,
	kinConfig.supportWhatsapp && `WhatsApp +${kinConfig.supportWhatsapp.replace(/\D/g, "")}`,
]
	.filter(Boolean)
	.join(" or ");
const contact = contactLine || "the contact details on our Contact page";
const entity = `${company.legalEntity} (“we”, “us”), ${company.address.join(", ")}`;

export const DRAFT_BANNER = "DRAFT: review before launch";
const UPDATED = "2026-11-19";

export const terms: LegalDoc = {
	title: "Terms & conditions",
	description: "Terms for Kin pre-orders and use of this website.",
	updated: UPDATED,
	draft: true,
	intro: `These terms apply to reservations (pre-orders) of Kin, a product of ${company.parentBrand}, operated by ${entity}. By placing a reservation you agree to them.`,
	sections: [
		{
			heading: "1. Kin is a pre-order product in development",
			body: [
				"Kin is in active development. When you reserve, you are reserving a unit that has not yet been manufactured.",
				"Specifications, features and accuracy figures shown on the website are design targets unless explicitly marked as measured. They may change as development continues. We'll tell you about material changes before you pay the balance.",
			],
		},
		{
			heading: "2. The reservation",
			body: [
				`A reservation costs ${reserve} (inclusive of applicable taxes), paid online through our payment partner Razorpay.`,
				`It secures one Kin unit and the price applicable at the time of your reservation. It is not the full price of the product.`,
				"Each reservation is for one unit. You may place more than one reservation intentionally.",
			],
		},
		{
			heading: "3. Founders pricing",
			body: [
				`The first ${kinConfig.founderBatchSize} paid reservations are “Founders” reservations. Founders lock a total price of ${founder} (inclusive of GST). Once ${kinConfig.founderBatchSize} Founders reservations are paid, later reservations are priced at ${regular}${kinConfig.afterBatchBehaviour === "waitlist_only" ? " or offered a waitlist place instead" : ""}.`,
				"Founders numbers are assigned in the order payments are confirmed by our payment partner, not the order forms are started.",
				"Founders perks are listed on the Kin website at the time of reservation.",
			],
		},
		{
			heading: "4. Balance payment",
			body: [
				`Before we ship, you'll be asked to pay the balance (for Founders, ${balance}: the total price minus your reservation). We'll notify you by WhatsApp and email with a payment link and a deadline.`,
				"If you don't pay the balance by the deadline, we may cancel your reservation and refund your reservation amount.",
			],
		},
		{
			heading: "5. Cancellation, delays and refunds",
			body: [
				kinConfig.refundable
					? `You can cancel your reservation and get a full refund of ${reserve} any time before your unit ships. See our Refund & cancellation policy.`
					: "See our Refund & cancellation policy.",
				`We aim to ship ${ship}. Hardware timelines can slip. If we are delayed, we'll tell you, and you can cancel for a full refund of your reservation.`,
				"If we decide not to proceed with Kin for any reason, we will refund your reservation amount in full.",
			],
		},
		{
			heading: "6. Liability",
			body: [
				"Kin is a training aid, not a medical device. Train within your limits and follow safe lifting practice.",
				"To the extent permitted by law, our total liability relating to a reservation is limited to the amount you have paid us for it.",
			],
		},
		{
			heading: "7. Governing law",
			body: [
				"These terms are governed by the laws of India. Courts in Bengaluru, Karnataka have exclusive jurisdiction.",
			],
		},
		{
			heading: "8. Company details",
			body: [
				`${company.legalEntity}, ${company.address.join(", ")}.${company.cin ? ` CIN ${company.cin}.` : ""}${company.gstin ? ` GSTIN ${company.gstin}.` : ""}`,
				`Questions: ${contact}.`,
			],
		},
	],
};

export const refunds: LegalDoc = {
	title: "Refund & cancellation policy",
	description: "How Kin reservation refunds and cancellations work.",
	updated: UPDATED,
	draft: true,
	sections: [
		{
			heading: "Reservations",
			body: [
				kinConfig.refundable
					? `Your ${reserve} reservation is fully refundable any time before your unit ships. No questions asked.`
					: `Your ${reserve} reservation is non-refundable except where required by law or where we cancel or materially delay the product.`,
				"If we cancel the product, or you cancel because of a delay we've announced, you get a full refund of everything you've paid.",
			],
		},
		{
			heading: "How to request a refund",
			body: [
				`Contact us (${contact}) with the email and WhatsApp number you reserved with. Your Founders number helps, if you have one.`,
				`Refunds go back to the original payment method. Once we've processed it, it usually takes ${kinConfig.refundTimeline} to reach you, depending on your bank or UPI app.`,
				"If you cancel a Founders reservation, the Founders number and price are released and can't be reinstated.",
			],
		},
		{
			heading: "Balance payments",
			body: [
				"If you've paid the balance and cancel before your unit ships, we'll refund the full amount you've paid.",
			],
		},
		{
			heading: "After delivery",
			body: [
				"Returns and warranty terms for delivered units will be published before shipping begins. TODO: confirm returns window and warranty period.",
			],
		},
	],
};

export const shipping: LegalDoc = {
	title: "Shipping & delivery policy",
	description: "Where and when Kin ships.",
	updated: UPDATED,
	draft: true,
	sections: [
		{
			heading: "Where we ship",
			body: [
				"We ship across India. We don't ship outside India for the first batches.",
			],
		},
		{
			heading: "When we ship",
			body: [
				isTodo(kinConfig.shipWindow)
					? "The ship window for each batch will be announced on the Kin website and sent to everyone who has reserved."
					: `The Founders batch is planned to ship ${kinConfig.shipWindow}.`,
				"Units ship in order of reservation within each batch, once the balance is paid.",
			],
		},
		{
			heading: "How dispatch is communicated",
			body: [
				"We'll confirm your delivery address before dispatch, then send tracking details by WhatsApp and email when your unit ships.",
				"Delivery charges, if any, will be shown before you pay the balance. TODO: confirm whether shipping is free.",
			],
		},
		{
			heading: "Address changes",
			body: [
				`You can change your delivery address any time before dispatch. Contact us: ${contact}.`,
			],
		},
	],
};

export const privacy: LegalDoc = {
	title: "Privacy policy",
	description: "What Kin collects, why, and your rights.",
	updated: UPDATED,
	draft: true,
	intro: `This policy explains how ${entity} handles personal data on the Kin website, in line with India's Digital Personal Data Protection Act, 2023.`,
	sections: [
		{
			heading: "What we collect",
			body: [
				{
					list: [
						"Reservation form: name, WhatsApp number, email, pincode, city and state, what you train on, your phone type, how you heard about Kin, and your consent choices.",
						"Waitlist: name, WhatsApp number, email and consent choice.",
						"Payment: payment ID, method and amount from Razorpay. We never see or store your card, UPI PIN or bank credentials.",
						"Attribution: campaign parameters (UTM), referral code, referring page and landing page, browser user agent, and timestamps.",
						"Analytics: pages viewed and interactions, through privacy-friendly analytics and, if enabled, the Meta Pixel.",
					],
				},
			],
		},
		{
			heading: "Why we use it",
			body: [
				{
					list: [
						"To process and manage your reservation, payment, balance payment and delivery.",
						"To send order updates on WhatsApp and email (you consent to this when reserving).",
						"To send Kin news and offers, only if you opted in. You can opt out any time.",
						"To understand which channels bring people to Kin and improve the website.",
						"To meet legal, tax and accounting obligations (e.g. GST invoices).",
					],
				},
			],
		},
		{
			heading: "Who processes it for us",
			body: [
				"Razorpay (payments), our transactional email provider, our hosting provider (Vercel), WhatsApp (messages), Meta (advertising measurement, if enabled), and India Post's public pincode directory (to autofill your city from your pincode). Each only receives what it needs.",
			],
		},
		{
			heading: "How long we keep it",
			body: [
				"Reservation and payment records are kept as long as needed for your order and as required by tax law (generally 8 years). Waitlist and marketing data are kept until you ask us to delete them or unsubscribe.",
			],
		},
		{
			heading: "Your rights",
			body: [
				`You can ask to access, correct or delete your data, withdraw consent, or raise a grievance. Contact us: ${contact}. We'll respond within 30 days.`,
			],
		},
	],
};

export const legalDocs = { terms, privacy, refunds, shipping };
