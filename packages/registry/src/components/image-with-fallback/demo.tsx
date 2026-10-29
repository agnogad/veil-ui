import { ImageWithFallback } from "./index";

export function ImageWithFallbackBasic() {
  return (
    <ImageWithFallback
      src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=60"
      alt="A mountain valley"
      className="w-72"
    />
  );
}

export function ImageWithFallbackCustom() {
  return (
    <ImageWithFallback
      src="https://example.invalid/missing.png"
      alt="Team offsite"
      className="w-72"
      fallback={<span>Photo coming soon</span>}
    />
  );
}
