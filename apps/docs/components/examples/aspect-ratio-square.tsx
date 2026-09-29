"use client";

import Image from "next/image";

import { AspectRatio } from "@workspace/ui/components/aspect-ratio";

export default function AspectRatioSquare() {
  return (
    <div className="w-48">
      <AspectRatio ratio={1}>
        <Image
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
          alt="Abstract portrait"
          fill
          sizes="12rem"
          className="rounded-full object-cover"
        />
      </AspectRatio>
    </div>
  );
}
