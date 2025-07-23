"use client";

import React from "react";

import { playfairDisplay } from "@/ui/fonts";
import { motion } from "motion/react";
import Image from "next/image";

const stageClass =
	"w-full flex flex-col xl:flex-row items-center justify-between px-10 xl:px-40 py-24 bg-black text-white";

const MainFeatures = () => {
	const items = [
		{ title: "Macros", image: "/mockup/macros.png" },
		{ title: "Rewards", image: "/mockup/rewards.png" },
		{ title: "Store", image: "/mockup/store.png" },
	];
	return (
		<div
			className={`${stageClass} !px-0 bg-gradient-to-t from-black-300 via-black-200 to-black`}
		>
			<motion.div
				initial={{ opacity: 0, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="w-full flex flex-col gap-12 xl:flex-row xl:h-[600] items-center xl:items-start justify-between"
			>
				{items.map((item, index) => (
					<motion.div
						key={index}
						className="relative w-full h-[500] xl:h-full flex items-center justify-center transition-transform"
						whileHover={{ scale: 1.05 }}
					>
						<div className="relative w-full h-full flex items-center justify-center opacity-25">
							{Array.from({ length: 3 }).map((_, i) => {
								const size = 300;
								const baseOpacity = 0.25;

								return (
									<motion.div
										key={i}
										className="absolute rounded-full"
										initial={{ scale: 0.75, opacity: baseOpacity }}
										animate={{ scale: 1.75, opacity: 0 }}
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
											backgroundColor: `rgba(255, 255, 255, ${baseOpacity})`,
											boxShadow: `0 0 0 1px rgba(255, 255, 255, ${baseOpacity}), 0 0 0 2px rgba(255, 255, 255, ${baseOpacity}), 0 0 0 3px rgba(255, 255, 255, ${baseOpacity})`,
										}}
									/>
								);
							})}
						</div>
						<motion.div
							className="absolute -top-4 xl:top-16 w-full text-center"
							whileHover={{ y: -20 }}
							transition={{ type: "spring", stiffness: 120 }}
						>
							<h2
								className={`${playfairDisplay.className} italic font-bold text-7xl opacity-90`}
							>
								{item.title}
							</h2>
						</motion.div>
						<motion.div
							whileHover={{ y: 20 }}
							transition={{ type: "spring", stiffness: 100 }}
							className="w-full h-full absolute"
						>
							<Image
								src={item.image}
								alt={item.title}
								fill
								style={{ objectPosition: "center top" }}
								className="object-contain scale-75"
							/>
						</motion.div>
					</motion.div>
				))}
			</motion.div>
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
