"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "../button/index";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./index";

export function CollapsibleBasic() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-md">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">Recent deployments</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            {open ? "Hide" : "Show"}
            <ChevronDown
              className={open ? "rotate-180 transition-transform" : "transition-transform"}
              aria-hidden
            />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          <li className="rounded-md border p-2">v2.4.0 · 12 minutes ago</li>
          <li className="rounded-md border p-2">v2.3.1 · yesterday</li>
          <li className="rounded-md border p-2">v2.3.0 · 3 days ago</li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function CollapsibleDefaultOpen() {
  return (
    <Collapsible defaultOpen className="w-full max-w-md">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">Environment variables</span>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm">
            Toggle
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <pre className="mt-3 overflow-x-auto rounded-md border bg-muted/40 p-3 text-xs">
          DATABASE_URL=postgres://…{`\n`}NEXT_PUBLIC_SITE_URL=https://veil-ui.dev
        </pre>
      </CollapsibleContent>
    </Collapsible>
  );
}
