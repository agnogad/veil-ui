// Back to Top Button — dependency-free scroll visibility and smooth return.
(() => {
  const button = document.querySelector("[data-back-to-top]");
  if (!button) return;

  const scroller = document.querySelector("[data-back-to-top-scroll]");
  const threshold = Number(scroller?.dataset.threshold || 400);

  const target = scroller || window;
  const readPosition = () =>
    scroller ? scroller.scrollTop : window.scrollY || document.documentElement.scrollTop;

  const sync = () => {
    button.classList.toggle("hidden", readPosition() <= threshold);
  };

  target.addEventListener("scroll", sync, { passive: true });
  sync();

  button.addEventListener("click", () => {
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
})();
