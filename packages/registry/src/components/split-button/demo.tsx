"use client";

import { SplitButton } from "./index";

export function SplitButtonBasic() {
  return (
    <SplitButton
      label="Deploy"
      items={[
        { label: "Deploy to production" },
        { label: "Deploy to preview" },
        { label: "Redeploy previous build" },
      ]}
    />
  );
}

export function SplitButtonDestructive() {
  return (
    <SplitButton
      label="Delete"
      variant="destructive"
      items={[
        { label: "Delete project" },
        { label: "Delete all deployments", onSelect: () => {} },
      ]}
    />
  );
}

export function SplitButtonAlignStart() {
  return (
    <SplitButton
      label="Publish"
      align="start"
      items={[
        { label: "Publish to npm" },
        { label: "Publish docs only" },
        { label: "Schedule release", disabled: true },
      ]}
    />
  );
}
