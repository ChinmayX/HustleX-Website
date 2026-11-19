"use client";

import { kinConfig } from "@/kin/config";
import { preorder } from "@/kin/content/pages";
import { formatINR } from "@/kin/lib/format";

import { CounterBar, useOffer } from "../Counter";
import { MediaSlot } from "../media/MediaSlot";

export const OrderSummary = () => {
	const { full } = useOffer();
	const total = full ? kinConfig.regularPrice : kinConfig.founderPrice;
	const s = preorder.summary;
	const rows = [
		{ label: s.total, value: formatINR(total) },
		{ label: s.today, value: formatINR(kinConfig.reservationAmount), accent: true },
		{ label: `${s.balance} · ${s.balanceWhen}`, value: formatINR(total - kinConfig.reservationAmount) },
	];
	return (
		<aside aria-label={s.label} className="kin-card">
			<div className="kin-card-inner p-5 md:p-7">
				<p className="kin-label text-kin-fg-3">{s.label}</p>
				<div className="mt-4 flex items-center gap-4">
					<div className="w-20 shrink-0 md:w-24">
						<MediaSlot id="preorder-thumb" className="kin-chamfer kin-chamfer-sm bg-kin-surface" />
					</div>
					<p className="font-display text-xl font-semibold tracking-[-0.02em]">{full ? s.itemRegular : s.item}</p>
				</div>
				<dl className="mt-6 border-t border-kin-line">
					{rows.map(r => (
						<div key={r.label} className="flex items-baseline justify-between gap-4 border-b border-kin-line py-3">
							<dt className="text-[14px] text-kin-fg-2">{r.label}</dt>
							<dd className={`kin-num text-[17px] ${r.accent ? "text-kin-accent" : "text-kin-fg"}`}>{r.value}</dd>
						</div>
					))}
				</dl>
				<CounterBar className="mt-6" />
				<ul className="mt-6 space-y-1.5 text-[13px] text-kin-fg-3">
					<li>{s.refund}</li>
					<li>{s.ship}</li>
					<li>{s.gst}</li>
				</ul>
			</div>
		</aside>
	);
};
