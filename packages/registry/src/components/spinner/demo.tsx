"use client";

import { Button } from "../button/index";
import { Spinner } from "./index";

export function SpinnerBasic() {
  return <Spinner />;
}

export function SpinnerSizes() {
  return (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
    </div>
  );
}

export function SpinnerButton() {
  return (
    <Button disabled>
      <Spinner size="sm" label="Deploying" />
      Deploying...
    </Button>
  );
}
