"use client";

import * as React from "react";

import { Calendar } from "@workspace/ui/components/calendar";

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  );
}
