import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { LinkButton } from "./index";

describe("LinkButton", () => {
  it("renders a link", () => {
    render(<LinkButton href="/docs">Docs</LinkButton>);
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveAttribute("data-slot", "link-button");
  });

  it("handles external links", () => {
    render(
      <LinkButton href="https://react.dev" external>
        React
      </LinkButton>,
    );
    const link = screen.getByRole("link", { name: /React/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer noopener");
    expect(link).toHaveTextContent("(opens in a new tab)");
  });

  it("applies variants", () => {
    render(
      <LinkButton href="/docs" variant="muted" underline>
        Changelog
      </LinkButton>,
    );
    expect(screen.getByRole("link")).toHaveClass("text-muted-foreground", "underline");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <p>
        Read the <LinkButton href="/docs">documentation</LinkButton>.
      </p>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
