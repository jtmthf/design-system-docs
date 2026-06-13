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

export default function SheetLeft() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open navigation
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse sections of the application.</SheetDescription>
        </SheetHeader>
        <nav className="p-4">
          <ul className="space-y-2 text-sm">
            <li>Dashboard</li>
            <li>Projects</li>
            <li>Settings</li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
