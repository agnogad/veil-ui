import { MegaMenu } from "./index";

export function MegaMenuBasic() {
  return (
    <MegaMenu
      aria-label="Main"
      items={[
        {
          label: "Products",
          columns: [
            {
              title: "Build",
              links: [
                { label: "Components", description: "42 primitives", href: "#components" },
                { label: "Blocks", description: "Page sections", href: "#blocks" },
              ],
            },
            {
              title: "Ship",
              links: [
                { label: "CLI", description: "Copy files in one command", href: "#cli" },
                { label: "Registry", description: "Machine-readable source", href: "#registry" },
              ],
            },
          ],
        },
        {
          label: "Resources",
          columns: [
            {
              title: "Learn",
              links: [
                { label: "Docs", href: "#docs" },
                { label: "Changelog", href: "#changelog" },
              ],
            },
          ],
        },
      ]}
    />
  );
}
