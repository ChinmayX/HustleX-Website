import type { MetadataRoute } from "next";

import { kinPath } from "@/kin/config";
import { siteUrl } from "@/shared/site";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: [kinPath("/admin"), kinPath("/pre-order/success"), kinPath("/pre-order/status"), "/api/"],
		},
		sitemap: `${siteUrl}/sitemap.xml`,
	};
}
