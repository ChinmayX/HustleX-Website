"use client";

import React from "react";

import { motion } from "motion/react";
import Image from "next/image";

import { Back } from "../../components/back";

const Download = () => {
	const [qrUrl, setQrUrl] = React.useState("");

	React.useEffect(() => {
		const appStoreUrl = "https://apps.apple.com/app/id/123456789";
		const playStoreUrl = "https://play.google.com/store/apps/details?id=com.hustlex.club";

		if (/iPhone|iPad|iPod/.test(navigator.userAgent)) window.location.replace(appStoreUrl);
		else if (/Android/.test(navigator.userAgent)) window.location.replace(playStoreUrl);
		else setQrUrl("/qr.png");
	}, []);

	return (
		<div className="h-screen flex flex-col items-center bg-black text-white">
			{qrUrl ? (
				<>
					<Back light />
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="flex flex-col items-center justify-center h-full"
					>
						<h1 className="text-3xl font-bold mb-4">Scan to Download</h1>
						<Image src={qrUrl} alt="QR Code" width={200} height={200} />
						<p className="mt-4 text-white-500">Scan with your phone to get the app.</p>
					</motion.div>
				</>
			) : (
				<h1 className="text-3xl font-bold h-full flex items-center">Redirecting...</h1>
			)}
		</div>
	);
};
export default Download;
