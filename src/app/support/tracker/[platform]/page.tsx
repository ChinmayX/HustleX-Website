"use client";

import React from "react";

import AndroidTracker from "@/markdown/platform/android.mdx";
import AppleTracker from "@/markdown/platform/ios.mdx";

import GoogleFit from "@/markdown/trackers/google-fit.mdx";
import SamsungHealth from "@/markdown/trackers/samsung-health.mdx";
import Fitbit from "@/markdown/trackers/fitbit.mdx";
import MyFitnessPal from "@/markdown/trackers/myfitnesspal.mdx";
import Garmin from "@/markdown/trackers/garmin.mdx";
import NikeRunClub from "@/markdown/trackers/nike-run-club.mdx";
import Coros from "@/markdown/trackers/coros.mdx";

import { Container } from "@/ui/markdown";
import { useRouter } from "next/navigation";

const trackerComponentMap: Record<string, React.ComponentType> = {
	"google-fit": GoogleFit,
	"samsung-health": SamsungHealth,
	"fitbit": Fitbit,
	"myfitnesspal": MyFitnessPal,
	"garmin": Garmin,
	"nike-run-club": NikeRunClub,
	"coros": Coros,
};

const TrackerPlatform = (props: { params: Promise<{ platform: string }> }) => {
	const router = useRouter();

	const { platform } = React.use(props.params);
	const TrackerComponent = trackerComponentMap[platform.toLowerCase()];

	if (!TrackerComponent && platform !== "ios" && platform !== "android") {
		router.back();
		return null;
	}
	return (
		<Container>
			{platform === "ios" ? (
				<AppleTracker />
			) : platform === "android" ? (
				<AndroidTracker />
			) : (
				<TrackerComponent />
			)}
		</Container>
	);
};

export default TrackerPlatform;
