"use client";

import { Back } from "../../components/back";
import { Footer } from "../../components/footer";

import { playfairDisplay } from "../../ui/ui";

const About = () => (
	<div className="flex flex-col items-center w-full bg-white text-black">
		<Back />
		<div className="px-10 pb-20 w-full xl:w-5xl">
			<h1 className="text-6xl font-bold leading-tight mt-12">
				Building the best
				<br />
				<span className={`${playfairDisplay.className} italic text-blue-600`}>Fitness</span>{" "}
				experience{" "}
				<span className={`${playfairDisplay.className} italic text-blue-600`}>ever.</span>
			</h1>
			<p className="text-lg text-justify font-light mt-8 leading-7">
				HustleX is a gamified fitness platform that aims to transform the way individuals
				interact with their fitness goals. Unlike standard fitness apps that tend to be
				boring and uninspiring, HustleX brings fun and excitement into the fitness
				experience by making workouts a gamified experience. Users are rewarded with points,
				level up, and ascend leaderboards as they finish workouts and mark milestones, so
				each step of achievement feels rewarding and engaging.
			</p>
			<p className="text-lg text-justify font-light mt-4 leading-7">
				The platform has a battle pass-ish structured progression system, where users earn
				rewards as they level up. In order to maintain high motivation, we collaborate with
				high-end lifestyle and fitness brands to provide real-life incentives - such as
				discount codes, free products, and limited-time offers - based on user activity and
				consistency.
			</p>
			<p className="text-lg text-justify font-light mt-4 leading-7">
				By combining fitness with gamification and substantial rewards, HustleX seeks to end
				the cycle of fleeting motivation that haunts most fitness apps. It turns staying fit
				from a chore into an adventure, making it simpler and more fun for users to remain
				committed to their health and wellness.
			</p>
		</div>
		<Footer />
	</div>
);

export default About;
