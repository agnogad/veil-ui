import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { Notification } from "./index";

describe("Notification", () => {
  it("renders title, description and timestamp", () => {
    render(
      <Notification
        title="Deployment finished"
        description="Production is live."
        timestamp="2 minutes ago"
      />,
    );

    expect(screen.getByText("Deployment finished")).toBeInTheDocument();
    expect(screen.getByText("Production is live.")).toBeInTheDocument();
    expect(screen.getByText("2 minutes ago")).toBeInTheDocument();
  });

  it("marks unread notifications for assistive technology", () => {
    render(<Notification title="New message" unread />);
    expect(screen.getByText("Unread")).toHaveClass("sr-only");
  });

  it("calls onDismiss from the labelled dismiss control", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Notification title="New message" onDismiss={onDismiss} />);

    await user.click(
      screen.getByRole("button", { name: "Dismiss notification" }),
    );

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Notification title="New message" unread onDismiss={() => {}} />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
