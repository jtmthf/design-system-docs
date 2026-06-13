"use client";

import * as React from "react";

import { Calendar } from "@workspace/ui/components/calendar";

export default function CalendarDropdown() {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      captionLayout="dropdown"
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
    />
  );
}
