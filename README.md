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

1. Put the images in `src/img/projects/<name>/` named `01.jpg`, `02.jpg`… (about 1920px wide) and any videos in `src/video/projects/<name>/` as `clip1.mp4`, `clip2.mp4`…
2. Copy a similar page, e.g. `src/projects/sci-fi-door.njk`, to `src/projects/<name>.njk`. It will appear at `/projects/<name>/`.
3. Edit its settings: title, kicker, engine, class, `folder: <name>`, hero image, intro, specs, and `sections`. In a section, `layout: pair` puts images two-up (add `wide: true` to stretch one across) and leaving it out stacks them full width. Images are written as `{ src: "03", alt: "…" }`, videos as `{ video: clip1, poster: "01" }`. A spec value of `TODO` shows in orange as a reminder.
4. In `src/_data/work.json`, add `"url": "/projects/<name>/"` to that project's card. The grid order also sets the "Next project" banner and the number in the kicker.
5. If the old site had a page for it, point its entry in `src/_data/redirects.json` at the new URL.

(The Hover Bike page writes its sections out in HTML instead, which is fine for one-off layouts.)

## Publishing

Pushing to `main` on GitHub runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. `src/CNAME` keeps the johns3d.art domain.
