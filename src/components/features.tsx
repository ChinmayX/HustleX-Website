import React from "react";

import Image from "next/image";

import { playfairDisplay } from "../ui/ui";

const Features = () => {
	const items = [
		{ title: "Macros", image: "/mockup/macros.png" },
		{ title: "Rewards", image: "/mockup/rewards.png" },
		{ title: "Store", image: "/mockup/store.png" },
	];

	return (
		<div className="w-full bg-gradient-to-t from-black-300 via-black-200 to-black flex flex-col xl:flex-row items-center justify-between">
			<div className="relative w-full h-[600] -mb-36 flex items-center justify-between">
				{items.map((item, index) => (
					<div
						key={index}
						className="relative w-full h-full flex items-center justify-center"
					>
						<div className="relative w-full h-full flex items-center justify-center opacity-25">
							{Array.from({ length: 3 }).map((_, i) => {
								const size = 450 - i * 75;
								const opacity = 0.12 + i * 0.08;

								return (
									<div
										key={i}
										className="absolute rounded-full"
										style={{
											width: size,
											height: size,
											backgroundColor: `rgba(255, 255, 255, ${opacity})`,
											boxShadow: `0 0 0 1px rgba(255, 255, 255, ${opacity}), 0 0 0 2px rgba(255, 255, 255, ${opacity}), 0 0 0 3px rgba(255, 255, 255, ${opacity})`,
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
			</div>
		</div>
	);
};

export default Features;
