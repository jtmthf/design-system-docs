"use client";

import { CircleAlertIcon } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";

export default function AlertDestructive() {
  return (
    <Alert variant="destructive" className="w-full max-w-md">
      <CircleAlertIcon />
      <AlertTitle>Unable to process payment</AlertTitle>
      <AlertDescription>
        Verify your billing details and try again.
      </AlertDescription>
    </Alert>
  );
}
