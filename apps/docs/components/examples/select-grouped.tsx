"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";

export default function SelectGrouped() {
  return (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern (EST)</SelectItem>
          <SelectItem value="cst">Central (CST)</SelectItem>
          <SelectItem value="pst">Pacific (PST)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">London (GMT)</SelectItem>
          <SelectItem value="cet">Paris (CET)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
