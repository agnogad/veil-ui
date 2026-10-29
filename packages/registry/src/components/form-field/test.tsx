import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";

import {
  FormField,
  FormFieldDescription,
  FormFieldError,
  FormFieldLabel,
} from "./index";

describe("FormField", () => {
  it("connects a label to its control", () => {
    render(
      <FormField>
        <FormFieldLabel htmlFor="name">Name</FormFieldLabel>
        <input id="name" />
      </FormField>,
    );
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("renders an error region only when there is a message", () => {
    const { rerender } = render(<FormFieldError />);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    rerender(<FormFieldError>Required</FormFieldError>);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("renders a description", () => {
    render(<FormFieldDescription>Helper text</FormFieldDescription>);
    expect(screen.getByText("Helper text")).toHaveAttribute(
      "data-slot",
      "form-field-description",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <FormField>
        <FormFieldLabel htmlFor="email">Email</FormFieldLabel>
        <input id="email" aria-describedby="email-description" />
        <FormFieldDescription id="email-description">
          We never share it.
        </FormFieldDescription>
      </FormField>,
    );
    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
