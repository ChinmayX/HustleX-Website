import type { Metadata } from "next";

import { LegalPage } from "@/kin/components/LegalPage";
import { kinUrl } from "@/kin/config";
import { terms } from "@/kin/content/legal";

export const metadata: Metadata = {
	title: terms.title,
	description: terms.description,
	alternates: { canonical: kinUrl("/legal/terms") },
};

const Page = () => <LegalPage doc={terms} />;
export default Page;
