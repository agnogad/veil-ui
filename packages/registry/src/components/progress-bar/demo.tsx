import { ProgressBar } from "./index";

export function ProgressBarBasic() {
  return <ProgressBar value={60} aria-label="Upload progress" />;
}

export function ProgressBarLabeled() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <div className="grid gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Uploading assets</span>
          <span className="text-muted-foreground">72%</span>
        </div>
        <ProgressBar
          value={72}
          aria-label="Uploading assets"
          className="h-2"
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Importing contacts</span>
          <span className="text-muted-foreground">3 of 5 files</span>
        </div>
        <ProgressBar value={60} aria-label="Importing contacts" />
      </div>
    </div>
  );
}
