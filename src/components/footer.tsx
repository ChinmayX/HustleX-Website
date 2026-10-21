"use client";

import React from "react";

import { ArrowUpRight, Instagram, Linkedin, Mail, Twitter } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
	{ name: "About", href: "/about" },
	{ name: "Team", href: "/team" },
	{
		name: "Career",
		href: "https://hustlexclub.notion.site/Career-2d32355fb69c485b92682d5627f181dd",
	},
	{ name: "Get access", href: "/download" },
	{ name: "Server Status", href: "https://status.hustlex.club" },
	{ name: "Support", href: "/support" },
	{ name: "Privacy Policy", href: "/privacy" },
	{ name: "Terms", href: "/terms" },
	{ name: "Shipping Policy", href: "/shipping" },
	{ name: "Refund Policy", href: "/refund" },
];

const socialLinks = [
	{ href: "https://twitter.com/hustlexclub", src: <Twitter /> },
	{ href: "https://www.instagram.com/hustlex.club", src: <Instagram /> },
	{ href: "mailto:cx@hustlex.club", src: <Mail /> },
	{ href: "https://www.linkedin.com/company/hustlexclub", src: <Linkedin /> },
];

export default () => {
	const pathname = usePathname();
	return (
		<div
			className={`w-full p-4 xl:px-20 xl:py-8 border-t border-black-300 ${
				pathname === "/"
					? "bg-cover bg-[url(/footer-bg.png)] bg-center bg-no-repeat"
					: "bg-black"
			}`}
		>
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-8 text-white">
				<div className="flex flex-col items-center justify-between gap-2 xl:items-start ">
					<Image
						src="/small-white.png"
						alt="HustleX Logo"
						width={72}
						height={72}
						className="mb-2"
					/>
					<div className="flex space-x-4 mb-4">
						{socialLinks.map((social, index) => (
							<Link
								key={index}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 p-2 flex items-center justify-center bg-black-500/10 border-white-500/75 border-1 rounded-full shadow-xl transition-transform duration-200 transform hover:-translate-x-1 hover:-translate-y-1 hover:bg-black-500/20 hover:shadow-2xl"
							>
								{social.src}
							</Link>
						))}
					</div>
					<div className="flex items-center gap-4 xl:items-start flex-col">
						<p className="text-white/75 text-left">&copy; 2025 | HustleX</p>
						<div className="flex flex-col justify-center gap-2">
							<p className="text-white/50 text-xs xl:text-justify text-center">
								HustleX is a brand owned and operated by
								<br />
								XElite Studios Pvt. Ltd.
							</p>
							<p className="text-white/50 text-xs xl:text-justify text-center">
								#12 Nelamangala,
								<br />
								Bengaluru,
								<br />
								Karnataka - 562123,
								<br />
								INDIA
							</p>
						</div>
					</div>
				</div>
				<div className="w-full flex items-end justify-between xl:justify-end">
					<div className="w-full grid grid-cols-2 grid-rows-5 grid-flow-col gap-y-2 xl:gap-x-16 xl:px-8">
						{links.map((link, index) => (
							<Link
								key={index}
								href={link.href}
								target={link.href.startsWith("http") ? "_blank" : "_self"}
								rel="noopener noreferrer"
								className="min-w-0 xl:w-3/4 w-full text-sm max-[380px]:text-xs font-medium text-white/75 uppercase text-left break-words hover:underline flex justify-between items-center gap-2 mb-6 px-4 max-[380px]:px-2"
							>
								<span className="min-w-0">{link.name}</span>
								<ArrowUpRight width={16} height={16} className="shrink-0" />
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
