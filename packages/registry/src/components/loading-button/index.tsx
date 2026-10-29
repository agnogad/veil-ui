import type * as React from "react";

import { Button } from "../button/index";
import { Spinner } from "../spinner/index";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  /** Show a spinner and disable the button. */
  loading?: boolean;
  /** Screen-reader text while loading. */
  loadingLabel?: string;
}

function LoadingButton({
  loading = false,
  loadingLabel = "Loading",
  disabled,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      data-slot="loading-button"
      aria-busy={loading}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner size="sm" label={loadingLabel} /> : null}
      {children}
    </Button>
  );
}

export { LoadingButton };
