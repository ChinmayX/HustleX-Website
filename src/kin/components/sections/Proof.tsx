import { kinConfig } from "@/kin/config";
import { buildLog } from "@/kin/content/buildLog";
import { contentFlags, proof } from "@/kin/content/home";

import { MediaSlot } from "../media/MediaSlot";
import { Reveal } from "../Reveal";
import { buttonClass, Container, SectionHeader } from "../ui";

const fmtDate = (d: string) =>
	new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export const Proof = () => (
	<section id="proof" aria-labelledby="proof-title" className="py-24 md:py-36 border-t border-kin-line">
		<Container>
			<div className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:gap-14 md:items-center">
				<div id="proof-title">
					<SectionHeader label={proof.label} headline={proof.headline} sub={proof.body} />
					{kinConfig.instagramUrl && (
						<a
							href={kinConfig.instagramUrl}
							target="_blank"
							rel="noopener noreferrer"
							className={`${buttonClass("ghost")} mt-8`}
						>
							{proof.followCta} ↗
						</a>
					)}
				</div>
				<MediaSlot id="proof-rig" className="kin-chamfer bg-kin-raised" />
			</div>

			<div className="mt-12 kin-card">
				<div className="kin-card-inner p-6 md:p-8">
					{proof.results.length ? (
						<dl className="grid gap-8 md:grid-cols-3">
							{proof.results.map(r => (
								<div key={r.metric}>
									<dt className="kin-label text-kin-fg-3">{r.metric}</dt>
									<dd className="kin-num mt-2 text-[40px] leading-none text-kin-fg">{r.value}</dd>
									<dd className="mt-2 text-[14px] text-kin-fg-2">{r.detail}</dd>
								</div>
							))}
						</dl>
					) : (
						<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
							<p className="flex items-center gap-3 font-display text-2xl font-semibold tracking-[-0.02em]">
								<span className="kin-live-dot h-2 w-2 bg-kin-accent" aria-hidden />
								{proof.comingSoon}
							</p>
							<p className="text-[15px] text-kin-fg-2 max-w-[48ch]">{proof.comingSoonSub}</p>
						</div>
					)}
				</div>
			</div>

			{contentFlags.showBuildLog && buildLog.length > 0 && (
				<div className="mt-16">
					<h3 className="kin-label text-kin-fg-3 mb-5">{proof.buildLogLabel}</h3>
					<ul className="grid gap-6 md:grid-cols-3">
						{buildLog.slice(0, 3).map((b, i) => (
							<Reveal as="li" key={b.slot} delay={i * 0.06}>
								<MediaSlot id={b.slot} className="kin-chamfer kin-chamfer-sm bg-kin-raised" />
								<p className="kin-num mt-3 text-[12px] text-kin-fg-3">{fmtDate(b.date)}</p>
								<p className="mt-1 text-[16px] font-medium text-kin-fg">{b.title}</p>
							</Reveal>
						))}
					</ul>
				</div>
			)}
		</Container>
	</section>
);
