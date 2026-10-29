import { ActionMenuButton } from "./index";

export function ActionMenuButtonBasic() {
  return (
    <ActionMenuButton
      items={[
        { label: "Edit" },
        { label: "Duplicate" },
        { label: "Archive" },
      ]}
    />
  );
}

export function ActionMenuButtonDestructive() {
  return (
    <ActionMenuButton
      label="Project actions"
      items={[
        { label: "Rename" },
        { label: "Delete project", destructive: true },
      ]}
    />
  );
}

export function ActionMenuButtonAlignStart() {
  return (
    <ActionMenuButton
      align="start"
      variant="outline"
      items={[
        { label: "View details" },
        { label: "Copy link" },
        { label: "Unavailable", disabled: true },
      ]}
    />
  );
}
