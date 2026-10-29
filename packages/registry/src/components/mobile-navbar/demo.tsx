import { MobileNavbar } from "./index";

const links = [
  { label: "Home", href: "/", active: true },
  { label: "Components", href: "/docs/components" },
  { label: "Pricing", href: "/pricing" },
];

export function MobileNavbarBasic() {
  return <MobileNavbar title="Veil UI" links={links} className="rounded-md border" />;
}

export function MobileNavbarWithActions() {
  return (
    <MobileNavbar
      title="Veil UI"
      links={links}
      className="rounded-md border"
      actions={
        <button
          type="button"
          className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
        >
          Sign in
        </button>
      }
    />
  );
}
