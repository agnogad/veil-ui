import { GitBranch, MessageSquare, PenTool, Zap } from "lucide-react";

import { IntegrationsSection } from "./index";

export function IntegrationsSectionBasic() {
  return (
    <IntegrationsSection
      className="w-full max-w-4xl"
      title="Works with your stack"
      description="Connect the tools your team already uses."
      integrations={[
        { name: "GitHub", description: "Sync code", icon: <GitBranch /> },
        { name: "Figma", description: "Design tokens", icon: <PenTool /> },
        { name: "Slack", description: "Notifications", icon: <MessageSquare /> },
        { name: "Zapier", description: "Automations", icon: <Zap /> },
      ]}
    />
  );
}

export function IntegrationsSectionMonograms() {
  return (
    <IntegrationsSection
      className="w-full max-w-3xl"
      title="Integrations"
      integrations={[
        { name: "Stripe" },
        { name: "Linear" },
        { name: "Notion" },
        { name: "Vercel" },
        { name: "Sentry" },
        { name: "Segment" },
      ]}
    />
  );
}
