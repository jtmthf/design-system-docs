"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Button } from "@workspace/ui/components/button";

export default function TooltipPlacement() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            Top
          </TooltipTrigger>
          <TooltipContent side="top">Tooltip on top</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            Right
          </TooltipTrigger>
          <TooltipContent side="right">Tooltip on right</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            Bottom
          </TooltipTrigger>
          <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            Left
          </TooltipTrigger>
          <TooltipContent side="left">Tooltip on left</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
