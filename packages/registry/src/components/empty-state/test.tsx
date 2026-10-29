import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { Inbox } from "lucide-react";
import { describe, expect, it } from "vitest";

import { EmptyState } from "./index";

describe("EmptyState", () => {
  it("renders title, description and action", () => {
    render(
      <EmptyState
        icon={Inbox}
        title="No messages"
        description="Messages show up here."
        action={<button type="button">Compose</button>}
      />,
    );

    expect(screen.getByText("No messages")).toBeInTheDocument();
    expect(screen.getByText("Messages show up here.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Compose" }),
    ).toBeInTheDocument();
  });

  it("hides the decorative icon from assistive technology", () => {
    const { container } = render(
      <EmptyState icon={Inbox} title="No messages" />,
    );
    const iconWrapper = container.querySelector(
      '[data-slot="empty-state"] > div[aria-hidden]',
    );
    expect(iconWrapper).toHaveAttribute("aria-hidden", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <EmptyState icon={Inbox} title="No messages" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
