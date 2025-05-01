import Image from "next/image";
import Link from "next/link";

import { ibmPlexMono, playfairDisplay } from "../ui/ui";

const Hero = () => (
	<div className="relative w-full h-[80vh] flex flex-col justify-around items-center bg-black z-0">
		<div className="absolute w-full h-full -z-1">
			<Image src="/hero.png" alt="Hero" fill priority />
		</div>
		<nav className="z-10 flex items-center justify-between w-4/5 bg-neutral-700/40 bg-opacity-50 px-12 py-4 mb-12 rounded-full">
			<Link href="/">
				<Image src="/small-white.png" alt="Logo" width={54} height={54} />
			</Link>
			<Link
				href="/download"
				className="hidden xl:flex px-6 py-2 bg-neutral-200 text-neutral-800 border border-gray-900 rounded-full"
			>
				get access
			</Link>
		</nav>
		<h1
			className={`${playfairDisplay.className} italic text-white text-center font-bold text-5xl xl:text-7xl leading-none`}
		>
			<span className="text-blue-600">Re</span>imagine
			<br />
			Fitness
		</h1>
		<h2
			className={`${ibmPlexMono.className} text-white-500 text-center text-m -mt-16 xl:text-lg w-1/2`}
		>
			Crafted for the dedicated...
		</h2>
	</div>
);
export default Hero;
