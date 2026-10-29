import { Button } from "../button/index";
import { StickyBottomCta } from "./index";

export function StickyBottomCtaBasic() {
  return (
    <div className="h-56 w-full max-w-sm overflow-y-auto rounded-lg border">
      <div className="space-y-2 p-4 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Plan details</p>
        <p>Unlimited projects, 10 seats, priority support.</p>
        <p>Cancel anytime from your dashboard.</p>
        <p>Taxes calculated at checkout.</p>
      </div>
      <StickyBottomCta
        label="$24 / month"
        description="Billed monthly"
        action={<Button>Start trial</Button>}
      />
    </div>
  );
}

export function StickyBottomCtaCheckout() {
  return (
    <div className="h-56 w-full max-w-sm overflow-y-auto rounded-lg border">
      <div className="space-y-3 p-4 text-sm">
        <p className="font-medium">Shipping address</p>
        <p className="text-muted-foreground">221B Baker Street, London</p>
        <p className="font-medium">Payment</p>
        <p className="text-muted-foreground">Visa ending in 4242</p>
      </div>
      <StickyBottomCta
        label="Total $129.00"
        description="Including shipping"
        action={<Button>Place order</Button>}
      />
    </div>
  );
}
