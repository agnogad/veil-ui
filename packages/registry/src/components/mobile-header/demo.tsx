"use client";

import { Share2, SlidersHorizontal } from "lucide-react";

import { Button } from "../button/index";
import { MobileHeader } from "./index";

export function MobileHeaderBasic() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border">
      <MobileHeader
        title="Project settings"
        subtitle="Acme workspace"
        sticky={false}
        actions={
          <Button size="icon" variant="ghost" aria-label="Share project">
            <Share2 />
          </Button>
        }
      />
      <div className="h-24 bg-muted/20" />
    </div>
  );
}

export function MobileHeaderWithBack() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border">
      <MobileHeader
        title="Billing"
        onBack={() => {}}
        sticky={false}
        actions={
          <Button size="icon" variant="ghost" aria-label="Filters">
            <SlidersHorizontal />
          </Button>
        }
      />
      <div className="h-24 bg-muted/20" />
    </div>
  );
}
