import Image from "next/image";
import Link from "next/link";

import { ibmPlexMono, instrumentSans, instrumentSerif, playfairDisplay } from "@/ui/fonts";

const Hero = () => (
	<div className="relative w-full min-h-[90vh] md:min-h-[80vh] flex flex-col justify-around items-center bg-black z-0 py-12 gap-8">
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
			className={`${ibmPlexMono.className} text-white-500 text-center text-m -mt-4 xl:text-lg w-full whitespace-nowrap md:w-1/2 md:whitespace-normal`}
		>
			Crafted for the dedicated...
		</h2>
		<div className="z-10 w-10/12 max-w-sm  md:mb-0 bg-white-0 text-black-0 rounded-sm shadow-2xl px-6 py-5 md:absolute md:bottom-8 md:right-8 md:w-fit md:max-w-none md:whitespace-nowrap xl:bottom-12 xl:right-12">
			<h3 className={`${instrumentSerif.className} italic text-3xl leading-none mb-3`}>
				Thank You
			</h3>
			<div
				className={`${instrumentSans.className} italic font-medium text-xs leading-snug flex flex-col gap-2`}
			>
				<p>
					Thanks for logging your steps, keeping every streak, and letting{" "}
					<br className="hidden md:inline" />
					us be part of your progress. Helping this community track their{" "}
					<br className="hidden md:inline" />
					grind has been the best part of building HustleX.
				</p>
				<p>
					This isn&apos;t the end.
					<br />
					We&apos;re heads down building something better.
					<br />
					HustleX will be back. See you soon.
				</p>
			</div>
		</div>
	</div>
);
export default Hero;
