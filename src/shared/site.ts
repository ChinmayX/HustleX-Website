// Site-wide values shared by every brand on the domain (HustleX today, Kin, GRIT later).

/** Public origin, no trailing slash. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://hustlex.club").replace(/\/$/, "");

/**
 * While true, `/` temporarily (307) redirects to Kin and the HustleX pages are
 * left out of the sitemap. Defaults to on; set HUSTLEX_ROOT_REDIRECTS_TO_KIN=false to restore.
 */
export const rootRedirectsToKin = process.env.HUSTLEX_ROOT_REDIRECTS_TO_KIN !== "false";
