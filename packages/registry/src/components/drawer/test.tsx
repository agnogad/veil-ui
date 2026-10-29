import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Button } from "../button/index";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "./index";

function Example({ side }: { side?: "left" | "right" }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent side={side}>
        <DrawerTitle>Filters</DrawerTitle>
        <DrawerDescription>Refine the list.</DrawerDescription>
      </DrawerContent>
    </Drawer>
  );
}

describe("Drawer", () => {
  it("opens and closes", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Open drawer" }));
    expect(screen.getByRole("dialog", { name: "Filters" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close drawer" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders on the requested side", async () => {
    const user = userEvent.setup();
    render(<Example side="left" />);

    await user.click(screen.getByRole("button", { name: "Open drawer" }));
    expect(screen.getByRole("dialog")).toHaveAttribute("data-side", "left");
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Open drawer" }));

    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
