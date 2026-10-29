"use client";

import { SocialLoginButtons } from "./index";

export function SocialLoginButtonsBasic() {
  return (
    <SocialLoginButtons
      className="w-full max-w-sm"
      onSelect={() => {}}
    />
  );
}

export function SocialLoginButtonsPair() {
  return (
    <SocialLoginButtons
      className="w-full max-w-sm"
      providers={["github", "google"]}
      onSelect={() => {}}
    />
  );
}
