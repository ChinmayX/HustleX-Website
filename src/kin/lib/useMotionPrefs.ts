"use client";

import { useEffect, useState } from "react";

type NavigatorExtras = Navigator & {
	connection?: { saveData?: boolean; effectiveType?: string };
	deviceMemory?: number;
};

export type MotionPrefs = {
	/** prefers-reduced-motion: reduce */
	reduced: boolean;
	/** Save-Data header / data saver, or a 2G connection */
	saveData: boolean;
	/** Low-memory or low-core device: skip heavy scroll scrubs */
	lowPower: boolean;
	/** False during SSR and the first client render */
	ready: boolean;
};

export const readMotionPrefs = (): MotionPrefs => {
	const nav = navigator as NavigatorExtras;
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const saveData =
		!!nav.connection?.saveData || /(^|-)2g$/.test(nav.connection?.effectiveType ?? "");
	const lowPower =
		(nav.deviceMemory !== undefined && nav.deviceMemory <= 2) ||
		(nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2);
	return { reduced, saveData, lowPower, ready: true };
};

export const useMotionPrefs = (): MotionPrefs => {
	const [prefs, setPrefs] = useState<MotionPrefs>({
		reduced: false,
		saveData: false,
		lowPower: false,
		ready: false,
	});
	useEffect(() => {
		setPrefs(readMotionPrefs());
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const onChange = () => setPrefs(readMotionPrefs());
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);
	return prefs;
};

/** Below Tailwind's md breakpoint. */
export const useIsMobile = () => {
	const [mobile, setMobile] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia("(max-width: 767px)");
		const on = () => setMobile(mq.matches);
		on();
		mq.addEventListener("change", on);
		return () => mq.removeEventListener("change", on);
	}, []);
	return mobile;
};
