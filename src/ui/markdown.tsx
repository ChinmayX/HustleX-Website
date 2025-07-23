import React from "react";

import { LightBulb } from "iconoir-react";
import Link from "next/link";

import Back from "@/components/back";
import Footer from "@/components/footer";

export const Note = (props: { children: React.ReactNode }) => (
	<div className="border-l-4 border-blue-600 bg-blue-50 text-zinc-800 p-4 my-4 rounded-md">
		<strong className="flex items-center mb-2 text-blue-600">
			<LightBulb width={16} height={16} className="inline mr-2" />
			Note:
		</strong>
		{props.children}
	</div>
);

export const Container = (props: { children: React.ReactNode }) => (
	<div className="flex flex-col items-center w-full bg-white text-justify">
		<Back />
		<div className="px-10 pb-20 w-full xl:w-6xl text-black">{props.children}</div>
		<Footer />
	</div>
);

export const Card = (props: {
	title?: string;
	href?: string;
	className?: string;
	children?: React.ReactNode;
}) => {
	const content = (
		<div
			className={`bg-white shadow-md rounded-lg p-6 w-full hover:shadow-lg text-md transition-shadow duration-200 gap-2 ${props.className}`}
		>
			{props.title && <h3 className="text-lg font-semibold">{props.title}</h3>}
			{props.children}
		</div>
	);

	return props.href ? (
		<Link href={props.href} className={props.className}>
			{content}
		</Link>
	) : (
		content
	);
};

export const Button = (props: {
	children: React.ReactNode;
	href?: string;
	onClick?: () => void;
	className?: string;
}) => {
	const { children, href, onClick, className } = props;

	return href ? (
		<Link
			href={href}
			className={`inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors ${className}`}
		>
			{children}
		</Link>
	) : (
		<button
			onClick={onClick}
			className={`inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors ${className}`}
		>
			{children}
		</button>
	);
};
