import { ArrowRight, Blocks, ShieldCheck, Zap } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import { FeatureGrid } from "../feature-grid/index";
import { FinalCta } from "../final-cta/index";
import { HeroSection } from "../hero-section/index";
import { MarketingFooter } from "../marketing-footer/index";
import { StatsSection } from "../stats-section/index";
import { TestimonialsSection } from "../testimonials-section/index";
import { TrustBar } from "../trust-bar/index";

function LandingPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="landing-page"
      className={cn("w-full overflow-hidden rounded-xl border bg-background", className)}
      {...props}
    >
      <HeroSection
        eyebrow="New · Version 2.0"
        title="Build calm interfaces, faster"
        description="A copy-paste component registry with accessible defaults, design tokens and a CLI that keeps you in control."
        actions={
          <>
            <Button size="lg" asChild>
              <a href="#start">
                Get started <ArrowRight aria-hidden />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#docs">Read the docs</a>
            </Button>
          </>
        }
      />
      <TrustBar
        className="border-x-0"
        items={[{ name: "Acme" }, { name: "Globex" }, { name: "Initech" }, { name: "Umbrella" }]}
      />
      <div className="px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight">
            Why teams choose Veil
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Defaults that keep interfaces calm and teams moving.
          </p>
        </div>
        <FeatureGrid
          className="mx-auto mt-6 max-w-5xl"
          features={[
            {
              icon: <Zap />,
              title: "Fast by default",
              description: "Sensible defaults with zero runtime surprises.",
            },
            {
              icon: <ShieldCheck />,
              title: "Accessible",
              description: "Keyboard support and ARIA in every primitive.",
            },
            {
              icon: <Blocks />,
              title: "Composable",
              description: "Small parts that fit together without overrides.",
            },
          ]}
        />
      </div>
      <div className="px-6 pb-14">
        <StatsSection
          className="mx-auto max-w-5xl"
          stats={[
            { value: "120k+", label: "Downloads" },
            { value: "480+", label: "Components" },
            { value: "99.9%", label: "Uptime" },
            { value: "4.9/5", label: "Satisfaction" },
          ]}
        />
      </div>
      <div className="px-6 pb-14">
        <TestimonialsSection
          className="mx-auto max-w-5xl"
          title="Loved by product teams"
          testimonials={[
            {
              quote: "We shipped our dashboard two weeks early.",
              name: "Mira Chen",
              role: "Product lead, Acme",
              rating: 5,
            },
            {
              quote: "The source is readable and the defaults are sane.",
              name: "Owen Park",
              role: "Staff engineer, Globex",
              rating: 5,
            },
            {
              quote: "Our design system finally matches production.",
              name: "Lena Ortiz",
              role: "Design director, Initech",
            },
          ]}
        />
      </div>
      <div className="px-6 pb-14">
        <FinalCta
          className="mx-auto max-w-5xl"
          title="Start building with Veil UI today"
          description="Own your components, keep your design language, ship faster."
          actions={<Button size="lg">Get started</Button>}
          note="Free for personal and commercial projects."
        />
      </div>
      <MarketingFooter
        className="border-x-0 border-b-0 bg-muted/20"
        description="Accessible primitives and page sections for product teams."
        columns={[
          {
            title: "Product",
            links: [
              { label: "Components", href: "#components" },
              { label: "Templates", href: "#templates" },
              { label: "Pricing", href: "#pricing" },
            ],
          },
          {
            title: "Resources",
            links: [
              { label: "Docs", href: "#docs" },
              { label: "Changelog", href: "#changelog" },
            ],
          },
        ]}
        legal={<p>© 2026 Veil UI. All rights reserved.</p>}
      />
    </div>
  );
}

export { LandingPage };
