/* home.js: hero slider + grid filters */
(() => {
  // ----- Filters -----
  const grid = document.getElementById("grid");
  const countEl = document.getElementById("count");
  const buttons = document.querySelectorAll(".filters button");
  buttons.forEach(b => b.addEventListener("click", () => {
    buttons.forEach(x => x.classList.toggle("on", x === b));
    const f = b.dataset.f; let n = 0;
    grid.querySelectorAll(".card").forEach(c => {
      const show = f === "all" || c.dataset.c === f; if (show) n++;
      c.classList.toggle("hide", !show);
      c.classList.toggle("featured", f === "all" && c.hasAttribute("data-featured"));
    });
    countEl.textContent = n + (n === 1 ? " asset" : " assets");
  }));

  // ----- Viewport slider -----
  const vp = document.querySelector(".viewport");
  const slides = [...vp.querySelectorAll(".slide")];
  const dots = vp.querySelector(".dots");
  const titleBox = vp.querySelector(".title-inner");
  const stats = vp.querySelector(".vp-stats");
  const countBox = vp.querySelector(".count");
  const pad = n => String(n).padStart(2, "0");
  const DUR = 8000; let i = 0, timer;
  vp.style.setProperty("--dur", DUR + "ms");
  slides.forEach((_, n) => {
    const d = document.createElement("button");
    d.setAttribute("aria-label", "Slide " + (n + 1));
    d.onclick = () => go(n);
    dots.append(d);
  });

  function fill(s, n) {
    const d = s.dataset;
    titleBox.querySelector("small").textContent = `${d.class} · ${pad(n + 1)}`;
    titleBox.querySelector("h2").textContent = d.title;
    titleBox.querySelector(".view").href = d.href || "#work";
    stats.innerHTML = `
      <div><dt>OBJECT</dt><dd>${d.object}</dd></div>
      <div><dt>ENGINE</dt><dd>${d.engine}</dd></div>
      <div><dt>CLASS</dt><dd>${d.class}</dd></div>
      ${s.hasAttribute("data-latest") ? '<div class="latest"><dt>STATUS</dt><dd>LATEST</dd></div>' : ""}`;
    countBox.innerHTML = `<b>${pad(n + 1)}</b> / ${pad(slides.length)}`;
  }
  function go(n) {
    slides[i].classList.remove("active");
    i = (n + slides.length) % slides.length;
    slides[i].classList.add("active");
    [...dots.children].forEach((d, k) => { d.classList.remove("active"); void d.offsetWidth; d.classList.toggle("active", k === i); });
    titleBox.classList.add("swap"); stats.classList.add("swap");
    setTimeout(() => { fill(slides[i], i); titleBox.classList.remove("swap"); stats.classList.remove("swap"); }, 900);
    restart();
  }
  function restart() { clearTimeout(timer); if (!vp.classList.contains("paused")) timer = setTimeout(() => go(i + 1), DUR); }
  function restartDot() { const d = dots.children[i]; d.classList.remove("active"); void d.offsetWidth; d.classList.add("active"); }

  vp.querySelector(".prev").onclick = () => go(i - 1);
  vp.querySelector(".next").onclick = () => go(i + 1);
  vp.addEventListener("mouseenter", () => { vp.classList.add("paused"); clearTimeout(timer); });
  vp.addEventListener("mouseleave", () => { vp.classList.remove("paused"); restartDot(); restart(); });
  let x0 = null;
  vp.addEventListener("touchstart", e => x0 = e.touches[0].clientX, { passive: true });
  vp.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
    x0 = null;
  });
  document.addEventListener("keydown", e => {
    if (e.target.closest("input, textarea")) return;
    if (e.key === "ArrowRight") go(i + 1);
    if (e.key === "ArrowLeft") go(i - 1);
  });
  dots.children[0].classList.add("active"); restart();

  // ----- Scroll cue -----
  const cue = document.querySelector(".scroll-cue");
  addEventListener("scroll", () => cue.classList.toggle("gone", scrollY > 40), { passive: true });
})();
