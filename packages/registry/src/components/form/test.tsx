import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import type { FormEvent } from "react";
import { describe, expect, it, vi } from "vitest";

import { Form, FormError, FormSection } from "./index";

describe("Form", () => {
  it("renders a form with sections", () => {
    render(
      <Form aria-label="Profile form">
        <FormSection title="Profile" description="Your details">
          <input aria-label="Name" />
        </FormSection>
      </Form>,
    );
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Profile" }),
    ).toBeInTheDocument();
  });

  it("submits", async () => {
    const onSubmit = vi.fn((event: FormEvent) => event.preventDefault());
    render(
      <Form onSubmit={onSubmit}>
        <button type="submit">Save</button>
      </Form>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it("omits an empty error summary", () => {
    render(<FormError />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Form>
        <FormSection title="Account" description="Sign in to continue">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />
        </FormSection>
      </Form>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
