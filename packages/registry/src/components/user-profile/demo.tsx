import { Button } from "../button/index";
import { UserProfile } from "./index";

export function UserProfileBasic() {
  return (
    <UserProfile
      name="Ada Lovelace"
      handle="ada"
      bio="Mathematician and writer. Building tools for the next generation of computing."
      location="London, UK"
      website="https://ada.dev"
      joined="March 2024"
      stats={[
        { label: "Followers", value: "12.4k" },
        { label: "Projects", value: "28" },
        { label: "Stars", value: "3.1k" },
      ]}
      actions={
        <>
          <Button size="sm">Follow</Button>
          <Button size="sm" variant="outline">
            Message
          </Button>
        </>
      }
    />
  );
}

export function UserProfileCompact() {
  return (
    <UserProfile
      className="max-w-sm"
      name="Grace Hopper"
      handle="grace"
      bio="Compiler pioneer."
      location="Arlington, VA"
      stats={[{ label: "Followers", value: "8.2k" }]}
    />
  );
}
