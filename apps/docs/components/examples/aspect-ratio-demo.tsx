"use client";

import Image from "next/image";

import { AspectRatio } from "@workspace/ui/components/aspect-ratio";

export default function AspectRatioDemo() {
  return (
    <div className="w-full max-w-lg">
      <AspectRatio ratio={16 / 9}>
        <Image
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd"
          alt="White wall with framed photo"
          fill
          sizes="(min-width: 32rem) 32rem, 100vw"
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  );
}
