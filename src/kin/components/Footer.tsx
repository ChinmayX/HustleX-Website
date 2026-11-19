import { kinConfig, whatsappSupportLink } from "@/kin/config";
import { footer } from "@/kin/content/home";
import { company } from "@/shared/company";

import { Container, KinLink, Wordmark } from "./ui";

const Col = ({ title, links }: { title: string; links: { label: string; href: string }[] }) => (
	<div>
		<h3 className="kin-label text-kin-fg-3 mb-4">{title}</h3>
		<ul className="space-y-2.5">
			{links.map(l => (
				<li key={l.href}>
					<KinLink href={l.href} className="text-[14px] text-kin-fg-2 hover:text-kin-fg transition-colors">
						{l.label}
					</KinLink>
				</li>
			))}
		</ul>
	</div>
);

export const Footer = () => {
	const social = [
		kinConfig.instagramUrl && { label: footer.social, href: kinConfig.instagramUrl },
		whatsappSupportLink() && { label: "WhatsApp", href: whatsappSupportLink() },
		kinConfig.supportEmail && { label: "Email", href: `mailto:${kinConfig.supportEmail}` },
	].filter(Boolean) as { label: string; href: string }[];

	return (
		<footer id="kin-footer" className="border-t border-kin-line bg-kin-bg pt-16 pb-28 md:pb-12">
			<Container>
				<div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
					<div>
						<Wordmark byline="by HustleX" />
						<p className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em] text-kin-fg">
							{footer.promise}
						</p>
						{social.length > 0 && (
							<ul className="mt-6 flex flex-wrap gap-4">
								{social.map(s => (
									<li key={s.href}>
										<a
											href={s.href}
											target="_blank"
											rel="noopener noreferrer"
											className="kin-label text-kin-fg-2 hover:text-kin-accent"
										>
											{s.label} ↗
										</a>
									</li>
								))}
							</ul>
						)}
					</div>
					<Col title={footer.explore} links={footer.links} />
					<Col title={footer.company} links={footer.companyLinks} />
					<Col title={footer.legal} links={footer.legalLinks} />
				</div>

				<div className="mt-16 flex flex-col gap-3 border-t border-kin-line pt-6 text-[12px] text-kin-fg-3 md:flex-row md:items-start md:justify-between">
					<p>
						© {new Date().getFullYear()} {company.legalEntity} · {company.city}
					</p>
					<p className="md:text-right">
						{kinConfig.productName} is a {company.parentBrand} product. {company.address.join(", ")}
						{company.cin && <> · CIN {company.cin}</>}
						{company.gstin && <> · GSTIN {company.gstin}</>}
					</p>
				</div>
			</Container>
		</footer>
	);
};
