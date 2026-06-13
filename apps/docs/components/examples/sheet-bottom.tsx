"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";

export default function SheetBottom() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open bottom sheet
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Share</SheetTitle>
          <SheetDescription>Choose how to share this item.</SheetDescription>
        </SheetHeader>
        <div className="flex gap-2 p-4">
          <Button variant="outline" className="flex-1">Copy link</Button>
          <Button variant="outline" className="flex-1">Email</Button>
          <Button variant="outline" className="flex-1">Message</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
