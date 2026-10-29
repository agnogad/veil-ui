import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import { Section, SectionDescription, SectionTitle } from "./index";

describe("Section", () => {
  it("renders a section with a heading", () => {
    render(
      <Section aria-label="Usage">
        <SectionTitle>Usage</SectionTitle>
        <SectionDescription>Track usage.</SectionDescription>
      </Section>,
    );
    expect(screen.getByRole("region", { name: "Usage" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Usage" })).toBeInTheDocument();
  });

  it("renders a description", () => {
    render(<SectionDescription>Details</SectionDescription>);
    expect(screen.getByText("Details")).toHaveAttribute(
      "data-slot",
      "section-description",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Section aria-label="Usage">
        <SectionTitle>Usage</SectionTitle>
        <p>Body</p>
      </Section>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
