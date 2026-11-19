"use client";

import { useEffect, useState } from "react";

import { kinConfig } from "@/kin/config";

export type Stock = {
	founderBatchSize: number;
	paid: number;
	remaining: number;
	currentPrice: number;
	/** True while this is placeholder data, not real paid reservations. */
	sample: boolean;
};

export const computeStock = (paid: number, sample: boolean): Stock => {
	const remaining = Math.max(0, kinConfig.founderBatchSize - paid);
	return {
		founderBatchSize: kinConfig.founderBatchSize,
		paid,
		remaining,
		currentPrice: remaining > 0 ? kinConfig.founderPrice : kinConfig.regularPrice,
		sample,
	};
};

/**
 * PLACEHOLDER DATA. The backend isn't built yet, so the counter shows a sample number.
 * Before launch, replace `fetchStock` with `fetch("/api/kin/stock")` (spec §8.6):
 * the counter must only ever reflect real paid reservations. Never fake scarcity.
 */
const SAMPLE_PAID = 37;

const fetchStock = async (): Promise<Stock> => computeStock(SAMPLE_PAID, true);

/**
 * Shared hook for every counter (hero chip, Founders section, pre-order summary, sticky bar).
 * Returns null while loading or on error, so callers hide the counter instead of showing a wrong number.
 */
let cache: Promise<Stock | null> | null = null;
export const useStock = () => {
	const [stock, setStock] = useState<Stock | null>(null);
	useEffect(() => {
		let alive = true;
		cache ??= fetchStock().catch(() => null);
		cache.then(s => alive && setStock(s));
		return () => {
			alive = false;
		};
	}, []);
	return stock;
};

/** Whether the counter should be shown at all (config + optional threshold). */
export const counterVisible = (stock: Stock | null): stock is Stock =>
	!!stock &&
	kinConfig.showLiveCounter &&
	(kinConfig.counterHideAbove == null || stock.remaining < kinConfig.counterHideAbove);
