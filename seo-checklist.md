# SEO & Accessibility Pre-Launch Checklist

> Reference for the Gladia marketing homepage. Work through each section before deploying to production.

---

## 1. Head / Meta Tags

### Required

```html
<meta name="description" content="Gladia's speech-to-text API delivers 99%+ accuracy, sub-300ms latency, and 100+ languages. Built for voice agents, customer support, and media platforms.">
<link rel="canonical" href="https://gladia.io/">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#000000">
```

### Open Graph (social share previews)

```html
<meta property="og:type" content="website">
<meta property="og:title" content="Gladia | Audio Transcription API">
<meta property="og:description" content="The speech-to-text backbone for voice agents, customer support, and media platforms.">
<meta property="og:url" content="https://gladia.io/">
<meta property="og:image" content="https://gladia.io/og-image.png">
<meta property="og:site_name" content="Gladia">
```

### Twitter Card

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Gladia | Audio Transcription API">
<meta name="twitter:description" content="The speech-to-text backbone for voice agents, customer support, and media platforms.">
<meta name="twitter:image" content="https://gladia.io/og-image.png">
<meta name="twitter:site" content="@glabordigital">
```

### Favicon

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

**Action:** Create `og-image.png` (1200x630), `favicon.ico`, `favicon.svg`, `apple-touch-icon.png` (180x180).

---

## 2. Structured Data (JSON-LD)

### Organization

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Gladia",
  "url": "https://gladia.io",
  "logo": "https://gladia.io/logo.svg",
  "sameAs": [
    "https://twitter.com/glabordigital",
    "https://linkedin.com/company/gladia",
    "https://github.com/gladiaio"
  ]
}
</script>
```

### SoftwareApplication

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Gladia Speech-to-Text API",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Cloud",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free tier available"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "ratingCount": "UPDATE_THIS",
    "reviewCount": "UPDATE_THIS"
  }
}
</script>
```

**Action:** Replace `UPDATE_THIS` with real G2 review counts.

---

## 3. Semantic HTML

### Landmarks to add

```
<body>
  <header>          <!-- wrap navbar + hero -->
    <nav>...</nav>
    <section id="hero">...</section>
  </header>
  <main>            <!-- wrap all content sections -->
    <section id="performance">...</section>
    <section id="scaling">...</section>
    ...
  </main>
  <footer>...</footer>
</body>
```

### Statement section

Change `<p class="statement-title">` to `<h2 class="statement-title">` for proper heading hierarchy.

---

## 4. Links

### Replace all `href="#"` placeholders

Every link must point to a real URL before launch. Key links:

| Element | Expected URL |
|---------|-------------|
| Navbar: Product, Solutions, etc. | `/product`, `/solutions`, etc. or anchor links |
| Hero: Request a demo | `/demo` or Calendly/HubSpot link |
| Hero: Sign up for free | `https://app.gladia.io/signup` |
| Bento CTAs (Documentation, etc.) | `https://docs.gladia.io` |
| Compliance: Learn more | `/security` |
| Footer links | Real page URLs |
| Pricing | `/pricing` |

### External links

Add `target="_blank" rel="noopener noreferrer"` on all external links (G2, Discord, GitHub, etc.).

---

## 5. Images

### Fix paths

Rename `Logos (partners)/` to `logos/` (no spaces, no parentheses). Update all `<img src>` references.

```
logos/clients/klarna.svg
logos/clients/aircall.svg
...
```

### Add accessible names to SVG logos

```html
<!-- Navbar logo -->
<a href="/" class="navbar-logo" aria-label="Gladia homepage">
  <svg role="img" aria-hidden="true">...</svg>
</a>
```

---

## 6. Fonts & Performance

### Preload critical fonts

```html
<link rel="preload" href="fonts/SuisseIntl-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/SuisseIntl-Medium.woff2" as="font" type="font/woff2" crossorigin>
```

### Async Google Fonts

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" as="style" onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"></noscript>
```

---

## 7. Accessibility

### Skip navigation

Add as the first child of `<body>`:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  z-index: 9999;
  padding: 8px 16px;
  background: var(--bg-inverse);
  color: var(--text-inverse);
  border-radius: var(--radius-1);
  font-size: var(--font-size-14);
}
.skip-link:focus {
  top: 16px;
}
```

### Mega menu ARIA

```html
<button data-menu="product" aria-expanded="false" aria-haspopup="true" aria-controls="panel-product">
  Product
</button>
<div id="panel-product" data-panel="product" role="menu" aria-hidden="true">
  ...
</div>
```

Update `aria-expanded` and `aria-hidden` in the mega menu JS when toggling.

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 8. Mobile Navigation

**Critical:** The navbar links are `display: none` on mobile with no alternative.

### Minimum viable mobile nav

Add a hamburger button (visible only on mobile) that toggles a slide-out drawer or dropdown containing all nav links. The mega menu panels can be replaced with simple expandable accordions on mobile.

```html
<!-- Add inside .navbar-inner, visible only <= 768px -->
<button class="navbar-hamburger" aria-label="Open menu" aria-expanded="false">
  <svg>...</svg>
</button>
```

---

## 9. Robots & Sitemap

### robots.txt

Create `robots.txt` in project root:

```
User-agent: *
Allow: /
Sitemap: https://gladia.io/sitemap.xml
```

### sitemap.xml

Create `sitemap.xml` in project root:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://gladia.io/</loc>
    <lastmod>2026-02-06</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

Update `<lastmod>` and add URLs as pages are created.

---

## 10. Encoding & Misc

- **Fix mojibake:** Search for `â€"` and replace with proper em-dash `—` (U+2014)
- **Update copyright:** Change `2025` to `2026` in footer
- **Add `hreflang`** if localized versions are planned:
  ```html
  <link rel="alternate" hreflang="en" href="https://gladia.io/">
  <link rel="alternate" hreflang="fr" href="https://gladia.io/fr/">
  ```

---

## Priority Order

1. **Meta description + canonical** (5 min)
2. **OG + Twitter tags** (10 min)
3. **Favicon set** (15 min — design needed)
4. **`<main>` + `<header>` landmarks** (5 min)
5. **JSON-LD structured data** (15 min)
6. **Replace `href="#"` with real URLs** (30 min — needs URL map)
7. **Mobile hamburger menu** (2-3 hours)
8. **Font preloading** (5 min)
9. **ARIA on mega menu** (30 min)
10. **Reduced motion media query** (5 min)
11. **robots.txt + sitemap.xml** (5 min)
12. **Fix image paths** (15 min)
13. **Fix encoding issues** (5 min)
