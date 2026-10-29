import { BackButton } from "./index";

export function BackButtonBasic() {
  return <BackButton fallbackHref="#top" />;
}

export function BackButtonOutline() {
  return (
    <BackButton variant="outline" label="Back to list" fallbackHref="#list" />
  );
}
