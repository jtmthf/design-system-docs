"use client";

import { Calendar } from "@workspace/ui/components/calendar";

export default function CalendarRange() {
  return (
    <Calendar
      mode="range"
      defaultMonth={new Date(2025, 0, 1)}
      selected={{
        from: new Date(2025, 0, 8),
        to: new Date(2025, 0, 15),
      }}
    />
  );
}
