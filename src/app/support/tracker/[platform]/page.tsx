"use client";

import React from "react";

import AndroidTracker from "@/markdown/platform/android.mdx";
import AppleTracker from "@/markdown/platform/ios.mdx";
import { Container } from "@/ui/markdown";
import dynamic from "next/dynamic";

const TrackerPlatform = (props: { params: Promise<{ platform: string }> }) => {
	const { platform } = React.use(props.params);
	const TrackerComponent = dynamic(
		() => import(`@/markdown/trackers/${platform.toLowerCase()}.mdx`),
		{ ssr: false, loading: () => <div>Loading...</div> },
	);

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
