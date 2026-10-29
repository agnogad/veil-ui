import { Caption } from "./index";

export function CaptionBasic() {
  return <Caption>Updated 2 minutes ago</Caption>;
}

export function CaptionWithFigure() {
  return (
    <figure className="grid max-w-sm gap-2">
      <div className="aspect-video rounded-md border bg-muted" aria-hidden />
      <figcaption>
        <Caption>Dashboard overview after the first sync.</Caption>
      </figcaption>
    </figure>
  );
}
