"use client";

import { useState, type FormEvent } from "react";

import { kinConfig } from "@/kin/config";
import { contact } from "@/kin/content/pages";

import { inputClass, TextField } from "./form";
import { buttonClass } from "./ui";

/** Simple contact form that opens the visitor's email app (no backend needed). */
export const ContactForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const disabled = !kinConfig.supportEmail;

	const submit = (e: FormEvent) => {
		e.preventDefault();
		if (disabled) return;
		const subject = encodeURIComponent(`Kin enquiry from ${name || "website"}`);
		const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
		window.location.href = `mailto:${kinConfig.supportEmail}?subject=${subject}&body=${body}`;
	};

	return (
		<form onSubmit={submit} className="space-y-4">
			<h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">{contact.form.title}</h2>
			<TextField id="c-name" label={contact.form.name} autoComplete="name" value={name} onChange={e => setName(e.target.value)} />
			<TextField
				id="c-email"
				label={contact.form.email}
				type="email"
				autoComplete="email"
				value={email}
				onChange={e => setEmail(e.target.value)}
			/>
			<div className="space-y-1.5">
				<label htmlFor="c-message" className="text-[13px] text-kin-fg-2">
					{contact.form.message}
				</label>
				<textarea
					id="c-message"
					rows={5}
					value={message}
					onChange={e => setMessage(e.target.value)}
					className={`${inputClass} h-auto py-3`}
				/>
			</div>
			<button type="submit" disabled={disabled} className={`${buttonClass("primary")} w-full sm:w-auto`}>
				{contact.form.submit}
			</button>
			<p className="text-[13px] text-kin-fg-3">{disabled ? contact.form.noEmail : contact.form.note}</p>
		</form>
	);
};
