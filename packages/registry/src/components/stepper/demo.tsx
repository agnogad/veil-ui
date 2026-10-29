import { Stepper } from "./index";

const steps = [
  { title: "Account", description: "Email and password" },
  { title: "Workspace", description: "Name and region" },
  { title: "Done", description: "Invite the team" },
];

export function StepperBasic() {
  return <Stepper steps={steps} current={2} className="max-w-xl" />;
}

export function StepperVertical() {
  return <Stepper steps={steps} current={1} orientation="vertical" className="max-w-xs" />;
}
