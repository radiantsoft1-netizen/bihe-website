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
  /** 1–100 */
  quality?: number;
  unoptimized?: boolean;
};

function isAdminStorageImage(resolved: string): boolean {
  if (!resolved.startsWith("http")) {
    return false;
  }

  try {
    const url = new URL(resolved);

    if (!url.pathname.startsWith("/storage/")) {
      return false;
    }

    return (
      url.hostname === "admin.bihe.edu" ||
      url.hostname === "127.0.0.1" ||
      url.hostname === "localhost"
    );
  } catch {
    return false;
  }
}

function shouldOptimizeImage(resolved: string): boolean {
  if (!resolved.startsWith("http")) {
    return true;
  }

  try {
    const url = new URL(resolved);

    if (url.hostname === "www.figma.com") {
      return false;
    }

    if (isAdminStorageImage(resolved)) {
      return false;
    }

    return true;
  } catch {
    return true;
  }
}

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
  unoptimized,
}: SmartImageProps) {
  const resolved = resolveImageSrc(src);
  const optimized = unoptimized === true ? false : shouldOptimizeImage(resolved);

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
        unoptimized={!optimized}
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
      unoptimized={!optimized}
    />
  );
}
