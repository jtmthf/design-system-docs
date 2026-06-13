"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";

export default function AccordionDefaultOpen() {
  return (
    <Accordion defaultValue={["overview"]} className="w-full max-w-md">
      <AccordionItem value="overview">
        <AccordionTrigger>Overview</AccordionTrigger>
        <AccordionContent>
          This panel is open on load because its value is passed to
          <code> defaultValue</code>.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="details">
        <AccordionTrigger>Details</AccordionTrigger>
        <AccordionContent>
          Remaining panels stay collapsed until the user opens them.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
