import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { FormRepeater } from "./index";

const fields = [
  { name: "name", label: "Name" },
  { name: "email", label: "Email", type: "email" as const },
];

describe("FormRepeater", () => {
  it("starts with a single row", () => {
    render(<FormRepeater fields={fields} />);
    expect(screen.getByLabelText("Name row 1")).toBeInTheDocument();
    expect(screen.queryByLabelText("Name row 2")).not.toBeInTheDocument();
  });

  it("adds and removes rows", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<FormRepeater fields={fields} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: /add row/i }));
    expect(screen.getByLabelText("Name row 2")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Name row 2"), "Ada");

    expect(onChange).toHaveBeenLastCalledWith([
      { name: "", email: "" },
      { name: "Ada", email: "" },
    ]);

    await user.click(screen.getByRole("button", { name: "Remove row 1" }));
    expect(screen.queryByLabelText("Name row 2")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Name row 1")).toHaveValue("Ada");
  });

  it("cannot go below the minimum", () => {
    render(<FormRepeater fields={fields} min={2} defaultValue={[{}, {}]} />);
    expect(
      screen.getByRole("button", { name: "Remove row 1" }),
    ).toBeDisabled();
  });

  it("cannot exceed the maximum", async () => {
    const user = userEvent.setup();
    render(<FormRepeater fields={fields} max={2} />);

    await user.click(screen.getByRole("button", { name: /add row/i }));

    expect(screen.getByRole("button", { name: /add row/i })).toBeDisabled();
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    const { container } = render(<FormRepeater fields={fields} />);
    await user.click(screen.getByRole("button", { name: /add row/i }));

    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
