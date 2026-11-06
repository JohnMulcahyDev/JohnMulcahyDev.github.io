/* transitions.js: animated page changes (View Transitions API).
   The clicked image (grid tile, hero slide or "Next project" banner) morphs into
   the project page's framed hero, and back again. Loaded in <head> so the
   listeners exist before the first paint. Browsers without support just navigate. */
(() => {
  const NAME = "hero-shot";
  const path = u => new URL(u, location.href).pathname;
  const onScreen = el => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };
  const tag = (el, vt) => {
    if (!el) return;
    el.style.viewTransitionName = NAME;
    vt.finished.finally(() => { el.style.viewTransitionName = ""; });
  };

  // Leaving a page: name the image that should fly to the next page
  addEventListener("pageswap", e => {
    if (!e.viewTransition || !e.activation) return;
    const to = path(e.activation.entry.url);
    const frame = document.querySelector(".p-frame img");
    if (frame) {
      // On a project page: the hero frame flies home, unless "Next project" was clicked
      const next = document.querySelector(`a.next[href="${to}"] img`);
      if (next && onScreen(next)) { frame.style.viewTransitionName = "none"; tag(next, e.viewTransition); }
      return;
    }
    // On the homepage: the active slide or the clicked tile
    let el = document.querySelector(`.slide.active[data-href="${to}"] img`)
          || document.querySelector(`a.card[href="${to}"] .thumb > *`);
    if (!el || !onScreen(el)) return;
    // A playing turntable tile: show its poster (the project's hero still) for the morph
    if (el.tagName === "VIDEO" && el.poster) {
      const still = new Image();
      still.src = el.poster;
      still.style.cssText = `position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${el.style.objectPosition || "50% 50%"}`;
      el.parentNode.append(still);
      el = still;
    }
    tag(el, e.viewTransition);
  });

  // Arriving on a page
  addEventListener("pagereveal", e => {
    if (!e.viewTransition) return;
    document.documentElement.classList.add("vt");          // skip the hero's own fade-in
    e.viewTransition.finished.finally(() => document.documentElement.classList.remove("vt"));
    if (document.querySelector(".p-frame")) return;        // project hero is named in CSS
    // Back on the homepage: fly into the tile of the project we came from
    const from = window.navigation?.activation?.from?.url;
    if (!from) return;
    const el = document.querySelector(`a.card[href="${path(from)}"] .thumb > *`);
    if (el && onScreen(el)) tag(el, e.viewTransition);
  });
})();
