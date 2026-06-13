"use client";

import { DownloadIcon, SlidersHorizontalIcon } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import { ButtonGroup } from "@workspace/ui/components/button-group";

export default function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <DownloadIcon />
        Download
      </Button>
      <Button variant="outline">
        <SlidersHorizontalIcon />
      </Button>
    </ButtonGroup>
  );
}
