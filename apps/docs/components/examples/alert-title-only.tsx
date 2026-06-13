"use client";

import { Alert, AlertTitle } from "@workspace/ui/components/alert";

export default function AlertTitleOnly() {
  return (
    <Alert className="w-full max-w-md">
      <AlertTitle>A short, standalone notice.</AlertTitle>
    </Alert>
  );
}
