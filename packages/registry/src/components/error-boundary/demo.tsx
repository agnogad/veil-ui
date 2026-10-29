"use client";

import { useState } from "react";

import { Button } from "../button/index";
import { ErrorBoundary } from "./index";

function Bomb({
  explode,
  onExplode,
}: {
  explode: boolean;
  onExplode: () => void;
}) {
  if (explode) {
    throw new Error("The demo could not render this widget.");
  }

  return (
    <Button variant="outline" onClick={onExplode}>
      Trigger an error
    </Button>
  );
}

function BasicDemo() {
  const [explode, setExplode] = useState(false);

  return (
    <ErrorBoundary onError={() => undefined}>
      <Bomb explode={explode} onExplode={() => setExplode(true)} />
    </ErrorBoundary>
  );
}

export function ErrorBoundaryBasic() {
  return <BasicDemo />;
}

function CustomFallbackDemo() {
  const [explode, setExplode] = useState(false);

  return (
    <ErrorBoundary
      fallback={({ error, reset }) => (
        <div className="flex flex-col items-start gap-2 rounded-lg border p-4">
          <p className="text-sm font-medium">Widget unavailable</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
          <Button
            size="sm"
            onClick={() => {
              setExplode(false);
              reset();
            }}
          >
            Restore widget
          </Button>
        </div>
      )}
    >
      <Bomb explode={explode} onExplode={() => setExplode(true)} />
    </ErrorBoundary>
  );
}

export function ErrorBoundaryCustomFallback() {
  return <CustomFallbackDemo />;
}
