"use client";

import { useState } from "react";
import { CalendarIcon, SettingsIcon, UserIcon } from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@workspace/ui/components/command";
import { Button } from "@workspace/ui/components/button";

export default function CommandDialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="w-48 justify-between text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        Search commands…
        <CommandShortcut>⌘K</CommandShortcut>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search commands..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem>
                <CalendarIcon />
                Calendar
              </CommandItem>
              <CommandItem>
                <UserIcon />
                Profile
              </CommandItem>
              <CommandItem>
                <SettingsIcon />
                Settings
                <CommandShortcut>⌘,</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
