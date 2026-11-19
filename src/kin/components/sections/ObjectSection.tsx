import { object } from "@/kin/content/home";
import { hasAsset } from "@/kin/media";

import { MediaSlot } from "../media/MediaSlot";
import { Reveal } from "../Reveal";
import { Container, SectionHeader, Tag } from "../ui";

export const ObjectSection = () => (
	<section id="object" aria-labelledby="object-title" className="py-24 md:py-36 border-t border-kin-line">
		<Container>
			<div id="object-title" className="grid gap-8 md:grid-cols-2 md:items-end">
				<SectionHeader label={object.label} headline={object.headline} />
				<div className="space-y-4 text-[17px] md:text-lg leading-relaxed text-kin-fg-2 max-w-[44ch]">
					<p>{object.body}</p>
					<p className="flex flex-wrap items-center gap-2">
						<span className="text-kin-fg">{object.battery}</span>
						<Tag>{object.batteryTag}</Tag>
					</p>
				</div>
			</div>
		</Container>

		{/* Full-bleed hero render */}
		<div className="mt-14 md:mt-20">
			<MediaSlot id="object-hero" sizes="100vw" className="bg-kin-raised" />
		</div>

		<Container>
			<ul className="mt-3 md:mt-4 grid grid-cols-3 gap-2 md:gap-4">
				{object.details.map((d, i) => (
					<Reveal as="li" key={d.slot} delay={i * 0.06}>
						<MediaSlot id={d.slot} sizes="(min-width: 768px) 400px, 33vw" className="kin-chamfer kin-chamfer-sm bg-kin-raised" />
						<p className="kin-label mt-3 text-kin-fg-3">{d.label}</p>
					</Reveal>
				))}
			</ul>

			{hasAsset("object-360") && (
				<div className="mt-16 mx-auto max-w-xl">
					<MediaSlot id="object-360" />
					<p className="kin-label mt-3 text-center text-kin-fg-3">{object.turntableHint}</p>
				</div>
			)}

			<div className="mt-20 md:mt-28 grid gap-8 md:grid-cols-[1fr_1.6fr] md:items-center md:gap-14">
				<Reveal>
					<h3 className="font-display text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.02] tracking-[-0.035em]">
						{object.carryHeadline}
					</h3>
					<p className="mt-4 text-[17px] leading-relaxed text-kin-fg-2 max-w-[40ch]">{object.carryBody}</p>
				</Reveal>
				<MediaSlot id="object-carry" className="kin-chamfer bg-kin-raised" />
			</div>
		</Container>
	</section>
);
