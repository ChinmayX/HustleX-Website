import Image from "next/image";
import Link from "next/link";

export const Back = (props: { light: boolean }) => (
	<div className="flex justify-between items-center py-12 w-5xl">
		<Image
			width={props.light ? 54 : 180}
			height={54}
			src={props.light ? "/small-white.png" : "/logo.png"}
			alt="Logo"
		/>
		<Link
			href="/"
			className="px-6 py-3 border border-gray-800 rounded-full bg-gray-100 text-sm text-black"
		>
			Back to website
		</Link>
	</div>
);
