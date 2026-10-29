import { Check, Rocket, ShieldCheck } from "lucide-react";

import { Timeline } from "./index";

export function TimelineBasic() {
  return (
    <Timeline
      className="max-w-md"
      items={[
        {
          title: "Order placed",
          description: "We received your order and reserved the items.",
          time: "09:12",
          icon: Check,
          status: "success",
        },
        {
          title: "Preparing shipment",
          description: "Your package is being packed.",
          time: "11:40",
          icon: Rocket,
        },
        {
          title: "Out for delivery",
          time: "Tomorrow",
          icon: ShieldCheck,
        },
      ]}
    />
  );
}

export function TimelineSimple() {
  return (
    <Timeline
      className="max-w-sm"
      items={[
        { title: "Draft created", time: "Mon" },
        { title: "Review requested", time: "Tue" },
        { title: "Published", time: "Wed", status: "success" },
      ]}
    />
  );
}
