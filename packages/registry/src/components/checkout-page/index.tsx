import { CreditCard, Lock, ShieldCheck, Store, Truck } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card/index";
import { Checkbox } from "../checkbox/index";
import { Input } from "../input/index";
import { Label } from "../label/index";
import { Logo } from "../logo/index";
import { Stepper } from "../stepper/index";
import { Separator } from "../separator/index";

const items = [
  {
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=60",
    name: "Studio Headphones",
    detail: "Matte black · Qty 1",
    price: 189,
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=60",
    name: "Tactile Keyboard",
    detail: "US layout · Qty 1",
    price: 129,
  },
];

const subtotal = items.reduce((sum, item) => sum + item.price, 0);

function CheckoutPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="checkout-page"
      className={cn("w-full overflow-hidden rounded-xl border bg-background", className)}
      {...props}
    >
      <div className="flex items-center justify-between border-b px-6 py-4">
        <Logo
          name="Atelier"
          size="sm"
          mark={
            <span className="grid size-full place-items-center bg-foreground text-[10px] font-bold text-background">
              A
            </span>
          }
        />
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="size-3.5" aria-hidden />
          Secure checkout
        </span>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <Stepper
          current={2}
          steps={[
            { title: "Cart" },
            { title: "Information" },
            { title: "Shipping" },
            { title: "Payment" },
          ]}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact information</CardTitle>
                <CardDescription>
                  We will send the receipt and tracking updates here.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="checkout-email">Email</Label>
                  <Input
                    id="checkout-email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <Checkbox id="checkout-news" defaultChecked />
                  <Label
                    htmlFor="checkout-news"
                    className="text-sm font-normal"
                  >
                    Email me with news and offers
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping address</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="checkout-first">First name</Label>
                  <Input id="checkout-first" placeholder="Ada" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="checkout-last">Last name</Label>
                  <Input id="checkout-last" placeholder="Lovelace" required />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="checkout-address">Address</Label>
                  <Input id="checkout-address" placeholder="123 Analytical Way" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="checkout-city">City</Label>
                  <Input id="checkout-city" placeholder="Lisbon" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="checkout-postal">Postal code</Label>
                  <Input id="checkout-postal" placeholder="1200-109" required />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="checkout-country">Country</Label>
                  <Input id="checkout-country" defaultValue="Portugal" required />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery method</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {[
                  {
                    icon: Truck,
                    title: "Standard delivery",
                    description: "3–5 business days",
                    price: "Free",
                    checked: true,
                  },
                  {
                    icon: Store,
                    title: "Express delivery",
                    description: "1–2 business days",
                    price: "$12.00",
                    checked: false,
                  },
                ].map((method) => {
                  const Icon = method.icon;
                  return (
                    <label
                      key={method.title}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg border p-3",
                        method.checked && "border-foreground bg-muted/30",
                      )}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        defaultChecked={method.checked}
                        className="size-4 accent-foreground"
                      />
                      <Icon className="size-4 text-muted-foreground" aria-hidden />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{method.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                      <span className="text-sm">{method.price}</span>
                    </label>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>
                  All transactions are secure and encrypted.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3 text-sm">
                  <CreditCard className="size-4" aria-hidden />
                  Credit or debit card
                  <span className="ml-auto text-xs text-muted-foreground">
                    Visa · ···· 4242
                  </span>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="checkout-card">Card number</Label>
                  <Input
                    id="checkout-card"
                    inputMode="numeric"
                    placeholder="4242 4242 4242 4242"
                    autoComplete="cc-number"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="checkout-expiry">Expiry</Label>
                    <Input
                      id="checkout-expiry"
                      placeholder="MM / YY"
                      autoComplete="cc-exp"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="checkout-cvc">CVC</Label>
                    <Input
                      id="checkout-cvc"
                      placeholder="123"
                      autoComplete="cc-csc"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="h-fit lg:sticky lg:top-6">
            <CardHeader>
              <CardTitle>Order summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.name} className="flex items-center gap-3">
                    <img
                      src={item.src}
                      alt=""
                      className="size-12 rounded-md border object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                    <span className="text-sm">${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(subtotal * 0.08).toFixed(2)}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>${(subtotal * 1.08).toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg">
                <Lock /> Place order
              </Button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5" aria-hidden />
                Protected by 256-bit encryption
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export { CheckoutPage };
