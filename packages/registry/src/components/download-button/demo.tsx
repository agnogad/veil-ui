import { DownloadButton } from "./index";

export function DownloadButtonBasic() {
  return <DownloadButton href="/files/veil-ui.pdf">Download PDF</DownloadButton>;
}

export function DownloadButtonFileName() {
  return (
    <DownloadButton href="/files/export.csv" download="export.csv">
      Export CSV
    </DownloadButton>
  );
}

export function DownloadButtonOutline() {
  return (
    <DownloadButton href="/files/report.pdf" variant="outline">
      Report
    </DownloadButton>
  );
}
