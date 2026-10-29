import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./index";

const faqs = [
  {
    value: "item-1",
    question: "Is the accordion accessible?",
    answer:
      "It is built on Radix Accordion, so headings, buttons and ARIA state are wired up for you.",
  },
  {
    value: "item-2",
    question: "Can several panels be open at once?",
    answer:
      "Use type=\"multiple\" to allow more than one panel to stay open.",
  },
  {
    value: "item-3",
    question: "Can I control the open item?",
    answer:
      "Pass value and onValueChange to the Accordion root for controlled behaviour.",
  },
];

export function AccordionSingle() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-lg">
      {faqs.map((faq) => (
        <AccordionItem key={faq.value} value={faq.value}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function AccordionMultiple() {
  return (
    <Accordion type="multiple" className="w-full max-w-lg">
      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>
          Orders ship within two business days.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>
          Returns are free within 30 days of delivery.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function AccordionDefaultOpen() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="billing"
      className="w-full max-w-lg"
    >
      <AccordionItem value="billing">
        <AccordionTrigger>Billing</AccordionTrigger>
        <AccordionContent>
          You can update your payment method at any time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="security">
        <AccordionTrigger>Security</AccordionTrigger>
        <AccordionContent>
          Two-factor authentication is available on every plan.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
