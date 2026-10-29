import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { TagsInput } from "./index";

describe("TagsInput", () => {
  it("adds a tag on Enter and clears the draft", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TagsInput onValueChange={onValueChange} />);

    const input = screen.getByRole("textbox", { name: "Add tag" });
    await user.type(input, "react{Enter}");

    expect(screen.getByText("react")).toBeInTheDocument();
    expect(input).toHaveValue("");
    expect(onValueChange).toHaveBeenCalledWith(["react"]);
  });

  it("splits pasted values into tags", () => {
    const onValueChange = vi.fn();
    render(<TagsInput onValueChange={onValueChange} />);

    fireEvent.paste(screen.getByRole("textbox", { name: "Add tag" }), {
      clipboardData: { getData: () => "one, two; three" },
    });

    expect(onValueChange).toHaveBeenCalledWith(["one", "two", "three"]);
  });

  it("ignores duplicates by default", async () => {
    const user = userEvent.setup();
    render(<TagsInput defaultValue={["react"]} />);

    await user.type(
      screen.getByRole("textbox", { name: "Add tag" }),
      "react{Enter}",
    );

    expect(screen.getAllByText("react")).toHaveLength(1);
  });

  it("stops at maxTags", async () => {
    const user = userEvent.setup();
    render(<TagsInput maxTags={2} />);

    const input = screen.getByRole("textbox", { name: "Add tag" });
    await user.type(input, "one{Enter}two{Enter}three{Enter}");

    expect(screen.getByText("one")).toBeInTheDocument();
    expect(screen.getByText("two")).toBeInTheDocument();
    expect(screen.queryByText("three")).not.toBeInTheDocument();
  });

  it("removes a tag with its button", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <TagsInput defaultValue={["alpha", "beta"]} onValueChange={onValueChange} />,
    );

    await user.click(screen.getByRole("button", { name: "Remove tag alpha" }));

    expect(screen.queryByText("alpha")).not.toBeInTheDocument();
    expect(onValueChange).toHaveBeenCalledWith(["beta"]);
  });

  it("removes the last tag with Backspace", async () => {
    const user = userEvent.setup();
    render(<TagsInput defaultValue={["alpha", "beta"]} />);

    await user.click(screen.getByRole("textbox", { name: "Add tag" }));
    await user.keyboard("{Backspace}");

    expect(screen.queryByText("beta")).not.toBeInTheDocument();
    expect(screen.getByText("alpha")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<TagsInput defaultValue={["alpha"]} />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
