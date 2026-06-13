"use client";

import { Spinner } from "@workspace/ui/components/spinner";
import { Button } from "@workspace/ui/components/button";

export default function SpinnerInsideButton() {
  return (
    <Button disabled>
      <Spinner className="size-4" />
      Saving...
    </Button>
  );
}
