"use client";

import { Progress } from "@workspace/ui/components/progress";

export default function ProgressDemo() {
  return (
    <Progress value={60} aria-label="Upload progress" className="w-80" />
  );
}
