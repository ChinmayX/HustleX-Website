import { how } from "@/kin/content/home";

import { MediaSlot } from "../media/MediaSlot";
import { Reveal } from "../Reveal";
import { Container, SectionHeader } from "../ui";

export const How = () => (
	<section id="how" aria-labelledby="how-title" className="kin-paper kin-angle-top bg-kin-paper text-kin-paper-fg">
		<Container className="py-24 md:py-32">
			<div id="how-title">
				<SectionHeader label={how.label} headline={how.headline} tone="paper" />
			</div>
			<ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
				{how.steps.map((s, i) => (
					<Reveal as="li" key={s.n} delay={i * 0.08}>
						<MediaSlot id={s.slot} className="kin-chamfer bg-black/[0.04]" />
						<div className="mt-5 flex items-baseline gap-3">
							<span className="kin-num text-[13px] text-kin-paper-fg-2">{s.n}</span>
							<h3 className="font-display text-[28px] font-semibold tracking-[-0.03em]">{s.title}</h3>
						</div>
						<p className="mt-2 text-[16px] leading-relaxed text-kin-paper-fg-2 max-w-[34ch]">{s.text}</p>
					</Reveal>
				))}
			</ol>
		</Container>
	</section>
);
