import { StatsSection } from "./index";

export function StatsSectionBasic() {
  return (
    <StatsSection
      className="w-full max-w-5xl"
      title="Developer adoption"
      description="Numbers from teams shipping with Veil UI."
      stats={[
        { value: "120k+", label: "Downloads" },
        { value: "480+", label: "Components" },
        { value: "99.9%", label: "Uptime" },
        { value: "4.9/5", label: "Satisfaction" },
      ]}
    />
  );
}

export function StatsSectionCompact() {
  return (
    <StatsSection
      className="w-full max-w-3xl"
      stats={[
        { value: "12ms", label: "Median render" },
        { value: "0", label: "Runtime deps" },
        { value: "AA", label: "Contrast" },
      ]}
    />
  );
}
