import { showPlaceholderLabels } from "@/kin/config";
import { founderNote } from "@/kin/content/home";

import { MediaSlot } from "../media/MediaSlot";
import { Container, Tag } from "../ui";

export const FounderNote = () => (
	<section id="founder" aria-labelledby="founder-title" className="py-24 md:py-36 border-t border-kin-line">
		<Container>
			<div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:items-center">
				<div className="max-w-sm md:max-w-none">
					<MediaSlot id="founder-portrait" className="kin-chamfer bg-kin-raised" />
				</div>
				<div>
					<p id="founder-title" className="kin-label text-kin-fg-3 mb-6 flex items-center gap-3">
						<span>
							<span className="text-kin-accent mr-2" aria-hidden>
								■
							</span>
							{founderNote.label}
						</span>
						{showPlaceholderLabels && <Tag tone="accent">{founderNote.todo}</Tag>}
					</p>
					<blockquote className="space-y-5 font-display text-[clamp(22px,2.4vw,30px)] font-medium leading-[1.3] tracking-[-0.02em] text-kin-fg">
						{founderNote.paragraphs.map(p => (
							<p key={p.slice(0, 24)}>{p}</p>
						))}
					</blockquote>
					<p className="mt-8 text-[15px]">
						<span className="text-kin-fg">{founderNote.name}</span>
						<span className="text-kin-fg-3"> · {founderNote.title}</span>
					</p>
				</div>
			</div>
		</Container>
	</section>
);
