// Table of contents — smooth scroll and active section highlighting.
document.querySelectorAll("[data-toc]").forEach((nav) => {
  const links = [...nav.querySelectorAll('a[href^="#"]')];

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href") || "";
      const target = document.getElementById(href.slice(1));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);

      links.forEach((item) => item.removeAttribute("aria-current"));
      link.setAttribute("aria-current", "location");
    });
  });
});
