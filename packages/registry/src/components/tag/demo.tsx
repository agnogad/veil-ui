import { Tag } from "./index";

export function TagBasic() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag>New</Tag>
      <Tag variant="secondary">Beta</Tag>
      <Tag variant="outline">Archived</Tag>
    </div>
  );
}

export function TagStatus() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag variant="secondary">
        <span
          className="size-1.5 rounded-full bg-emerald-500"
          aria-hidden
        />
        Live
      </Tag>
      <Tag variant="muted">
        <span className="size-1.5 rounded-full bg-amber-500" aria-hidden />
        Queued
      </Tag>
      <Tag variant="outline">
        <span
          className="size-1.5 rounded-full bg-muted-foreground"
          aria-hidden
        />
        Draft
      </Tag>
    </div>
  );
}
