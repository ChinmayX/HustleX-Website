"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

export default function Download() {
	const [isMobile, setIsMobile] = useState(false);
	const [qrUrl, setQrUrl] = useState("");

	useEffect(() => {
		const appStoreUrl = "https://apps.apple.com/app/id/123456789";
		const playStoreUrl = "https://play.google.com/store/apps/details?id=com.hustlex.club";

		if (/iPhone|iPad|iPod/.test(navigator.userAgent)) window.location.href = appStoreUrl;
		else if (/Android/.test(navigator.userAgent)) window.location.href = playStoreUrl;
		else {
			setIsMobile(false);
			setQrUrl(window.location.href);
		}
	}, []);

	return (
		<div className="h-screen flex flex-col items-center justify-center bg-black text-white">
			{qrUrl ? (
				<>
					<h1 className="text-3xl font-bold mb-4">Scan to Download</h1>
					<Image
						src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=ffffff&bgcolor=000000&data=${encodeURIComponent(qrUrl)}`}
						alt="QR Code"
						width={200}
						height={200}
					/>
					<p className="mt-4 text-gray-400">Scan with your phone to get the app.</p>
				</>
			) : (
				<h1 className="text-3xl font-bold">Redirecting...</h1>
			)}
		</div>
	);
}
