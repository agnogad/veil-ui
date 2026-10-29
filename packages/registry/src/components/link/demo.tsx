import { Link } from "./index";

export function LinkBasic() {
  return <Link href="/docs">Read the documentation</Link>;
}

export function LinkExternal() {
  return (
    <Link href="https://github.com/agnogad/veil-ui" external>
      View the repository
    </Link>
  );
}

export function LinkMuted() {
  return (
    <Link href="/docs/changelog" tone="muted">
      Changelog
    </Link>
  );
}
