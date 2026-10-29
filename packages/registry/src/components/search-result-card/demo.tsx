import { SearchResultCard } from "./index";

export function SearchResultCardBasic() {
  return (
    <SearchResultCard
      title="Getting started with design tokens"
      url="https://veil-ui.dev/docs/tokens"
      breadcrumb="veil-ui.dev › docs"
      snippet="Define a minimal token set for color, spacing and radius, then let every component read from the same scale."
      meta="Updated Mar 12, 2026"
    />
  );
}

export function SearchResultCardStack() {
  return (
    <div className="grid max-w-2xl gap-5">
      <SearchResultCard
        title="Accessible focus styles"
        url="https://veil-ui.dev/docs/focus"
        snippet="Focus rings should be visible on every interactive surface and never rely on color alone."
      />
      <SearchResultCard
        title="Composing cards"
        url="https://veil-ui.dev/docs/cards"
        snippet="Card primitives split into header, content and footer so layouts stay predictable."
      />
    </div>
  );
}
