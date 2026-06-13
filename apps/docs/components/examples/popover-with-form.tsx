"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@workspace/ui/components/popover";

export default function PopoverWithForm() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Edit profile
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Edit profile</PopoverTitle>
          <PopoverDescription>
            Make changes to your public profile here.
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="popover-name">Name</Label>
            <Input id="popover-name" defaultValue="Jack Moore" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="popover-username">Username</Label>
            <Input id="popover-username" defaultValue="@jackmoore" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
