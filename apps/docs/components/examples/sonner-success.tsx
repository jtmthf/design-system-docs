"use client";

import { toast } from "sonner";

import { Toaster } from "@workspace/ui/components/sonner";
import { Button } from "@workspace/ui/components/button";

export default function SonnerSuccess() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Toaster richColors />
      <Button variant="outline" onClick={() => toast.success("Changes saved successfully.")}>
        Show success
      </Button>
    </div>
  );
}
