import { ChevronRight, FileText, Folder, Image as ImageIcon } from "lucide-react";

import { ListItem, ListView } from "./index";

export function ListViewBasic() {
  return (
    <ListView label="Files" className="max-w-md">
      <ListItem
        leading={<Folder className="size-4 text-muted-foreground" aria-hidden />}
        title="Design"
        description="12 items"
        trailing={<ChevronRight className="size-4 text-muted-foreground" aria-hidden />}
      />
      <ListItem
        leading={<FileText className="size-4 text-muted-foreground" aria-hidden />}
        title="proposal.pdf"
        description="2.4 MB"
      />
      <ListItem
        leading={<ImageIcon className="size-4 text-muted-foreground" aria-hidden />}
        title="hero.png"
        description="860 KB"
      />
    </ListView>
  );
}

export function ListViewCompact() {
  return (
    <ListView label="Notifications" className="max-w-xs">
      <ListItem title="Deployment finished" description="2 minutes ago" />
      <ListItem title="New comment" description="15 minutes ago" />
    </ListView>
  );
}
