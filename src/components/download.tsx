import Image from "next/image";

import { playfairDisplay } from "../ui/ui";

export default function DownloadSection() {
	const qrUrl = "https://hustlex.club/download";

	return (
		<div className="bg-black w-full text-white flex flex-col xl:flex-row items-center justify-between xl:px-60 border-t-1 border-neutral-900">
			<div className="w-full xl:w-1/2  space-y-4 xl:px-0 p-16 flex flex-col xl:items-start items-center">
				<h1 className="text-3xl xl:text-5xl font-light text-center xl:text-left">
					The best do <span className={playfairDisplay.className}>more</span>,
					<br />
					The best get <span className={playfairDisplay.className}>more</span>.
				</h1>
				<p className="text-gray-400 text-center xl:text-left">
					Download HustleX and get rewarded for your grind.
				</p>
				<div className="w-20 h-20 p-2 border-neutral-400 border-1 rounded-r-sm">
					<Image
						src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=E6E6E6&bgcolor=000000&data=${encodeURIComponent(qrUrl)}`}
						alt="QR Code"
						width={200}
						height={200}
					/>
				</div>
			</div>
			<div className="xl:w-1/2 w-full justify-end">
				<Image src="/mockup-1.jpg" alt="App Preview" width={600} height={600} />
			</div>
		</div>
	);
}
