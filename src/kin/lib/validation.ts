// Client-side validation. The server will repeat every check when the backend lands.

export const COUNTRY_CODES = [
	{ code: "+91", label: "IN +91" },
	{ code: "+971", label: "AE +971" },
	{ code: "+1", label: "US +1" },
	{ code: "+44", label: "UK +44" },
	{ code: "+65", label: "SG +65" },
	{ code: "+61", label: "AU +61" },
];

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/** Indian mobile: 10 digits, starts 6–9. Others: 6–14 digits. */
export const isPhone = (cc: string, v: string) => {
	const d = v.replace(/\D/g, "");
	return cc === "+91" ? /^[6-9]\d{9}$/.test(d.replace(/^0/, "")) : /^\d{6,14}$/.test(d);
};

export const toE164 = (cc: string, v: string) => {
	let d = v.replace(/\D/g, "");
	if (cc === "+91") d = d.replace(/^0/, "").replace(/^91(?=\d{10}$)/, "");
	return `${cc}${d}`;
};

export const isPincode = (v: string) => /^[1-9]\d{5}$/.test(v.trim());

/** Optional city/state autofill. Fails gracefully (returns null) if the service is down. */
export const lookupPincode = async (pin: string): Promise<{ city: string; state: string } | null> => {
	try {
		const ctrl = new AbortController();
		const t = setTimeout(() => ctrl.abort(), 3500);
		const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`, { signal: ctrl.signal });
		clearTimeout(t);
		const data = await res.json();
		const po = data?.[0]?.PostOffice?.[0];
		return po ? { city: po.District as string, state: po.State as string } : null;
	} catch {
		return null;
	}
};
