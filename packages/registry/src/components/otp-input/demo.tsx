"use client";

import { useState } from "react";

import { OtpInput } from "./index";

export function OtpInputBasic() {
  const [code, setCode] = useState("");
  const [complete, setComplete] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <OtpInput
        value={code}
        onValueChange={setCode}
        onComplete={() => setComplete(true)}
        label="Verification code"
      />
      <p className="text-sm text-muted-foreground">
        {complete ? "Code complete" : `Entered ${code.replaceAll(" ", "").length} of 6 digits`}
      </p>
    </div>
  );
}

export function OtpInputFourDigits() {
  return <OtpInput length={4} label="PIN" defaultValue="12" />;
}

export function OtpInputDisabled() {
  return <OtpInput disabled defaultValue="482013" label="Locked code" />;
}
