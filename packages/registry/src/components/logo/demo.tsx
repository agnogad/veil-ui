import { Logo } from "./index";

function Mark() {
  return (
    <span className="grid size-full place-items-center rounded-md bg-foreground text-xs font-bold text-background">
      V
    </span>
  );
}

export function LogoBasic() {
  return <Logo name="Veil UI" mark={<Mark />} />;
}

export function LogoLink() {
  return <Logo name="Veil UI" mark={<Mark />} href="/" />;
}

export function LogoSizes() {
  return (
    <div className="flex items-center gap-6">
      <Logo name="Veil" size="sm" mark={<Mark />} />
      <Logo name="Veil" size="md" mark={<Mark />} />
      <Logo name="Veil" size="lg" mark={<Mark />} />
    </div>
  );
}
