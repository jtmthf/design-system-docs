"use client";

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@workspace/ui/components/progress";

export default function ProgressWithLabel() {
  return (
    <Progress value={65} className="w-80">
      <ProgressLabel>Uploading file</ProgressLabel>
      <ProgressValue />
    </Progress>
  );
}
