"use client";

import React from "react";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

import { playfairDisplay } from "../ui/ui";

interface StageProps {
	progress: any;
	index: number;
}

const STAGES = 3;
const stageClass =
	"absolute w-full h-full xl:px-40 flex flex-col xl:flex-row items-center justify-between overflow-hidden bg-black text-white";

const getTransformRange = (index: number, total: number) => {
	const stageSize = 1 / total;
	return {
		opacityRange: [(index - 1) * stageSize, index * stageSize, (index + 1) * stageSize],
		opacityOutput: index === total ? [0, 1, 1] : [0, 1, 0],
		mockupYOutput: index === total ? [200, 0, 0] : [200, 0, -200],
	};
};

const Stage1 = (props: StageProps) => {
	const { opacityRange, opacityOutput, mockupYOutput } = getTransformRange(props.index, STAGES);

	const opacity = useTransform(props.progress, opacityRange, opacityOutput);
	const mockupY = useTransform(props.progress, opacityRange, mockupYOutput);

	const items = [
		{ title: "Macros", image: "/mockup/macros.png" },
		{
			title: "Rewards",
			image: "/mockup/rewards.png",
		},
		{ title: "Store", image: "/mockup/store.png" },
	];

	return (
		<motion.div
			style={{ opacity }}
			className={`${stageClass} !px-0 bg-gradient-to-t from-black-300 via-black-200 to-black`}
		>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				style={{ y: mockupY }}
				className="w-full h-[600] -mb-36 flex items-center xl:items-start justify-between"
			>
				{items.map((item, index) => (
					<div
						key={index}
						className="relative w-full h-full flex items-center justify-center"
					>
						<div className="relative w-full h-full flex items-center justify-center opacity-25">
							{Array.from({ length: 3 }).map((_, i) => {
								const size = 450 - i * 75;
								const baseOpacity = 0.12 + i * 0.08;

								const scale = useTransform(
									props.progress,
									opacityRange,
									[0.8, 1, 1.2],
								);
								const opacity = useTransform(props.progress, opacityRange, [
									0,
									baseOpacity,
									0,
								]);

								return (
									<motion.div
										key={i}
										className="absolute rounded-full"
										style={{
											width: size,
											height: size,
											scale,
											opacity,
											backgroundColor: `rgba(255, 255, 255, ${baseOpacity})`,
											boxShadow: `0 0 0 1px rgba(255, 255, 255, ${baseOpacity}), 0 0 0 2px rgba(255, 255, 255, ${baseOpacity}), 0 0 0 3px rgba(255, 255, 255, ${baseOpacity})`,
										}}
									/>
								);
							})}
						</div>
						<div className="absolute top-16 w-full text-center">
							<h2
								className={`${playfairDisplay.className} italic font-bold text-7xl opacity-90`}
							>
								{item.title}
							</h2>
						</div>
						<Image
							src={item.image}
							alt={item.title}
							fill
							style={{
								scale: "0.75",
								objectFit: "contain",
								objectPosition: "center top",
							}}
						/>
					</div>
				))}
			</motion.div>
		</motion.div>
	);
};

const Stage2 = (props: StageProps) => {
	const { opacityRange, opacityOutput, mockupYOutput } = getTransformRange(props.index, STAGES);

	const opacity = useTransform(props.progress, opacityRange, opacityOutput);
	const mockupY = useTransform(props.progress, opacityRange, mockupYOutput);

	return (
		<motion.div style={{ opacity }} className={stageClass}>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="w-full xl:w-3/5 space-y-4 p-16 flex flex-col xl:items-start items-center justify-center"
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
				<p className="text-gray-400 text-center xl:text-left">
					Download HustleX and get rewarded for your grind.
				</p>
				<div className="w-20 h-20 p-2 border-neutral-400 border rounded-sm">
					<Image priority src="/qr.png" alt="QR Code" width={200} height={200} />
				</div>
			</motion.div>
			<motion.div
				style={{ y: mockupY }}
				className="xl:w-2/5 relative w-full h-[600] flex items-center justify-end"
			>
				<Image
					src="/mockup/mockup-1.png"
					alt="Mockup 1"
					fill
					style={{ objectFit: "contain", zIndex: 10 }}
				/>
			</motion.div>
		</motion.div>
	);
};

const Stage3 = (props: StageProps) => {
	const { opacityRange, opacityOutput, mockupYOutput } = getTransformRange(props.index, STAGES);

	const opacity = useTransform(props.progress, opacityRange, opacityOutput);
	const mockupY = useTransform(props.progress, opacityRange, mockupYOutput);

	return (
		<motion.div style={{ opacity }} className={`${stageClass} !bg-white !text-black`}>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="w-full xl:w-3/5 space-y-4 p-16 flex flex-col xl:items-start items-center justify-center"
			>
				<h1
					className={`${playfairDisplay.className} text-3xl xl:text-5xl text-center xl:text-left`}
				>
					Easy to <span className="font-bold italic text-blue-600">track</span> and
					<br />
					<span className="font-bold italic text-blue-600">monitor</span> progress.
				</h1>
				<p className="text-gray-400 text-center xl:text-left">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate error
					eveniet illo illum incidunt ipsum labore nulla, obcaecati officia quis quos, rem
					repudiandae sed sunt suscipit, unde velit veniam voluptas?
				</p>
			</motion.div>
			<motion.div
				style={{ y: mockupY }}
				className="xl:w-2/5 relative w-full h-[600] flex items-center justify-end"
			>
				<motion.div
					style={{ scale: props.progress }}
					className="relative w-full h-full flex items-center justify-center"
				>
					{Array.from({ length: 3 }).map((_, i) => {
						const size = 500 - i * 100;
						return (
							<div
								key={i}
								className="absolute rounded-full bg-white"
								style={{
									width: size,
									height: size,
									boxShadow:
										"0 0 0 1px #d9d9d9, 0 0 0 2px #737373, 0 0 0 3px #cbcbcb",
								}}
							/>
						);
					})}
				</motion.div>
				<Image
					src="/mockup/mockup-2.png"
					alt="Mockup 2"
					fill
					style={{ objectFit: "contain", zIndex: 10 }}
				/>
			</motion.div>
		</motion.div>
	);
};

const AppSections = () => {
	const ref = React.useRef(null);

	const { scrollYProgress: progress } = useScroll({
		target: ref,
		offset: ["start end", "end end"],
	});
	const bgColor = useTransform(progress, [0, 0.5, 1], ["#000000", "#000000", "#ffffff"]);
	const textColor = useTransform(progress, [0, 0.5, 1], ["#ffffff", "#ffffff", "#000000"]);

	return (
		<div className="relative">
			<div ref={ref} className="relative" style={{ height: `calc(${STAGES} * 200vh)` }}>
				<motion.div
					style={{ backgroundColor: bgColor, color: textColor }}
					className="sticky top-0 h-screen w-full flex flex-col items-center justify-between px-10 xl:px-60"
				>
					<Stage1 index={1} progress={progress} />
					<Stage2 index={2} progress={progress} />
					<Stage3 index={3} progress={progress} />
				</motion.div>
			</div>
		</div>
	);
};

export default AppSections;
