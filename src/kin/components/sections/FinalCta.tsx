import { finalCta } from "@/kin/content/home";

import { CounterChip } from "../Counter";
import { TrackedReserve } from "../TrackedReserve";
import { buttonClass, Container } from "../ui";
import { WaitlistButton } from "../Waitlist";

export const FinalCta = () => (
	<section
		id="cta"
		aria-labelledby="cta-title"
		className="relative overflow-hidden border-t border-kin-line bg-[linear-gradient(180deg,color-mix(in_srgb,var(--kin-accent)_7%,var(--kin-bg)),color-mix(in_srgb,var(--kin-accent)_16%,var(--kin-bg)))]"
	>
		<Container className="py-28 md:py-40 text-center">
			<h2
				id="cta-title"
				className="mx-auto max-w-[12ch] font-display font-semibold tracking-[-0.055em] leading-[0.9] text-[clamp(52px,10vw,136px)]"
			>
				{finalCta.headline}
			</h2>
			<div className="mt-10 flex justify-center">
				<CounterChip />
			</div>
			<div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
				<TrackedReserve position="final" className={buttonClass("primary", "lg")}>
					{finalCta.primary}
				</TrackedReserve>
				<WaitlistButton position="final" className={buttonClass("ghost", "lg")}>
					{finalCta.secondary}
				</WaitlistButton>
			</div>
		</Container>
	</section>
);
