import { Button } from "../button/index";
import { MobileBottomBar } from "./index";

export function MobileBottomBarBasic() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border">
      <div className="h-24 bg-muted/20" />
      <MobileBottomBar sticky={false}>
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button className="flex-1">Save changes</Button>
      </MobileBottomBar>
    </div>
  );
}

export function MobileBottomBarCheckout() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border">
      <div className="space-y-2 p-4">
        <p className="text-sm font-medium">Order summary</p>
        <p className="text-xs text-muted-foreground">
          Subtotal $129 · Shipping calculated at checkout
        </p>
      </div>
      <MobileBottomBar sticky={false}>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-sm font-semibold">$129.00</p>
        </div>
        <Button>Checkout</Button>
      </MobileBottomBar>
    </div>
  );
}
