import type * as React from "react";

import { cn } from "@veil-ui/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion/index";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface FaqSectionProps extends Omit<React.ComponentProps<"div">, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  items: FaqItem[];
}

function FaqSection({
  className,
  title = "Frequently asked questions",
  description,
  items,
  ...props
}: FaqSectionProps) {
  return (
    <div data-slot="faq-section" className={cn("grid gap-6", className)} {...props}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <Accordion
        type="single"
        collapsible
        className="mx-auto w-full max-w-3xl rounded-lg border px-5"
      >
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`item-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export { FaqSection };
export type { FaqItem, FaqSectionProps };
