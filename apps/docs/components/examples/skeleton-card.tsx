"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex items-start gap-4 w-72">
      <Skeleton className="size-12 rounded-full shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
}
