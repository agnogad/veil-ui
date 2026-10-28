"use client";

import { Input } from "./index";

export function InputBasic() {
  return <Input type="email" placeholder="you@example.com" className="max-w-sm" />;
}

export function InputWithLabel() {
  return (
    <div className="grid w-full max-w-sm gap-1.5">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <Input id="email" type="email" placeholder="you@example.com" />
      <p className="text-sm text-muted-foreground">
        We will only use this for account notifications.
      </p>
    </div>
  );
}

export function InputInvalid() {
  return (
    <div className="grid w-full max-w-sm gap-1.5">
      <label htmlFor="email-invalid" className="text-sm font-medium">
        Email
      </label>
      <Input
        id="email-invalid"
        type="email"
        defaultValue="not-an-email"
        aria-invalid
        aria-describedby="email-error"
      />
      <p id="email-error" className="text-sm text-destructive">
        Enter a valid email address.
      </p>
    </div>
  );
}

export function InputDisabled() {
  return <Input disabled placeholder="Disabled" className="max-w-sm" />;
}

export function InputFile() {
  return <Input type="file" className="max-w-sm" />;
}
