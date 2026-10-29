import { ArrowLeft, Minus, Plus, Tag, Trash2, Truck } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Button } from "../button/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card/index";
import { Input } from "../input/index";
import { Logo } from "../logo/index";
import { MarketingFooter } from "../marketing-footer/index";
import { Navbar } from "../navbar/index";
import { Progress } from "../progress/index";
import { Separator } from "../separator/index";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table/index";

const items = [
  {
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=60",
    name: "Studio Headphones",
    detail: "Matte black",
    price: 189,
    quantity: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=60",
    name: "Tactile Keyboard",
    detail: "US layout · Brown switches",
    price: 129,
    quantity: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=200&q=60",
    name: "Desk Planter",
    detail: "Small · Sage",
    price: 34,
    quantity: 2,
  },
];

const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

function CartPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="cart-page"
      className={cn("w-full overflow-hidden rounded-xl border bg-background", className)}
      {...props}
    >
      <Navbar>
        <Logo
          name="Atelier"
          size="sm"
          mark={
            <span className="grid size-full place-items-center bg-foreground text-[10px] font-bold text-background">
              A
            </span>
          }
        />
        <Button variant="link" className="ml-auto">
          <ArrowLeft /> Continue shopping
        </Button>
      </Navbar>

      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Your cart</h1>
            <p className="text-sm text-muted-foreground">
              3 items · ${subtotal.toFixed(2)}
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <Trash2 /> Clear cart
          </Button>
        </div>

        <div className="mt-6 rounded-lg border bg-muted/20 p-4">
          <p className="flex items-center gap-2 text-sm">
            <Truck className="size-4 text-muted-foreground" aria-hidden />
            {subtotal >= 75
              ? "You qualify for free shipping."
              : "Add $75.00 more for free shipping."}
          </p>
          <Progress
            className="mt-2"
            value={Math.min(100, Math.round((subtotal / 75) * 100))}
            aria-label="Free shipping progress"
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="w-10">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={item.src}
                          alt=""
                          className="size-16 rounded-md border object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.detail}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="mx-auto flex w-fit items-center rounded-md border">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus />
                        </Button>
                        <span className="w-8 text-center text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Tag
                  className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  placeholder="Discount code"
                  aria-label="Discount code"
                  className="pl-8"
                />
              </div>
              <Button variant="outline">Apply</Button>
            </div>
          </div>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Order summary</CardTitle>
              <CardDescription>Taxes calculated at checkout.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated tax</span>
                <span>${(subtotal * 0.08).toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>${(subtotal * 1.08).toFixed(2)}</span>
              </div>
              <Button className="mt-3 w-full" size="lg">
                Checkout
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Secure payment · Free 30-day returns
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <MarketingFooter
        className="border-x-0 border-b-0"
        brand="Atelier"
        description="Everyday objects, made to last."
        legal={<p>© 2026 Atelier. All rights reserved.</p>}
      />
    </div>
  );
}

export { CartPage };
