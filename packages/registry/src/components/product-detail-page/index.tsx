import { Heart, Minus, Plus, RotateCcw, ShieldCheck, Star, Truck } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../accordion/index";
import { Badge } from "../badge/index";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../breadcrumb/index";
import { Button } from "../button/index";
import { Input } from "../input/index";
import { Logo } from "../logo/index";
import { MarketingFooter } from "../marketing-footer/index";
import { Navbar } from "../navbar/index";
import { ProductCard } from "../product-card/index";
import { Separator } from "../separator/index";

const thumbnails = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=60",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=60",
  "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=200&q=60",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=200&q=60",
];

const related = [
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=60",
    alt: "Mechanical keyboard",
    name: "Tactile Keyboard",
    price: 129,
    rating: 4.6,
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=60",
    alt: "Canvas tote bag",
    name: "Everyday Tote",
    price: 42,
    rating: 4.7,
  },
  {
    src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=600&q=60",
    alt: "Desk planter",
    name: "Desk Planter",
    price: 34,
    rating: 4.4,
  },
];

function ProductDetailPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="product-detail-page"
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
        <div className="ml-auto flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search products…"
            aria-label="Search products"
            className="hidden h-8 w-48 sm:block"
          />
          <Button variant="outline" size="sm">
            Cart (2)
          </Button>
        </div>
      </Navbar>

      <div className="mx-auto w-full max-w-7xl px-6 py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Audio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Studio Headphones</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div>
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=70"
              alt="Studio Headphones in matte black"
              className="aspect-square w-full rounded-xl border object-cover"
            />
            <div className="mt-3 grid grid-cols-4 gap-3">
              {thumbnails.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={index === 0}
                  className={cn(
                    "overflow-hidden rounded-lg border outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    index === 0 && "ring-2 ring-foreground",
                  )}
                >
                  <img
                    src={src}
                    alt=""
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Sale</Badge>
              <Badge variant="outline">Free shipping</Badge>
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Studio Headphones
            </h1>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={cn(
                      "size-4",
                      index < 5
                        ? "fill-amber-500 text-amber-500"
                        : "text-muted-foreground/40",
                    )}
                    aria-hidden
                  />
                ))}
              </span>
              <span className="font-medium">4.8</span>
              <span className="text-muted-foreground">(214 reviews)</span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-semibold">$189.00</span>
              <span className="text-base text-muted-foreground line-through">
                $229.00
              </span>
              <Badge variant="destructive">Save 17%</Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Or 4 interest-free payments of $47.25.
            </p>

            <Separator className="my-5" />

            <div>
              <p className="text-sm font-medium">Color</p>
              <div className="mt-2 flex gap-2">
                {[
                  { label: "Matte black", className: "bg-neutral-900" },
                  { label: "Sand", className: "bg-amber-200" },
                  { label: "Sage", className: "bg-emerald-300" },
                ].map((color, index) => (
                  <button
                    key={color.label}
                    type="button"
                    aria-label={color.label}
                    aria-pressed={index === 0}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full border outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      index === 0 && "ring-2 ring-foreground ring-offset-2",
                    )}
                  >
                    <span
                      className={cn("size-6 rounded-full", color.className)}
                      aria-hidden
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex h-9 items-center rounded-md border">
                <Button variant="ghost" size="icon" aria-label="Decrease quantity">
                  <Minus />
                </Button>
                <Input
                  type="number"
                  defaultValue={1}
                  min={1}
                  aria-label="Quantity"
                  className="h-9 w-14 border-0 text-center shadow-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <Button variant="ghost" size="icon" aria-label="Increase quantity">
                  <Plus />
                </Button>
              </div>
              <Button className="flex-1 sm:flex-none">Add to cart</Button>
              <Button variant="outline" size="icon" aria-label="Save for later">
                <Heart />
              </Button>
            </div>

            <div className="mt-5 grid gap-2 rounded-lg border bg-muted/20 p-4 text-sm">
              <p className="flex items-center gap-2">
                <Truck className="size-4 text-muted-foreground" aria-hidden />
                Free shipping on orders over $75
              </p>
              <p className="flex items-center gap-2">
                <RotateCcw className="size-4 text-muted-foreground" aria-hidden />
                Free 30-day returns
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-muted-foreground" aria-hidden />
                2-year warranty included
              </p>
            </div>

            <h2 className="sr-only">Product details</h2>
            <Accordion
              type="single"
              collapsible
              defaultValue="description"
              className="mt-5 rounded-lg border px-4"
            >
              <AccordionItem value="description">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                  Closed-back studio headphones with balanced tuning, memory-foam
                  ear cushions and a detachable braided cable. Tuned for long
                  listening sessions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="specs">
                <AccordionTrigger>Specifications</AccordionTrigger>
                <AccordionContent>
                  Impedance 32Ω · Frequency response 10 Hz–22 kHz · Weight 248 g ·
                  Detachable 3.5 mm cable included.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & returns</AccordionTrigger>
                <AccordionContent>
                  Ships in 1–2 business days. Returns accepted within 30 days in
                  original condition.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <section className="mt-14">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              You may also like
            </h2>
            <Button variant="link" className="px-0">
              View all
            </Button>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((product) => (
              <ProductCard
                key={product.name}
                className="max-w-none"
                src={product.src}
                alt={product.alt}
                name={product.name}
                price={product.price}
                rating={product.rating}
              />
            ))}
          </div>
        </section>
      </div>

      <MarketingFooter
        className="border-x-0 border-b-0"
        brand="Atelier"
        description="Everyday objects, made to last."
        columns={[
          {
            title: "Shop",
            links: [
              { label: "New arrivals", href: "#" },
              { label: "Best sellers", href: "#" },
              { label: "Gift cards", href: "#" },
            ],
          },
          {
            title: "Help",
            links: [
              { label: "Shipping", href: "#" },
              { label: "Returns", href: "#" },
              { label: "Contact", href: "#" },
            ],
          },
        ]}
        legal={<p>© 2026 Atelier. All rights reserved.</p>}
      />
    </div>
  );
}

export { ProductDetailPage };
