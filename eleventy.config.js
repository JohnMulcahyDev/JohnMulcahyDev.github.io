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
  // 1 -> "01"
  config.addFilter("pad", n => String(n).padStart(2, "0"));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
