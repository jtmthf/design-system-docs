"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";

export default function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open sheet
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your public profile. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 text-sm text-muted-foreground">
          Profile form fields go here.
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
