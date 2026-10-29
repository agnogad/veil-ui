import { ListView } from "../list-view/index";
import { ListItem } from "./index";

export function ListItemBasic() {
  return (
    <ListView label="Queue" className="max-w-xs">
      <ListItem title="Review pull request" description="Assigned to you" />
      <ListItem title="Update changelog" description="Due tomorrow" />
    </ListView>
  );
}
