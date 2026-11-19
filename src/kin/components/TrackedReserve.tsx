"use client";

import type { ReactNode } from "react";

import { trackUI } from "@/kin/lib/analytics";

import { KinLink } from "./ui";

/** "Reserve" link that records which position on the page was clicked. */
export const TrackedReserve = ({
	position,
	className,
	children,
}: {
	position: string;
	className?: string;
	children: ReactNode;
}) => (
	<KinLink href="/pre-order" className={className} onClick={() => trackUI("cta_reserve", { position })}>
		{children}
	</KinLink>
);
