import { ArrowRight, Clock, RefreshCw, Wrench } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { Input } from "../input/index";
import { Logo } from "../logo/index";
import { Progress } from "../progress/index";
import { StatusIndicator } from "../status-indicator/index";

const countdown = [
  { value: "00", label: "Days" },
  { value: "02", label: "Hours" },
  { value: "14", label: "Minutes" },
  { value: "36", label: "Seconds" },
];

function MaintenancePage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="maintenance-page"
      className={cn(
        "flex min-h-[560px] flex-col rounded-xl border bg-background",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b px-6 py-4">
        <Logo
          name="Veil UI"
          size="sm"
          mark={
            <span className="grid size-full place-items-center bg-primary text-[10px] font-bold text-primary-foreground">
              V
            </span>
          }
        />
        <StatusIndicator status="away" label="Maintenance mode" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl border bg-amber-500/10 text-amber-600 shadow-sm">
          <Wrench className="size-7" aria-hidden />
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          We&apos;ll be back shortly
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          We are performing scheduled maintenance to make things faster and more
          reliable. Your data is safe and the service will resume automatically.
        </p>

        <div className="mt-8 flex items-center gap-3">
          {countdown.map((unit) => (
            <div
              key={unit.label}
              className="flex w-16 flex-col items-center rounded-lg border bg-card py-3"
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

        <div className="mt-8 w-full max-w-sm space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Migration progress</span>
            <span>68%</span>
          </div>
          <Progress value={68} aria-label="Maintenance progress" />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button>
            <RefreshCw /> Check again
          </Button>
          <Button variant="outline" asChild>
            <a href="#status">
              Status page <ArrowRight />
            </a>
          </Button>
        </div>

        <div className="mt-10 w-full max-w-sm text-left">
          <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Clock className="size-3.5" aria-hidden />
            Get notified when we are back
          </p>
          <form className="mt-2 flex gap-2">
            <Input
              type="email"
              placeholder="you@example.com"
              aria-label="Email address"
            />
            <Button type="submit" variant="secondary">
              Notify me
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export { MaintenancePage };
