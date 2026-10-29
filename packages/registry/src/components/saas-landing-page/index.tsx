import { Check } from "lucide-react";

import { Button } from "../button/index";
import { FeatureShowcase } from "../feature-showcase/index";
import { FinalCta } from "../final-cta/index";
import { HeroSection } from "../hero-section/index";
import { MarketingFooter } from "../marketing-footer/index";
import { PricingSection } from "../pricing-section/index";
import { ProductDemo } from "../product-demo/index";

function SaasLandingPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="saas-landing-page"
      className={className}
      {...props}
    >
      <HeroSection
        align="start"
        eyebrow="Built for product teams"
        title="The workspace your whole team understands"
        description="Plan, track and ship work in one calm surface."
        actions={
          <>
            <Button size="lg">Start free trial</Button>
            <Button size="lg" variant="outline">
              Book a demo
            </Button>
          </>
        }
        media={
          <ProductDemo url="app.veil-ui.dev" className="rounded-none border-0 shadow-none">
            <div className="grid size-full grid-cols-3 gap-2 p-4">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="rounded-md border bg-background/70" />
              ))}
            </div>
          </ProductDemo>
        }
      />
      <div className="px-6 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight">
            Everything in one calm surface
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Replace scattered tools with a workspace the whole team understands.
          </p>
        </div>
        <FeatureShowcase
          className="mx-auto mt-6 max-w-5xl"
          features={[
            {
              title: "One source of truth",
              description: "Plans, docs and decisions stay in sync.",
              bullets: ["Linked records", "Version history"],
            },
            {
              title: "Reports that write themselves",
              description: "Share progress without spreadsheet upkeep.",
              bullets: ["Weekly digests", "Custom metrics"],
              reverse: true,
            },
          ]}
        />
      </div>
      <div className="px-6 pb-14">
        <PricingSection
          className="mx-auto max-w-5xl"
          title="Simple pricing"
          plans={[
            {
              name: "Starter",
              price: "$0",
              features: ["3 projects", "Community support"],
            },
            {
              name: "Team",
              price: "$24",
              features: ["Unlimited projects", "10 seats"],
              highlighted: true,
              badge: "Popular",
            },
            {
              name: "Enterprise",
              price: "Custom",
              period: "",
              features: ["SSO", "Dedicated support"],
            },
          ]}
        />
      </div>
      <div className="px-6 pb-14">
        <FinalCta
          className="mx-auto max-w-5xl"
          title="Bring your team on board"
          description="Start free, invite your teammates, upgrade when you are ready."
          actions={
            <Button size="lg">
              <Check aria-hidden /> Start free trial
            </Button>
          }
        />
      </div>
      <MarketingFooter
        description="The calm workspace for product teams."
        columns={[
          {
            title: "Product",
            links: [
              { label: "Features", href: "#features" },
              { label: "Pricing", href: "#pricing" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "About", href: "#about" },
              { label: "Careers", href: "#careers" },
            ],
          },
        ]}
        legal={<p>© 2026 Veil UI. All rights reserved.</p>}
      />
    </div>
  );
}

export { SaasLandingPage };
