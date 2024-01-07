import * as React from "react";
import { Nullable } from "@/types";
import Image from "next/image";

export const ImageWithFallback = ({
  src,
  alt,
  fallbackImg,
}: {
  src: Nullable<string>;
  alt: Nullable<string>;
  fallbackImg: React.ReactNode;
}) => {
  const [error, setError] = React.useState(false);

  return src && !error ? (
    <Image
      className="object-contain"
      fill
      src={src}
      alt={alt ?? ""}
      onError={() => {
        setError(true);
      }}
    />
  ) : (
    fallbackImg
  );
};
