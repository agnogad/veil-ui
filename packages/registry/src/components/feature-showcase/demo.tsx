import { FeatureShowcase } from "./index";

export function FeatureShowcaseBasic() {
  return (
    <FeatureShowcase
      className="w-full max-w-5xl"
      features={[
        {
          title: "Design tokens that travel",
          description:
            "Colors, spacing and radii live in one place and reach every component.",
          bullets: ["Light and dark themes", "CSS variables", "Tailwind v4 ready"],
        },
        {
          title: "A CLI that respects your code",
          description:
            "Add components directly into your project and own the source.",
          bullets: ["No lock-in", "Diff friendly", "Works with monorepos"],
          reverse: true,
        },
      ]}
    />
  );
}

export function FeatureShowcaseSingle() {
  return (
    <FeatureShowcase
      className="w-full max-w-4xl"
      features={[
        {
          title: "Built for product teams",
          description:
            "Start with primitives and grow into full page templates without rewrites.",
          media: (
            <div className="grid w-full grid-cols-3 gap-2">
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="h-14 rounded-md border bg-background/80"
                />
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}
