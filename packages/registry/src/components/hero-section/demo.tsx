import { ArrowRight, LayoutDashboard } from "lucide-react";

import { Badge } from "../badge/index";
import { Button } from "../button/index";
import { HeroSection } from "./index";

export function HeroSectionBasic() {
  return (
    <HeroSection
      eyebrow="New · Version 2.0"
      title="Build calm interfaces, faster"
      description="A copy-paste component registry with accessible defaults, design tokens and a CLI that keeps you in control."
      actions={
        <>
          <Button size="lg">
            Get started <ArrowRight aria-hidden />
          </Button>
          <Button size="lg" variant="outline">
            Read the docs
          </Button>
        </>
      }
      className="w-full max-w-3xl rounded-xl border bg-background"
    />
  );
}

export function HeroSectionWithMedia() {
  return (
    <HeroSection
      align="start"
      eyebrow="For product teams"
      title="Ship a consistent product surface"
      description="Compose primitives into pages, not the other way around."
      actions={<Button size="lg">Start free trial</Button>}
      media={
        <div className="grid h-56 place-items-center bg-gradient-to-br from-primary/15 via-muted to-background">
          <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm shadow-sm">
            <LayoutDashboard className="size-4 text-primary" aria-hidden />
            Dashboard preview
            <Badge variant="secondary">Live</Badge>
          </div>
        </div>
      }
      className="w-full max-w-5xl rounded-xl border bg-background"
    />
  );
}
