import type { Metadata } from "next";

import { MinimalHeader } from "@/kin/components/preorder/MinimalHeader";
import { OrderSummary } from "@/kin/components/preorder/OrderSummary";
import { PreorderForm } from "@/kin/components/preorder/PreorderForm";
import { kinUrl } from "@/kin/config";
import { preorder } from "@/kin/content/pages";

export const metadata: Metadata = {
	title: preorder.title,
	description: preorder.description,
	alternates: { canonical: kinUrl("/pre-order") },
};

const PreorderPage = () => (
	<>
		<MinimalHeader />
		<main id="main" className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 md:px-8 md:py-16">
			<div className="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16">
				<div className="md:sticky md:top-8 md:self-start">
					<OrderSummary />
				</div>
				<PreorderForm />
			</div>
		</main>
	</>
);
export default PreorderPage;
