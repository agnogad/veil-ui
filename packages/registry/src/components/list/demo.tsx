import { List, ListItem } from "./index";

export function ListBullet() {
  return (
    <List>
      <ListItem>Copy the source</ListItem>
      <ListItem>Own the code</ListItem>
      <ListItem>Keep the styles</ListItem>
    </List>
  );
}

export function ListOrdered() {
  return (
    <List as="ol" variant="decimal">
      <ListItem>Run the init command</ListItem>
      <ListItem>Add a component</ListItem>
      <ListItem>Edit it to fit</ListItem>
    </List>
  );
}

export function ListUnstyled() {
  return (
    <List variant="none" spacing="lg">
      <ListItem className="text-sm font-medium">Design tokens</ListItem>
      <ListItem className="text-sm font-medium">Primitives</ListItem>
      <ListItem className="text-sm font-medium">Blocks</ListItem>
    </List>
  );
}
