"use client";

import { PlusIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Button } from "@workspace/ui/components/button";

export default function TooltipIconButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={<Button variant="outline" size="icon" aria-label="Add item" />}
        >
          <PlusIcon />
        </TooltipTrigger>
        <TooltipContent>Add item</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
