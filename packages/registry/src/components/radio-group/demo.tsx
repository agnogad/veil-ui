"use client";

import { Label } from "../label/index";
import { RadioGroup, RadioGroupItem } from "./index";

export function RadioGroupBasic() {
  return (
    <RadioGroup defaultValue="monthly" aria-label="Billing period">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="monthly" id="billing-monthly" />
        <Label htmlFor="billing-monthly">Monthly</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="yearly" id="billing-yearly" />
        <Label htmlFor="billing-yearly">Yearly</Label>
      </div>
    </RadioGroup>
  );
}

export function RadioGroupWithDescription() {
  return (
    <RadioGroup defaultValue="standard" aria-label="Plan">
      <div className="flex items-start gap-2">
        <RadioGroupItem value="standard" id="plan-standard" className="mt-1" />
        <div className="grid gap-0.5">
          <Label htmlFor="plan-standard">Standard</Label>
          <p className="text-sm text-muted-foreground">
            For individuals and small teams.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <RadioGroupItem value="enterprise" id="plan-enterprise" className="mt-1" />
        <div className="grid gap-0.5">
          <Label htmlFor="plan-enterprise">Enterprise</Label>
          <p className="text-sm text-muted-foreground">
            SSO, audit logs and dedicated support.
          </p>
        </div>
      </div>
    </RadioGroup>
  );
}
