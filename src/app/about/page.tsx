"use client";

import Image from "next/image";
import Link from "next/link";

import { Footer } from "../../components/footer";

const About = () => {
	return (
		<div className="flex flex-col items-center w-full">
			<div className="flex justify-between items-center py-12 w-240">
				<Image width={180} height={54} src="/logo.png" alt="logo" />
				<Link href="/">
					<button className="px-6 py-3 border border-gray-800 rounded-full bg-gray-100 text-sm">
						Back to website
					</button>
				</Link>
			</div>
			<div className="p-20 w-240">
				<h1 className="text-6xl md:text-5xl font-bold leading-tight text-black mt-12">
					Building the best <br /> <i className="text-blue-600">Fitness</i> experience{" "}
					<i className="text-blue-600">ever.</i>
				</h1>
				<p className="text-lg md:text-xl text-gray-700 font-light mt-8 leading-7">
					HustleX is a gamified fitness app that rewards individuals for their fitness
					activity by providing them with exclusive offers from premium brands. It is a
					platform that helps people stay motivated towards fitness by making fitness more
					game-like. The problem with most fitness apps is that they are lethargic and are
					quite boring. HustleX would make fitness more fun by integrating game elements
					like points, leaderboards, battlepass(ish), levels, rewards and more.
				</p>
				<p className="mt-8 font-bold">Email</p>
				<p className="text-gray-700">social.hustlex@gmail.com</p>
				<p className="mt-4 font-bold">Phone</p>
				<p className="text-gray-700">+91 9141196450</p>
			</div>
			<Footer />
		</div>
	);
};

export default About;
