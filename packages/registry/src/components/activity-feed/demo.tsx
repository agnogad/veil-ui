import { GitPullRequest, MessageSquare, Rocket } from "lucide-react";

import { ActivityFeed } from "./index";

export function ActivityFeedBasic() {
  return (
    <ActivityFeed
      className="max-w-md"
      items={[
        {
          id: "1",
          actor: "Ada Lovelace",
          action: "opened a pull request",
          target: "#142",
          time: "2 minutes ago",
          icon: GitPullRequest,
        },
        {
          id: "2",
          actor: "Grace Hopper",
          action: "commented on",
          target: "the release plan",
          time: "18 minutes ago",
          icon: MessageSquare,
        },
        {
          id: "3",
          actor: "Alan Turing",
          action: "deployed",
          target: "api@2.4.0",
          time: "1 hour ago",
          icon: Rocket,
        },
      ]}
    />
  );
}

export function ActivityFeedCompact() {
  return (
    <ActivityFeed
      className="max-w-xs"
      label="Recent activity"
      items={[
        { id: "1", actor: "Mira Chen", action: "joined the workspace", time: "Yesterday" },
      ]}
    />
  );
}
