"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { kinConfig, kinUrl, showPlaceholderLabels } from "@/kin/config";
import { success as copy } from "@/kin/content/pages";
import { formatFounderNumber, formatINR } from "@/kin/lib/format";
import { getReservation, type ReservationView } from "@/kin/lib/api";

import { Spinner } from "../form";
import { buttonClass, KinLink, Tag } from "../ui";

type State = { kind: "loading" } | { kind: "confirming" } | { kind: "paid"; r: ReservationView } | { kind: "not_found" };

export const SuccessView = () => {
	const token = useSearchParams().get("r") ?? "";
	const [state, setState] = useState<State>({ kind: "loading" });
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		let alive = true;
		let tries = 0;
		const poll = async () => {
			const r = token ? await getReservation(token) : null;
			if (!alive) return;
			if (r?.status === "paid") return setState({ kind: "paid", r });
			if (r?.status === "payment_verified_client" && tries < 6) {
				// Client verified, webhook not landed yet: poll for a few seconds.
				setState({ kind: "confirming" });
				tries++;
				setTimeout(poll, 2000);
				return;
			}
			setState(r?.status === "payment_verified_client" ? { kind: "confirming" } : { kind: "not_found" });
		};
		poll();
		return () => {
			alive = false;
		};
	}, [token]);

	if (state.kind === "loading" || state.kind === "confirming") {
		return (
			<div className="py-24 text-center" role="status" aria-live="polite">
				<span className="inline-flex text-kin-accent">
					<Spinner />
				</span>
				<p className="mt-4 font-display text-2xl font-semibold">
					{state.kind === "loading" ? copy.loading : copy.confirming}
				</p>
				{state.kind === "confirming" && <p className="mt-2 text-kin-fg-2">{copy.confirmingSub}</p>}
			</div>
		);
	}

	if (state.kind === "not_found") {
		return (
			<div className="mx-auto max-w-lg py-24 text-center">
				<h1 className="font-display text-3xl font-semibold tracking-[-0.03em]">{copy.notFoundTitle}</h1>
				<p className="mt-3 text-kin-fg-2">{copy.notFoundBody}</p>
				<KinLink href="/pre-order" className={`${buttonClass("primary")} mt-8`}>
					{copy.retry}
				</KinLink>
			</div>
		);
	}

	const { r } = state;
	const refLink = r.refCode ? `${kinUrl()}?ref=${r.refCode}` : "";
	const rows = [
		{ label: copy.paid, value: formatINR(r.amountPaid) },
		{ label: copy.locked, value: formatINR(r.lockedPrice) },
		{ label: `${copy.balance} · ${copy.balanceWhen}`, value: copy.balanceFor(r.lockedPrice) },
		{ label: copy.ship, value: copy.shipValue },
	];

	return (
		<div className="mx-auto max-w-2xl py-10 md:py-16">
			{showPlaceholderLabels && token.startsWith("demo") && (
				<p className="mb-6">
					<Tag tone="accent">{copy.previewNote}</Tag>
				</p>
			)}
			<h1 className="font-display font-semibold tracking-[-0.05em] leading-[0.92] text-[clamp(44px,8vw,88px)]">
				{r.isFounder && r.founderNumber ? (
					<>
						You&apos;re in.
						<br />
						<span className="text-kin-accent">Founder {formatFounderNumber(r.founderNumber)}.</span>
					</>
				) : (
					copy.headline
				)}
			</h1>

			<dl className="mt-10 border-t border-kin-line">
				{rows.map(row => (
					<div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-kin-line py-3.5">
						<dt className="text-[15px] text-kin-fg-2">{row.label}</dt>
						<dd className="kin-num text-[17px] text-kin-fg">{row.value}</dd>
					</div>
				))}
			</dl>
			<p className="mt-4 text-[14px] text-kin-fg-3">{copy.refund}</p>

			{kinConfig.whatsappCommunityUrl && (
				<a
					href={kinConfig.whatsappCommunityUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={`${buttonClass("primary", "lg")} mt-8 w-full sm:w-auto`}
				>
					{copy.whatsapp}
				</a>
			)}

			{refLink && (
				<div className="kin-card mt-12">
					<div className="kin-card-inner p-6">
						<h2 className="font-display text-xl font-semibold">{copy.referTitle}</h2>
						<p className="mt-1.5 text-[14px] text-kin-fg-2">{copy.referBody}</p>
						<div className="mt-4 flex flex-col gap-3 sm:flex-row">
							<input
								readOnly
								value={refLink}
								aria-label="Your referral link"
								className="kin-num h-11 min-w-0 flex-1 bg-white/[0.04] px-3 text-[14px] text-kin-fg shadow-[inset_0_0_0_1px_var(--kin-line-strong)]"
								onFocus={e => e.currentTarget.select()}
							/>
							<button
								type="button"
								className={buttonClass("ghost")}
								onClick={async () => {
									try {
										await navigator.clipboard.writeText(refLink);
										setCopied(true);
										setTimeout(() => setCopied(false), 1800);
									} catch {
										/* clipboard blocked: the input is selectable */
									}
								}}
							>
								{copied ? copy.copied : copy.copy}
							</button>
							<a
								href={`https://wa.me/?text=${encodeURIComponent(`${copy.shareText} ${refLink}`)}`}
								target="_blank"
								rel="noopener noreferrer"
								className={buttonClass("ghost")}
							>
								{copy.shareWhatsapp}
							</a>
						</div>
					</div>
				</div>
			)}

			<p className="mt-10 text-[15px] text-kin-fg-2">{copy.email}</p>
		</div>
	);
};
