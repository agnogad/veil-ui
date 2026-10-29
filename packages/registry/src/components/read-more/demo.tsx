import { ReadMore } from "./index";

const copy =
  "Buttons, inputs, navigation and overlays arrive as source files. Keep what you need, delete the rest, and edit every class. The registry only resolves dependencies and writes files, so there is no runtime to upgrade or fight with later.";

export function ReadMoreBasic() {
  return (
    <ReadMore lines={2} className="max-w-sm text-sm">
      {copy}
    </ReadMore>
  );
}

export function ReadMoreExpanded() {
  return (
    <ReadMore lines={2} defaultExpanded className="max-w-sm text-sm">
      {copy}
    </ReadMore>
  );
}
