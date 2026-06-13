"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@workspace/ui/components/popover";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Width</span>
            <span className="text-muted-foreground">100%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Height</span>
            <span className="text-muted-foreground">Auto</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
