"use client";

import { useState } from "react";

import { LoadingButton } from "./index";

export function LoadingButtonBasic() {
  return <LoadingButton>Save changes</LoadingButton>;
}

export function LoadingButtonLoading() {
  return (
    <LoadingButton loading loadingLabel="Saving">
      Save changes
    </LoadingButton>
  );
}

export function LoadingButtonToggle() {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingButton
      loading={loading}
      loadingLabel="Deploying"
      onClick={() => {
        setLoading(true);
        window.setTimeout(() => setLoading(false), 1500);
      }}
    >
      {loading ? "Deploying..." : "Deploy"}
    </LoadingButton>
  );
}
