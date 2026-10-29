import { Avatar, AvatarFallback } from "../avatar/index";
import { Badge } from "../badge/index";
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

export function ListItemMembers() {
  return (
    <ListView label="Team members" className="max-w-sm">
      <ListItem
        leading={
          <Avatar size="sm">
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
        }
        title="Mira Chen"
        description="Product design"
        trailing={<Badge variant="secondary">Admin</Badge>}
      />
      <ListItem
        leading={
          <Avatar size="sm">
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
        }
        title="Ada Lovelace"
        description="Engineering"
        trailing={<Badge variant="outline">Member</Badge>}
      />
      <ListItem
        leading={
          <Avatar size="sm">
            <AvatarFallback>GH</AvatarFallback>
          </Avatar>
        }
        title="Grace Hopper"
        description="Platform"
        trailing={<Badge variant="muted">Invited</Badge>}
      />
    </ListView>
  );
}
