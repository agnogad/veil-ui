import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { LogoCloud } from "./index";

describe("LogoCloud", () => {
  it("renders each item", () => {
    render(<LogoCloud items={[{ name: "Acme" }, { name: "Globex" }]} />);
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("Globex")).toBeInTheDocument();
  });

  it("links items that have hrefs", () => {
    render(
      <LogoCloud
        items={[{ name: "Acme", href: "https://example.com" }]}
      />,
    );
    expect(screen.getByRole("link", { name: "Acme" })).toHaveAttribute(
      "href",
      "https://example.com",
    );
  });

  it("renders images with alt text", () => {
    render(
      <LogoCloud items={[{ name: "Acme", src: "/logos/acme.svg" }]} />,
    );
    expect(screen.getByRole("img", { name: "Acme" })).toHaveAttribute(
      "src",
      "/logos/acme.svg",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <LogoCloud items={[{ name: "Acme" }, { name: "Globex" }]} />,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
