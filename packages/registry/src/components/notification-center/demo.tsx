"use client";

import { GitPullRequest, MessageSquare } from "lucide-react";

import { NotificationCenter } from "./index";

const items = [
  {
    id: "1",
    title: "Deployment finished",
    description: "Production is running commit 4f2a91c.",
    timestamp: "2 minutes ago",
    unread: true,
    icon: GitPullRequest,
  },
  {
    id: "2",
    title: "New comment on your review",
    description: "Ada left feedback on the spacing tokens.",
    timestamp: "10 minutes ago",
    icon: MessageSquare,
  },
];

export function NotificationCenterBasic() {
  return <NotificationCenter notifications={items} />;
}

export function NotificationCenterEmpty() {
  return <NotificationCenter notifications={[]} />;
}

export function NotificationCenterMarkAllRead() {
  return (
    <NotificationCenter
      notifications={items}
      onMarkAllRead={() => undefined}
      onDismiss={() => undefined}
    />
  );
}
