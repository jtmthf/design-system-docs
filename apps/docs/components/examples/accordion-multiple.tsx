"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";

export default function AccordionMultiple() {
  return (
    <Accordion multiple className="w-full max-w-md">
      <AccordionItem value="shipping">
        <AccordionTrigger>How long does shipping take?</AccordionTrigger>
        <AccordionContent>
          Standard shipping takes 3&ndash;5 business days. Express options are
          available at checkout.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>What is the return policy?</AccordionTrigger>
        <AccordionContent>
          Items can be returned within 30 days of delivery for a full refund.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
