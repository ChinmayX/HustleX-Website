import type { MetadataRoute } from "next";

import { kinUrl } from "@/kin/config";
import { rootRedirectsToKin, siteUrl } from "@/shared/site";

const kinRoutes = [
	{ path: "", priority: 1 },
	{ path: "/pre-order", priority: 0.8 },
	{ path: "/about", priority: 0.5 },
	{ path: "/contact", priority: 0.5 },
	{ path: "/legal/terms", priority: 0.3 },
	{ path: "/legal/privacy", priority: 0.3 },
	{ path: "/legal/refunds", priority: 0.3 },
	{ path: "/legal/shipping", priority: 0.3 },
];

// Parked HustleX pages: only listed once the root redirect is switched off.
const hustlexRoutes = ["", "/about", "/team", "/download", "/support", "/privacy", "/terms", "/refund", "/shipping"];

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();
	const kin = kinRoutes.map(r => ({ url: kinUrl(r.path), lastModified: now, priority: r.priority }));
	if (rootRedirectsToKin) return kin;
	return [...hustlexRoutes.map(p => ({ url: `${siteUrl}${p}`, lastModified: now })), ...kin];
}
