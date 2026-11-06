/* site.js: shared by every page (mobile menu + fade-up reveal). */
(() => {
  // Mobile menu
  const btn = document.querySelector(".menu-btn");
  const menu = document.querySelector(".mobile-menu");
  const setMenu = open => {
    document.body.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", open);
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.setAttribute("aria-hidden", !open);
  };
  btn.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  // Fade-up reveal for anything with .reveal
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // Videos with data-src: only download when near the screen, play while visible
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const vio = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target;
    if (e.isIntersecting) {
      if (!v.src) v.src = v.dataset.src;
      if (!still) v.play().catch(() => {});
    } else v.pause();
  }), { rootMargin: "200px 0px", threshold: .2 });
  document.querySelectorAll("video[data-src]").forEach(v => vio.observe(v));
})();
