# johns3d.art

John Mulcahy's portfolio. Built with [Eleventy](https://www.11ty.dev/): templates in `src/` become plain HTML in `_site/`.

## Run it locally

```
npm install      (first time only)
npm start        then open http://localhost:8080
```

The page reloads by itself when you save a file. `npm run build` builds once without a server.

## Where things live

| To change… | Edit |
|---|---|
| Hero slides (order, titles, engine, class) | `src/_data/hero.json` |
| Work grid (order, tags, filters, thumbnails) | `src/_data/work.json` |
| Email, ArtStation, LinkedIn, CV link | `src/_data/site.json` |
| Header / footer (every page) | `src/_includes/partials/` |
| About page | `src/about.njk` |
| Styles | `src/assets/css/` (`site.css` is shared, the rest are per page) |
| Links to old pages (e.g. `/HoverBike.html`) | `src/_data/redirects.json` |

Images go in `src/img/`, videos in `src/video/`, the CV in `src/files/`.

## Add a project page

1. Copy `src/projects/hover-bike.njk` to `src/projects/<name>.njk`. It will appear at `/projects/<name>/`.
2. Change the front matter at the top: title, kicker, engine, class, hero image, intro, specs, next project. A spec value of `TODO` shows in orange as a reminder.
3. Replace the sections below the `---` with that project's images and videos. Each section is a numbered panel (`data-n="01"`); use `.stack` for full-width images, `.pair` for two side by side, `.videos` for clips.
4. In `src/_data/work.json`, add `"url": "/projects/<name>/"` to that project's card so the grid links to it.
5. If the old site had a page for it, point its entry in `src/_data/redirects.json` at the new URL.

## Publishing

Pushing to `main` on GitHub runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. `src/CNAME` keeps the johns3d.art domain.
