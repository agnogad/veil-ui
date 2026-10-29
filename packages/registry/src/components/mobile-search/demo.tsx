"use client";

import { useState } from "react";

import { MobileSearch } from "./index";

export function MobileSearchBasic() {
  const [result, setResult] = useState("");

  return (
    <div className="w-full max-w-sm">
      <MobileSearch
        placeholder="Search projects"
        suggestions={["Design tokens", "Release notes", "Roadmap"]}
        onSearch={setResult}
      />
      <p className="mt-3 text-sm text-muted-foreground">
        {result ? `Searching for “${result}”` : "Try a suggestion"}
      </p>
    </div>
  );
}

export function MobileSearchMinimal() {
  return (
    <div className="w-full max-w-sm">
      <MobileSearch placeholder="Search messages" />
    </div>
  );
}
