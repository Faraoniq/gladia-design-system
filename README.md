# Gladia Design System

Source of truth for the Gladia brand design system, marketing homepage, and design tokens.

## Structure

```
gladia-design-system/
├── index.html                    # Marketing homepage
├── gladia-design-system.jsx      # Interactive design system playground (React)
├── gladia-design-system.skill    # Design system documentation (Claude Code skill)
├── ds-viewer.html                # Vite entry point for design system viewer
├── main.jsx                      # React entry point
├── design-system-viewer.html     # Standalone viewer (no build required)
├── fonts/                        # Local font files
├── package.json                  # Dependencies
└── vite.config.js               # Vite configuration
```

## Source of Truth Workflow

When making changes, keep these files in sync:

| Change Type | Update These Files |
|-------------|-------------------|
| New token / color | `.skill` + `.jsx` + `index.html` |
| New component | `.skill` + `.jsx` |
| Homepage update | `index.html` (extract patterns to `.skill` if reusable) |
| Design system docs | `.skill` (then update `.jsx` playground) |

### File Purposes

- **`gladia-design-system.skill`** — Canonical documentation. Contains all tokens, components specs, and guidelines. Used by Claude Code for context.
- **`gladia-design-system.jsx`** — Interactive playground. Visual reference for all design system elements.
- **`index.html`** — Live implementation. The marketing homepage using the design system.

## Quick Start

### View Design System Playground

```bash
npm install
npm run dev
# Opens http://localhost:3000/ds-viewer.html
```

### View Standalone (No Build)

Open `design-system-viewer.html` directly in browser, or:

```bash
python3 -m http.server 8080
# Open http://localhost:8080/design-system-viewer.html
```

### View Homepage

```bash
python3 -m http.server 8080
# Open http://localhost:8080/index.html
```

## Design Tokens

### Colors
- **Primary**: `--border-card` (#252525), `--border-secondary` (#515151)
- **Brand**: `--color-purple-400` (#947AFC)
- **Backgrounds**: `--bg-primary` (#000), `--bg-secondary` (#0C0C0C), `--bg-tertiary` (#1C1C1E)

### Typography
- **Weights**: Regular (400), Book (450), Medium (500) — max 500, no semibold
- **Sizes**: 12px to 80px scale

### Buttons
| Size | Height | Padding | Font |
|------|--------|---------|------|
| xs | 28px | 4px 12px | 12px |
| sm | 32px | 6px 16px | 14px |
| md | 40px | 8px 20px | 14px |
| lg | 48px | 12px 28px | 16px |

### Cards
- Border: `--border-card` (#252525)
- Hover: `--border-secondary` (#515151)
- Radius: `--radius-3` (24px)

## Bento Compositions

Six grid layouts for feature sections:
- **A**: 50/50 (invertible)
- **B**: Stacked 1x3
- **C**: Stacked 1x4
- **D**: Hero 2/3 + column (invertible)
- **E**: L-shape mosaic
- **F**: Hero + 4-stack (invertible)

See `.skill` file for full specifications.

---

Maintained by Gladia Design Team
