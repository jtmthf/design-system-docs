"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";

export default function SkeletonDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-72" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-32 w-80 rounded-xl" />
    </div>
  );
}
