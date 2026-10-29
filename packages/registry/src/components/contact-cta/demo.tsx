import { Button } from "../button/index";
import { ContactCta } from "./index";

export function ContactCtaBasic() {
  return (
    <ContactCta
      className="w-full max-w-4xl"
      email="hello@veil-ui.dev"
      phone="+1 555 010 2030"
      action={<Button>Book a call</Button>}
    />
  );
}

export function ContactCtaCompact() {
  return (
    <ContactCta
      className="w-full max-w-2xl"
      title="Need a hand?"
      description="Our team replies within one business day."
      email="support@veil-ui.dev"
    />
  );
}
