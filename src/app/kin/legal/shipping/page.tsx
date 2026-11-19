import type { Metadata } from "next";

import { LegalPage } from "@/kin/components/LegalPage";
import { kinUrl } from "@/kin/config";
import { shipping } from "@/kin/content/legal";

export const metadata: Metadata = {
	title: shipping.title,
	description: shipping.description,
	alternates: { canonical: kinUrl("/legal/shipping") },
};

const Page = () => <LegalPage doc={shipping} />;
export default Page;
