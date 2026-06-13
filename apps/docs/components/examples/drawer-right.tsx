"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer";
import { Button } from "@workspace/ui/components/button";

export default function DrawerRight() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">Open right drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>
            Adjust your application preferences.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 text-sm text-muted-foreground">
          Settings content goes here.
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
