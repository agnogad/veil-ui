import { Button } from "../button/index";
import { SuccessState } from "./index";

export function SuccessStateBasic() {
  return <SuccessState title="Changes saved" />;
}

export function SuccessStateWithAction() {
  return (
    <SuccessState
      title="Payment complete"
      description="A receipt was sent to your inbox."
      action={
        <Button variant="outline" size="sm">
          View receipt
        </Button>
      }
    />
  );
}

export function SuccessStateCustom() {
  return (
    <SuccessState
      title="You're all caught up"
      description="No pending requests remain."
    />
  );
}
