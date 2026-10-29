import { TrustBar } from "./index";

export function TrustBarBasic() {
  return (
    <TrustBar
      className="w-full max-w-4xl rounded-xl"
      items={[
        { name: "Acme" },
        { name: "Globex" },
        { name: "Initech" },
        { name: "Umbrella" },
      ]}
    />
  );
}

export function TrustBarCompact() {
  return (
    <TrustBar
      className="w-full max-w-4xl rounded-xl"
      label="Backed by founders from"
      columns={3}
      items={[{ name: "Northwind" }, { name: "Contoso" }, { name: "Fabrikam" }]}
    />
  );
}
