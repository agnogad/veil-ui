import { ProductCard } from "./index";

export function ProductCardBasic() {
  return (
    <ProductCard
      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=60"
      alt="A minimalist wristwatch"
      name="Minimal watch"
      price={129}
      rating={4.6}
      reviewCount={214}
    />
  );
}

export function ProductCardSale() {
  return (
    <ProductCard
      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=60"
      alt="Over-ear headphones"
      name="Studio headphones"
      price={199}
      originalPrice={249}
      rating={4.8}
      reviewCount={1024}
      badge="Sale"
    />
  );
}
