// Infinite Scroll — appends items when the scroll container nears its end.
document.querySelectorAll('[data-slot="infinite-scroll"]').forEach((root) => {
  const footer = root.querySelector('[aria-live="polite"]');
  if (!(root instanceof HTMLElement)) return;

  const batchSize = 5;
  const maxItems = 40;
  let loaded = root.querySelectorAll(".rounded-md.border").length;
  let busy = false;

  function label(text) {
    if (!footer) return;
    footer.replaceChildren();
    const span = document.createElement("span");
    span.className = text.startsWith("All") ? "" : "sr-only";
    span.textContent = text;
    footer.append(span);
  }

  function append() {
    if (busy) return;
    if (loaded >= maxItems) {
      label("All activity loaded");
      return;
    }

    busy = true;
    label("Loading more…");

    window.setTimeout(() => {
      const next = Math.min(loaded + batchSize, maxItems);
      const fragment = document.createDocumentFragment();
      for (let index = loaded; index < next; index += 1) {
        const item = document.createElement("div");
        item.className = "rounded-md border bg-background p-3 text-sm";
        item.textContent = `Activity item ${index + 1}`;
        fragment.append(item);
      }
      loaded = next;
      footer?.before(fragment);
      busy = false;
      label(loaded >= maxItems ? "All activity loaded" : "Scroll for more content");
    }, 450);
  }

  root.addEventListener("scroll", () => {
    const remaining = root.scrollHeight - root.scrollTop - root.clientHeight;
    if (remaining < 80) append();
  });

  // Eagerly fill the viewport when the list is shorter than the container.
  if (root.scrollHeight <= root.clientHeight) append();
  else label("Scroll for more content");
});
