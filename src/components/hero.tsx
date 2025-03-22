import Image from "next/image";
import Link from "next/link";

import { playfairDisplay } from "../ui/ui";

export default function Hero() {
	return (
		<div className="relative w-full h-[80vh] flex flex-col justify-around items-center bg-black border-b-2 border-neutral-900 z-0">
			{/* Background Image */}
			<div className="absolute w-full h-full   -z-1">
				<Image src="/hero.png" alt="hero" layout="fill" />
			</div>

			{/* Navigation */}
			<nav className="z-10 flex items-center justify-between w-4/5 bg-neutral-700/40 bg-opacity-50 px-12 py-4 mb-12 rounded-full">
				<Link href="/">
					<Image src="/small-white.png" alt="Logo" width={54} height={54} />
				</Link>
				<Link
					href="#join"
					passHref
					className="hidden xl:flex px-6 py-2 bg-neutral-200 text-neutral-800 border border-gray-900 rounded-full"
				>
					get access
				</Link>
			</nav>

			{/* Hero Content */}
			<h1 className="text-white text-center font-bold text-5xl  xl:text-7xl leading-none font-PlayFair">
				<i className={playfairDisplay.className}>
					<span className="text-blue-600">Re</span>imagine <br /> Fitness
				</i>
			</h1>
			<h2 className="text-white text-center font-Outfit text-m xl:text-lg  w-1/2">
				Crafted for the dedicated..
			</h2>
			<Link
				href="#download"
				passHref
				className="px-6 py-2 bg-white text-neutral-800 border border-gray-900 rounded-full"
			>
				unlock rewards
			</Link>
			<div>/</div>
		</div>
	);
}
