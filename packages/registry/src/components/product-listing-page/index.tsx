import { ChevronDown, SlidersHorizontal, Star } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Badge } from "../badge/index";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../breadcrumb/index";
import { Button } from "../button/index";
import { Checkbox } from "../checkbox/index";
import { Input } from "../input/index";
import { Label } from "../label/index";
import { Logo } from "../logo/index";
import { MarketingFooter } from "../marketing-footer/index";
import { Navbar } from "../navbar/index";
import { Pagination } from "../pagination/index";
import { ProductCard } from "../product-card/index";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select/index";

const products = [
  {
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=60",
    alt: "Wireless headphones",
    name: "Studio Headphones",
    price: 189,
    originalPrice: 229,
    rating: 4.8,
    reviewCount: 214,
    badge: "Sale",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=60",
    alt: "Mechanical keyboard",
    name: "Tactile Keyboard",
    price: 129,
    rating: 4.6,
    reviewCount: 98,
  },
  {
    src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=600&q=60",
    alt: "Ceramic desk planter",
    name: "Desk Planter",
    price: 34,
    rating: 4.4,
    reviewCount: 61,
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=60",
    alt: "Printed wall art",
    name: "Landscape Print",
    price: 58,
    rating: 4.9,
    reviewCount: 142,
    badge: "New",
  },
  {
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=60",
    alt: "Travel notebook",
    name: "Field Notebook",
    price: 18,
    rating: 4.3,
    reviewCount: 37,
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=60",
    alt: "Canvas tote bag",
    name: "Everyday Tote",
    price: 42,
    originalPrice: 54,
    rating: 4.7,
    reviewCount: 88,
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=60",
    alt: "Pour-over coffee set",
    name: "Brew Kit",
    price: 76,
    rating: 4.5,
    reviewCount: 53,
  },
  {
    src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=60",
    alt: "Ceramic mug",
    name: "Stoneware Mug",
    price: 24,
    rating: 4.2,
    reviewCount: 29,
  },
];

const categories = [
  { label: "Audio", count: 24, checked: true },
  { label: "Desk accessories", count: 18, checked: false },
  { label: "Prints & art", count: 31, checked: false },
  { label: "Bags", count: 12, checked: false },
  { label: "Kitchen", count: 9, checked: false },
];

const sizes = ["XS", "S", "M", "L", "XL"];

function ProductListingPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="product-listing-page"
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
        <nav aria-label="Primary" className="ml-6 hidden items-center gap-1 md:flex">
          {["New", "Shop", "Collections", "Journal"].map((link) => (
            <a
              key={link}
              href="#"
              className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search products…"
            aria-label="Search products"
            className="h-8 w-40 sm:w-56"
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
              <BreadcrumbLink href="#">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">All products</h1>
            <p className="text-sm text-muted-foreground">
              128 products · Free shipping over $75
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <SlidersHorizontal /> Filters
            </Button>
            <Select defaultValue="featured">
              <SelectTrigger className="h-8 w-40" aria-label="Sort products">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: low to high</SelectItem>
                <SelectItem value="price-desc">Price: high to low</SelectItem>
                <SelectItem value="rating">Top rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Audio</Badge>
          {["Under $50", "In stock", "Top rated"].map((chip) => (
            <Button key={chip} variant="outline" size="sm" className="rounded-full">
              {chip}
              <ChevronDown />
            </Button>
          ))}
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold">Category</h2>
              <div className="mt-3 space-y-2.5">
                {categories.map((category) => (
                  <div key={category.label} className="flex items-center gap-2">
                    <Checkbox
                      id={`cat-${category.label}`}
                      defaultChecked={category.checked}
                    />
                    <Label
                      htmlFor={`cat-${category.label}`}
                      className="flex-1 text-sm font-normal"
                    >
                      {category.label}
                    </Label>
                    <span className="text-xs text-muted-foreground">
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold">Size</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={size === "M" ? "default" : "outline"}
                    size="sm"
                    className="w-9 px-0"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold">Rating</h2>
              <div className="mt-3 space-y-2">
                {[4, 3, 2].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className="flex w-full items-center gap-1.5 rounded-md px-1 py-1 text-sm text-muted-foreground hover:bg-accent"
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={cn(
                          "size-3.5",
                          index < rating
                            ? "fill-amber-500 text-amber-500"
                            : "text-muted-foreground/40",
                        )}
                        aria-hidden
                      />
                    ))}
                    <span className="ml-1">& up</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.name}
                  className="max-w-none"
                  src={product.src}
                  alt={product.alt}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  badge={product.badge}
                />
              ))}
            </div>
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
              <p className="text-sm text-muted-foreground">
                Showing 1–8 of 128 products
              </p>
              <Pagination page={1} totalPages={16} />
            </div>
          </div>
        </div>
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

export { ProductListingPage };
