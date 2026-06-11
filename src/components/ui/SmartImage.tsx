import Image from "next/image";
import { resolveImageSrc } from "@/lib/images";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  /** 1–100; local uploads default to full-quality originals via unoptimized */
  quality?: number;
};

export function SmartImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  priority,
  sizes,
  quality = 75,
}: SmartImageProps) {
  const resolved = resolveImageSrc(src);
  const isRemote = resolved.startsWith("http");
  const serveOriginal = isRemote;

  if (fill) {
    return (
      <Image
        src={resolved}
        alt={alt}
        fill
        className={className}
        sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
        priority={priority}
        quality={quality}
        unoptimized={serveOriginal}
      />
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      className={className}
      priority={priority}
      quality={quality}
      unoptimized={serveOriginal}
    />
  );
}
