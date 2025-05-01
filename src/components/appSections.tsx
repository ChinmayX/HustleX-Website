"use client";

import React from "react";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

import { playfairDisplay } from "../ui/ui";

interface StageProps {
	progress: any;
}

const Stage1 = (props: StageProps) => {
	const opacity = useTransform(props.progress, [0, 0.3, 0.5], [1, 1, 0]);
	const mockupY = useTransform(props.progress, [0, 0.3, 0.5], [0, 0, -200]);

	return (
		<motion.div
			style={{ opacity }}
			className="absolute w-full h-full xl:px-40 flex flex-col xl:flex-row items-center justify-between pointer-events-none"
		>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="w-full xl:w-3/5 space-y-4 p-16 flex flex-col xl:items-start items-center sticky top-0 h-screen justify-center"
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

const Stage2 = (props: StageProps) => {
	const opacity = useTransform(props.progress, [0.5, 0.7, 1], [0, 1, 1]);
	const mockupY = useTransform(props.progress, [0.5, 0.7, 1], [200, 0, 0]);

	return (
		<motion.div
			style={{ opacity }}
			className="absolute w-full h-full xl:px-40 flex flex-col xl:flex-row items-center justify-between bg-white text-black pointer-events-none"
		>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="w-full xl:w-3/5 space-y-4 p-16 flex flex-col xl:items-start items-center sticky top-0 h-screen justify-center"
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
		offset: ["start start", "end end"],
	});
	const bgColor = useTransform(progress, [0, 0.5, 1], ["#000000", "#ffffff", "#ffffff"]);
	const textColor = useTransform(progress, [0, 0.5, 1], ["#ffffff", "#000000", "#000000"]);

	return (
		<div className="relative h-[200vh] border-t border-neutral-900">
			<div ref={ref} className="relative h-[200vh]">
				<motion.div
					style={{ backgroundColor: bgColor, color: textColor }}
					className="sticky top-0 h-screen w-full flex flex-col items-center justify-between px-10 xl:px-60"
				>
					<Stage1 progress={progress} />
					<Stage2 progress={progress} />
				</motion.div>
			</div>
		</div>
	);
};

export default AppSections;
