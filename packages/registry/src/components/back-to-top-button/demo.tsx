import { BackToTopButton } from "./index";

export function BackToTopButtonBasic() {
  return <BackToTopButton visible size="icon" />;
}

export function BackToTopButtonOutline() {
  return <BackToTopButton visible variant="outline" size="icon" />;
}

export function BackToTopButtonControlled() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Pass `visible` to control it in stories and tours.</span>
      <BackToTopButton visible label="Scroll to top" variant="secondary" />
    </div>
  );
}
