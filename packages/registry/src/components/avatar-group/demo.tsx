import { AvatarGroup } from "./index";

const team = [
  { name: "Ada Lovelace" },
  { name: "Grace Hopper" },
  { name: "Alan Turing" },
  { name: "Katherine Johnson" },
  { name: "Linus Torvalds" },
  { name: "Margaret Hamilton" },
];

export function AvatarGroupBasic() {
  return <AvatarGroup users={team} />;
}

export function AvatarGroupSmall() {
  return <AvatarGroup users={team} size="sm" max={3} label="Reviewers" />;
}
