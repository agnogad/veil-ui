import { ComparisonTable } from "../comparison-table/index";
import { FaqSection } from "../faq-section/index";
import { PricingSection } from "../pricing-section/index";

function PricingPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="pricing-page"
      className={className}
      {...props}
    >
      <div className="px-6 py-14">
        <PricingSection
          title="Pricing that scales with you"
          description="Start free, upgrade when your team grows."
          plans={[
            {
              name: "Starter",
              price: "$0",
              description: "For side projects.",
              features: ["3 projects", "Community support"],
            },
            {
              name: "Team",
              price: "$24",
              description: "For growing teams.",
              features: ["Unlimited projects", "10 seats", "Priority support"],
              highlighted: true,
              badge: "Most popular",
            },
            {
              name: "Enterprise",
              price: "Custom",
              period: "",
              description: "For organizations.",
              features: ["SSO and SCIM", "Audit logs"],
            },
          ]}
        />
      </div>
      <div className="px-6 pb-14">
        <ComparisonTable
          className="mx-auto max-w-4xl"
          plans={[
            { name: "Starter", price: "$0" },
            { name: "Team", price: "$24" },
            { name: "Enterprise", price: "Custom" },
          ]}
          rows={[
            { feature: "Projects", values: ["3", "Unlimited", "Unlimited"] },
            { feature: "Team seats", values: ["1", "10", "Unlimited"] },
            { feature: "SSO", values: [false, false, true] },
            { feature: "Audit logs", values: [false, true, true] },
          ]}
        />
      </div>
      <div className="px-6 pb-16">
        <FaqSection
          className="mx-auto max-w-4xl"
          title="Billing questions"
          items={[
            { question: "Can I cancel anytime?", answer: "Yes, from your dashboard." },
            { question: "Do you offer refunds?", answer: "Within 14 days of purchase." },
          ]}
        />
      </div>
    </div>
  );
}

export { PricingPage };
