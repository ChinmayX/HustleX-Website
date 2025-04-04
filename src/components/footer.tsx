import React from "react";

import { ArrowUpRight, Instagram, Linkedin, Mail, Twitter } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";

const links = [
	{ name: "About", href: "/about" },
	{ name: "Team", href: "/team" },
	{ name: "Career", href: "/career" },
	{ name: "Get access", href: "/download" },
	{ name: "Privacy Policy", href: "/privacy" },
	{ name: "Terms", href: "/terms" },
	{ name: "Shipping Policy", href: "/shipping" },
	{ name: "Refund Policy", href: "/refund" },
];

const socialLinks = [
	{ href: "https://twitter.com/hustlexclub", src: <Twitter /> },
	{ href: "https://www.instagram.com/hustlex.club/", src: <Instagram /> },
	{ href: "mailto:cx@hustlex.club", src: <Mail /> },
	{ href: "https://www.linkedin.com/company/hustlexclub/", src: <Linkedin /> },
];

export const Footer = () => {
	return (
		<div
			className="w-full bg-cover bg-center bg-no-repeat p-4 xl:px-20 xl:py-12 border-t-1 border-neutral-900"
			style={{ backgroundImage: "url(/footer-bg.png)" }}
			id="footer"
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
					<div className="flex space-x-4 mb-4 ">
						{socialLinks.map((social, index) => (
							<Link
								key={index}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 p-2 flex items-center justify-center bg-gray-100/10 border-gray-100/80 border-1 rounded-full shadow-xl transition-transform duration-200 transform hover:-translate-x-1 hover:-translate-y-1 hover:bg-gray-100/20"
							>
								{social.src}
							</Link>
						))}
					</div>
					<div className="flex items-center gap-4 xl:items-start flex-col">
						<p className="text-gray-100/60 text-left">© 2025 | HustleX</p>
						<div className="flex flex-col justify-center gap-2">
							<p className="text-gray-100/40 text-xs xl:text-left text-center">
								HustleX is a brand owned and operated by <br /> XELITE Studios Pvt.
								Ltd.
							</p>
							<p className="text-gray-100/40 text-xs  xl:text-left text-center">
								#12 Nelamangala Bangalore India
							</p>
						</div>
					</div>
				</div>
				<div className="w-full flex flex-row items-end justify-between xl:justify-end">
					{Array.from({ length: Math.ceil(links.length / 4) }, (_, i) =>
						links.slice(i * 4, i * 4 + 4),
					).map((group, i) => (
						<div key={i} className="w-full flex flex-col space-y-2 text-center xl:px-8">
							{group.map((link, index) => (
								<Link
									key={index}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="xl:w-3/4 w-full text-sm font-medium text-gray-50/60 uppercase hover:underline flex justify-between items-center mb-6 px-4"
								>
									{link.name} <ArrowUpRight width={16} height={16} />
								</Link>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Footer;
