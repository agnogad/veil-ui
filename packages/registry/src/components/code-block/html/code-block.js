// Code Block — copies the snippet and confirms with a check icon.
const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-3.5" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>`;

document.querySelectorAll('[data-slot="code-block"]').forEach((root) => {
  const button = root.querySelector("figcaption button");
  const code = root.querySelector("pre code");
  if (!button || !code) return;

  const original = button.innerHTML;

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(code.textContent ?? "");
      button.setAttribute("aria-label", "Copied");
      button.innerHTML = checkIcon;
      window.setTimeout(() => {
        button.setAttribute("aria-label", "Copy code");
        button.innerHTML = original;
      }, 2000);
    } catch {
      // Clipboard access can be denied; the code stays selectable.
    }
  });
});
