import { ArrowLeft, Compass, Home, LifeBuoy, Search } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { Input } from "../input/index";
import { Kbd } from "../kbd/index";

function Error404Page({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="error-404-page"
      className={cn(
        "relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden rounded-xl border bg-background px-6 py-16 text-center",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-primary),transparent_65%)] opacity-10"
      />
      <div className="relative">
        <span className="flex size-14 items-center justify-center rounded-2xl border bg-card text-primary shadow-sm">
          <Compass className="size-7" aria-hidden />
        </span>
        <p className="mt-8 text-7xl font-semibold tracking-tighter text-foreground sm:text-8xl">
          404
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">
          This page wandered off
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          The link may be broken, or the page may have moved. Try searching for
          what you need or head back home.
        </p>

        <form className="mx-auto mt-6 flex w-full max-w-sm items-center gap-2">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              placeholder="Search the docs…"
              aria-label="Search"
              className="pl-8"
            />
          </div>
          <Kbd>⌘K</Kbd>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <a href="#home">
              <Home /> Go home
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#back">
              <ArrowLeft /> Go back
            </a>
          </Button>
        </div>

        <a
          href="#support"
          className="mt-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          <LifeBuoy className="size-4" aria-hidden />
          Still stuck? Contact support
        </a>
      </div>
    </div>
  );
}

export { Error404Page };
