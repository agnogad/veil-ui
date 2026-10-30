import { ArrowRight, ArrowUpRight, Boxes, Lock, Zap } from "lucide-react";

import { Button } from "@veil-ui/registry/button";
import { ButtonVariants } from "@veil-ui/registry/button/demo";
import { Card, CardContent, CardHeader, CardTitle } from "@veil-ui/registry/card";
import { Input } from "@veil-ui/registry/input";

import { InstallCommand } from "@/components/install-command";
import { withBasePath } from "@/lib/shared";

const gridStyle = {
  backgroundImage:
    "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
} as const;

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] dark:opacity-30"
          style={gridStyle}
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center md:py-32">
          <a
            href={withBasePath("/docs")}
            className="mb-8 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
          >
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
            v0.1.0 — 298 components, 691 examples, 30 page templates
            <ArrowRight className="size-3" aria-hidden />
          </a>

          <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-tighter md:text-7xl">
            Own your interface.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
            A monochrome component collection for React. Built on Radix UI and
            Tailwind CSS v4, copied into your project with one command. No
            wrapper library, no lock-in.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <a href={withBasePath("/docs")}>
                Get started <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={withBasePath("/docs/components/button")}>Browse components</a>
            </Button>
          </div>

          <InstallCommand className="mt-10 w-full max-w-md" />

          <p className="mt-3 text-xs text-muted-foreground">
            MIT licensed · React 19 · Tailwind v4
          </p>
        </div>
      </section>

      <section className="border-b">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-border border-x md:grid-cols-4">
          {[
            { label: "Components", value: "298" },
            { label: "Page templates", value: "30" },
            { label: "Runtime wrappers", value: "0" },
            { label: "License", value: "MIT" },
          ].map((stat) => (
            <div key={stat.label} className="px-6 py-8 text-center">
              <div className="text-2xl font-semibold tracking-tight">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="mb-10 flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Available today
          </p>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            The same code you would write yourself.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <ButtonVariants />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Inputs</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <label htmlFor="hero-email" className="text-xs font-medium">
                Email
              </label>
              <Input id="hero-email" placeholder="you@example.com" />
              <p className="text-xs text-muted-foreground">
                Focus rings, invalid and disabled states included.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Surfaces</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Card slots for headers, actions, content and footers — composed
              with plain divs and data attributes.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 md:grid-cols-3">
          {[
            {
              icon: Boxes,
              title: "Copy, don't wrap",
              body: "Components are added as source files. Edit them, delete them, shape them around your product.",
            },
            {
              icon: Lock,
              title: "Accessible by default",
              body: "Radix primitives handle focus management, keyboard navigation and ARIA semantics.",
            },
            {
              icon: Zap,
              title: "Tailwind v4 native",
              body: "OKLCH tokens, container queries and CSS-first theming. No config file required.",
            },
          ].map((feature) => (
            <div key={feature.title}>
              <feature.icon className="size-5" aria-hidden />
              <h3 className="mt-4 text-sm font-medium">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-20 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Start with one component.
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground">
            The CLI resolves dependencies, writes the files and installs what is
            missing. Your design system grows from there.
          </p>
          <InstallCommand className="w-full max-w-md" />
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <span>© 2026 Veil UI · MIT</span>
          <div className="flex items-center gap-5">
            <a className="transition-colors hover:text-foreground" href={withBasePath("/docs")}>
              Docs
            </a>
            <a
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              href="https://github.com/agnogad/veil-ui"
            >
              <ArrowUpRight className="size-4" aria-hidden /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
