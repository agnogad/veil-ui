import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { ConnectionStatus } from "./index";

describe("ConnectionStatus", () => {
  it("renders the default label for the given status", () => {
    render(<ConnectionStatus status="offline" />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("data-status", "offline");
    expect(status).toHaveTextContent("Disconnected");
  });

  it("accepts a custom label", () => {
    render(<ConnectionStatus status="online" label="Sync active" />);
    expect(screen.getByText("Sync active")).toBeInTheDocument();
  });

  it("pulses while connecting", () => {
    const { container } = render(<ConnectionStatus status="connecting" />);
    expect(container.querySelector(".animate-ping")).not.toBeNull();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ConnectionStatus status="online" />);
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
