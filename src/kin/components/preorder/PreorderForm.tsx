"use client";

import { useRef, useState, type FormEvent } from "react";

import { AnimatePresence, motion } from "motion/react";

import { kinConfig, showPlaceholderLabels, whatsappSupportLink } from "@/kin/config";
import { preorder } from "@/kin/content/pages";
import { newEventId, trackMeta, trackUI } from "@/kin/lib/analytics";
import { startReservation, type ReservationInput, type StartReservationResult } from "@/kin/lib/api";
import { readAttribution } from "@/kin/lib/attribution";
import { isEmail, isPhone, isPincode, lookupPincode, toE164 } from "@/kin/lib/validation";

import { Checkbox, FieldShell, Honeypot, inputClass, PhoneField, Segmented, Spinner, TextField } from "../form";
import { buttonClass, KinLink } from "../ui";
import { useWaitlist } from "../Waitlist";

type TrainsOn = ReservationInput["trains_on"];
type PhoneOs = ReservationInput["phone_os"];
type Field =
	| "name"
	| "whatsapp"
	| "email"
	| "pincode"
	| "city"
	| "trainsOn"
	| "phoneOs"
	| "consentUpdates"
	| "terms";
type Outcome = null | "not_live" | "failed" | { duplicate: number };

const f = preorder.form;
const E = preorder.errors;

export const PreorderForm = () => {
	const { open: openWaitlist } = useWaitlist();
	const formRef = useRef<HTMLFormElement>(null);

	const [name, setName] = useState("");
	const [cc, setCc] = useState("+91");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [pincode, setPincode] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [trainsOn, setTrainsOn] = useState<TrainsOn | "">("");
	const [phoneOs, setPhoneOs] = useState<PhoneOs | "">("");
	const [heard, setHeard] = useState("");
	const [heardOther, setHeardOther] = useState("");
	const [consentUpdates, setConsentUpdates] = useState(false);
	const [consentMarketing, setConsentMarketing] = useState(false);
	const [terms, setTerms] = useState(false);
	const [hp, setHp] = useState("");
	const [lookingUp, setLookingUp] = useState(false);

	const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
	const [submitting, setSubmitting] = useState(false);
	const [outcome, setOutcome] = useState<Outcome>(null);

	const onPincode = async (v: string) => {
		const pin = v.replace(/\D/g, "").slice(0, 6);
		setPincode(pin);
		if (pin.length === 6 && isPincode(pin)) {
			setLookingUp(true);
			const r = await lookupPincode(pin);
			setLookingUp(false);
			if (r) {
				setCity(c => c || r.city);
				setState(r.state);
			}
		}
	};

	const validate = () => {
		const e: Partial<Record<Field, string>> = {};
		if (name.trim().length < 2) e.name = E.name;
		if (!isPhone(cc, phone)) e.whatsapp = E.whatsapp;
		if (!isEmail(email)) e.email = E.email;
		if (!isPincode(pincode)) e.pincode = E.pincode;
		if (city.trim().length < 2) e.city = E.city;
		if (!trainsOn) e.trainsOn = E.trainsOn;
		if (!phoneOs) e.phoneOs = E.phoneOs;
		if (!consentUpdates) e.consentUpdates = E.consentUpdates;
		if (!terms) e.terms = E.terms;
		setErrors(e);
		return e;
	};

	const submit = async (ev: FormEvent | { preventDefault(): void }, allowDuplicate = false) => {
		ev.preventDefault();
		const e = validate();
		if (Object.keys(e).length) {
			// Focus the first invalid field.
			requestAnimationFrame(() =>
				formRef.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus(),
			);
			return;
		}
		setSubmitting(true);
		setOutcome(null);
		const eventId = newEventId();
		trackMeta("InitiateCheckout", { value: kinConfig.reservationAmount, currency: kinConfig.currency }, eventId);
		trackUI("preorder_submit");

		const res = await startReservation({
			name: name.trim(),
			whatsapp_e164: toE164(cc, phone),
			email: email.trim(),
			pincode,
			city: city.trim(),
			state,
			trains_on: trainsOn as TrainsOn,
			phone_os: phoneOs as PhoneOs,
			heard_from: heard,
			heard_from_other: heard === "Other" ? heardOther.trim() : "",
			consent_updates: consentUpdates,
			consent_marketing: consentMarketing,
			terms_accepted: terms,
			attribution: readAttribution(),
			user_agent: navigator.userAgent,
			website: hp,
		});
		setSubmitting(false);

		if (res.ok) {
			// TODO(backend): open Razorpay Checkout with res.razorpayOrderId / res.keyId,
			// prefilled name/email/contact, UPI first, themed with the Kin accent.
			// On success: POST signature to /api/kin/verify, then go to /kin/pre-order/success?r=<token>.
			// On failure / dismiss: setOutcome("failed").
			return;
		}
		const fail = res as Extract<StartReservationResult, { ok: false }>;
		if (fail.reason === "payments_not_live") setOutcome("not_live");
		else if (fail.reason === "duplicate" && fail.founderNumber && !allowDuplicate)
			setOutcome({ duplicate: fail.founderNumber });
		else setOutcome("failed");
	};

	const wa = whatsappSupportLink();

	return (
		<form ref={formRef} onSubmit={e => submit(e)} noValidate className="relative space-y-6" aria-labelledby="preorder-form-title">
			<div>
				<h1 id="preorder-form-title" className="font-display text-[clamp(30px,4vw,44px)] font-semibold leading-[1] tracking-[-0.04em]">
					{f.title}
				</h1>
				<p className="mt-2 text-[15px] text-kin-fg-2">{f.sub}</p>
			</div>

			<Honeypot value={hp} onChange={setHp} />

			<TextField id="name" label={f.name} autoComplete="name" value={name} onChange={e => setName(e.target.value)} error={errors.name} />
			<PhoneField
				id="whatsapp"
				label={f.whatsapp}
				hint={f.whatsappHint}
				cc={cc}
				onCc={setCc}
				value={phone}
				onValue={setPhone}
				error={errors.whatsapp}
			/>
			<TextField
				id="email"
				label={f.email}
				type="email"
				inputMode="email"
				autoComplete="email"
				value={email}
				onChange={e => setEmail(e.target.value)}
				error={errors.email}
			/>
			<div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3">
				<TextField
					id="pincode"
					label={f.pincode}
					inputMode="numeric"
					autoComplete="postal-code"
					maxLength={6}
					value={pincode}
					onChange={e => onPincode(e.target.value)}
					error={errors.pincode}
				/>
				<TextField
					id="city"
					label={f.city}
					autoComplete="address-level2"
					value={city}
					onChange={e => setCity(e.target.value)}
					error={errors.city}
					hint={lookingUp ? "Looking up…" : state ? state : f.cityHint}
				/>
			</div>

			<Segmented<TrainsOn> name="trains_on" label={f.trainsOn} options={f.trainsOnOptions as { value: TrainsOn; label: string }[]} value={trainsOn} onChange={setTrainsOn} error={errors.trainsOn} />
			<Segmented<PhoneOs> name="phone_os" label={f.phoneOs} options={f.phoneOsOptions as { value: PhoneOs; label: string }[]} value={phoneOs} onChange={setPhoneOs} error={errors.phoneOs} />

			<FieldShell id="heard" label={f.heardFrom} optional>
				<select id="heard" value={heard} onChange={e => setHeard(e.target.value)} className={inputClass}>
					<option value="" className="bg-kin-surface">
						Select…
					</option>
					{f.heardFromOptions.map(o => (
						<option key={o} value={o} className="bg-kin-surface">
							{o}
						</option>
					))}
				</select>
			</FieldShell>
			{heard === "Other" && (
				<TextField id="heard-other" label={f.heardFromOther} value={heardOther} onChange={e => setHeardOther(e.target.value)} maxLength={120} />
			)}

			<div className="space-y-3 border-t border-kin-line pt-6">
				<Checkbox id="consent-updates" checked={consentUpdates} onChange={setConsentUpdates} error={errors.consentUpdates}>
					{f.consentUpdates}
				</Checkbox>
				<Checkbox id="consent-marketing" checked={consentMarketing} onChange={setConsentMarketing}>
					{f.consentMarketing}
				</Checkbox>
				<Checkbox id="terms" checked={terms} onChange={setTerms} error={errors.terms}>
					{f.termsPre}
					<KinLink href="/legal/terms" target="_blank" className="text-kin-fg underline underline-offset-2 hover:text-kin-accent">
						{f.termsLink}
					</KinLink>
					{f.termsMid}
					<KinLink href="/legal/refunds" target="_blank" className="text-kin-fg underline underline-offset-2 hover:text-kin-accent">
						{f.refundLink}
					</KinLink>
				</Checkbox>
			</div>

			<AnimatePresence>
				{outcome && (
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0 }}
						role="status"
						className="kin-card"
					>
						<div className="kin-card-inner p-5">
							{outcome === "not_live" && (
								<>
									<p className="font-display text-xl font-semibold">{preorder.notLive.title}</p>
									<p className="mt-1.5 text-[14px] text-kin-fg-2">{preorder.notLive.body}</p>
									<div className="mt-4 flex flex-wrap items-center gap-3">
										<button type="button" onClick={() => openWaitlist("preorder_not_live")} className={buttonClass("primary", "sm")}>
											{preorder.notLive.cta}
										</button>
										{showPlaceholderLabels && (
											<KinLink href="/pre-order/success?r=demo" className="kin-label text-kin-fg-3 hover:text-kin-fg">
												{preorder.notLive.preview} →
											</KinLink>
										)}
									</div>
								</>
							)}
							{outcome === "failed" && (
								<>
									<p className="font-display text-xl font-semibold">{preorder.failed.title}</p>
									<p className="mt-1.5 text-[14px] text-kin-fg-2">{preorder.failed.body}</p>
									<div className="mt-4 flex flex-wrap items-center gap-4">
										<button type="submit" className={buttonClass("primary", "sm")}>
											{preorder.failed.retry}
										</button>
										{wa && (
											<a href={wa} target="_blank" rel="noopener noreferrer" className="text-[14px] text-kin-fg-2 underline underline-offset-2">
												{preorder.failed.whatsapp}
											</a>
										)}
									</div>
									<p className="mt-3 text-[12px] text-kin-fg-3">{preorder.failed.inApp}</p>
								</>
							)}
							{typeof outcome === "object" && (
								<>
									<p className="text-[15px] text-kin-fg">{preorder.duplicate(outcome.duplicate)}</p>
									<button type="button" onClick={e => submit(e, true)} className={`${buttonClass("ghost", "sm")} mt-4`}>
										{preorder.duplicateConfirm}
									</button>
								</>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<div>
				<button type="submit" disabled={submitting} className={`${buttonClass("primary", "lg")} w-full`}>
					{submitting ? (
						<>
							<Spinner /> {f.submitting}
						</>
					) : (
						f.submit
					)}
				</button>
				<p className="mt-3 text-center text-[12px] text-kin-fg-3">{f.secure}</p>
			</div>
			<p className="sr-only" aria-live="polite">
				{Object.keys(errors).length ? `${Object.keys(errors).length} fields need attention` : ""}
			</p>
		</form>
	);
};
