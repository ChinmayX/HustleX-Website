import type { Metadata } from "next";

import { LegalPage } from "@/kin/components/LegalPage";
import { kinUrl } from "@/kin/config";
import { refunds } from "@/kin/content/legal";

export const metadata: Metadata = {
	title: refunds.title,
	description: refunds.description,
	alternates: { canonical: kinUrl("/legal/refunds") },
};

const Page = () => <LegalPage doc={refunds} />;
export default Page;
