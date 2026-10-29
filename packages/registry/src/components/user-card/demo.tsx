import { Button } from "../button/index";
import { UserCard } from "./index";

export function UserCardBasic() {
  return (
    <UserCard
      name="Ada Lovelace"
      handle="ada"
      bio="Mathematician and writer. Building the first algorithms."
      stats={[
        { label: "posts", value: 128 },
        { label: "followers", value: "12.4k" },
      ]}
    />
  );
}

export function UserCardWithAction() {
  return (
    <UserCard
      name="Grace Hopper"
      handle="grace"
      bio="Compiler pioneer and rear admiral."
      action={
        <Button type="button" variant="outline" size="sm">
          Follow
        </Button>
      }
    />
  );
}
