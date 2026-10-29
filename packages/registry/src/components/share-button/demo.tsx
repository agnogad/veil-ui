import { ShareButton } from "./index";

export function ShareButtonBasic() {
  return <ShareButton />;
}

export function ShareButtonWithUrl() {
  return (
    <ShareButton
      url="https://veil-ui.dev"
      title="Veil UI"
      text="Copy-paste components for React"
    />
  );
}

export function ShareButtonOutline() {
  return <ShareButton variant="outline" label="Share this page" />;
}
