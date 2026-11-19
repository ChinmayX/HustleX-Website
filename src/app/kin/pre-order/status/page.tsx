import type { Metadata } from "next";

import { MinimalHeader } from "@/kin/components/preorder/MinimalHeader";
import { StatusLookup } from "@/kin/components/preorder/StatusLookup";
import { status } from "@/kin/content/pages";

export const metadata: Metadata = {
	title: status.title,
	description: status.description,
	robots: { index: false, follow: false },
};

const StatusPage = () => (
	<>
		<MinimalHeader />
		<main id="main" className="px-4 sm:px-6 md:px-8">
			<StatusLookup />
		</main>
	</>
);
export default StatusPage;
