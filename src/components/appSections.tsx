"use client";

import React from "react";

import { playfairDisplay } from "@/ui/fonts";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const stageClass =
	"w-full flex flex-col xl:flex-row items-center justify-between px-10 xl:px-40 py-24 bg-black text-white";

// Everything in this section scales off --p, the phone width (320px in the Figma design).
// Ring diameters are relative to the phone: 550 / 432 / 336 at --p = 320.
const rings = [1.72, 1.35, 1.05];

const MainFeatures = () => {
	const items = [
		{ title: "Macros", image: "/mockup/macros.png" },
		{ title: "Rewards", image: "/mockup/rewards.png" },
		{ title: "Store", image: "/mockup/store.png" },
	];
	const reduceMotion = useReducedMotion();
	return (
		<div
			className="w-full overflow-hidden text-white [--p:220px] sm:[--p:260px] xl:[--p:clamp(200px,16.667vw,320px)]"
			style={{
				background:
					"radial-gradient(250% 160% at 50% -60%, #050505 63%, #161617 100%)",
			}}
		>
			<div className="w-full max-w-[1920px] mx-auto flex flex-col xl:flex-row items-center justify-around gap-[calc(var(--p)*0.35)] xl:gap-0 pt-[calc(var(--p)*0.5)] pb-[calc(var(--p)*0.25)]">
				{items.map((item) => (
					<div
						key={item.title}
						className="relative flex flex-col items-center xl:flex-1"
					>
						<h2
							className={`${playfairDisplay.className} italic font-bold leading-none text-white/[0.08] text-[calc(var(--p)*0.31)] whitespace-nowrap select-none`}
						>
							{item.title}
						</h2>
						<div className="relative w-[var(--p)] aspect-[320/630] -mt-[calc(var(--p)*0.035)]">
							<div
								aria-hidden
								className="absolute left-1/2 top-[calc(50%-var(--p)*0.075)] -translate-x-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none"
							>
								{rings.map((ratio, i) => (
									<motion.div
										key={ratio}
										className="absolute left-1/2 top-1/2 rounded-full"
										style={{
											width: `calc(var(--p) * ${ratio})`,
											height: `calc(var(--p) * ${ratio})`,
											marginLeft: `calc(var(--p) * ${-ratio / 2})`,
											marginTop: `calc(var(--p) * ${-ratio / 2})`,
											background:
												"radial-gradient(circle closest-side, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)",
											boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.6)",
										}}
										animate={
											reduceMotion
												? undefined
												: { scale: [1, 1.06, 1], opacity: [1, 0.55, 1] }
										}
										transition={{
											duration: 4,
											repeat: Infinity,
											ease: "easeInOut",
											delay: (rings.length - 1 - i) * 0.5,
										}}
									/>
								))}
							</div>
							{/* The mockup PNG is 470x780 with the 320x630 phone at (75, 79); crop to the phone. */}
							<div className="absolute inset-0 overflow-hidden rounded-[6.875%/3.492%]">
								<div className="absolute left-[-23.4375%] top-[-12.54%] w-[146.875%] h-[123.81%]">
									<Image
										src={item.image}
										alt={item.title}
										fill
										sizes="(min-width: 1280px) 470px, 330px"
									/>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const DownloadSection = () => (
	<div className={stageClass}>
		<motion.div
			initial={{ opacity: 0, y: 100 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
			className="w-full xl:w-3/5 space-y-4 p-6 xl:p-16 flex flex-col xl:items-start items-center justify-center"
		>
			<h1 className="text-3xl xl:text-5xl text-center xl:text-left">
				The best do{" "}
				<span className={`${playfairDisplay.className} italic font-bold text-blue-600`}>
					more
				</span>
				,<br />
				The best get{" "}
				<span className={`${playfairDisplay.className} italic font-bold text-blue-600`}>
					more
				</span>
				.
			</h1>
			<p className="text-zinc-400 text-center xl:text-left">
				Download HustleX and get rewarded for your grind.
			</p>
			<motion.div
				className="w-20 h-20 p-2 border border-neutral-400 rounded-sm cursor-pointer"
				whileHover={{ scale: 1.25 }}
				transition={{ type: "spring", stiffness: 200 }}
			>
				<Image priority src="/qr.png" alt="QR Code" width={200} height={200} />
			</motion.div>
		</motion.div>
		<div className="xl:w-2/5 relative w-full h-[600] flex items-center justify-end">
			<Image src="/mockup/download.png" alt="Download" fill className="object-contain z-10" />
		</div>
	</div>
);

const ExtraFeatures = () => {
	const items = [
		{ title: "Challenges", image: "/features/challenges.png" },
		{ title: "Streaks", image: "/features/streaks.png" },
		{ title: "Raffles", image: "/features/raffles.png" },
		{ title: "Spin-the-Wheel", image: "/features/spin.png" },
		{ title: "Leaderboard", image: "/features/leaderboard.png" },
		{ title: "Buddies", image: "/features/buddies.png" },
		{ title: "Daily Rewards", image: "/features/daily-rewards.png" },
		{ title: "Stats", image: "/features/stats.png" },
		{ title: "1v1 Battles", image: "/features/battle1v1.png" },
	];
	return (
		<div className={`${stageClass} !py-8 bg-cover bg-[url(/grid.png)] bg-center bg-no-repeat`}>
			<motion.div
				initial={{ opacity: 0, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="w-full space-y-4 xl:px-16 py-8 flex flex-wrap items-center justify-center"
			>
				<motion.div
					initial={{ opacity: 0, y: 100 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="w-full space-y-4 xl:p-12 py-4 flex flex-col xl:items-start items-center justify-center"
				>
					<h1 className="w-full text-4xl xl:text-6xl text-center">
						The{" "}
						<span
							className={`${playfairDisplay.className} font-bold italic text-blue-600`}
						>
							All-in-One
						</span>{" "}
						Platform for Growth
					</h1>
				</motion.div>
				<div className="w-full flex flex-wrap items-center justify-center">
					{items.map((item, index) => (
						<motion.div
							key={index}
							className="w-full xl:w-1/3 h-[256] xl:px-8 flex flex-col items-center justify-center transition-transform bg-[#0A0A0A] border border-[#525252]/25"
						>
							<motion.div
								className="w-full text-center mt-8 mb-4"
								transition={{ type: "spring", stiffness: 120 }}
							>
								<h2
									className={`${playfairDisplay.className} italic font-bold text-2xl xl:text-4xl opacity-90`}
								>
									{item.title}
								</h2>
							</motion.div>
							<motion.div
								transition={{ type: "spring", stiffness: 100 }}
								className="w-full h-full relative flex items-center justify-center mx-20 mb-8"
								whileHover={{ scale: 1.05 }}
							>
								<Image
									src={item.image}
									alt={item.title}
									fill
									style={{ objectPosition: "center top" }}
									className="object-contain"
								/>
							</motion.div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</div>
	);
};

const Gym = () => (
	<div className={`${stageClass} !bg-white !text-black`}>
		<motion.div
			initial={{ opacity: 0, y: 100 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
			className="w-full xl:w-3/5 space-y-4 p-6 xl:p-16 flex flex-col xl:items-start items-center justify-center"
		>
			<h1
				className={`${playfairDisplay.className} text-3xl xl:text-5xl text-center xl:text-left`}
			>
				Easy to <span className="font-bold italic text-blue-600">track</span> and
				<br />
				<span className="font-bold italic text-blue-600">monitor</span> progress.
			</h1>
			<p className="text-zinc-400 text-center xl:text-left">
				Track your progress and maintain your goals with HustleX.
			</p>
		</motion.div>
		<div className="xl:w-2/5 relative w-full h-[600] mb-8 xl:mb-0 flex items-center justify-end">
			<div className="relative w-full h-full flex items-center justify-center">
				{Array.from({ length: 3 }).map((_, i) => {
					const size = 500 - i * 100;
					const baseOpacity = 1;

					return (
						<motion.div
							key={i}
							className="absolute rounded-full bg-white"
							initial={{ scale: 0.25, opacity: baseOpacity }}
							animate={{ scale: 1.25, opacity: 0 }}
							transition={{
								duration: 2.5,
								repeat: Infinity,
								repeatDelay: 0.5,
								delay: i * 0.5,
								ease: "easeOut",
							}}
							style={{
								width: size,
								height: size,
								boxShadow:
									"0 0 0 1px #d9d9d9, 0 0 0 2px #737373, 0 0 0 3px #cbcbcb",
							}}
						/>
					);
				})}
			</div>
			<Image src="/mockup/gym.png" alt="Gym" fill className="object-contain z-10" />
		</div>
	</div>
);

const AppSections = () => (
	<div className="flex flex-col w-full overflow-x-hidden">
		<MainFeatures />
		<Gym />
		<DownloadSection />
		{/*<ExtraFeatures />*/}
	</div>
);

export default AppSections;
