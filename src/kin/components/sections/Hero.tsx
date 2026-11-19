import { kinConfig } from "@/kin/config";
import { hero } from "@/kin/content/home";
import { formatINR } from "@/kin/lib/format";
import { hasAsset } from "@/kin/media";

import { CounterChip } from "../Counter";
import { MediaSlot } from "../media/MediaSlot";
import { TrackedReserve } from "../TrackedReserve";
import { buttonClass, Container } from "../ui";
import { WaitlistButton } from "../Waitlist";
import { HeroFilm } from "./HeroFilm";

// Server-rendered: headline, price and poster paint without waiting for JS.
export const Hero = () => (
	<section id="hero" aria-labelledby="hero-title" className="relative pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden">
		{/* Soft plinth light behind the product */}
		<div
			aria-hidden
			className="pointer-events-none absolute inset-x-0 top-[38%] h-[70%] bg-[radial-gradient(60%_50%_at_50%_60%,rgb(255_255_255/0.06),transparent_70%)]"
		/>
		<Container className="relative">
			<p className="kin-label text-kin-fg-3 mb-5">
				<span className="text-kin-accent mr-2" aria-hidden>
					■
				</span>
				{hero.eyebrow}
			</p>

			<div className="grid gap-6 md:grid-cols-[1.25fr_1fr] md:items-end md:gap-12">
				<h1
					id="hero-title"
					className="font-display font-semibold tracking-[-0.055em] leading-[0.88] text-[clamp(56px,11vw,148px)]"
				>
					{hero.headline}
				</h1>
				<p className="text-[17px] md:text-[19px] leading-relaxed text-kin-fg-2 max-w-[44ch] md:pb-3">
					{hero.subhead}
				</p>
			</div>

			<div className="mt-8 md:mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
				<div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-10">
					<div>
						<p className="kin-label text-kin-fg-3 mb-1.5">{hero.priceLabel}</p>
						<p className="flex items-baseline gap-3">
							<span className="kin-num text-[40px] md:text-[48px] leading-none tracking-[-0.03em] text-kin-fg">
								{formatINR(kinConfig.founderPrice)}
							</span>
							<span className="kin-num text-[15px] text-kin-fg-3">
								<s aria-label={`regular price ${formatINR(kinConfig.regularPrice)}`}>
									{formatINR(kinConfig.regularPrice)}
								</s>
							</span>
						</p>
						<p className="mt-1 text-[13px] text-kin-fg-3">{hero.regularNote}</p>
					</div>
					<CounterChip />
				</div>

				<div className="flex flex-col gap-3 sm:flex-row">
					<TrackedReserve position="hero" className={`${buttonClass("primary", "lg")} w-full sm:w-auto`}>
						{hero.primaryCta}
					</TrackedReserve>
					<WaitlistButton position="hero" className={`${buttonClass("ghost", "lg")} w-full sm:w-auto`}>
						{hero.waitlistCta}
					</WaitlistButton>
					{hasAsset("hero-film") && <HeroFilm label={hero.filmCta} />}
				</div>
			</div>

			<ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="What you should know">
				{hero.trust.map(t => (
					<li key={t} className="kin-label text-kin-fg-3 flex items-center gap-2">
						<span className="h-1 w-1 bg-kin-fg-3" aria-hidden />
						{t}
					</li>
				))}
			</ul>

			<div className="mt-10 md:mt-14">
				<MediaSlot id="hero-loop" priority className="kin-chamfer bg-kin-raised" />
			</div>
		</Container>
	</section>
);
