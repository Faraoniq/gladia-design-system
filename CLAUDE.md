# Gladia Design System — Project Notes

## Project Structure
```
gladia-site/
├── index.html              # Homepage (static HTML/CSS, Suisse Intl + Inter fonts)
├── ds-viewer.html          # DS viewer entry (loads main.jsx)
├── main.jsx                # React entry → renders gladia-design-system.jsx
├── gladia-design-system.jsx # Full DS viewer app (single file, ~2000 lines)
├── builder.html            # Builder tool
├── design-system-viewer.html # Alt viewer
├── vite.config.js          # Vite config (React plugin, input: ds-viewer.html)
├── package.json            # deps: react, react-dom, remotion, vite
├── fonts/                  # Suisse Intl (Regular, Book, Medium, SemiBold) .woff2/.woff
├── Gladia's Logo/          # Logo assets
├── Logos (partners)/       # Partner logo assets
├── src/                    # Additional source files
└── assets/                 # Static assets
```

## App Launcher (`~/Desktop/Gladia DS.app`)
- **Location:** `Contents/MacOS/launch` (bash script)
- **Flow:** kill stale Vite → load nvm → cd project → git pull (10s timeout) → npx vite → detect port → open browser (homepage + ds-viewer) → open Terminal with Claude
- **CRITICAL FIX (2026-02-08):** Must kill stale Vite processes before starting. DO NOT REVERT the pkill/sleep/timeout lines.

## Design Tokens (CSS Variables)
- **Neutral:** #FFFFFF (0) → #000000 (1000), 12 steps
- **Purple:** #EDE9FE (100) → #6D28D9 (700) — brand accent
- **Blue:** #BAE0FF (100) → #005499 (700)
- **Green/Red/Yellow:** status colors
- **Accent:** orange #FF630F, pink #FF5FB0
- **Spacing:** base-8 system (--space-1: 8px → --space-24: 192px)
- **Radius:** --radius-1 (8px) → --radius-full (9999px), buttons use --radius-5 (40px)
- **Typography:** Suisse Intl (primary), Inter (fallback), Geist Mono (code)
- **Font weights:** regular 400, book 450, medium 500, semibold 600

## DS Viewer Pages
1. **Colors** — primitive + semantic color tokens with copy-on-click
2. **Spacing & Radius** — visual spacing scale + border radius tokens
3. **Typography** — font sizes, weights, line heights, letter spacing
4. **Shadows** — sm/md/lg/xl shadow tokens
5. **Animation** — duration, easing, keyframe reference
6. **Buttons** — primary/secondary/ghost × xs/sm/md/lg, states, text-roll hover
7. **Inputs** — form input patterns
8. **Cards** — feature cards, benchmark cards, testimonial cards
9. **Badges & Tags** — badge variants, tag labels, announcement banners
10. **Navigation** — glassmorphism navbar, mega menu spec, TOC items, accordion
11. **Page Patterns** — container, section spacing, hero, CTA, footer grid
12. **Bento Section** — Composition A (50/50), Composition B (stacked 1×3), overlay hero

## Homepage Sections (index.html)
- Navbar (glassmorphism, fixed, CSS grid layout)
- Hero (rotating words animation, gradient text, CTA buttons with text-roll)
- Logo strip (infinite scroll marquee)
- Statement section
- Performance bento (Composition A)
- Scaling bento (Composition A inverted)
- Integration bento (Composition A)
- Compliance (SOC 2, GDPR, HIPAA badges)
- Language support bento (Composition B)
- Benchmarks (4-card grid, accent card)
- Testimonials (3-card grid, G2 rating)
- CTA section
- Footer (4-column links grid)

## Button Text-Roll Animation (Homepage)
```css
.btn-text-wrapper { display: block; position: relative; overflow: hidden; }
.btn-text { display: block; transition: transform 0.3s; }
.btn-text-clone { position: absolute; top: 0; left: 0; width: 100%; transform: translateY(100%); }
.btn:hover .btn-text { transform: translateY(-100%); }
.btn:hover .btn-text-clone { transform: translateY(0); }
```

## Git
- **Remote:** `https://github.com/Faraoniq/gladia-design-system.git` (note: Faraoniq, NOT Faraoniq92)
- **Branch:** main

## npm Scripts
- `npm run dev` — Vite + opens ds-viewer.html
- `npm run homepage` — python3 HTTP server on 8080 + opens homepage
- `npm start` — git pull + both servers
- `npm run push` — git add -A + commit + push
