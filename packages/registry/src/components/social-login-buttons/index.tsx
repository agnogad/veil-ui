"use client";

import { cn } from "@veil-ui/utils";

const providers = {
  github: { label: "GitHub", mark: "GH" },
  google: { label: "Google", mark: "G" },
  apple: { label: "Apple", mark: "A" },
} as const;

type SocialProvider = keyof typeof providers;

interface SocialLoginButtonsProps
  extends Omit<React.ComponentProps<"div">, "onSelect"> {
  providers?: SocialProvider[];
  onSelect?: (provider: SocialProvider) => void;
  disabled?: boolean;
}

function SocialLoginButtons({
  className,
  providers: providerList = ["github", "google", "apple"],
  onSelect,
  disabled = false,
  ...props
}: SocialLoginButtonsProps) {
  return (
    <div
      data-slot="social-login-buttons"
      className={cn("grid gap-2", className)}
      {...props}
    >
      {providerList.map((provider) => {
        const config = providers[provider];
        return (
          <button
            key={provider}
            type="button"
            disabled={disabled}
            onClick={() => onSelect?.(provider)}
            className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
          >
            <span
              aria-hidden
              className="flex size-5 items-center justify-center rounded-full border bg-muted text-[10px] font-semibold"
            >
              {config.mark}
            </span>
            Continue with {config.label}
          </button>
        );
      })}
    </div>
  );
}

export { SocialLoginButtons };
export type { SocialLoginButtonsProps, SocialProvider };
