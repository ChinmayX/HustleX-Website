import Image from "next/image";
import Link from "next/link";

import { ibmPlexMono, playfairDisplay } from "@/ui/fonts";

const Hero = () => (
	<div className="relative w-full min-h-[80vh] flex flex-col justify-around items-center bg-black z-0 py-12 gap-8">
		<div className="absolute w-full h-full -z-1">
			<Image src="/hero.png" alt="Hero" fill priority />
		</div>
		<nav className="z-10 flex items-center justify-between w-4/5 bg-black-500/40 px-12 py-4 rounded-full">
			<Link href="/">
				<Image src="/small-white.png" alt="Logo" width={54} height={54} />
			</Link>
			<Link
				href="/download"
				className="flex px-6 py-2 bg-white-300 text-black border border-black-300 rounded-full"
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
			className={`${ibmPlexMono.className} text-white-500 text-center text-m -mt-4 xl:text-lg w-1/2`}
		>
			Crafted for the dedicated...
		</h2>
		<div className="z-10 w-11/12 max-w-xl xl:max-w-2xl rounded-2xl border border-white-500/20 bg-black-500/30 backdrop-blur-md px-6 py-6 xl:px-10 xl:py-8 text-center">
			<h3
				className={`${playfairDisplay.className} italic font-bold text-white text-xl xl:text-2xl mb-3`}
			>
				<span className="text-blue-600">Thank</span> You
			</h3>
			<p
				className={`${ibmPlexMono.className} text-white-400 text-sm xl:text-base leading-relaxed`}
			>
				Thanks for logging every rep, keeping every streak, and letting us be part of your
				progress. Helping this community track their grind has been the best part of
				building HustleX.
			</p>
			<p
				className={`${ibmPlexMono.className} text-white-400 text-sm xl:text-base leading-relaxed mt-3`}
			>
				This isn&apos;t the end. We&apos;re heads down building something better.{" "}
				<span className="text-white font-semibold">HustleX will be back.</span> See you
				soon.
			</p>
		</div>
	</div>
);
export default Hero;
