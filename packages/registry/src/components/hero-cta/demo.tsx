import { HeroCta } from "./index";

export function HeroCtaBasic() {
  return (
    <HeroCta
      primaryLabel="Start building"
      primaryHref="#start"
      secondaryLabel="Book a demo"
      secondaryHref="#demo"
      note="No credit card required."
    />
  );
}

export function HeroCtaSingle() {
  return (
    <HeroCta
      className="rounded-lg border bg-muted/20 p-6"
      primaryLabel="Join the waitlist"
      primaryHref="#waitlist"
      note="We will email you when a spot opens."
    />
  );
}
