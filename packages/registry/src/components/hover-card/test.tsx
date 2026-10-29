import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Button } from "../button/index";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./index";

function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@ada</Button>
      </HoverCardTrigger>
      <HoverCardContent aria-label="Profile">
        <p>Ada Lovelace</p>
      </HoverCardContent>
    </HoverCard>
  );
}

describe("HoverCard", () => {
  it("opens on hover", async () => {
    const user = userEvent.setup();
    render(<Example />);

    expect(screen.queryByText("Ada Lovelace")).not.toBeInTheDocument();

    await user.hover(screen.getByRole("button", { name: "@ada" }));

    expect(await screen.findByText("Ada Lovelace")).toBeInTheDocument();
  });

  it("opens on focus", async () => {
    render(<Example />);

    screen.getByRole("button", { name: "@ada" }).focus();

    expect(await screen.findByText("Ada Lovelace")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    render(<Example />);
    screen.getByRole("button", { name: "@ada" }).focus();
    await screen.findByRole("dialog");

    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
