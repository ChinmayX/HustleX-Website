import type { Metadata } from "next";

import { LegalPage } from "@/kin/components/LegalPage";
import { kinUrl } from "@/kin/config";
import { privacy } from "@/kin/content/legal";

export const metadata: Metadata = {
	title: privacy.title,
	description: privacy.description,
	alternates: { canonical: kinUrl("/legal/privacy") },
};

const Page = () => <LegalPage doc={privacy} />;
export default Page;
