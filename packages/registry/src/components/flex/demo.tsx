import { Flex } from "./index";

export function FlexBasic() {
  return (
    <Flex direction="row" gap="sm" align="center">
      <span className="size-8 rounded-md bg-muted" aria-hidden />
      <span className="size-8 rounded-md bg-muted" aria-hidden />
      <span className="size-8 rounded-md bg-muted" aria-hidden />
    </Flex>
  );
}

export function FlexBetween() {
  return (
    <Flex
      direction="row"
      justify="between"
      align="center"
      className="w-full rounded-md border p-3 text-sm"
    >
      <span className="font-medium">Storage</span>
      <span className="text-muted-foreground">2.4 GB of 5 GB</span>
    </Flex>
  );
}
