import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Link } from "./index";

describe("Link", () => {
  it("renders an anchor with an underline", () => {
    render(<Link href="/docs">Docs</Link>);
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveClass("underline");
    expect(link).not.toHaveAttribute("target");
  });

  it("marks external links with a safe target", () => {
    render(
      <Link href="https://example.com" external>
        Example
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Example" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <p>
        Visit the <Link href="/docs">docs</Link>.
      </p>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
