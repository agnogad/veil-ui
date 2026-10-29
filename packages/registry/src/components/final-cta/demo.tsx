import { Button } from "../button/index";
import { FinalCta } from "./index";

export function FinalCtaBasic() {
  return (
    <FinalCta
      className="w-full max-w-4xl"
      title="Start building with Veil UI today"
      description="Own your components, keep your design language, ship faster."
      actions={
        <>
          <Button size="lg">Get started</Button>
          <Button size="lg" variant="outline">
            Browse components
          </Button>
        </>
      }
      note="Free for personal and commercial projects."
    />
  );
}

export function FinalCtaCompact() {
  return (
    <FinalCta
      className="w-full max-w-2xl"
      title="Ready when you are"
      actions={<Button>Create an account</Button>}
    />
  );
}
