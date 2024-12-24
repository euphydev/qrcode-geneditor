import Image, { ImageProps } from "next/image";

export default function QRImage({ src, alt, ...rest }: ImageProps) {
  return src ? <Image src={src} alt={alt} {...rest} /> : null;
}
