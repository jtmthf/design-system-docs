"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";

export default function AccordionDemo() {
  return (
    <Accordion className="w-full max-w-md">
      <AccordionItem value="accessible">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It follows the WAI-ARIA accordion pattern, with full keyboard
          support handled by the underlying Base UI primitive.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="styled">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It ships with sensible defaults and animates open and closed
          using CSS keyframes.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="animated">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. Panels slide open and closed using the panel-height CSS variable.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
