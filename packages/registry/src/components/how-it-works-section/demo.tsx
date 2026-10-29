import { HowItWorksSection } from "./index";

export function HowItWorksSectionBasic() {
  return (
    <HowItWorksSection
      className="w-full max-w-5xl"
      title="How it works"
      description="Three steps from an empty project to a composed page."
      steps={[
        {
          title: "Install the CLI",
          description: "Run the initializer to set up tokens and utils.",
        },
        {
          title: "Add components",
          description: "Pick from the registry; source lands in your repo.",
        },
        {
          title: "Compose pages",
          description: "Assemble sections with shared spacing and theming.",
        },
      ]}
    />
  );
}

export function HowItWorksSectionIcons() {
  return (
    <HowItWorksSection
      className="w-full max-w-4xl"
      title="Set up in minutes"
      steps={[
        {
          title: "Choose",
          description: "Browse the catalog.",
          icon: <span className="text-sm">1</span>,
        },
        {
          title: "Copy",
          description: "Add the component.",
          icon: <span className="text-sm">2</span>,
        },
        {
          title: "Ship",
          description: "Deploy with confidence.",
          icon: <span className="text-sm">3</span>,
        },
      ]}
    />
  );
}
