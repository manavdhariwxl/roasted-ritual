# Roasted & Ritual — Coffee Café

A premium interactive café website built with React, Vite, GSAP, Lenis, and SCSS.

## Tech Stack

- **React 18** — component architecture
- **Vite 5** — fast dev server & build
- **GSAP + ScrollTrigger** — cinematic scroll animations
- **Lenis** — buttery smooth scrolling
- **SCSS Modules** — scoped, maintainable styles
- **Lucide React** — minimal icons

## Getting Started

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── assets/
│   └── images/          # All 7 café photos
├── components/
│   ├── Nav.jsx          # Fixed navigation + mobile overlay menu
│   ├── Nav.module.scss
│   ├── Footer.jsx       # Footer with credit
│   └── Footer.module.scss
├── sections/
│   ├── Hero.jsx         # Cinematic hero with parallax
│   ├── Ritual.jsx       # Brand philosophy
│   ├── Roast.jsx        # Full-bleed roasting section
│   ├── Bean.jsx         # Bean origins with stats
│   ├── Brew.jsx         # 4-step brewing sequence
│   ├── Menu.jsx         # Signature drinks
│   ├── Space.jsx        # Café interior
│   ├── Craft.jsx        # Barista & craftsmanship
│   ├── Gallery.jsx      # Asymmetric photo mosaic
│   ├── Visit.jsx        # Info + working reservation modal
│   └── Cta.jsx          # Closing brand moment
├── styles/
│   ├── _variables.scss  # Design tokens
│   └── global.scss      # Base reset & utilities
├── utils/
│   ├── lenis.js         # Smooth scroll setup
│   └── animations.js    # Reusable GSAP helpers
├── App.jsx
└── main.jsx
```

## Image Credits

All photographs via [Unsplash](https://unsplash.com):

- Nathan Dumlao
- Mohamed Shaffaf
- Patrick Langwallner
- Christina Rumpf
- Rizky Subagja
- Tim Mossholder

---

Designed & Developed by **Manav**
