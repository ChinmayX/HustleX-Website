"use client";

import { kinConfig } from "@/kin/config";
import { founders } from "@/kin/content/home";
import { formatINR } from "@/kin/lib/format";

import { CounterBar, useOffer } from "../Counter";
import { TrackedReserve } from "../TrackedReserve";
import { buttonClass, Check, Container } from "../ui";
import { WaitlistButton } from "../Waitlist";

export const Founders = () => {
	const { full } = useOffer();
	const waitlistOnly = full && kinConfig.afterBatchBehaviour === "waitlist_only";

	return (
		<section id="founders" aria-labelledby="founders-title" className="py-24 md:py-36 border-t border-kin-line">
			<Container>
				<div className="kin-card [--chamfer:28px]">
					<div className="kin-card-inner relative overflow-hidden p-6 sm:p-10 md:p-14">
						<div
							aria-hidden
							className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--kin-accent)_16%,transparent),transparent)]"
						/>
						<div className="relative grid gap-12 md:grid-cols-2 md:gap-16">
							<div>
								<p className="kin-label text-kin-fg-3 mb-4">
									<span className="text-kin-accent mr-2" aria-hidden>
										■
									</span>
									{founders.label}
								</p>
								<h2
									id="founders-title"
									className="font-display font-semibold tracking-[-0.04em] leading-[0.95] text-[clamp(36px,5.4vw,68px)]"
								>
									{full
										? waitlistOnly
											? founders.fullWaitlistHeadline
											: founders.fullHeadline
										: founders.headline}
								</h2>

								{!full && (
									<p className="mt-8 flex items-baseline gap-4">
										<span className="kin-num text-[56px] md:text-[72px] leading-none tracking-[-0.04em] text-kin-accent">
											{formatINR(kinConfig.founderPrice)}
										</span>
										<span className="kin-num text-kin-fg-3 text-[15px]">
											vs <s>{formatINR(kinConfig.regularPrice)}</s> {founders.regularLabel}
										</span>
									</p>
								)}

								<CounterBar className="mt-8 max-w-md" />

								<div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
									{waitlistOnly ? (
										<WaitlistButton position="founders" className={buttonClass("primary", "lg")}>
											{founders.waitlistCta}
										</WaitlistButton>
									) : (
										<TrackedReserve position="founders" className={buttonClass("primary", "lg")}>
											{founders.cta}
										</TrackedReserve>
									)}
									<p className="text-[13px] text-kin-fg-3">
										{founders.shipLabel}: {founders.ship}
									</p>
								</div>
							</div>

							<div className="space-y-10">
								<div>
									<h3 className="kin-label text-kin-fg-3 mb-4">{founders.perksTitle}</h3>
									<ul className="space-y-3">
										{kinConfig.founderPerks.map(p => (
											<li key={p} className="flex items-start gap-3 text-[17px]">
												<span className="mt-1 grid h-5 w-5 shrink-0 place-items-center bg-kin-accent text-kin-accent-ink">
													<Check className="h-3 w-3" />
												</span>
												{p}
											</li>
										))}
									</ul>
								</div>
								<div>
									<h3 className="kin-label text-kin-fg-3 mb-4">{founders.stepsTitle}</h3>
									<ol className="space-y-4">
										{founders.steps.map((s, i) => (
											<li key={s} className="flex gap-4 text-[16px] leading-relaxed text-kin-fg-2">
												<span className="kin-num text-[13px] text-kin-fg-3 pt-0.5">0{i + 1}</span>
												<span>{s}</span>
											</li>
										))}
									</ol>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};
