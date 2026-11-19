import { contentFlags, trust } from "@/kin/content/home";

import { Container } from "../ui";

/** Press logos / community numbers / quotes. Built now, hidden until there's something real. */
export const Trust = () => {
	if (!contentFlags.showTrustStrip) return null;
	return (
		<section id="trust" aria-label="Community" className="border-t border-kin-line py-14">
			<Container>
				<div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
					{trust.stats.map(s => (
						<div key={s.label} className="text-center">
							<p className="kin-num text-[40px] leading-none text-kin-fg">{s.value}</p>
							<p className="kin-label mt-2 text-kin-fg-3">{s.label}</p>
						</div>
					))}
				</div>
				{trust.quotes.length > 0 && (
					<ul className="mt-12 grid gap-6 md:grid-cols-3">
						{trust.quotes.map(q => (
							<li key={q.name} className="kin-card">
								<figure className="kin-card-inner p-6">
									<blockquote className="text-[17px] text-kin-fg">“{q.quote}”</blockquote>
									<figcaption className="mt-4 text-[13px] text-kin-fg-3">
										{q.name} · {q.role}
									</figcaption>
								</figure>
							</li>
						))}
					</ul>
				)}
			</Container>
		</section>
	);
};
