import { specs } from "@/kin/content/specs";

import { Container, SectionHeader, Tag } from "../ui";

// Spec-sheet aesthetic: paper, hairlines, mono labels.
export const Specs = () => (
	<section id="specs" aria-labelledby="specs-title" className="kin-paper kin-angle-top bg-kin-paper text-kin-paper-fg">
		<Container className="py-24 md:py-32">
			<div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
				<div id="specs-title">
					<SectionHeader label={specs.label} headline={specs.headline} tone="paper" />
					<p className="mt-6 text-[14px] leading-relaxed text-kin-paper-fg-2 max-w-[36ch]">{specs.note}</p>
				</div>
				<dl className="border-t border-kin-paper-fg">
					{specs.rows.map((r, i) => (
						<div
							key={r.label}
							className="grid grid-cols-[minmax(0,2fr)_minmax(0,5fr)] gap-4 border-b border-kin-paper-line py-4 md:grid-cols-[48px_minmax(0,2fr)_minmax(0,5fr)]"
						>
							<span className="kin-num hidden text-[12px] text-kin-paper-fg-2 md:block" aria-hidden>
								{String(i + 1).padStart(2, "0")}
							</span>
							<dt className="kin-label pt-1 text-kin-paper-fg-2">{r.label}</dt>
							<dd className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 text-[16px] leading-snug">
								<span className={r.value ? "" : "kin-num text-kin-paper-fg-2"}>{r.value || specs.todoValue}</span>
								{r.target && <Tag tone="paper">{specs.targetTag}</Tag>}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</Container>
	</section>
);
