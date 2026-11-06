/* project.js: image lightbox (videos are handled by site.js) */
(() => {
  const lb = document.querySelector(".lb");
  if (!lb) return;
  const lbImg = lb.querySelector("img");
  document.querySelectorAll("figure img").forEach(img => img.addEventListener("click", () => {
    lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt; lb.classList.add("open");
  }));
  const close = () => lb.classList.remove("open");
  lb.addEventListener("click", close);
  addEventListener("keydown", e => { if (e.key === "Escape") close(); });
})();
