// Lightbox — full-screen native <dialog> viewer with keyboard navigation.
(function () {
  const dialog = document.querySelector("[data-lightbox]");
  if (!(dialog instanceof HTMLDialogElement)) return;

  const image = dialog.querySelector("[data-lightbox-image]");
  const counter = dialog.querySelector("[data-lightbox-counter]");
  const enter = ["animate-in", "fade-in-0"];
  const exit = ["animate-out", "fade-out-0"];
  let closeTimer;

  const placeholder = (label, from, to) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/><text x="50%" y="50%" fill="white" font-family="sans-serif" font-size="48" text-anchor="middle">${label}</text></svg>`;
    return {
      src: `data:image/svg+xml,${encodeURIComponent(svg)}`,
      alt: `${label} placeholder`,
    };
  };

  const images = [
    placeholder("Sunrise", "#f97316", "#f43f5e"),
    placeholder("Ocean", "#0ea5e9", "#6366f1"),
    placeholder("Forest", "#22c55e", "#0f766e"),
  ];
  let index = 0;

  const render = () => {
    const item = images[index];
    if (!item || !(image instanceof HTMLImageElement)) return;
    image.src = item.src;
    image.alt = item.alt;
    if (counter) counter.textContent = `${index + 1} / ${images.length}`;
  };

  const step = (delta) => {
    index = (index + delta + images.length) % images.length;
    render();
  };

  const open = () => {
    window.clearTimeout(closeTimer);
    dialog.classList.remove(...exit);
    dialog.classList.add(...enter);
    render();
    if (!dialog.open) dialog.showModal();
  };

  const close = () => {
    dialog.classList.remove(...enter);
    void dialog.offsetWidth;
    dialog.classList.add(...exit);
    closeTimer = window.setTimeout(() => {
      dialog.close();
      dialog.classList.remove(...exit);
    }, 150);
  };

  document.querySelector("[data-lightbox-open]")?.addEventListener("click", open);
  dialog.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => {
    step(-1);
  });
  dialog.querySelector("[data-lightbox-next]")?.addEventListener("click", () => {
    step(1);
  });
  dialog.querySelector("[data-lightbox-close]")?.addEventListener("click", close);

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });
})();
