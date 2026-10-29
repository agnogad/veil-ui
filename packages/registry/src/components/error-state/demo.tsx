import { Button } from "../button/index";
import { ErrorState } from "./index";

export function ErrorStateBasic() {
  return <ErrorState />;
}

export function ErrorStateWithRetry() {
  return (
    <ErrorState
      title="Could not load invoices"
      description="Check your connection and try again."
      action={
        <Button variant="outline" size="sm">
          Retry
        </Button>
      }
    />
  );
}

export function ErrorStateCustom() {
  return (
    <ErrorState
      title="Payment declined"
      description="The card issuer rejected the charge."
    />
  );
}
