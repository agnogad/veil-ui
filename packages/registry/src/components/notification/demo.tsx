"use client";

import { GitPullRequest, MessageSquare } from "lucide-react";
import { useState } from "react";

import { Button } from "../button/index";
import { Notification } from "./index";

export function NotificationBasic() {
  return (
    <Notification
      title="Deployment finished"
      description="Production is running commit 4f2a91c."
      timestamp="2 minutes ago"
      icon={GitPullRequest}
    />
  );
}

export function NotificationUnread() {
  return (
    <Notification
      title="New comment on your review"
      description="Ada left feedback on the spacing tokens."
      timestamp="10 minutes ago"
      unread
      icon={MessageSquare}
    />
  );
}

export function NotificationDismissible() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <Button variant="outline" size="sm" onClick={() => setVisible(true)}>
        Restore notification
      </Button>
    );
  }

  return (
    <Notification
      title="Usage report is ready"
      description="Your monthly report can be downloaded."
      timestamp="Yesterday"
      icon={MessageSquare}
      onDismiss={() => setVisible(false)}
    />
  );
}

export function NotificationWithAction() {
  return (
    <Notification
      title="New team invitation"
      description="You were invited to the Design Systems workspace."
      timestamp="5 minutes ago"
      icon={MessageSquare}
      unread
      action={
        <div className="flex gap-2">
          <Button size="sm">Accept</Button>
          <Button size="sm" variant="outline">
            Decline
          </Button>
        </div>
      }
    />
  );
}
