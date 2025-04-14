import {
  Accordion as ShadcnAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

type Props = {
  children: React.JSX.Element;
  triggerLabel: string;
};

export const Accordion = ({ children, triggerLabel }: Props) => {
  return (
    <ShadcnAccordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>{triggerLabel}</AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </ShadcnAccordion>
  );
};
