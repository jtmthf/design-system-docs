"use client";

import { toast } from "sonner";

import { Toaster } from "@workspace/ui/components/sonner";
import { Button } from "@workspace/ui/components/button";

export default function SonnerError() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Toaster richColors />
      <Button
        variant="destructive"
        onClick={() => toast.error("Something went wrong. Please try again.")}
      >
        Show error
      </Button>
    </div>
  );
}
