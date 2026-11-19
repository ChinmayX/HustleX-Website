import { Suspense } from "react";

import type { Metadata } from "next";

import { MinimalHeader } from "@/kin/components/preorder/MinimalHeader";
import { SuccessView } from "@/kin/components/preorder/SuccessView";
import { success } from "@/kin/content/pages";

export const metadata: Metadata = {
	title: success.title,
	robots: { index: false, follow: false },
};

const SuccessPage = () => (
	<>
		<MinimalHeader />
		<main id="main" className="px-4 sm:px-6 md:px-8">
			<Suspense fallback={null}>
				<SuccessView />
			</Suspense>
		</main>
	</>
);
export default SuccessPage;
