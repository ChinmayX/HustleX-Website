import type { ImageAsset } from "@/kin/media";

const MOBILE = "(max-width: 767px)";

/**
 * Responsive <picture>: AVIF → WebP → fallback, optional mobile art direction.
 * width/height are always set so there is no layout shift.
 */
export const Picture = ({
	asset,
	alt,
	priority,
	className = "",
	sizes = "100vw",
}: {
	asset: ImageAsset;
	alt: string;
	priority?: boolean;
	className?: string;
	sizes?: string;
}) => {
	const m = asset.mobile;
	return (
		<picture>
			{m?.avif && <source media={MOBILE} type="image/avif" srcSet={m.avif} />}
			{m?.webp && <source media={MOBILE} type="image/webp" srcSet={m.webp} />}
			{m && <source media={MOBILE} srcSet={m.src} />}
			{(asset.srcSet?.avif || asset.avif) && (
				<source type="image/avif" srcSet={asset.srcSet?.avif || asset.avif} sizes={sizes} />
			)}
			{(asset.srcSet?.webp || asset.webp) && (
				<source type="image/webp" srcSet={asset.srcSet?.webp || asset.webp} sizes={sizes} />
			)}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={asset.src}
				srcSet={asset.srcSet?.fallback}
				sizes={asset.srcSet?.fallback ? sizes : undefined}
				width={asset.width}
				height={asset.height}
				alt={alt}
				loading={priority ? "eager" : "lazy"}
				fetchPriority={priority ? "high" : "auto"}
				decoding="async"
				className={`absolute inset-0 h-full w-full object-cover ${className}`}
			/>
		</picture>
	);
};
