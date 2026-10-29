import { CloseButton } from "./index";

export function CloseButtonBasic() {
  return <CloseButton />;
}

export function CloseButtonOutline() {
  return <CloseButton variant="outline" label="Close dialog" />;
}

export function CloseButtonLarge() {
  return <CloseButton size="lg" variant="ghost" />;
}
