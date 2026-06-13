"use client";

import { AspectRatio } from "@workspace/ui/components/aspect-ratio";

export default function AspectRatioDemo() {
  return (
    <div className="w-full max-w-lg">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="White wall with framed photo"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  );
}
