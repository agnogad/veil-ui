import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Button } from "../button/index";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "./index";

function Example() {
  return (
    <BottomSheet>
      <BottomSheetTrigger asChild>
        <Button>Open sheet</Button>
      </BottomSheetTrigger>
      <BottomSheetContent>
        <BottomSheetTitle>Share</BottomSheetTitle>
        <BottomSheetDescription>Send this page to a friend.</BottomSheetDescription>
      </BottomSheetContent>
    </BottomSheet>
  );
}

describe("BottomSheet", () => {
  it("opens and closes", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Open sheet" }));
    expect(screen.getByRole("dialog", { name: "Share" })).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Close bottom sheet" }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Open sheet" }));

    const results = await axe.run(document.body);
    expect(results.violations).toEqual([]);
  });
});
