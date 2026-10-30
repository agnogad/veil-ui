// Carousel — dependency-free scrolling, keyboard support and button state.
document.querySelectorAll('[data-slot="carousel"]').forEach((root) => {
  const track = root.querySelector('[data-slot="carousel-content"]');
  if (!track) return;

  const items = [...track.querySelectorAll('[data-slot="carousel-item"]')];
  const previous = root.querySelector('[aria-label="Previous slide"]');
  const next = root.querySelector('[aria-label="Next slide"]');
  let index = 0;

  const step = () => track.clientWidth;

  function update() {
    index = Math.round(track.scrollLeft / Math.max(step(), 1));
    if (previous) previous.disabled = track.scrollLeft <= 2;
    if (next) {
      next.disabled =
        track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    }
  }

  function scrollTo(target) {
    const clamped = Math.min(Math.max(target, 0), Math.max(items.length - 1, 0));
    track.scrollTo({ left: clamped * step(), behavior: "smooth" });
  }

  previous?.addEventListener("click", () => scrollTo(index - 1));
  next?.addEventListener("click", () => scrollTo(index + 1));
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  root.tabIndex = 0;
  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollTo(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollTo(index + 1);
    }
  });

  update();
});
