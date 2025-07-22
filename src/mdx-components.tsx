import React from "react";

import { playfairDisplay } from "@/ui/fonts";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export const useMDXComponents = (components: MDXComponents): MDXComponents => ({
	h1: props => (
		<h1 className="text-4xl font-bold mt-10 mb-4 text-left xl:text-justify">
			{props.children}
		</h1>
	),
	em: props => (
		<span className={`${playfairDisplay.className} italic text-blue-600`}>
			{props.children}
		</span>
	),
	strong: props => <strong className="font-semibold">{props.children}</strong>,
	h2: props => <h2 className="text-2xl font-semibold mb-2 text-black">{props.children}</h2>,
	h3: props => <h3 className="text-lg font-semibold mb-2 text-black">{props.children}</h3>,
	p: props => <p className="mb-4 text-black text-justify">{props.children}</p>,
	ol: props => (
		<ol className="mb-4 list-decimal list-outside pl-6 text-black">{props.children}</ol>
	),
	ul: props => <ul className="mb-4 list-disc list-outside pl-6 text-black">{props.children}</ul>,
	li: props => <li className="mb-1">{props.children}</li>,
	a: props => (
		<Link
			href={props.href}
			className="text-blue-600 hover:underline"
			target="_blank"
			rel="noopener noreferrer"
		>
			{props.children}
		</Link>
	),
	...components,
});
