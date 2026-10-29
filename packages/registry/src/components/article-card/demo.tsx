import { ArticleCard } from "./index";

export function ArticleCardBasic() {
  return (
    <ArticleCard
      title="A practical guide to design tokens"
      excerpt="How to build a small token set that scales from marketing pages to dense product UI."
      category="Design systems"
      author="Elena Ruiz"
      date="Mar 4, 2026"
      readTime="8 min read"
    />
  );
}

export function ArticleCardWithImage() {
  return (
    <ArticleCard
      src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=60"
      alt="Circuit board close-up"
      title="Shipping accessible interfaces without slowing down"
      excerpt="A workflow for catching keyboard and screen-reader regressions in review."
      category="Engineering"
      author="Noah Park"
      date="Feb 18, 2026"
      readTime="6 min read"
    />
  );
}
