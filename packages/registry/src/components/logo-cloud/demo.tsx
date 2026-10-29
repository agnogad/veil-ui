import { LogoCloud } from "./index";

export function LogoCloudBasic() {
  return (
    <LogoCloud
      items={[
        { name: "Acme" },
        { name: "Globex" },
        { name: "Initech" },
        { name: "Umbrella" },
      ]}
    />
  );
}

export function LogoCloudLinked() {
  return (
    <LogoCloud
      columns={3}
      items={[
        { name: "Acme", href: "https://example.com/acme" },
        { name: "Globex", href: "https://example.com/globex" },
        { name: "Initech", href: "https://example.com/initech" },
      ]}
    />
  );
}
