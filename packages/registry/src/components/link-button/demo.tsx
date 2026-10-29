"use client";

import { LinkButton } from "./index";

export function LinkButtonBasic() {
  return (
    <p className="text-sm text-muted-foreground">
      By continuing you agree to our{" "}
      <LinkButton href="/docs/terms">terms of service</LinkButton> and{" "}
      <LinkButton href="/docs/privacy">privacy policy</LinkButton>.
    </p>
  );
}

export function LinkButtonExternal() {
  return (
    <LinkButton href="https://react.dev" external>
      Read the React docs
    </LinkButton>
  );
}

export function LinkButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <LinkButton href="/docs">Documentation</LinkButton>
      <LinkButton href="/docs" variant="muted">
        Changelog
      </LinkButton>
      <LinkButton href="/docs" variant="destructive">
        Delete account
      </LinkButton>
      <LinkButton href="/docs" underline>
        Underlined
      </LinkButton>
    </div>
  );
}
