import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Textarea } from "./index";

describe("Textarea", () => {
  it("accepts multi-line input", async () => {
    render(<Textarea aria-label="Notes" />);
    const textarea = screen.getByRole("textbox", { name: "Notes" });
    await userEvent.type(textarea, "line one{enter}line two");
    expect(textarea).toHaveValue("line one\nline two");
  });

  it("exposes the invalid state", () => {
    render(<Textarea aria-label="Notes" aria-invalid />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("can be disabled", () => {
    render(<Textarea aria-label="Notes" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <>
        <label htmlFor="notes">Notes</label>
        <Textarea id="notes" />
      </>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
