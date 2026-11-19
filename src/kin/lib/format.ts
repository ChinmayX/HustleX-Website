const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** ₹5,999 · ₹1,00,000 (Indian digit grouping). */
export const formatINR = (amount: number) => `₹${inr.format(amount)}`;

/** Founder #023 */
export const formatFounderNumber = (n: number) => `#${String(n).padStart(3, "0")}`;
