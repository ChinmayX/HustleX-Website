import type { Metadata } from "next";

import { ContactForm } from "@/kin/components/ContactForm";
import { PageShell } from "@/kin/components/PageShell";
import { SectionHeader } from "@/kin/components/ui";
import { kinConfig, kinUrl, whatsappSupportLink } from "@/kin/config";
import { contact } from "@/kin/content/pages";
import { company } from "@/shared/company";

export const metadata: Metadata = {
	title: contact.title,
	description: contact.description,
	alternates: { canonical: kinUrl("/contact") },
};

const Row = ({ label, value, href }: { label: string; value: string; href?: string }) => (
	<div className="grid grid-cols-[110px_1fr] gap-4 border-b border-kin-line py-4">
		<dt className="kin-label pt-1 text-kin-fg-3">{label}</dt>
		<dd className="text-[16px] text-kin-fg">
			{href ? (
				<a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="hover:text-kin-accent">
					{value}
				</a>
			) : (
				value
			)}
		</dd>
	</div>
);

const ContactPage = () => {
	const wa = whatsappSupportLink();
	return (
		<PageShell>
			<SectionHeader label={contact.label} headline={contact.headline} sub={contact.sub} />
			<div className="mt-16 grid gap-14 md:grid-cols-2">
				<dl className="border-t border-kin-line">
					<Row
						label={contact.whatsapp}
						value={kinConfig.supportWhatsapp ? `+${kinConfig.supportWhatsapp.replace(/\D/g, "")}` : contact.todo}
						href={wa || undefined}
					/>
					<Row
						label={contact.email}
						value={kinConfig.supportEmail || contact.todo}
						href={kinConfig.supportEmail ? `mailto:${kinConfig.supportEmail}` : undefined}
					/>
					{kinConfig.supportPhone && (
						<Row label={contact.phone} value={kinConfig.supportPhone} href={`tel:${kinConfig.supportPhone}`} />
					)}
					<Row label={contact.hours} value={kinConfig.businessHours} />
					<Row label={contact.address} value={[company.legalEntity, ...company.address].join(", ")} />
				</dl>
				<ContactForm />
			</div>
		</PageShell>
	);
};
export default ContactPage;
