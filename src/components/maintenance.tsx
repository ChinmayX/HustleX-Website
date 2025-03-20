import Image from "next/image";

import { playfairDisplay } from "../ui/ui";

export const Maintenance = () => (
	<div
		className={`grid place-items-center grid-rows-[20px_1fr_20px] w-full min-h-1/2 p-8 pb-20 gap-16 sm:p-20 ${playfairDisplay.className}`}
	>
		<div className="flex flex-col gap-[32px] row-start-2 justify-center items-center">
			<Image src="/small-white.png" alt="HustleX logo" width={72} height={72} priority />
			<ul className="text-xl text-center sm:text-left not-last:mb-2">
				<li className="letter-spacing-[0.1em]">Welcome to the HustleX experience.</li>
				<li className="letter-spacing-[0.1em]">The website is under maintenance.</li>
			</ul>
		</div>
	</div>
);
