// Snackbar — queues short-lived notifications inside the toast viewport.
const viewport = document.querySelector('[data-slot="toaster"]');
const trigger = document.querySelector('[data-slot="button"]');

let counter = 0;

function dismiss(item) {
  item.classList.add("opacity-0", "translate-y-1");
  window.setTimeout(() => item.remove(), 150);
}

function show() {
  if (!(viewport instanceof HTMLElement)) return;

  counter += 1;
  const item = document.createElement("li");
  item.setAttribute("role", "status");
  item.setAttribute("aria-live", "polite");
  item.className =
    "pointer-events-auto relative flex items-start gap-3 rounded-md border bg-background p-4 pr-10 shadow-lg transition-all duration-150";
  item.innerHTML = `
    <div class="grid gap-1">
      <p class="text-sm font-semibold">Message sent</p>
      <p class="text-sm text-muted-foreground">We'll get back to you shortly.</p>
    </div>
    <button type="button" aria-label="Close notification" class="absolute right-2 top-2 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground">✕</button>
  `;

  const close = item.querySelector("button");
  close?.addEventListener("click", () => dismiss(item));
  viewport.append(item);

  window.setTimeout(() => dismiss(item), 5000);
  item.dataset.index = String(counter);
}

trigger?.addEventListener("click", show);
