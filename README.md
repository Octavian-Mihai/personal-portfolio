# Octavian Mihai — Portfolio

A single-page portfolio site built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

**Live site:** _add your GitHub Pages / hosting URL here once deployed_

## Features

- Mobile-first, semantic HTML with ARIA labels and full keyboard navigation
- Dark mode that follows system preference, with a manual toggle persisted via `localStorage`
- Respects `prefers-reduced-motion` — animations disable automatically
- WCAG AA color contrast, 16px+ body text, 1.6 line-height, ~70ch max reading width
- Sections: Hero, About, Projects, Skills, Contact

## Tech stack

Vanilla HTML5, CSS3 (custom properties, `color-mix`, Grid/Flexbox), and vanilla JavaScript (no dependencies).

## Project structure

```
.
├── index.html    # Markup and content
├── styles.css    # Theming, layout, animations
└── script.js     # Nav toggle, dark mode, scroll reveals
```

## Running locally

No build step required — any static file server works:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Customization

- **Content**: edit the text directly in `index.html` — the Hero tagline/bio are in the `#hero` and `#about` sections; project cards are `<article class="card">` blocks in `#projects`.
- **Colors**: all theming lives in CSS custom properties at the top of `styles.css` (`:root` for light mode, the dark-mode blocks below it). Change `--accent` to restyle the accent color everywhere.
- **Fonts**: Inter (body) and JetBrains Mono (labels/tech tags), loaded from Google Fonts via `<link>` tags in the `<head>`.

## Deploying

This is a static site, so it can be hosted for free on GitHub Pages:

1. Push to this repo's `main` branch
2. In the repo's **Settings → Pages**, set the source to `main` / root
3. The site will be live at `https://octavian-mihai.github.io/personal-portfolio/`

## License

Personal project — feel free to reference the structure, but the content (name, bio, project descriptions) is specific to Octavian Mihai.
