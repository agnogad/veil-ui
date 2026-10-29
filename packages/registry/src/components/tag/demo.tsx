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
