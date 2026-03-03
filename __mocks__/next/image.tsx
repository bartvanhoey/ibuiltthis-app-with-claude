import type { ImgHTMLAttributes } from "react";

export default function MockImage({
  src,
  alt,
  width,
  height,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={width} height={height} {...props} />;
}
