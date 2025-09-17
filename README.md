# fastmove-carpenters

Clean static site for FastMove Carpenters. Built with vanilla HTML/CSS/JS. Ready for GitHub Pages.

## Structure
- `index.html` – main landing page (SEO meta, OG, JSON-LD kept inline)
- `assets/` – static assets
  - `styles.css` – all site styles
  - `app.js` – interactivity, form stubs, dynamic phone/WhatsApp wiring
  - `favicon.svg` – JFC monogram
  - `og-cover.jpg` – placeholder OG cover image
- `seo/`
  - `robots.txt` – allow all, points to sitemap
  - `sitemap.xml` – references main sections
- `.github/workflows/pages.yml` – GitHub Pages deploy workflow

## Local development
1. Open `index.html` directly in a browser, or serve the folder:
   - Python: `python3 -m http.server 8000`
   - Node: `npx serve .`
2. Edit HTML/CSS/JS under `assets/` and refresh.

## Dynamic contact details
Phone and WhatsApp are provided via data attributes on the `<html>` tag:
```html
<html lang="en-ZA" data-phone="+27-82-000-0000" data-whatsapp-e164="27820000000">
```
`assets/app.js` reads these to set `tel:` links and WhatsApp URLs.

## Deploy (GitHub Pages)
This repo is configured for GitHub Pages via Actions.
- On push to `main`, `.github/workflows/pages.yml` builds and deploys.
- First time: in GitHub → Settings → Pages → Source: "GitHub Actions".

## License
Proprietary (all rights reserved) unless stated otherwise.