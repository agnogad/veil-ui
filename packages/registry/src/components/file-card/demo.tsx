import { Download, FileText, Trash2 } from "lucide-react";

import { Button } from "../button/index";
import { FileCard } from "./index";

export function FileCardBasic() {
  return <FileCard name="quarterly-report.pdf" size="2.4 MB" kind="pdf" />;
}

export function FileCardWithActions() {
  return (
    <div className="grid max-w-sm gap-3">
      <FileCard
        name="hero-banner.png"
        size="860 KB"
        kind="image"
        actions={
          <Button type="button" variant="ghost" size="icon" aria-label="Download hero-banner.png">
            <Download className="size-4" aria-hidden />
          </Button>
        }
      />
      <FileCard
        name="notes.txt"
        size="4 KB"
        kind="text"
        description="Shared with the design team."
        actions={
          <>
            <Button type="button" variant="ghost" size="icon" aria-label="Preview notes.txt">
              <FileText className="size-4" aria-hidden />
            </Button>
            <Button type="button" variant="ghost" size="icon" aria-label="Remove notes.txt">
              <Trash2 className="size-4" aria-hidden />
            </Button>
          </>
        }
      />
    </div>
  );
}
