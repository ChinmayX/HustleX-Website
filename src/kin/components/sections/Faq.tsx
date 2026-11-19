import { faq } from "@/kin/content/faq";

import { Container, Plus, SectionHeader } from "../ui";

// Native <details>: keyboard operable and works without JS.
export const Faq = () => (
	<section id="faq" aria-labelledby="faq-title" className="py-24 md:py-36">
		<Container>
			<div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
				<div id="faq-title">
					<SectionHeader label={faq.label} headline={faq.headline} />
				</div>
				<div className="kin-faq border-t border-kin-line">
					{faq.items.map(item => (
						<details key={item.q} className="group border-b border-kin-line">
							<summary className="flex cursor-pointer items-start justify-between gap-6 py-5 text-[17px] md:text-[18px] font-medium text-kin-fg hover:text-kin-accent transition-colors duration-150">
								<span>{item.q}</span>
								<Plus className="kin-faq-icon mt-1 shrink-0 text-kin-fg-2 transition-transform duration-200 ease-snap" />
							</summary>
							<p className="pb-6 pr-10 text-[16px] leading-relaxed text-kin-fg-2 max-w-[62ch]">{item.a}</p>
						</details>
					))}
				</div>
			</div>
		</Container>
	</section>
);
