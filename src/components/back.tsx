import Image from "next/image";
import Link from "next/link";

export const Back = (props: { light?: boolean }) => (
	<div className="flex justify-between items-center h-[54] px-4 py-2 mt-12 w-5xl">
		<Image
			width={props.light ? 54 : 180}
			height={54}
			src={props.light ? "/small-white.png" : "/logo.png"}
			alt="Logo"
		/>
		<Link
			href="/"
			className="px-6 py-3 border border-white-500 rounded-full bg-white-100 text-sm text-black"
		>
			Back to website
		</Link>
	</div>
);
