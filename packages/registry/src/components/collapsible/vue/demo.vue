<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";
import { ref } from "vue";

import { Button } from "@/components/ui/button";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./index";

const open = ref(false);
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-6">
    <Collapsible v-model:open="open" class="w-full">
      <div class="flex items-center justify-between gap-3">
        <span class="text-sm font-medium">Recent deployments</span>
        <CollapsibleTrigger as-child>
          <Button variant="ghost" size="sm">
            {{ open ? "Hide" : "Show" }}
            <ChevronDown
              :class="open ? 'rotate-180 transition-transform' : 'transition-transform'"
              aria-hidden="true"
            />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <ul class="mt-3 flex flex-col gap-2 text-sm">
          <li class="rounded-md border p-2">v2.4.0 · 12 minutes ago</li>
          <li class="rounded-md border p-2">v2.3.1 · yesterday</li>
          <li class="rounded-md border p-2">v2.3.0 · 3 days ago</li>
        </ul>
      </CollapsibleContent>
    </Collapsible>

    <Collapsible default-open class="w-full">
      <div class="flex items-center justify-between gap-3">
        <span class="text-sm font-medium">Environment variables</span>
        <CollapsibleTrigger as-child>
          <Button variant="outline" size="sm">Toggle</Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <pre
          class="mt-3 overflow-x-auto rounded-md border bg-muted/40 p-3 text-xs"
        >DATABASE_URL=postgres://…
NEXT_PUBLIC_SITE_URL=https://veil-ui.dev</pre>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>
