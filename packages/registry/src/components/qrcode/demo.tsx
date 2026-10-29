import { QRCode } from "./index";

export function QrcodeBasic() {
  return <QRCode value="https://veil-ui.dev" />;
}

export function QrcodeLabeled() {
  return (
    <QRCode
      value="https://veil-ui.dev/docs/components/qrcode"
      label="Documentation link"
      caption="Scan to open the QR code documentation."
      level="H"
      size={128}
    />
  );
}
