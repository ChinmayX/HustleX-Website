import type { ReactNode } from "react";

/**
 * Generic modern phone, drawn in CSS (no brand). The screen area is the slot.
 * Size it by width; the frame keeps a ~9:19.5 screen.
 */
export const PhoneFrame = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
	<div
		className={`relative aspect-[9/19.5] rounded-[14%/6.5%] bg-[#1c1c1f] p-[3.2%] shadow-[0_0_0_1px_rgb(255_255_255/0.12),inset_0_0_0_1px_rgb(255_255_255/0.06),0_40px_80px_-20px_rgb(0_0_0/0.8)] ${className}`}
	>
		{/* side buttons */}
		<span aria-hidden className="absolute -left-[2px] top-[18%] h-[6%] w-[2px] rounded-l bg-[#2a2a2e]" />
		<span aria-hidden className="absolute -left-[2px] top-[27%] h-[9%] w-[2px] rounded-l bg-[#2a2a2e]" />
		<span aria-hidden className="absolute -right-[2px] top-[24%] h-[12%] w-[2px] rounded-r bg-[#2a2a2e]" />
		<div className="relative h-full w-full overflow-hidden rounded-[11.5%/5.3%] bg-black">
			{children}
			{/* camera pill */}
			<span
				aria-hidden
				className="absolute left-1/2 top-[1.8%] z-10 h-[3.4%] w-[30%] -translate-x-1/2 rounded-full bg-black"
			/>
		</div>
	</div>
);
