import { DRAFT_BANNER, type LegalDoc } from "@/kin/content/legal";

import { PageShell } from "./PageShell";
import { Tag } from "./ui";

export const LegalPage = ({ doc }: { doc: LegalDoc }) => (
	<PageShell>
		<article className="mx-auto max-w-[72ch]">
			<header className="mb-12">
				{doc.draft && (
					<p className="mb-6">
						<Tag tone="accent">{DRAFT_BANNER}</Tag>
					</p>
				)}
				<h1 className="font-display text-[clamp(36px,5vw,60px)] font-semibold leading-[1] tracking-[-0.04em]">
					{doc.title}
				</h1>
				<p className="kin-label mt-4 text-kin-fg-3">Last updated {doc.updated}</p>
				{doc.intro && <p className="mt-8 text-[17px] leading-relaxed text-kin-fg-2">{doc.intro}</p>}
			</header>
			<div className="space-y-10">
				{doc.sections.map(s => (
					<section key={s.heading}>
						<h2 className="font-display text-[22px] font-semibold tracking-[-0.02em] text-kin-fg">{s.heading}</h2>
						<div className="mt-3 space-y-3 text-[16px] leading-relaxed text-kin-fg-2">
							{s.body.map((b, i) =>
								typeof b === "string" ? (
									<p key={i}>{b}</p>
								) : (
									<ul key={i} className="list-disc space-y-2 pl-5 marker:text-kin-fg-3">
										{b.list.map(li => (
											<li key={li}>{li}</li>
										))}
									</ul>
								),
							)}
						</div>
					</section>
				))}
			</div>
		</article>
	</PageShell>
);
