# Newfound Living

Static website for a locally owned rental business in Newfoundland.

## Pages

- `index.html` — homepage and availability waitlist.
- `rental-application.html` — rental application, with Google Form and email options for proof of income.
- `about.html` — business background and contact details.
- `styles.css` — shared styling.
- `js/navigation.js` — shared mobile navigation.

GitHub Pages serves the root directory. `CNAME` configures www.newfoundliving.ca. There is no build step or Flask server. Serve the root with a local static web server to preview changes.

Both forms submit to the existing Formspree endpoint. Proof-of-income files are supplied separately through the Google Form or the applicant's email client.

## Images

The pages use `Logos/logo.webp` and `Logos/city.webp`. Original PNGs and previous design assets remain available in `Logos/`. Carlow property photos are in `16carlowmain/`.

## Restore the Carlow listing

1. Copy the section inside the outer HTML comment in `snippets/ad-snippet.html` into `index.html`, replacing the availability waitlist as appropriate.
2. Review the listing price, dates and description before publishing.
3. Copy `snippets/gallery-modal.html` before the footer.
4. Add `<script src="js/gallery.js" defer></script>` before `</body>`.
5. Keep `styles.css` and the `16carlowmain/` photo folder. Image paths in the snippet are relative to the homepage.
6. Preview the restored listing and test carousel arrows, thumbnails, the lightbox and slideshow on desktop and mobile.
