"use client";

import { Progress, ProgressLabel, ProgressValue } from "@workspace/ui/components/progress";

export default function ProgressComplete() {
  return (
    <Progress value={100} className="w-80">
      <ProgressLabel>Upload complete</ProgressLabel>
      <ProgressValue />
    </Progress>
  );
}
