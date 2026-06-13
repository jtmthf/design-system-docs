"use client";

import { toast } from "sonner";

import { Toaster } from "@workspace/ui/components/sonner";
import { Button } from "@workspace/ui/components/button";

export default function SonnerWithAction() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast("Email sent", {
            description: "Your message has been delivered.",
            action: {
              label: "Undo",
              onClick: () => toast("Email send cancelled."),
            },
          })
        }
      >
        Send email
      </Button>
    </div>
  );
}
