"use client";

import { AspectRatio } from "@workspace/ui/components/aspect-ratio";

export default function AspectRatioClassic() {
  return (
    <div className="w-full max-w-md">
      <AspectRatio ratio={4 / 3}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
          <span className="text-sm text-muted-foreground">4 : 3 container</span>
        </div>
      </AspectRatio>
    </div>
  );
}
