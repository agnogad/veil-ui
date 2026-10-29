import { Mail, Phone } from "lucide-react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

interface ContactCtaProps extends Omit<React.ComponentProps<"div">, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  email?: string;
  phone?: string;
  action?: React.ReactNode;
}

function ContactCta({
  className,
  title = "Talk to our team",
  description = "We will help you evaluate the registry for your organization.",
  email,
  phone,
  action,
  ...props
}: ContactCtaProps) {
  return (
    <div
      data-slot="contact-cta"
      className={cn(
        "flex flex-col gap-6 rounded-xl border bg-background p-8 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="max-w-lg">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          {email ? (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline"
            >
              <Mail className="size-4" aria-hidden /> {email}
            </a>
          ) : null}
          {phone ? (
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Phone className="size-4" aria-hidden /> {phone}
            </a>
          ) : null}
        </div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export { ContactCta };
export type { ContactCtaProps };
