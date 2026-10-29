import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { NotificationCenter } from "./index";

const items = [
  {
    id: "1",
    title: "Deployment finished",
    description: "Production is live.",
    unread: true,
  },
  {
    id: "2",
    title: "New comment",
    description: "Ada replied to your thread.",
  },
];

describe("NotificationCenter", () => {
  it("announces the unread count on the trigger", () => {
    render(<NotificationCenter notifications={items} />);
    expect(
      screen.getByRole("button", { name: "Notifications (1 unread)" }),
    ).toBeInTheDocument();
  });

  it("opens the popover and lists notifications", async () => {
    const user = userEvent.setup();
    render(<NotificationCenter notifications={items} />);

    await user.click(
      screen.getByRole("button", { name: "Notifications (1 unread)" }),
    );

    expect(screen.getByText("Deployment finished")).toBeInTheDocument();
    expect(screen.getByText("New comment")).toBeInTheDocument();
  });

  it("calls onMarkAllRead and onDismiss", async () => {
    const user = userEvent.setup();
    const onMarkAllRead = vi.fn();
    const onDismiss = vi.fn();
    render(
      <NotificationCenter
        notifications={items}
        onMarkAllRead={onMarkAllRead}
        onDismiss={onDismiss}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Notifications (1 unread)" }),
    );
    await user.click(screen.getByRole("button", { name: "Mark all read" }));
    expect(onMarkAllRead).toHaveBeenCalledTimes(1);

    const dismissButtons = screen.getAllByRole("button", {
      name: "Dismiss notification",
    });
    await user.click(dismissButtons[0]!);
    expect(onDismiss).toHaveBeenCalledWith("1");
  });

  it("shows the empty label when there is nothing to list", async () => {
    const user = userEvent.setup();
    render(<NotificationCenter notifications={[]} />);

    await user.click(screen.getByRole("button", { name: "Notifications" }));
    expect(screen.getByText("You're all caught up.")).toBeInTheDocument();
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    render(<NotificationCenter notifications={items} />);

    await user.click(
      screen.getByRole("button", { name: "Notifications (1 unread)" }),
    );

    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
