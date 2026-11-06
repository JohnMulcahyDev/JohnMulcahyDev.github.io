/* breakdown.js: highlight the chapter you're reading in the side list */
(() => {
  const links = new Map([...document.querySelectorAll(".bd-toc a")].map(a => [a.hash.slice(1), a]));
  if (!links.size) return;
  const seen = new Set();
  const io = new IntersectionObserver(es => {
    es.forEach(e => (e.isIntersecting ? seen.add(e.target.id) : seen.delete(e.target.id)));
    // the first chapter (in page order) that's in the reading band wins
    const current = [...links.keys()].find(id => seen.has(id));
    if (current) links.forEach((a, id) => a.classList.toggle("on", id === current));
  }, { rootMargin: "-20% 0px -70% 0px" });
  document.querySelectorAll(".bd-ch").forEach(s => io.observe(s));
})();
