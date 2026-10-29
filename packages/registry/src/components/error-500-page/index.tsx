import { ArrowLeft, Home, LifeBuoy, MessageSquare, RefreshCw, ServerCrash } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Badge } from "../badge/index";
import { Button } from "../button/index";
import { CodeBlock } from "../code-block/index";
import { StatusIndicator } from "../status-indicator/index";

function Error500Page({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="error-500-page"
      className={cn(
        "relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden rounded-xl border bg-background px-6 py-16 text-center",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-destructive),transparent_65%)] opacity-10"
      />
      <div className="relative">
        <span className="flex size-14 items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/5 text-destructive shadow-sm">
          <ServerCrash className="size-7" aria-hidden />
        </span>
        <p className="mt-8 text-7xl font-semibold tracking-tighter sm:text-8xl">
          500
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">
          Something broke on our side
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          The server hit an unexpected error while rendering this page. Our team
          has been notified — you can retry or check the status page.
        </p>

        <div className="mx-auto mt-5 flex max-w-md flex-wrap items-center justify-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            ERR_500_INTERNAL
          </Badge>
          <StatusIndicator status="busy" label="Incident open" />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button>
            <RefreshCw /> Try again
          </Button>
          <Button variant="outline" asChild>
            <a href="#home">
              <Home /> Go home
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="#back">
              <ArrowLeft /> Go back
            </a>
          </Button>
        </div>

        <div className="mx-auto mt-8 w-full max-w-md text-left">
          <CodeBlock
            copyable={false}
            filename="Error details"
            code={`Request ID: 8f3c2a91-4e2b-42d1
Timestamp: 2026-10-29T14:08:22Z
Route: /dashboard/reports`}
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <a
            href="#status"
            className="inline-flex items-center gap-1.5 underline-offset-4 hover:text-foreground hover:underline"
          >
            <LifeBuoy className="size-4" aria-hidden />
            Status page
          </a>
          <a
            href="#support"
            className="inline-flex items-center gap-1.5 underline-offset-4 hover:text-foreground hover:underline"
          >
            <MessageSquare className="size-4" aria-hidden />
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
}

export { Error500Page };
