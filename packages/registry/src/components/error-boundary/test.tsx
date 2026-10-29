import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ErrorBoundary } from "./index";

function Broken(): never {
  throw new Error("kaboom");
}

let shouldThrow = true;

function Flaky() {
  if (shouldThrow) {
    throw new Error("kaboom");
  }
  return <p>Recovered</p>;
}

afterEach(() => {
  shouldThrow = true;
  vi.restoreAllMocks();
});

describe("ErrorBoundary", () => {
  it("renders the default fallback with the error message", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <Broken />
      </ErrorBoundary>,
    );

    expect(screen.getByRole("alert")).toHaveAttribute(
      "data-slot",
      "error-boundary",
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("kaboom")).toBeInTheDocument();
  });

  it("calls onError with the thrown error", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const onError = vi.fn();

    render(
      <ErrorBoundary onError={onError}>
        <Broken />
      </ErrorBoundary>,
    );

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0]?.[0]).toBeInstanceOf(Error);
  });

  it("renders a custom fallback and recovers after reset", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();

    render(
      <ErrorBoundary
        fallback={({ error, reset }) => (
          <div>
            <p>{error.message}</p>
            <button
              type="button"
              onClick={() => {
                shouldThrow = false;
                reset();
              }}
            >
              Reset
            </button>
          </div>
        )}
      >
        <Flaky />
      </ErrorBoundary>,
    );

    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByText("Recovered")).toBeInTheDocument();
  });

  it("recovers with the default retry button", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <Flaky />
      </ErrorBoundary>,
    );

    shouldThrow = false;
    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(screen.getByText("Recovered")).toBeInTheDocument();
  });

  it("has no accessibility violations in the fallback", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { container } = render(
      <ErrorBoundary>
        <Broken />
      </ErrorBoundary>,
    );

    const results = await axe.run(container);
    expect(results.violations).toEqual([]);
  });
});
