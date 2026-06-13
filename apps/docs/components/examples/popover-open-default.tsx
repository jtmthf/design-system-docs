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

export default function PopoverOpenDefault() {
  return (
    <Popover defaultOpen defaultTriggerId="popover-open-default-demo">
      <PopoverTrigger
        id="popover-open-default-demo"
        render={<Button variant="outline" />}
      >
        Open popover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Notifications</PopoverTitle>
          <PopoverDescription>You have 3 unread messages.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
