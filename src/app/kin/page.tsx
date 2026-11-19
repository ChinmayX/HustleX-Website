import { Footer } from "@/kin/components/Footer";
import { Nav } from "@/kin/components/Nav";
import { AppShowcase } from "@/kin/components/sections/AppShowcase";
import { Clip } from "@/kin/components/sections/Clip";
import { Faq } from "@/kin/components/sections/Faq";
import { FinalCta } from "@/kin/components/sections/FinalCta";
import { FounderNote } from "@/kin/components/sections/FounderNote";
import { Founders } from "@/kin/components/sections/Founders";
import { Hero } from "@/kin/components/sections/Hero";
import { How } from "@/kin/components/sections/How";
import { Metrics } from "@/kin/components/sections/Metrics";
import { ObjectSection } from "@/kin/components/sections/ObjectSection";
import { Problem } from "@/kin/components/sections/Problem";
import { Proof } from "@/kin/components/sections/Proof";
import { Specs } from "@/kin/components/sections/Specs";
import { Trust } from "@/kin/components/sections/Trust";
import { StickyBar } from "@/kin/components/StickyBar";
import { kinConfig, kinUrl } from "@/kin/config";
import { faq } from "@/kin/content/faq";
import { seo } from "@/kin/content/home";
import { media } from "@/kin/media";

const jsonLd = () => {
	const img = media["object-hero"].asset;
	return [
		{
			"@context": "https://schema.org",
			"@type": "Product",
			name: `${kinConfig.parentBrand} ${kinConfig.productName}`,
			description: seo.description,
			brand: { "@type": "Brand", name: kinConfig.parentBrand },
			manufacturer: { "@type": "Organization", name: kinConfig.legalEntity },
			...(img && img.kind === "image" ? { image: `${kinConfig.canonicalOrigin}${img.src}` } : {}),
			url: kinUrl(),
			offers: {
				"@type": "Offer",
				price: kinConfig.founderPrice,
				priceCurrency: kinConfig.currency,
				availability: "https://schema.org/PreOrder",
				url: kinUrl("/pre-order"),
				seller: { "@type": "Organization", name: kinConfig.legalEntity },
			},
		},
		{
			"@context": "https://schema.org",
			"@type": "FAQPage",
			mainEntity: faq.items.map(i => ({
				"@type": "Question",
				name: i.q,
				acceptedAnswer: { "@type": "Answer", text: i.a },
			})),
		},
	];
};

const KinHome = () => (
	<>
		<Nav />
		<main id="main">
			<Hero />
			<Problem />
			<Clip />
			<How />
			<Metrics />
			<AppShowcase />
			<ObjectSection />
			<Proof />
			<Founders />
			<FounderNote />
			<Specs />
			<Faq />
			<FinalCta />
			<Trust />
		</main>
		<Footer />
		<StickyBar />
		<script
			type="application/ld+json"
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }}
		/>
	</>
);
export default KinHome;
