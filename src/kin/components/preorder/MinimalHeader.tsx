import { kinPath, whatsappSupportLink } from "@/kin/config";
import { preorder } from "@/kin/content/pages";

import { KinLink, Wordmark } from "../ui";

/** Distraction-free header for the checkout flow: wordmark home + help link. */
export const MinimalHeader = () => {
	const wa = whatsappSupportLink();
	return (
		<header className="border-b border-kin-line">
			<div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 md:px-8">
				<KinLink href="/" aria-label={preorder.back}>
					<Wordmark byline="by HustleX" />
				</KinLink>
				<a
					href={wa || kinPath("/contact")}
					target={wa ? "_blank" : undefined}
					rel="noopener noreferrer"
					className="kin-label text-kin-fg-2 hover:text-kin-accent"
				>
					{preorder.help} {wa ? "WhatsApp ↗" : "→"}
				</a>
			</div>
		</header>
	);
};
