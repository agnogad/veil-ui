import { ArrowLeft, ArrowRight, Check, Sparkles, Users } from "lucide-react";

import { cn } from "@veil-ui/utils";

import { Badge } from "../badge/index";
import { Button } from "../button/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card/index";
import { Input } from "../input/index";
import { Label } from "../label/index";
import { Logo } from "../logo/index";
import { Progress } from "../progress/index";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select/index";
import { Stepper } from "../stepper/index";

const roles = [
  {
    title: "Product designer",
    description: "Design systems, prototyping and UI craft.",
  },
  {
    title: "Engineer",
    description: "Front-end, full-stack and platform work.",
  },
  {
    title: "Product manager",
    description: "Roadmaps, research and go-to-market.",
  },
  {
    title: "Something else",
    description: "Pick this if none of the above fits.",
  },
];

function OnboardingPage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="onboarding-page"
      className={cn(
        "flex min-h-[560px] flex-col rounded-xl border bg-background",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b px-6 py-4">
        <Logo
          name="Veil UI"
          size="sm"
          mark={
            <span className="grid size-full place-items-center bg-primary text-[10px] font-bold text-primary-foreground">
              V
            </span>
          }
        />
        <Button variant="ghost" size="sm">
          Save & exit
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-8">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Step 2 of 4</span>
          <span>About 2 minutes left</span>
        </div>
        <Progress className="mt-2" value={50} aria-label="Onboarding progress" />
        <Stepper
          className="mt-5"
          current={2}
          steps={[
            { title: "Account" },
            { title: "Workspace" },
            { title: "Team" },
            { title: "Done" },
          ]}
        />

        <Card className="mt-6">
          <CardHeader>
            <Badge variant="secondary" className="w-fit">
              <Sparkles /> Almost there
            </Badge>
            <CardTitle className="mt-2">Tell us about your team</CardTitle>
            <CardDescription>
              We use this to pick sensible defaults for your workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="onboarding-workspace">Workspace name</Label>
              <Input id="onboarding-workspace" defaultValue="Acme Design" />
              <p className="text-xs text-muted-foreground">
                This appears in invites and shared links.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="onboarding-size">Team size</Label>
              <Select defaultValue="2-10">
                <SelectTrigger id="onboarding-size" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solo">Just me</SelectItem>
                  <SelectItem value="2-10">2–10 people</SelectItem>
                  <SelectItem value="11-50">11–50 people</SelectItem>
                  <SelectItem value="51+">51+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">What best describes you?</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {roles.map((role, index) => (
                  <label
                    key={role.title}
                    className={cn(
                      "flex cursor-pointer gap-3 rounded-lg border p-3 transition-colors",
                      index === 0 && "border-foreground bg-muted/30",
                    )}
                  >
                    <input
                      type="radio"
                      name="onboarding-role"
                      defaultChecked={index === 0}
                      className="mt-1 size-4 accent-foreground"
                    />
                    <span>
                      <span className="block text-sm font-medium">{role.title}</span>
                      <span className="block text-xs text-muted-foreground">
                        {role.description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex items-center gap-2 rounded-lg border bg-muted/20 p-3 text-sm">
              <Users className="size-4 text-muted-foreground" aria-hidden />
              Invite teammates now or later from workspace settings.
            </div>
          </CardContent>
          <CardFooter className="justify-between border-t pt-4">
            <Button variant="ghost">
              <ArrowLeft /> Back
            </Button>
            <Button>
              Continue <ArrowRight />
            </Button>
          </CardFooter>
        </Card>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Check className="size-3.5" aria-hidden />
          You can change all of this later in settings
        </p>
      </div>
    </div>
  );
}

export { OnboardingPage };
