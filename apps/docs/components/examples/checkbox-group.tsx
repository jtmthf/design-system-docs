"use client";

import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";

const options = [
  { id: "email", label: "Email notifications" },
  { id: "sms", label: "SMS notifications" },
  { id: "push", label: "Push notifications" },
];

export default function CheckboxGroup() {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-sm font-medium">Notification preferences</p>
      {options.map((opt) => (
        <Label key={opt.id} className="flex items-center gap-2">
          <Checkbox id={opt.id} defaultChecked={opt.id === "email"} />
          {opt.label}
        </Label>
      ))}
    </div>
  );
}
