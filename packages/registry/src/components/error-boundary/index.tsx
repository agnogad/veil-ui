"use client";

import { AlertTriangle } from "lucide-react";
import { Component } from "react";
import type * as React from "react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";

interface ErrorFallbackProps {
  error: Error;
  reset: () => void;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Static fallback, or a render prop that receives the error and reset. */
  fallback?:
    | React.ReactNode
    | ((props: ErrorFallbackProps) => React.ReactNode);
  onError?: (error: Error, info: React.ErrorInfo) => void;
  className?: string;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info);
  }

  reset = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;

    if (!error) {
      return this.props.children;
    }

    if (typeof this.props.fallback === "function") {
      return this.props.fallback({ error, reset: this.reset });
    }

    if (this.props.fallback !== undefined) {
      return this.props.fallback;
    }

    return (
      <div
        data-slot="error-boundary"
        role="alert"
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-6 py-12 text-center",
          this.props.className,
        )}
      >
        <div
          aria-hidden
          className="flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive"
        >
          <AlertTriangle className="size-5" />
        </div>
        <div className="grid gap-1">
          <p className="text-sm font-medium text-foreground">
            Something went wrong
          </p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
        <Button variant="outline" size="sm" onClick={this.reset}>
          Try again
        </Button>
      </div>
    );
  }
}

export { ErrorBoundary };
export type { ErrorBoundaryProps, ErrorFallbackProps };
