"use client";

import { ArrowRightIcon } from "lucide-react";

import { Button } from "@workspace/ui/components/button";

export default function ButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>
        Continue
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
      <Button size="icon" aria-label="Continue">
        <ArrowRightIcon />
      </Button>
    </div>
  );
}
