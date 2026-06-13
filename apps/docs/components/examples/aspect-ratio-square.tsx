"use client";

import { AspectRatio } from "@workspace/ui/components/aspect-ratio";

export default function AspectRatioSquare() {
  return (
    <div className="w-48">
      <AspectRatio ratio={1}>
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&dpr=2&q=80"
          alt="Abstract portrait"
          className="h-full w-full rounded-full object-cover"
        />
      </AspectRatio>
    </div>
  );
}
