import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { OtpInput } from "./index";

describe("OtpInput", () => {
  it("renders the requested number of digits", () => {
    render(<OtpInput length={4} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
  });

  it("fills digits and reports completion", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<OtpInput label="Code" onComplete={onComplete} />);

    await user.click(screen.getByLabelText("Code, digit 1"));
    await user.keyboard("123456");

    expect(screen.getByLabelText("Code, digit 1")).toHaveValue("1");
    expect(screen.getByLabelText("Code, digit 6")).toHaveValue("6");
    expect(onComplete).toHaveBeenCalledWith("123456");
  });

  it("pastes a full code", () => {
    const onComplete = vi.fn();
    render(<OtpInput onComplete={onComplete} />);

    fireEvent.paste(screen.getByLabelText("One-time code, digit 1"), {
      clipboardData: { getData: () => "987654" },
    });

    expect(onComplete).toHaveBeenCalledWith("987654");
    expect(screen.getByLabelText("One-time code, digit 4")).toHaveValue("6");
  });

  it("navigates with arrow keys and clears with Backspace", async () => {
    const user = userEvent.setup();
    render(<OtpInput defaultValue="1234" length={4} />);

    const third = screen.getByLabelText("One-time code, digit 3");
    await user.click(third);
    await user.keyboard("{Backspace}");
    expect(third).toHaveValue("");

    await user.keyboard("{ArrowLeft}");
    expect(screen.getByLabelText("One-time code, digit 2")).toHaveFocus();
  });

  it("ignores non-digit input", async () => {
    const user = userEvent.setup();
    render(<OtpInput defaultValue="" />);

    await user.click(screen.getByLabelText("One-time code, digit 1"));
    await user.keyboard("a");

    expect(screen.getByLabelText("One-time code, digit 1")).toHaveValue("");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<OtpInput defaultValue="123" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
