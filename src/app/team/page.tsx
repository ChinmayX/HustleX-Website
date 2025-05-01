"use client";

import Image from "next/image";
import Link from "next/link";

import { Back } from "../../components/back";
import { Footer } from "../../components/footer";

import { playfairDisplay } from "../../ui/ui";

const Team = () => {
	const team = [
		{ name: "Chinmay P Dev", image: "/team/team-1.png", role: "Founder" },
		{ name: "Siddharth P Bharadwaj", image: "/team/team-2.png", role: "CTO" },
		{ name: "Siddhanth Bhatt", image: "/team/team-4.png", role: "Growth Lead" },
		{ name: "Samuel Villegas", image: "/team/team-3.png", role: "DevOps Engineer" },
		{ name: "Arsh Rawuthar", image: "/team/team-5.png", role: "Partnerships and Sales" },
		{ name: "Akhil Raj", image: "/team/team-6.png", role: "Social Media Manager" },
		{ name: "Karan Sampath", image: "/team/team-7.png", role: "Creative Producer" },
	];
	return (
		<div className="flex flex-col items-center w-full bg-white text-black">
			<Back />
			<div className="px-10 pb-20 w-full xl:w-5xl">
				<h1 className="text-6xl font-bold leading-tight mt-12">
					Meet our{" "}
					<span className={`${playfairDisplay.className} italic text-blue-600`}>
						team
					</span>
					.
				</h1>
				<div className="flex flex-wrap justify-center items-center gap-16 mt-12">
					{team.map((member, index) => (
						<div
							key={index}
							className="flex flex-col items-center justify-center gap-8"
						>
							<Image
								src={member.image}
								alt={member.name}
								width={128}
								height={128}
								className="rounded-full w-32 h-32 object-cover"
							/>
							<div className="flex flex-col items-center text-center">
								<h2 className="text-xl font-bold">{member.name}</h2>
								<p className="text-lg text-black-500">{member.role}</p>
							</div>
						</div>
					))}
				</div>
				<p className="text-lg text-justify text-black mt-8">
					We're Gen-Z minds driven to execute with purpose - building for a cause that
					matters. Building the greatest fitness experience ever isn't a cakewalk, and
					we're not doing it by ourselves. We're seeking talented, driven individuals who
					are looking to make a meaningful difference as they build their careers.
					<br />
					Take a look at our{" "}
					<Link
						href="https://hustlexclub.notion.site/Career-2d32355fb69c485b92682d5627f181dd"
						target="_blank"
						rel="noopener noreferrer"
						className="font-bold text-blue-600 hover:underline"
					>
						open positions
					</Link>{" "}
					- and if nothing matches, but you think you'd fit in, get in touch, and we might
					help you in some way.
					<br />
				</p>
			</div>
			<Footer />
		</div>
	);
};

export default Team;
