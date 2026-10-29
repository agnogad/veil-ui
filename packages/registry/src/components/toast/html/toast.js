// Toast — dependency-free queueing, variants and auto-dismiss.
(() => {
  const root = document.querySelector("[data-toast-demo]");
  if (!root) return;

  const viewport = root.querySelector("[data-toaster]");
  const template = root.querySelector("#toast-template");
  if (!viewport || !(template instanceof HTMLTemplateElement)) return;

  const variants = {
    default: {
      title: "Changes saved",
      description: "Your profile was updated.",
      classes: ["border-border", "bg-background", "text-foreground"],
    },
    success: {
      title: "Deployment finished",
      description: "Production is live.",
      classes: [
        "border-emerald-500/30",
        "bg-emerald-500/10",
        "text-emerald-900",
        "dark:text-emerald-100",
      ],
    },
    destructive: {
      title: "Upload failed",
      description: "The file exceeded the size limit.",
      classes: ["border-destructive/40", "bg-destructive/10", "text-destructive"],
    },
  };

  const dismiss = (toast) => {
    if (!toast.isConnected || toast.dataset.state === "closed") return;
    toast.dataset.state = "closed";
    window.setTimeout(() => toast.remove(), 180);
  };

  const show = (variantName) => {
    const config = variants[variantName] ?? variants.default;
    const toast = template.content.firstElementChild.cloneNode(true);

    toast.dataset.variant = variantName;
    toast.classList.add(...config.classes);
    toast.querySelector("[data-toast-title]").textContent = config.title;

    const description = toast.querySelector("[data-toast-description]");
    if (config.description) {
      description.textContent = config.description;
    } else {
      description.remove();
    }

    toast
      .querySelector("[data-toast-close]")
      .addEventListener("click", () => dismiss(toast));

    viewport.append(toast);

    let timer = window.setTimeout(() => dismiss(toast), 5000);
    toast.addEventListener("mouseenter", () => window.clearTimeout(timer));
    toast.addEventListener("mouseleave", () => {
      timer = window.setTimeout(() => dismiss(toast), 3000);
    });
  };

  root.querySelectorAll("[data-toast-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      show(trigger.dataset.toastTrigger || "default");
    });
  });
})();
