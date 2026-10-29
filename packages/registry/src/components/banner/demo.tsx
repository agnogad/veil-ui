"use client";

import { AlertTriangle, ArrowUpRight, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "../button/index";
import {
  Banner,
  BannerActions,
  BannerClose,
  BannerContent,
  BannerDescription,
  BannerIcon,
  BannerTitle,
} from "./index";

export function BannerBasic() {
  return (
    <Banner className="w-full">
      <BannerIcon>
        <Sparkles />
      </BannerIcon>
      <BannerContent>
        <BannerTitle>New registry build</BannerTitle>
        <BannerDescription>
          Components are now generated from a single source of truth.
        </BannerDescription>
      </BannerContent>
    </Banner>
  );
}

export function BannerWithAction() {
  return (
    <Banner className="w-full">
      <BannerIcon>
        <Sparkles />
      </BannerIcon>
      <BannerContent>
        <BannerTitle>Your trial ends in 3 days</BannerTitle>
        <BannerDescription>
          Add a payment method to keep deployments running.
        </BannerDescription>
        <BannerActions>
          <Button size="sm">Add payment method</Button>
          <Button size="sm" variant="ghost">
            Compare plans <ArrowUpRight />
          </Button>
        </BannerActions>
      </BannerContent>
    </Banner>
  );
}

export function BannerDismissible() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <Button variant="outline" size="sm" onClick={() => setVisible(true)}>
        Show banner
      </Button>
    );
  }

  return (
    <Banner className="w-full">
      <BannerIcon>
        <Sparkles />
      </BannerIcon>
      <BannerContent>
        <BannerTitle>Invite your teammates</BannerTitle>
        <BannerDescription>
          Collaboration is free for the first five seats.
        </BannerDescription>
      </BannerContent>
      <BannerClose onClick={() => setVisible(false)} />
    </Banner>
  );
}

export function BannerDestructive() {
  return (
    <Banner variant="destructive" role="alert" className="w-full">
      <BannerIcon>
        <AlertTriangle />
      </BannerIcon>
      <BannerContent>
        <BannerTitle>Deployment failed</BannerTitle>
        <BannerDescription>
          The build exited with code 1. Check the logs for details.
        </BannerDescription>
      </BannerContent>
    </Banner>
  );
}
