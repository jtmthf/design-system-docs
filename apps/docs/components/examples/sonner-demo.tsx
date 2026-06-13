"use client";

import { toast } from "sonner";

import { Toaster } from "@workspace/ui/components/sonner";
import { Button } from "@workspace/ui/components/button";

export default function SonnerDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Toaster />
      <Button onClick={() => toast("File saved successfully.")}>
        Show toast
      </Button>
    </div>
  );
}
