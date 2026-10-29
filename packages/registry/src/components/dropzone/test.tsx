import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";

import { Dropzone } from "./index";

describe("Dropzone", () => {
  it("passes dropped files to onFiles", () => {
    const onFiles = vi.fn();
    render(<Dropzone onFiles={onFiles} />);

    const file = new File(["data"], "report.pdf", { type: "application/pdf" });
    fireEvent.drop(screen.getByRole("button"), {
      dataTransfer: { files: [file], types: ["Files"] },
    });

    expect(onFiles).toHaveBeenCalledTimes(1);
    expect(onFiles.mock.calls[0]![0][0].name).toBe("report.pdf");
  });

  it("passes picked files to onFiles", async () => {
    const user = userEvent.setup();
    const onFiles = vi.fn();
    const { container } = render(<Dropzone onFiles={onFiles} />);

    const input = container.querySelector<HTMLInputElement>(
      'input[type="file"]',
    );
    const file = new File(["data"], "invoice.pdf", {
      type: "application/pdf",
    });
    await user.upload(input as HTMLInputElement, file);

    expect(onFiles).toHaveBeenCalledTimes(1);
    expect(onFiles.mock.calls[0]![0][0].name).toBe("invoice.pdf");
  });

  it("opens the picker with the keyboard", async () => {
    const user = userEvent.setup();
    const click = vi.spyOn(HTMLInputElement.prototype, "click");
    render(<Dropzone onFiles={() => {}} />);

    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");

    expect(click).toHaveBeenCalled();
    click.mockRestore();
  });

  it("ignores drops when disabled", () => {
    const onFiles = vi.fn();
    render(<Dropzone onFiles={onFiles} disabled />);

    const file = new File(["data"], "report.pdf", { type: "application/pdf" });
    fireEvent.drop(screen.getByRole("button"), {
      dataTransfer: { files: [file], types: ["Files"] },
    });

    expect(onFiles).not.toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Dropzone onFiles={() => {}} description="PNG only" />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
