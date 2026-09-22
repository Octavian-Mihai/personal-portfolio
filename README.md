# Octavian Mihai — Portfolio

A single-page portfolio site built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

**Live site:** https://octavian-mihai.github.io/personal-portfolio/
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

## Customization

- **Content**: edit the text directly in `index.html` — the Hero tagline/bio are in the `#hero` and `#about` sections; project cards are `<article class="card">` blocks in `#projects`.
- **Colors**: all theming lives in CSS custom properties at the top of `styles.css` (`:root` for light mode, the dark-mode blocks below it). Change `--accent` to restyle the accent color everywhere.
- **Fonts**: Inter (body) and JetBrains Mono (labels/tech tags), loaded from Google Fonts via `<link>` tags in the `<head>`.
