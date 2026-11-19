"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
	type FormEvent,
	type ReactNode,
} from "react";

import { AnimatePresence, motion } from "motion/react";

import { kinConfig } from "@/kin/config";
import { waitlist as copy } from "@/kin/content/home";
import { newEventId, trackMeta, trackUI } from "@/kin/lib/analytics";
import { submitWaitlist } from "@/kin/lib/api";
import { readAttribution } from "@/kin/lib/attribution";
import { isEmail, isPhone, toE164 } from "@/kin/lib/validation";

import { Checkbox, Honeypot, PhoneField, Spinner, TextField } from "./form";
import { buttonClass } from "./ui";

const Ctx = createContext<{ open: (source: string) => void }>({ open: () => {} });
export const useWaitlist = () => useContext(Ctx);

export const WaitlistProvider = ({ children }: { children: ReactNode }) => {
	const [source, setSource] = useState<string | null>(null);
	const open = useCallback((s: string) => {
		trackUI("waitlist_open", { position: s });
		setSource(s);
	}, []);
	return (
		<Ctx.Provider value={{ open }}>
			{children}
			<AnimatePresence>{source && <WaitlistModal onClose={() => setSource(null)} />}</AnimatePresence>
		</Ctx.Provider>
	);
};

/** Button that opens the waitlist modal. */
export const WaitlistButton = ({
	position,
	className,
	children,
}: {
	position: string;
	className?: string;
	children: ReactNode;
}) => {
	const { open } = useWaitlist();
	return (
		<button type="button" onClick={() => open(position)} className={className}>
			{children}
		</button>
	);
};

type Errors = Partial<Record<"name" | "whatsapp" | "email" | "consent" | "form", string>>;

const WaitlistModal = ({ onClose }: { onClose: () => void }) => {
	const dialogRef = useRef<HTMLDivElement>(null);
	const [name, setName] = useState("");
	const [cc, setCc] = useState("+91");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [marketing, setMarketing] = useState(false);
	const [hp, setHp] = useState("");
	const [errors, setErrors] = useState<Errors>({});
	const [state, setState] = useState<"idle" | "submitting" | "done">("idle");

	// Focus trap, Escape to close, lock scroll.
	useEffect(() => {
		const prev = document.activeElement as HTMLElement | null;
		const el = dialogRef.current!;
		el.querySelector<HTMLElement>("input,button")?.focus();
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key !== "Tab") return;
			const f = [...el.querySelectorAll<HTMLElement>("a,button,input,select")].filter(
				n => !n.hasAttribute("disabled") && n.tabIndex !== -1,
			);
			if (!f.length) return;
			if (e.shiftKey && document.activeElement === f[0]) {
				e.preventDefault();
				f[f.length - 1].focus();
			} else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
				e.preventDefault();
				f[0].focus();
			}
		};
		document.addEventListener("keydown", onKey);
		const overflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = overflow;
			prev?.focus();
		};
	}, [onClose]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		const errs: Errors = {};
		if (name.trim().length < 2) errs.name = "Please enter your name.";
		if (!isPhone(cc, phone)) errs.whatsapp = "Enter a valid WhatsApp number.";
		if (!isEmail(email)) errs.email = "Enter a valid email.";
		if (!marketing) errs.consent = copy.consentError;
		setErrors(errs);
		if (Object.keys(errs).length) return;
		setState("submitting");
		const res = await submitWaitlist({
			name: name.trim(),
			email: email.trim(),
			whatsapp_e164: toE164(cc, phone),
			consent_marketing: marketing,
			attribution: readAttribution(),
			website: hp,
		});
		if (res.ok) {
			setState("done");
			trackMeta("Lead", {}, newEventId());
		} else {
			setState("idle");
			setErrors({ form: copy.error });
		}
	};

	return (
		<motion.div
			className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
		>
			<button
				type="button"
				aria-label={copy.close}
				tabIndex={-1}
				onClick={onClose}
				className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
			/>
			<motion.div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby="waitlist-title"
				initial={{ y: 24, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 24, opacity: 0 }}
				transition={{ duration: 0.28, ease: [0.2, 0.9, 0.1, 1] }}
				className="kin-card relative w-full sm:max-w-md max-h-[92dvh] overflow-y-auto"
			>
				<div className="kin-card-inner p-6 sm:p-8">
					<button
						type="button"
						onClick={onClose}
						aria-label={copy.close}
						className="absolute right-4 top-4 grid h-9 w-9 place-items-center text-kin-fg-2 hover:text-kin-fg"
					>
						<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden>
							<path d="m3.5 3.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.5" />
						</svg>
					</button>

					{state === "done" ? (
						<div className="py-6 text-center" role="status">
							<div className="mx-auto mb-5 grid h-12 w-12 place-items-center bg-kin-accent text-kin-accent-ink kin-chamfer kin-chamfer-sm">
								<svg viewBox="0 0 16 16" width="20" height="20" fill="none" aria-hidden>
									<path d="m3 8.5 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
								</svg>
							</div>
							<h2 id="waitlist-title" className="font-display text-3xl font-semibold tracking-[-0.03em]">
								{copy.successTitle}
							</h2>
							<p className="mt-2 text-kin-fg-2">{copy.successBody}</p>
							{kinConfig.whatsappCommunityUrl && (
								<a
									href={kinConfig.whatsappCommunityUrl}
									target="_blank"
									rel="noopener noreferrer"
									className={`${buttonClass("primary")} mt-6 w-full`}
								>
									{copy.community}
								</a>
							)}
						</div>
					) : (
						<form onSubmit={submit} noValidate className="space-y-4">
							<div className="pr-8 mb-2">
								<h2 id="waitlist-title" className="font-display text-3xl font-semibold tracking-[-0.03em]">
									{copy.title}
								</h2>
								<p className="mt-2 text-kin-fg-2 text-[15px]">{copy.sub}</p>
							</div>
							<Honeypot value={hp} onChange={setHp} />
							<TextField
								id="wl-name"
								label={copy.fields.name}
								autoComplete="name"
								value={name}
								onChange={e => setName(e.target.value)}
								error={errors.name}
							/>
							<PhoneField
								id="wl-whatsapp"
								label={copy.fields.whatsapp}
								cc={cc}
								onCc={setCc}
								value={phone}
								onValue={setPhone}
								error={errors.whatsapp}
							/>
							<TextField
								id="wl-email"
								label={copy.fields.email}
								type="email"
								inputMode="email"
								autoComplete="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								error={errors.email}
							/>
							<Checkbox
								id="wl-consent"
								checked={marketing}
								onChange={setMarketing}
								error={errors.consent}
							>
								{copy.consent}
							</Checkbox>
							{errors.form && (
								<p className="text-[14px] text-[#ff8a80]" role="alert">
									{errors.form}
								</p>
							)}
							<button
								type="submit"
								disabled={state === "submitting"}
								className={`${buttonClass("primary", "lg")} w-full mt-2`}
							>
								{state === "submitting" ? (
									<>
										<Spinner /> {copy.submitting}
									</>
								) : (
									copy.submit
								)}
							</button>
						</form>
					)}
				</div>
			</motion.div>
		</motion.div>
	);
};
