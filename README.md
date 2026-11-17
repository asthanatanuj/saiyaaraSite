# Saiyaara

This repository contains the public website for Saiyaara, San Jose State University's collegiate Bollywood fusion dance competition. The site introduces the event, its board and committees, participating teams, and sponsorship opportunities.

## Website tools and technologies

- **HTML5** for the site's pages and content.
- **CSS3** for responsive layouts, colors, typography, and animations.
- **Vanilla JavaScript** for navigation, mobile menus, video preview slots, and the sponsorship packet viewer.
- **Google Fonts** for DM Sans and Manrope.
- **Local media assets** for board photography, logos, videos, and the sponsorship PDF.
- **Instagram and TikTok embeds** on the Get Involved page.
- **Git and GitHub** for version control and collaboration.

The website is static. It has no package manager, build step, backend, or login system.

## Run locally

From the repository root, start a local server:

```bash
python3 -m http.server 8765
```

Then open `http://127.0.0.1:8765/` in a browser. Keep the command running while viewing the site; closing it will stop the local preview.

## Repository layout

- `index.html` — home page
- `about.html`, `comp.html`, `teams.html`, `team.html`, `sponsors.html`, `join.html` — other public pages
- `styles.css` — shared styling
- `script.js` — shared browser interactions
- `images/` — logos, photos, and sponsorship packet page images
- `media/` — videos and downloadable sponsorship packet

## Future Saiyaara app

We plan to develop a companion app for competing teams, inspired by the event experience of [Norman Nachle 26](https://apps.apple.com/us/app/norman-nachle-26/id6759936132). The goal is to give each team an individualized login and one reliable place for competition information, including:

- The overall competition schedule and each team's own itinerary.
- Performance, rehearsal, check-in, and other important times.
- Venue locations, event logistics, and useful contacts.
- Team-specific updates and announcements as plans change.

This app is a future project. Its platform, technical stack, and release date have not been decided, and the current website does not provide team accounts.
