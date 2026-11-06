/* project.js: lightbox for images and videos (lazy video loading is in site.js) */
(() => {
  const lb = document.querySelector(".lb");
  if (!lb) return;
  const lbImg = lb.querySelector("img");
  const lbVid = lb.querySelector("video");

  const open = mode => { lb.dataset.mode = mode; lb.classList.add("open"); };
  document.querySelectorAll("figure .media > img").forEach(img => img.addEventListener("click", () => {
    lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt; open("img");
  }));
  // Videos open uncropped, from the same moment, with controls to scrub
  document.querySelectorAll("figure video").forEach(v => v.addEventListener("click", () => {
    const src = v.currentSrc || v.src || v.dataset.src;
    if (!src) return;
    if (lbVid.getAttribute("src") !== src) lbVid.src = src;
    lbVid.currentTime = v.currentTime || 0;
    lbVid.setAttribute("aria-label", v.getAttribute("aria-label") || "");
    v.pause();
    open("video");
    lbVid.play().catch(() => {});
  }));

  const close = () => {
    if (!lb.classList.contains("open")) return;
    lb.classList.remove("open");
    lbVid.pause();
    // resume whichever inline videos are still on screen
    document.querySelectorAll("figure video").forEach(v => {
      const r = v.getBoundingClientRect();
      if (v.src && r.bottom > 0 && r.top < innerHeight) v.play().catch(() => {});
    });
  };
  // Click the backdrop to close; clicks on the video itself go to its controls
  lb.addEventListener("click", e => { if (e.target !== lbVid) close(); });
  addEventListener("keydown", e => { if (e.key === "Escape") close(); });
})();
