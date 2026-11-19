import type { Metadata } from "next";

import { MediaSlot } from "@/kin/components/media/MediaSlot";
import { PageShell } from "@/kin/components/PageShell";
import { SectionHeader } from "@/kin/components/ui";
import { kinUrl } from "@/kin/config";
import { about } from "@/kin/content/pages";
import { company } from "@/shared/company";

export const metadata: Metadata = {
	title: about.title,
	description: about.description,
	alternates: { canonical: kinUrl("/about") },
};

const AboutPage = () => (
	<PageShell>
		<SectionHeader label={about.label} headline={about.headline} />
		<div className="mt-16 grid gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
			<div>
				<MediaSlot id="founder-portrait" className="kin-chamfer bg-kin-raised" />
				<p className="mt-4 text-[15px]">
					<span className="text-kin-fg">{about.founderName}</span>
					<span className="text-kin-fg-3"> · {about.founderTitle}</span>
				</p>
			</div>
			<div className="space-y-10">
				{about.sections.map(s => (
					<section key={s.heading}>
						<h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">{s.heading}</h2>
						<p className="mt-3 text-[17px] leading-relaxed text-kin-fg-2">{s.body}</p>
					</section>
				))}
				<section className="border-t border-kin-line pt-8 text-[14px] text-kin-fg-3">
					<p>{company.legalEntity}</p>
					{company.address.map(l => (
						<p key={l}>{l}</p>
					))}
					{company.cin && <p>CIN {company.cin}</p>}
					{company.gstin && <p>GSTIN {company.gstin}</p>}
				</section>
			</div>
		</div>
	</PageShell>
);
export default AboutPage;
