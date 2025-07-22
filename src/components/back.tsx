"use client";

import Image from "next/image";
import Link from "next/link";

export default (props: { light?: boolean }) => (
	<div className="flex justify-between items-center h-[54] px-4 py-2 mt-12 w-full xl:w-5xl">
		<Image
			width={props.light ? 54 : 180}
			height={54}
			src={props.light ? "/small-white.png" : "/logo.png"}
			alt="Logo"
		/>
		<Link
			href=".."
			className="px-6 py-3 border border-white-500 rounded-full bg-white-100 text-sm text-black hover:cursor-pointer hover:bg-white-200 transition-colors duration-300"
		>
			Back
		</Link>
	</div>
);
