"use client";

import { useState, type FormEvent } from "react";

import { status as copy } from "@/kin/content/pages";
import { lookupReservation } from "@/kin/lib/api";
import { isEmail, isPhone, toE164 } from "@/kin/lib/validation";

import { PhoneField, Spinner, TextField } from "../form";
import { buttonClass } from "../ui";

export const StatusLookup = () => {
	const [email, setEmail] = useState("");
	const [cc, setCc] = useState("+91");
	const [phone, setPhone] = useState("");
	const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
	const [state, setState] = useState<"idle" | "loading" | "not_live" | "sent">("idle");

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		const errs = {
			email: isEmail(email) ? undefined : "Enter a valid email.",
			phone: isPhone(cc, phone) ? undefined : "Enter a valid WhatsApp number.",
		};
		setErrors(errs);
		if (errs.email || errs.phone) return;
		setState("loading");
		const r = await lookupReservation(email.trim(), toE164(cc, phone));
		setState(r.ok ? "sent" : "not_live");
	};

	return (
		<form onSubmit={submit} noValidate className="mx-auto max-w-md space-y-5 py-12 md:py-20">
			<div>
				<h1 className="font-display text-[clamp(32px,5vw,48px)] font-semibold leading-[1] tracking-[-0.04em]">{copy.headline}</h1>
				<p className="mt-3 text-[15px] text-kin-fg-2">{copy.sub}</p>
			</div>
			<TextField id="s-email" label="Email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
			<PhoneField id="s-phone" label="WhatsApp number" cc={cc} onCc={setCc} value={phone} onValue={setPhone} error={errors.phone} />
			<button type="submit" disabled={state === "loading"} className={`${buttonClass("primary", "lg")} w-full`}>
				{state === "loading" ? <Spinner /> : copy.submit}
			</button>
			{(state === "not_live" || state === "sent") && (
				<p role="status" className="text-[14px] text-kin-fg-2">
					{state === "sent" ? copy.sent : copy.notLive}
				</p>
			)}
		</form>
	);
};
