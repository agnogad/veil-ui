import { ProfileCard } from "./index";

export function ProfileCardBasic() {
  return (
    <ProfileCard
      name="Ada Lovelace"
      role="Computing pioneer"
      bio="Writing about mathematics, engines and the poetry of computation."
      followers={12400}
      following={318}
    />
  );
}

export function ProfileCardCompact() {
  return (
    <ProfileCard
      className="max-w-xs"
      name="Grace Hopper"
      role="Rear Admiral, US Navy"
      avatarFallback="GH"
      followers={8200}
      following={96}
    />
  );
}
