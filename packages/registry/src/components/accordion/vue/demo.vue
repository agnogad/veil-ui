<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./index";
</script>

<template>
  <Accordion type="single" collapsible class="w-full max-w-lg">
    <AccordionItem value="accessibility">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It follows the WAI-ARIA disclosure pattern and keeps focus
        management intact.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="styling">
      <AccordionTrigger>Can I style the open state?</AccordionTrigger>
      <AccordionContent>
        Use data-[state=open] variants on any descendant of the trigger.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="multiple">
      <AccordionTrigger>Does it support multiple open items?</AccordionTrigger>
      <AccordionContent>
        Set type="multiple" and bind an array of values.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
