// Eleventy turns the templates in src/ into the finished site in _site/.
// Run `npm start` to preview locally, `npm run build` to build once.
export default function (config) {
  // Files copied as-is
  config.addPassthroughCopy({
    "src/assets": "assets",
    "src/img": "img",
    "src/video": "video",
    "src/files": "files",
    "src/CNAME": "CNAME",
  });

  // "McLaren 570S GT4" -> "McLaren_570S_GT4": the object-name style labels
  config.addFilter("asset", t => String(t).replace(/[^A-Za-z0-9]+/g, "_").replace(/_$/, ""));
  config.addShortcode("year", () => String(new Date().getFullYear()));

  // Project media shorthand: "03" -> /img/projects/<folder>/03.jpg, "clip1" -> /video/projects/<folder>/clip1.mp4
  config.addFilter("pimg", (src, folder) => (String(src).startsWith("/") ? src : `/img/projects/${folder}/${src}.jpg`));
  config.addFilter("pvid", (src, folder) => (String(src).startsWith("/") ? src : `/video/projects/${folder}/${src}.mp4`));
  // The project after this one in the work grid (wraps round), skipping cards without a page
  config.addFilter("nextProject", (work, url) => {
    const list = work.filter(w => w.url);
    const i = list.findIndex(w => w.url === url);
    return list.length > 1 ? list[(i + 1) % list.length] : null;
  });
  // Position of a project in the work grid, for the "· 03" kicker number
  config.addFilter("workIndex", (work, url) => work.findIndex(w => w.url === url) + 1);
  config.addFilter("pageByUrl", (pages, url) => (pages || []).find(p => p.url === url));
  // 1 -> "01"
  config.addFilter("pad", n => String(n).padStart(2, "0"));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
