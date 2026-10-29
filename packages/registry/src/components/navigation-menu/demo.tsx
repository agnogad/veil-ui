import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./index";

export function NavigationMenuBasic() {
  return (
    <NavigationMenu aria-label="Main">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="#installation">
              Installation
            </NavigationMenuLink>
            <NavigationMenuLink href="#theming">Theming</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#docs">Docs</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function NavigationMenuGrid() {
  return (
    <NavigationMenu aria-label="Resources">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent className="w-80">
            <div className="grid grid-cols-2 gap-1">
              {["Button", "Input", "Dialog", "Tabs"].map((name) => (
                <NavigationMenuLink key={name} href={`#${name.toLowerCase()}`}>
                  {name}
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
