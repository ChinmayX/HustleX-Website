import { showPlaceholderLabels } from "@/kin/config";
import type { MediaSlotDef } from "@/kin/media";

/**
 * Shown when a media slot has no asset. Fills its (already aspect-ratioed) parent.
 * Labels can be turned off with NEXT_PUBLIC_SHOW_MEDIA_PLACEHOLDER_LABELS=false.
 */
export const Placeholder = ({ id, def }: { id: string; def: MediaSlotDef }) => (
	<div
		className="kin-placeholder @container absolute inset-0 flex flex-col justify-between p-3 @md:p-5 text-current"
		role={def.alt ? "img" : undefined}
		aria-label={def.alt ? `${def.alt} (placeholder)` : undefined}
		aria-hidden={def.alt ? undefined : true}
		data-slot={id}
	>
		{showPlaceholderLabels && (
			<>
				<div className="flex items-start justify-between gap-2">
					<span className="kin-label opacity-80 break-all">{id}</span>
					<span className="kin-label opacity-50 shrink-0 hidden @[180px]:inline">
						{def.type}
					</span>
				</div>
				<div className="space-y-1.5 max-w-[46ch]">
					<p className="text-[11px] @md:text-[13px] leading-snug opacity-60 hidden @[140px]:block">
						{def.description}
					</p>
					<p className="kin-label !text-[10px] opacity-40 hidden @[260px]:block">
						{def.recommended}
					</p>
				</div>
			</>
		)}
	</div>
);
