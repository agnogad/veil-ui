"use client";

import { ArrowRight, Loader2, Mail, Plus } from "lucide-react";

import { Button } from "./index";

export function ButtonBasic() {
  return <Button>Create project</Button>;
}

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="link">Learn more</Button>
    </div>
  );
}

export function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

export function ButtonIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="icon" aria-label="Add item">
        <Plus />
      </Button>
      <Button>
        <Mail /> Send invite
      </Button>
      <Button variant="outline">
        Continue <ArrowRight />
      </Button>
    </div>
  );
}

export function ButtonLoading() {
  return (
    <Button disabled>
      <Loader2 className="animate-spin" />
      Deploying
    </Button>
  );
}

export function ButtonAsChild() {
  return (
    <Button asChild>
      <a href="/docs">Read the docs</a>
    </Button>
  );
}
