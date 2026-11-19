// FAQ. Answers read from config so they always match the offer and policies.
// Anything still undecided shows as "to be confirmed".

import { balanceDue, isTodo, kinConfig, orTBA } from "@/kin/config";
import { formatINR } from "@/kin/lib/format";

const reserve = formatINR(kinConfig.reservationAmount);
const tbc = "To be confirmed. We'll update this before launch.";

export const faq = {
	label: "FAQ",
	headline: "Questions, answered.",
	items: [
		{
			q: "Does it work with iPhone and Android?",
			a: "Yes. The Kin app is being built for both iOS and Android, and Kin connects over Bluetooth Low Energy.",
		},
		{
			q: "Which exercises does it track?",
			a: "Barbell lifts (squat, bench, deadlift, overhead press, rows, hip thrusts and more) with Kin seated on the bar, and machine exercises (lat pulldown, cable rows, leg press stacks, chest press and similar) with Kin on the weight-stack plate. We'll publish the full validated list as testing progresses.",
		},
		{
			q: "Will it stay on my bar during drops and reracks?",
			a: "That's exactly what we're testing now. Kin's magnets and V-groove are designed to hold through normal reracks; we'll only claim it survives drops once our testing shows it does.",
		},
		{
			q: "How long does the battery last?",
			a: "Our target is around 10 one-hour sessions per charge, charged over USB-C. That's a target, not a measurement yet.",
		},
		{
			q: "Do I need a subscription?",
			a: isTodo(kinConfig.subscriptionNote) ? tbc : kinConfig.subscriptionNote,
		},
		{
			q: "How accurate is it?",
			a: "We're validating every metric against a rotary encoder, a lab-grade reference, rep by rep. Until a metric is validated, it's marked “In development” on this page. We'll publish the numbers when they're in.",
		},
		{
			q: "Will my gym let me use it?",
			a: "Kin clips on and comes off in a second and doesn't modify any equipment, so most gyms won't mind. If yours has questions, show them this page or message us.",
		},
		{
			q: `What exactly am I paying ${reserve} for? Is it refundable?`,
			a: kinConfig.refundable
				? `${reserve} reserves a unit and, while Founders spots last, locks the Founders price of ${formatINR(kinConfig.founderPrice)}. You pay the balance of ${formatINR(balanceDue)} before we ship. Your ${reserve} is fully refundable any time before shipping; just email or WhatsApp us.`
				: `${reserve} reserves a unit and locks the Founders price while spots last. See the refund policy for details.`,
		},
		{
			q: "When does it ship? What if it's delayed?",
			a: `${isTodo(kinConfig.shipWindow) ? "The ship window will be announced soon." : `The Founders batch ships ${kinConfig.shipWindow}.`} If anything slips, you'll hear it from us first on WhatsApp and email, and you can get a full refund of your reservation at any point before shipping.`,
		},
		{
			q: "Do you ship across India? Outside India?",
			a: "We ship across India. International shipping isn't available for the first batches.",
		},
		{ q: "Warranty?", a: tbc },
		{
			q: "Can I get a GST invoice?",
			a: `Yes. Prices include GST, and we'll issue a GST invoice from ${kinConfig.legalEntity}. If you need your business GSTIN on it, tell us before you pay the balance.`,
		},
	],
};

export const shipWindowText = orTBA(kinConfig.shipWindow, "to be announced");
