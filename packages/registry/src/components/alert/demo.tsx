"use client";

import { CircleAlert, Info, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./index";

export function AlertBasic() {
  return (
    <Alert className="max-w-md">
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        This project is on the free plan. Deployments older than 30 days are
        removed automatically.
      </AlertDescription>
    </Alert>
  );
}

export function AlertDestructive() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <CircleAlert />
      <div>
        <AlertTitle>Deployment failed</AlertTitle>
        <AlertDescription className="text-destructive/90">
          The build exited with code 1. Check the logs for details.
        </AlertDescription>
      </div>
    </Alert>
  );
}

export function AlertWithIcon() {
  return (
    <Alert className="max-w-md">
      <Info />
      <div>
        <AlertTitle>New in v0.1</AlertTitle>
        <AlertDescription>
          Registry, CLI and 42 core components are rolling out.
        </AlertDescription>
      </div>
    </Alert>
  );
}

export function AlertWithAction() {
  return (
    <Alert className="max-w-md items-center">
      <Terminal />
      <div className="flex-1">
        <AlertTitle>Install the CLI</AlertTitle>
        <AlertDescription>
          <code className="font-mono text-xs">npx veil-ui@latest init</code>
        </AlertDescription>
      </div>
      <a
        href="/docs/cli"
        className="shrink-0 text-xs font-medium underline underline-offset-4"
      >
        Docs
      </a>
    </Alert>
  );
}
