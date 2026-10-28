"use client";

import { Label } from "../label/index";
import { Textarea } from "./index";

export function TextareaBasic() {
  return (
    <Textarea
      placeholder="Tell us what you are building..."
      className="w-full max-w-sm"
      aria-label="Project description"
    />
  );
}

export function TextareaWithLabel() {
  return (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" placeholder="A few words about you" rows={4} />
      <p className="text-sm text-muted-foreground">
        Displayed on your public profile.
      </p>
    </div>
  );
}

export function TextareaInvalid() {
  return (
    <div className="grid w-full max-w-sm gap-1.5">
      <Label htmlFor="message">Message</Label>
      <Textarea
        id="message"
        aria-invalid
        aria-describedby="message-error"
        defaultValue="Too short"
      />
      <p id="message-error" className="text-sm text-destructive">
        Message must be at least 20 characters.
      </p>
    </div>
  );
}
