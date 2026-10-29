import { ArrowRight, AtSign, Briefcase, GitBranch, Mail, Sparkles } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Avatar, AvatarFallback } from "../avatar/index";
import { AvatarGroup } from "../avatar-group/index";
import { Badge } from "../badge/index";
import { Button } from "../button/index";
import { Input } from "../input/index";
import { Logo } from "../logo/index";

const countdown = [
  { value: "21", label: "Days" },
  { value: "08", label: "Hours" },
  { value: "42", label: "Minutes" },
  { value: "15", label: "Seconds" },
];

const earlyUsers = [
  { name: "Mira Chen" },
  { name: "Owen Park" },
  { name: "Lena Ortiz" },
  { name: "Sam Rivera" },
  { name: "Aiko Tanaka" },
];

function ComingSoonPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="coming-soon-page"
      className={cn(
        "relative flex min-h-[580px] flex-col overflow-hidden rounded-xl border bg-background",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-primary),transparent_60%)] opacity-10"
      />
      <div className="relative flex items-center justify-between px-6 py-4">
        <Logo
          name="Veil UI"
          size="sm"
          mark={
            <span className="grid size-full place-items-center bg-primary text-[10px] font-bold text-primary-foreground">
              V
            </span>
          }
        />
        <Badge variant="secondary">
          <Sparkles /> Launching soon
        </Badge>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          A calmer way to ship product interfaces
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Veil UI 2.0 brings a new token system, a faster CLI and 480+
          documented components. Be the first to try it.
        </p>

        <div className="mt-7 flex items-center gap-3">
          {countdown.map((unit) => (
            <div
              key={unit.label}
              className="flex w-16 flex-col items-center rounded-lg border bg-card py-3 shadow-sm"
            >
              <span className="text-2xl font-semibold tabular-nums">
                {unit.value}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <form className="mt-8 flex w-full max-w-md flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Mail
              className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className="pl-8"
              required
            />
          </div>
          <Button type="submit">
            Join the waitlist <ArrowRight />
          </Button>
        </form>
        <p className="mt-2 text-xs text-muted-foreground">
          No spam. Unsubscribe at any time.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <AvatarGroup users={earlyUsers} max={5} label="Early access users" />
          <p className="text-xs text-muted-foreground">
            Joined by 2,400+ designers and engineers
          </p>
        </div>

        <div className="mt-10 flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="GitHub">
            <GitBranch />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Portfolio">
            <Briefcase />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Social">
            <AtSign />
          </Button>
        </div>
      </div>

      <div className="relative flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t px-6 py-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Avatar size="sm" className="size-5">
            <AvatarFallback className="text-[9px]">MC</AvatarFallback>
          </Avatar>
          Built by the Veil team
        </span>
        <a href="#privacy" className="hover:text-foreground">
          Privacy
        </a>
        <a href="#terms" className="hover:text-foreground">
          Terms
        </a>
        <a href="#contact" className="hover:text-foreground">
          Contact
        </a>
      </div>
    </div>
  );
}

export { ComingSoonPage };
