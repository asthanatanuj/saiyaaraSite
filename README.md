# Saiyaara

**Live site:** [saiyaara-site.vercel.app](https://saiyaara-site.vercel.app/index.html)

Saiyaara is San Jose State University's collegiate Bollywood fusion dance competition. This repository powers its public website, where visitors can learn about the event, meet the board and committees, explore the competition, and find sponsorship information.

## Tools and technologies

The site is a static frontend built with:

- **HTML5** for page structure and content.
- **CSS3** for responsive layouts, styling, and animations.
- **Vanilla JavaScript** for navigation, mobile menus, video preview slots, and the sponsorship packet viewer.
- **Google Fonts** for DM Sans and Manrope.
- **Local images, videos, and PDFs** for board photos, logos, event media, and the sponsorship packet.
- **Instagram and TikTok embeds** on the Get Involved page.
- **Git and GitHub** for version control, with **Vercel** serving the live site.

There is no build step or package installation. The current website has no backend or team login system.

## Run the website locally

From the repository root, run:

```bash
python3 -m http.server 8765
```

Open `http://127.0.0.1:8765/` in your browser. Keep the server running while you preview the site.

## Repository structure

| Path | Purpose |
| --- | --- |
| `index.html` | Home page |
| `about.html`, `comp.html`, `teams.html`, `team.html`, `sponsors.html`, `join.html` | Other public pages |
| `styles.css` | Shared styles |
| `script.js` | Shared browser interactions |
| `images/` | Logos, photos, and sponsorship packet page images |
| `media/` | Videos and the downloadable sponsorship packet |

## Future Saiyaara app

We plan to build a companion app for competing team. Each team would have its own login and a central place to find:

- The competition schedule and its team-specific itinerary.
- Performance, rehearsal, and check-in times.
- Venue details, logistics, and useful contacts.
- Announcements and updates when plans change.

The app is planned for a later phase. Its platform, technical stack, and release date have not been decided; team accounts are not part of this website today.
