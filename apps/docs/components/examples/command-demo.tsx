"use client";

import { CalendarIcon, FileIcon, SettingsIcon, UserIcon } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@workspace/ui/components/command";

export default function CommandDemo() {
  return (
    <Command className="w-72 rounded-xl border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
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
        <CommandSeparator />
        <CommandGroup heading="Files">
          <CommandItem>
            <FileIcon />
            New file
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <FileIcon />
            Open file
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
