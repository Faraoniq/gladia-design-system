import { useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   GLADIA DESIGN SYSTEM — Interactive Reference & Playground
   ═══════════════════════════════════════════════════════════════ */

// ─── DATA ────────────────────────────────────────────────────

const COLORS_PRIMITIVE = {
  Neutral: [
    { token: "--color-neutral-0", value: "#FFFFFF" },
    { token: "--color-neutral-50", value: "#FAFAFA" },
    { token: "--color-neutral-100", value: "#F5F5F5" },
    { token: "--color-neutral-200", value: "#E5E5E5" },
    { token: "--color-neutral-300", value: "#D4D4D4" },
    { token: "--color-neutral-400", value: "#A3A3A3" },
    { token: "--color-neutral-500", value: "#727272" },
    { token: "--color-neutral-600", value: "#515151" },
    { token: "--color-neutral-700", value: "#252525" },
    { token: "--color-neutral-800", value: "#1C1C1E" },
    { token: "--color-neutral-900", value: "#0C0C0C" },
    { token: "--color-neutral-1000", value: "#000000" },
  ],
  Purple: [
    { token: "--color-purple-100", value: "#EDE9FE" },
    { token: "--color-purple-200", value: "#BEB4FF" },
    { token: "--color-purple-300", value: "#A87CFF" },
    { token: "--color-purple-400", value: "#947AFC" },
    { token: "--color-purple-500", value: "#925BFF" },
    { token: "--color-purple-600", value: "#7C3AED" },
    { token: "--color-purple-700", value: "#6D28D9" },
  ],
  Blue: [
    { token: "--color-blue-100", value: "#BAE0FF" },
    { token: "--color-blue-200", value: "#7EC8FF" },
    { token: "--color-blue-300", value: "#45B0FF" },
    { token: "--color-blue-400", value: "#1A9EFF" },
    { token: "--color-blue-500", value: "#008CFF" },
    { token: "--color-blue-600", value: "#0070CC" },
    { token: "--color-blue-700", value: "#005499" },
  ],
  Green: [
    { token: "--color-green-100", value: "#DCFCE7" },
    { token: "--color-green-500", value: "#22C55E" },
    { token: "--color-green-600", value: "#16A34A" },
  ],
  Red: [
    { token: "--color-red-100", value: "#FEE2E2" },
    { token: "--color-red-500", value: "#EF4444" },
    { token: "--color-red-600", value: "#DC2626" },
  ],
  Yellow: [
    { token: "--color-yellow-100", value: "#FEF9C3" },
    { token: "--color-yellow-400", value: "#F2CB45" },
    { token: "--color-yellow-500", value: "#EAB308" },
  ],
  Accent: [
    { token: "--color-orange-500", value: "#FF630F" },
    { token: "--color-pink-400", value: "#FF5FB0" },
  ],
};

const COLORS_SEMANTIC = {
  Text: [
    { token: "--text-primary", ref: "--color-neutral-0", value: "#FFFFFF", usage: "Main text on dark" },
    { token: "--text-secondary", ref: "--color-neutral-400", value: "#A3A3A3", usage: "Supporting text" },
    { token: "--text-tertiary", ref: "--color-neutral-500", value: "#727272", usage: "Subtle / labels" },
    { token: "--text-disabled", ref: "--color-neutral-400", value: "#A3A3A3", usage: "Disabled state" },
    { token: "--text-inverse", ref: "--color-neutral-1000", value: "#000000", usage: "Text on light bg" },
    { token: "--text-link", ref: "--color-neutral-300", value: "#D4D4D4", usage: "Links" },
    { token: "--text-brand", ref: "--color-purple-400", value: "#947AFC", usage: "Brand accent text" },
    { token: "--text-success", ref: "--color-green-600", value: "#16A34A", usage: "Success messages" },
    { token: "--text-warning", ref: "--color-yellow-500", value: "#EAB308", usage: "Warning messages" },
    { token: "--text-error", ref: "--color-red-600", value: "#DC2626", usage: "Error messages" },
  ],
  Background: [
    { token: "--bg-primary", ref: "--color-neutral-1000", value: "#000000", usage: "Main background" },
    { token: "--bg-secondary", ref: "--color-neutral-900", value: "#0C0C0C", usage: "Cards / sections" },
    { token: "--bg-tertiary", ref: "--color-neutral-800", value: "#1C1C1E", usage: "Subtle surfaces" },
    { token: "--bg-inverse", ref: "--color-neutral-0", value: "#FFFFFF", usage: "Light surfaces" },
    { token: "--bg-elevated", ref: "--color-neutral-700", value: "#252525", usage: "Elevated layers" },
    { token: "--bg-sunken", ref: "--color-neutral-900", value: "#0C0C0C", usage: "Recessed areas" },
    { token: "--bg-glass", ref: "rgba(12,12,12,0.8)", value: "rgba(12,12,12,0.8)", usage: "Glass overlay" },
    { token: "--bg-glass-light", ref: "rgba(255,255,255,0.08)", value: "rgba(255,255,255,0.08)", usage: "Hover glass" },
    { token: "--bg-brand", ref: "--color-purple-400", value: "#947AFC", usage: "Brand surface" },
  ],
  Border: [
    { token: "--border-primary", ref: "--color-neutral-700", value: "#252525", usage: "Visible borders" },
    { token: "--border-secondary", ref: "--color-neutral-600", value: "#515151", usage: "Emphasis borders" },
    { token: "--border-tertiary", ref: "--color-neutral-800", value: "#1C1C1E", usage: "Subtle borders" },
    { token: "--border-card", ref: "--border-primary", value: "#252525", usage: "Card borders" },
    { token: "--border-transparent", ref: "rgba(255,255,255,0.12)", value: "rgba(255,255,255,0.12)", usage: "Glass borders" },
    { token: "--border-transparent-subtle", ref: "rgba(255,255,255,0.08)", value: "rgba(255,255,255,0.08)", usage: "Faint borders" },
    { token: "--border-focus", ref: "--color-blue-400", value: "#1A9EFF", usage: "Focus ring" },
    { token: "--border-brand", ref: "--color-purple-400", value: "#947AFC", usage: "Brand border" },
    { token: "--border-success", ref: "--color-green-500", value: "#22C55E", usage: "Success border" },
    { token: "--border-warning", ref: "--color-yellow-500", value: "#EAB308", usage: "Warning border" },
    { token: "--border-error", ref: "--color-red-500", value: "#EF4444", usage: "Error border" },
  ],
};

const SPACING = [
  { token: "--space-0", value: "0px", px: 0 },
  { token: "--space-1", value: "8px", px: 8 },
  { token: "--space-2", value: "16px", px: 16 },
  { token: "--space-3", value: "24px", px: 24 },
  { token: "--space-4", value: "32px", px: 32 },
  { token: "--space-5", value: "40px", px: 40 },
  { token: "--space-6", value: "48px", px: 48 },
  { token: "--space-7", value: "56px", px: 56 },
  { token: "--space-8", value: "64px", px: 64 },
  { token: "--space-9", value: "72px", px: 72 },
  { token: "--space-10", value: "80px", px: 80 },
  { token: "--space-12", value: "96px", px: 96 },
  { token: "--space-14", value: "112px", px: 112 },
  { token: "--space-15", value: "120px", px: 120 },
  { token: "--space-16", value: "128px", px: 128 },
  { token: "--space-20", value: "160px", px: 160 },
  { token: "--space-24", value: "192px", px: 192 },
];

const RADII = [
  { token: "--radius-0", value: "0px", px: 0 },
  { token: "--radius-1", value: "8px", px: 8 },
  { token: "--radius-2", value: "16px", px: 16 },
  { token: "--radius-3", value: "24px", px: 24 },
  { token: "--radius-4", value: "32px", px: 32 },
  { token: "--radius-5", value: "40px", px: 40 },
  { token: "--radius-6", value: "48px", px: 48 },
  { token: "--radius-full", value: "9999px", px: 9999 },
];

const SHADOWS = [
  { token: "--shadow-none", value: "none" },
  { token: "--shadow-sm", value: "0 1px 2px 0 rgba(0,0,0,0.05)" },
  { token: "--shadow-md", value: "0 4px 8px -2px rgba(0,0,0,0.1)" },
  { token: "--shadow-lg", value: "0 8px 16px -4px rgba(0,0,0,0.1)" },
  { token: "--shadow-xl", value: "0 16px 32px -8px rgba(0,0,0,0.15)" },
];

const TYPOGRAPHY_SIZES = [
  { token: "--font-size-10", value: "10px" },
  { token: "--font-size-12", value: "12px" },
  { token: "--font-size-14", value: "14px" },
  { token: "--font-size-16", value: "16px" },
  { token: "--font-size-18", value: "18px" },
  { token: "--font-size-20", value: "20px" },
  { token: "--font-size-24", value: "24px" },
  { token: "--font-size-32", value: "32px" },
  { token: "--font-size-40", value: "40px" },
  { token: "--font-size-48", value: "48px" },
  { token: "--font-size-56", value: "56px" },
  { token: "--font-size-64", value: "64px" },
  { token: "--font-size-80", value: "80px" },
];

const TYPOGRAPHY_WEIGHTS = [
  { token: "--font-weight-regular", value: "400", label: "Regular" },
  { token: "--font-weight-book", value: "450", label: "Book" },
  { token: "--font-weight-medium", value: "500", label: "Medium" },
  { token: "--font-weight-semibold", value: "600", label: "Semibold" },
];

const TYPOGRAPHY_PRESETS = [
  { name: "display-lg", size: "80px", weight: 400, lh: 1.2, ls: "-0.04em" },
  { name: "display-md", size: "64px", weight: 400, lh: 1.2, ls: "-0.04em" },
  { name: "display-sm", size: "48px", weight: 500, lh: 1.2, ls: "-0.02em" },
  { name: "heading-lg", size: "40px", weight: 500, lh: 1.3, ls: "-0.02em" },
  { name: "heading-md", size: "32px", weight: 500, lh: 1.3, ls: "-0.02em" },
  { name: "heading-sm", size: "24px", weight: 500, lh: 1.3, ls: "0" },
  { name: "heading-xs", size: "20px", weight: 500, lh: 1.4, ls: "0" },
  { name: "body-lg", size: "20px", weight: 400, lh: 1.5, ls: "0" },
  { name: "body-md", size: "16px", weight: 400, lh: 1.4, ls: "0" },
  { name: "body-sm", size: "14px", weight: 400, lh: 1.4, ls: "0" },
  { name: "body-xs", size: "12px", weight: 400, lh: 1.4, ls: "0" },
  { name: "overline", size: "12px", weight: 500, lh: 1.4, ls: "0.16em", mono: true, upper: true },
];

const ANIMATIONS = [
  { token: "--duration-0", value: "0ms" },
  { token: "--duration-1", value: "80ms" },
  { token: "--duration-2", value: "160ms" },
  { token: "--duration-3", value: "240ms" },
  { token: "--duration-4", value: "320ms" },
  { token: "--duration-5", value: "480ms" },
];

const EASINGS = [
  { token: "--easing-linear", value: "linear" },
  { token: "--easing-in", value: "cubic-bezier(0.4, 0, 1, 1)" },
  { token: "--easing-out", value: "cubic-bezier(0, 0, 0.2, 1)" },
  { token: "--easing-in-out", value: "cubic-bezier(0.4, 0, 0.2, 1)" },
  { token: "--easing-spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
];

const PAGES = [
  { id: "colors", label: "Colors", icon: "\u25C6" },
  { id: "spacing", label: "Spacing & Radius", icon: "\u25A6" },
  { id: "typography", label: "Typography", icon: "Aa" },
  { id: "shadows", label: "Shadows", icon: "\u25D0" },
  { id: "animation", label: "Animation", icon: "\u25CE" },
  { id: "buttons", label: "Buttons", icon: "\u25B6" },
  { id: "inputs", label: "Inputs", icon: "\u25AD" },
  { id: "cards", label: "Cards", icon: "\u25A2" },
  { id: "badges", label: "Badges & Tags", icon: "\u25CF" },
  { id: "nav", label: "Navigation", icon: "\u2630" },
  { id: "patterns", label: "Page Patterns", icon: "\u229E" },
  { id: "bento", label: "Bento Section", icon: "\u2593" },
];

// ─── GLOBAL KEYFRAMES (consolidated) ─────────────────────────

const GLOBAL_STYLES = `
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
  @keyframes slideRight { from { transform: translateX(0); } to { transform: translateX(280%); } }
`;

// ─── STYLES ──────────────────────────────────────────────────

const S = {
  root: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    background: "#000", color: "#fff", minHeight: "100vh",
    display: "flex", WebkitFontSmoothing: "antialiased",
  },
  sidebar: {
    width: 260, minHeight: "100vh", background: "#0C0C0C",
    borderRight: "1px solid #1C1C1E", padding: "24px 0",
    position: "sticky", top: 0, height: "100vh", overflowY: "auto",
    flexShrink: 0, display: "flex", flexDirection: "column",
  },
  logo: {
    padding: "0 24px 24px", fontSize: 18, fontWeight: 500,
    letterSpacing: "-0.02em", borderBottom: "1px solid #1C1C1E",
    marginBottom: 8, display: "flex", alignItems: "center", gap: 10,
  },
  logoDot: {
    width: 10, height: 10, borderRadius: 9999, background: "#947AFC",
  },
  navGroup: { padding: "12px 12px 4px" },
  navGroupLabel: {
    fontSize: 11, fontWeight: 500, fontFamily: "'Geist Mono', 'JetBrains Mono', monospace",
    textTransform: "uppercase", letterSpacing: "0.12em", color: "#515151",
    padding: "0 12px 8px",
  },
  navItem: (active) => ({
    display: "flex", alignItems: "center", gap: 10,
    padding: "8px 12px", borderRadius: 8, fontSize: 14,
    color: active ? "#fff" : "#A3A3A3", cursor: "pointer",
    background: active ? "#1C1C1E" : "transparent",
    border: active ? "1px solid #252525" : "1px solid transparent",
    transition: "all 160ms cubic-bezier(0,0,0.2,1)",
    fontWeight: active ? 500 : 400, width: "100%",
  }),
  navIcon: {
    width: 24, height: 24, display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: 12, color: "#947AFC",
    fontFamily: "'Geist Mono', monospace",
  },
  main: {
    flex: 1, minWidth: 0, padding: "32px 40px 80px",
    maxWidth: 1000, overflowY: "auto",
  },
  pageTitle: {
    fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em",
    lineHeight: 1.2, marginBottom: 8,
  },
  pageDesc: { fontSize: 16, color: "#A3A3A3", marginBottom: 40, lineHeight: 1.5 },
  sectionLabel: {
    fontSize: 12, fontWeight: 500, fontFamily: "'Geist Mono', monospace",
    textTransform: "uppercase", letterSpacing: "0.16em", color: "#947AFC",
    marginBottom: 20, display: "flex", alignItems: "center", gap: 12,
  },
  sectionDot: {
    width: 16, height: 8, borderRadius: 9999, background: "#947AFC",
  },
  tokenCard: {
    background: "#0C0C0C", border: "1px solid #252525", borderRadius: 16,
    padding: 16, cursor: "pointer", transition: "all 160ms cubic-bezier(0,0,0.2,1)",
    position: "relative",
  },
  tokenName: {
    fontSize: 12, fontFamily: "'Geist Mono', monospace", color: "#A3A3A3",
    marginBottom: 4, wordBreak: "break-all",
  },
  tokenValue: {
    fontSize: 12, fontFamily: "'Geist Mono', monospace", color: "#515151",
  },
  searchBar: {
    width: "100%", height: 40, background: "#1C1C1E",
    border: "1px solid transparent", borderRadius: 16,
    padding: "0 14px", color: "#fff", fontSize: 14,
    fontFamily: "'Inter', sans-serif", outline: "none",
    marginBottom: 24, transition: "border-color 160ms",
  },
  table: { width: "100%", borderCollapse: "collapse", marginBottom: 40 },
  th: {
    textAlign: "left", padding: "8px 16px", borderBottom: "1px solid #1C1C1E",
    color: "#515151", fontWeight: 500, fontSize: 12, textTransform: "uppercase",
    letterSpacing: "0.08em", fontFamily: "'Geist Mono', monospace",
  },
  td: {
    padding: "10px 16px", borderBottom: "1px solid #1C1C1E",
    color: "#A3A3A3", fontSize: 14,
  },
  code: {
    fontFamily: "'Geist Mono', monospace", fontSize: 12,
    padding: "2px 8px", background: "#1C1C1E", borderRadius: 4,
    color: "#BEB4FF",
  },
};

// ─── HELPERS ─────────────────────────────────────────────────

function CopyToken({ token, children }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    try {
      navigator.clipboard.writeText("var(" + token + ")");
    } catch (_) {
      /* clipboard not available in sandbox */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }, [token]);
  return (
    <div onClick={copy} title={"Copy: var(" + token + ")"} style={{ cursor: "pointer", position: "relative" }}>
      {children}
      {copied && (
        <div style={{
          position: "absolute", top: -6, right: -6, background: "#947AFC",
          color: "#fff", fontSize: 10, fontWeight: 500, padding: "2px 6px",
          borderRadius: 9999, zIndex: 10,
        }}>
          Copied
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={S.sectionLabel}>
      <span style={S.sectionDot} />
      {children}
    </div>
  );
}

function SpecTable({ headers, rows }) {
  return (
    <table style={S.table}>
      <thead>
        <tr>{headers.map((h, i) => <th key={i} style={S.th}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} style={{ transition: "background 160ms" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#0C0C0C"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            {r.map((c, j) => (
              <td key={j} style={S.td}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function btnStyle(variant, size) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    border: "none", borderRadius: 40, fontFamily: "'Inter', sans-serif",
    cursor: "pointer", transition: "all 160ms cubic-bezier(0,0,0.2,1)",
    whiteSpace: "nowrap",
  };
  const sizes = {
    xs: { height: 28, padding: "4px 12px", fontSize: 12, fontWeight: 450 },
    sm: { height: 32, padding: "6px 16px", fontSize: 14, fontWeight: 450 },
    md: { height: 40, padding: "8px 20px", fontSize: 14, fontWeight: 450 },
    lg: { height: 48, padding: "12px 28px", fontSize: 16, fontWeight: 500 },
  };
  const variants = {
    primary: { background: "#fff", color: "#000" },
    secondary: { background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" },
    ghost: { background: "transparent", color: "#fff" },
  };
  return { ...base, ...sizes[size], ...variants[variant] };
}

function badgeStyle(variant, size) {
  const base = { display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 9999, fontWeight: 500 };
  const sizes = {
    sm: { padding: "4px 8px", fontSize: 12 },
    md: { padding: "8px 16px", fontSize: 14 },
  };
  const variants = {
    default: { background: "#1C1C1E", color: "#A3A3A3" },
    brand: { background: "#6D28D9", color: "#BEB4FF" },
    success: { background: "rgba(22,163,74,0.2)", color: "#22C55E" },
    warning: { background: "rgba(234,179,8,0.2)", color: "#F2CB45" },
    error: { background: "rgba(220,38,38,0.2)", color: "#EF4444" },
  };
  return { ...base, ...sizes[size], ...variants[variant] };
}

// ─── PAGES ───────────────────────────────────────────────────

function ColorsPage({ search }) {
  const q = search.toLowerCase();
  return (
    <>
      <h1 style={S.pageTitle}>Colors</h1>
      <p style={S.pageDesc}>Primitive and semantic color tokens. Click any swatch to copy the CSS variable reference.</p>

      <SectionLabel>Primitive Scales</SectionLabel>
      {Object.entries(COLORS_PRIMITIVE).map(([group, colors]) => {
        const filtered = colors.filter(c => !q || c.token.includes(q) || c.value.toLowerCase().includes(q));
        if (!filtered.length) return null;
        return (
          <div key={group} style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#A3A3A3", marginBottom: 12 }}>{group}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {filtered.map(c => (
                <CopyToken key={c.token} token={c.token}>
                  <div style={{
                    ...S.tokenCard, width: 100, padding: 0, overflow: "hidden",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#515151"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#252525"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <div style={{
                      height: 56, background: c.value,
                      borderBottom: "1px solid #1C1C1E",
                    }} />
                    <div style={{ padding: "8px 10px" }}>
                      <div style={{ ...S.tokenName, fontSize: 11 }}>{c.token.replace("--color-", "")}</div>
                      <div style={S.tokenValue}>{c.value}</div>
                    </div>
                  </div>
                </CopyToken>
              ))}
            </div>
          </div>
        );
      })}

      <SectionLabel>Semantic Tokens</SectionLabel>
      {Object.entries(COLORS_SEMANTIC).map(([group, tokens]) => {
        const filtered = tokens.filter(t => !q || t.token.includes(q) || (t.usage && t.usage.toLowerCase().includes(q)));
        if (!filtered.length) return null;
        return (
          <div key={group} style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#A3A3A3", marginBottom: 12 }}>{group}</div>
            <SpecTable
              headers={["Token", "Resolves To", "Value", "Usage"]}
              rows={filtered.map(t => [
                <CopyToken key={t.token} token={t.token}><span style={S.code}>{t.token}</span></CopyToken>,
                <span key="ref" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: "#727272" }}>{t.ref}</span>,
                <span key="val" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <span style={{
                    width: 14, height: 14, borderRadius: 4, background: t.value,
                    border: "1px solid rgba(255,255,255,0.12)", flexShrink: 0,
                  }} />
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12 }}>{t.value}</span>
                </span>,
                <span key="usage" style={{ fontSize: 13, color: "#515151" }}>{t.usage}</span>,
              ])}
            />
          </div>
        );
      })}
    </>
  );
}

function SpacingPage({ search }) {
  const q = search.toLowerCase();
  const filteredSpacing = SPACING.filter(s => !q || s.token.includes(q) || s.value.includes(q));
  const filteredRadii = RADII.filter(r => !q || r.token.includes(q) || r.value.includes(q));
  return (
    <>
      <h1 style={S.pageTitle}>Spacing & Radius</h1>
      <p style={S.pageDesc}>Base-8 spacing scale and border radius tokens. All spacing values are multiples of 8px.</p>

      <SectionLabel>Spacing Scale</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 48 }}>
        {filteredSpacing.map(s => (
          <CopyToken key={s.token} token={s.token}>
            <div style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "8px 16px", background: "#0C0C0C", border: "1px solid #1C1C1E",
              borderRadius: 12, transition: "all 160ms",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#515151"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#252525"; }}>
              <span style={{ ...S.code, minWidth: 120 }}>{s.token}</span>
              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: "#515151", minWidth: 50 }}>{s.value}</span>
              <div style={{
                height: 12, width: Math.min(s.px, 280), background: "#947AFC",
                borderRadius: 4, opacity: 0.6, transition: "width 300ms",
              }} />
            </div>
          </CopyToken>
        ))}
      </div>

      <SectionLabel>Border Radius</SectionLabel>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
        {filteredRadii.map(r => (
          <CopyToken key={r.token} token={r.token}>
            <div style={{
              ...S.tokenCard, width: 120, display: "flex", flexDirection: "column",
              alignItems: "center", gap: 10, padding: 16,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#515151"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#252525"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{
                width: 56, height: 56, border: "2px solid #947AFC",
                borderRadius: Math.min(r.px, 28), background: "rgba(148,122,252,0.08)",
              }} />
              <div style={S.tokenName}>{r.token.replace("--", "")}</div>
              <div style={S.tokenValue}>{r.value}</div>
            </div>
          </CopyToken>
        ))}
      </div>

      <SectionLabel>Radius Usage</SectionLabel>
      <SpecTable
        headers={["Element", "Token", "Value"]}
        rows={[
          ["Buttons", <span key="r5" style={S.code}>--radius-5</span>, "40px"],
          ["Cards", <span key="r3" style={S.code}>--radius-3</span>, "24px"],
          ["Inputs", <span key="r2" style={S.code}>--radius-2</span>, "16px"],
          ["Badges / Pills", <span key="rf" style={S.code}>--radius-full</span>, "9999px"],
        ]}
      />
    </>
  );
}

function TypographyPage({ search }) {
  const q = search.toLowerCase();
  return (
    <>
      <h1 style={S.pageTitle}>Typography</h1>
      <p style={S.pageDesc}>Font families, sizes, weights, line heights, letter spacing, and preset styles.</p>

      <SectionLabel>Font Families</SectionLabel>
      <div style={{ display: "flex", gap: 16, marginBottom: 48 }}>
        <CopyToken token="--font-sans">
          <div style={{ ...S.tokenCard, flex: 1, padding: 24 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#515151"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#252525"; }}>
            <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>Suisse Intl / Inter</div>
            <div style={S.tokenName}>--font-sans</div>
            <div style={S.tokenValue}>{"'Suisse Intl', 'Inter', -apple-system, sans-serif"}</div>
          </div>
        </CopyToken>
        <CopyToken token="--font-mono">
          <div style={{ ...S.tokenCard, flex: 1, padding: 24 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#515151"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#252525"; }}>
            <div style={{ fontSize: 24, fontWeight: 500, marginBottom: 8, fontFamily: "'Geist Mono', 'JetBrains Mono', monospace" }}>Geist Mono</div>
            <div style={S.tokenName}>--font-mono</div>
            <div style={S.tokenValue}>{"'Geist Mono', 'JetBrains Mono', monospace"}</div>
          </div>
        </CopyToken>
      </div>

      <SectionLabel>Font Sizes</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 48 }}>
        {TYPOGRAPHY_SIZES.filter(s => !q || s.token.includes(q)).map(s => (
          <CopyToken key={s.token} token={s.token}>
            <div style={{
              display: "flex", alignItems: "baseline", gap: 16, padding: "6px 16px",
              background: "#0C0C0C", border: "1px solid #252525", borderRadius: 12,
              transition: "all 160ms",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#515151"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#252525"; }}>
              <span style={{ ...S.code, minWidth: 140 }}>{s.token}</span>
              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: "#515151", minWidth: 40 }}>{s.value}</span>
              <span style={{ fontSize: s.value, fontWeight: 500, lineHeight: 1.2, color: "#fff", whiteSpace: "nowrap" }}>
                {parseInt(s.value) <= 24 ? "The quick brown fox" : "Gladia"}
              </span>
            </div>
          </CopyToken>
        ))}
      </div>

      <SectionLabel>Font Weights</SectionLabel>
      <div style={{ display: "flex", gap: 16, marginBottom: 48, flexWrap: "wrap" }}>
        {TYPOGRAPHY_WEIGHTS.map(w => (
          <CopyToken key={w.token} token={w.token}>
            <div style={{ ...S.tokenCard, padding: 20, minWidth: 160 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#515151"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#252525"; }}>
              <div style={{ fontSize: 28, fontWeight: parseInt(w.value), marginBottom: 8 }}>{w.label}</div>
              <div style={S.tokenName}>{w.token}</div>
              <div style={S.tokenValue}>{w.value}</div>
            </div>
          </CopyToken>
        ))}
      </div>

      <SectionLabel>Typography Presets</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 48 }}>
        {TYPOGRAPHY_PRESETS.filter(p => !q || p.name.includes(q)).map(p => (
          <div key={p.name} style={{
            ...S.tokenCard, padding: "16px 20px",
            display: "flex", alignItems: "baseline", gap: 20,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#515151"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#252525"; }}>
            <span style={{
              ...S.code, minWidth: 120, background: "#1C1C1E",
              padding: "4px 10px", borderRadius: 6,
            }}>{p.name}</span>
            <span style={{
              fontSize: Math.min(parseInt(p.size), 48),
              fontWeight: p.weight,
              lineHeight: p.lh,
              letterSpacing: p.ls,
              fontFamily: p.mono ? "'Geist Mono', monospace" : "inherit",
              textTransform: p.upper ? "uppercase" : "none",
              color: "#fff", whiteSpace: "nowrap",
            }}>
              {p.upper ? "SECTION LABEL" : (parseInt(p.size) > 32 ? "Gladia" : "The quick brown fox jumps")}
            </span>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#515151", marginLeft: "auto", whiteSpace: "nowrap" }}>
              {p.size} / {p.weight} / {p.lh} / {p.ls}
            </span>
          </div>
        ))}
      </div>

      <SectionLabel>Line Heights & Letter Spacing</SectionLabel>
      <div style={{ display: "flex", gap: 24, marginBottom: 48 }}>
        <div style={{ flex: 1 }}>
          <SpecTable
            headers={["Token", "Value"]}
            rows={[
              [<span key="lhn" style={S.code}>--line-height-none</span>, "1"],
              [<span key="lht" style={S.code}>--line-height-tight</span>, "1.2"],
              [<span key="lhs" style={S.code}>--line-height-snug</span>, "1.3"],
              [<span key="lhno" style={S.code}>--line-height-normal</span>, "1.4"],
              [<span key="lhr" style={S.code}>--line-height-relaxed</span>, "1.5"],
              [<span key="lhl" style={S.code}>--line-height-loose</span>, "1.6"],
            ]}
          />
        </div>
        <div style={{ flex: 1 }}>
          <SpecTable
            headers={["Token", "Value"]}
            rows={[
              [<span key="lstr" style={S.code}>--letter-spacing-tighter</span>, "-0.04em"],
              [<span key="lst" style={S.code}>--letter-spacing-tight</span>, "-0.02em"],
              [<span key="lsn" style={S.code}>--letter-spacing-normal</span>, "0"],
              [<span key="lsw" style={S.code}>--letter-spacing-wide</span>, "0.02em"],
              [<span key="lswr" style={S.code}>--letter-spacing-wider</span>, "0.08em"],
              [<span key="lswt" style={S.code}>--letter-spacing-widest</span>, "0.16em"],
            ]}
          />
        </div>
      </div>
    </>
  );
}

function ShadowsPage() {
  return (
    <>
      <h1 style={S.pageTitle}>Shadows</h1>
      <p style={S.pageDesc}>Elevation shadow tokens for layered surfaces.</p>
      <SectionLabel>Shadow Scale</SectionLabel>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 48 }}>
        {SHADOWS.map(s => (
          <CopyToken key={s.token} token={s.token}>
            <div style={{
              ...S.tokenCard, width: 180, padding: 24,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#515151"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#252525"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{
                width: 80, height: 56, background: "#252525", borderRadius: 16,
                boxShadow: s.value,
              }} />
              <div style={{ ...S.code, textAlign: "center" }}>{s.token.replace("--", "")}</div>
              <div style={{ ...S.tokenValue, textAlign: "center", fontSize: 11 }}>{s.value}</div>
            </div>
          </CopyToken>
        ))}
      </div>
    </>
  );
}

function AnimationPage() {
  const [play, setPlay] = useState(null);
  return (
    <>
      <h1 style={S.pageTitle}>Animation</h1>
      <p style={S.pageDesc}>Duration, easing, and keyframe animation tokens.</p>

      <SectionLabel>Duration</SectionLabel>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
        {ANIMATIONS.map(a => (
          <CopyToken key={a.token} token={a.token}>
            <div style={{ ...S.tokenCard, width: 140, padding: 16, textAlign: "center" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#515151"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#252525"; }}>
              <div style={{ fontSize: 20, fontWeight: 500, color: "#947AFC", marginBottom: 4 }}>{a.value}</div>
              <div style={S.tokenName}>{a.token}</div>
            </div>
          </CopyToken>
        ))}
      </div>

      <SectionLabel>Easing Curves</SectionLabel>
      <SpecTable
        headers={["Token", "Value", "Preview"]}
        rows={EASINGS.map(e => [
          <CopyToken key={e.token} token={e.token}><span style={S.code}>{e.token}</span></CopyToken>,
          <span key="v" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: "#727272" }}>{e.value}</span>,
          <div key="p" style={{ width: 120, height: 8, background: "#1C1C1E", borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              width: "30%", height: "100%", background: "#947AFC", borderRadius: 4,
              animation: "slideRight 2s " + e.value + " infinite alternate",
            }} />
          </div>,
        ])}
      />

      <SectionLabel>Keyframe Library</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 48 }}>
        {["fadeInUp", "fadeInDown", "slideInRight", "slideInLeft", "scaleIn", "float"].map(name => (
          <div key={name} style={{
            ...S.tokenCard, padding: 20, textAlign: "center",
            cursor: "pointer",
          }}
          onClick={() => { setPlay(name); setTimeout(() => setPlay(null), 1200); }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#515151"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#252525"; }}>
            <div style={{
              width: 40, height: 40, background: "#947AFC", borderRadius: 10,
              margin: "0 auto 12px",
              animation: play === name ? name + " 0.8s cubic-bezier(0,0,0.2,1) forwards" : "none",
            }} />
            <div style={S.code}>{name}</div>
            <div style={{ fontSize: 11, color: "#515151", marginTop: 4 }}>Click to preview</div>
          </div>
        ))}
      </div>

      <SectionLabel>Usage Reference</SectionLabel>
      <SpecTable
        headers={["Context", "Animation", "Duration"]}
        rows={[
          ["Hero content", <span key="a1" style={S.code}>fadeInUp</span>, "0.8s + 0.2s delay"],
          ["Navbar", <span key="a2" style={S.code}>fadeInDown</span>, "0.6s"],
          ["Side content", <span key="a3" style={S.code}>slideInRight</span>, "0.8s + 0.4s delay"],
          ["Floating elements", <span key="a4" style={S.code}>float</span>, "6s infinite"],
          ["Card hover", "transform: translateY(-4px)", "160ms"],
          ["Button hover", "transform: scale(1.02)", "160ms"],
        ]}
      />
    </>
  );
}

function ButtonsPage() {
  return (
    <>
      <h1 style={S.pageTitle}>Buttons</h1>
      <p style={S.pageDesc}>All button sizes, variants, and states. Radius: 40px (--radius-5). Hover: scale(1.02).</p>

      <SectionLabel>{"Variants \u00D7 Sizes"}</SectionLabel>
      <SpecTable
        headers={["", "btn-xs (28px)", "btn-sm (32px)", "btn-md (40px)", "btn-lg (48px)"]}
        rows={[
          [
            <span key="l" style={{ fontWeight: 500 }}>btn-primary</span>,
            <button key="xs" style={btnStyle("primary", "xs")}>Label</button>,
            <button key="s" style={btnStyle("primary", "sm")}>Label</button>,
            <button key="m" style={btnStyle("primary", "md")}>Label</button>,
            <button key="lg" style={btnStyle("primary", "lg")}>Request a demo</button>,
          ],
          [
            <span key="l" style={{ fontWeight: 500 }}>btn-secondary</span>,
            <button key="xs" style={btnStyle("secondary", "xs")}>Label</button>,
            <button key="s" style={btnStyle("secondary", "sm")}>Label</button>,
            <button key="m" style={btnStyle("secondary", "md")}>Label</button>,
            <button key="lg" style={btnStyle("secondary", "lg")}>Sign up for free</button>,
          ],
          [
            <span key="l" style={{ fontWeight: 500 }}>btn-ghost</span>,
            <button key="xs" style={btnStyle("ghost", "xs")}>Label</button>,
            <button key="s" style={btnStyle("ghost", "sm")}>Label</button>,
            <button key="m" style={btnStyle("ghost", "md")}>Label</button>,
            <button key="lg" style={btnStyle("ghost", "lg")}>Learn more</button>,
          ],
        ]}
      />

      <SectionLabel>States</SectionLabel>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
        {[
          { label: "Default", extra: {} },
          { label: "Hover (scale 1.02)", extra: { transform: "scale(1.02)" } },
          { label: "Active", extra: { transform: "scale(0.98)" } },
          { label: "Disabled", extra: { opacity: 0.6, cursor: "not-allowed", pointerEvents: "none" } },
        ].map(s => (
          <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <button style={{ ...btnStyle("primary", "md"), ...s.extra }}>{s.label}</button>
            <span style={{ fontSize: 11, fontFamily: "'Geist Mono', monospace", color: "#515151" }}>{s.label}</span>
          </div>
        ))}
      </div>

      <SectionLabel>Token Reference</SectionLabel>
      <SpecTable
        headers={["Property", "Token / Value"]}
        rows={[
          ["Border radius", <span key="v" style={S.code}>--radius-5 (40px)</span>],
          ["Font weight (xs/sm/md)", <span key="v" style={S.code}>--font-weight-book (450)</span>],
          ["Font weight (lg)", <span key="v" style={S.code}>--font-weight-medium (500)</span>],
          ["Size xs", "height: 28px, padding: 4px 12px, font-size: 12px"],
          ["Size sm", "height: 32px, padding: 6px 16px, font-size: 14px"],
          ["Size md", "height: 40px, padding: 8px 20px, font-size: 14px"],
          ["Size lg", "height: 48px, padding: 12px 28px, font-size: 16px"],
          ["Hover transform", "scale(1.02)"],
          ["Transition", <span key="v" style={S.code}>var(--duration-2) var(--easing-out)</span>],
          ["Primary bg", <span key="v" style={S.code}>--bg-inverse (#FFFFFF)</span>],
          ["Primary text", <span key="v" style={S.code}>--text-inverse (#000000)</span>],
          ["Secondary border", <span key="v" style={S.code}>--border-transparent (rgba(255,255,255,0.12))</span>],
          ["Ghost hover bg", <span key="v" style={S.code}>--bg-glass-light (rgba(255,255,255,0.08))</span>],
        ]}
      />
    </>
  );
}

function InputsPage() {
  return (
    <>
      <h1 style={S.pageTitle}>Inputs</h1>
      <p style={S.pageDesc}>Text inputs and selects with all sizes and states. Radius: 16px (--radius-2).</p>

      <SectionLabel>Sizes</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48, maxWidth: 500 }}>
        {[
          { size: "sm", h: 40, p: "12px 14px", fs: 14 },
          { size: "md", h: 48, p: "12px 14px", fs: 16 },
          { size: "lg", h: 56, p: "14px 24px", fs: 16 },
        ].map(s => (
          <div key={s.size} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ ...S.code, minWidth: 80 }}>input-{s.size}</span>
            <input
              type="text"
              placeholder={"Placeholder text (" + s.h + "px)"}
              style={{
                flex: 1, height: s.h, padding: s.p, fontSize: s.fs,
                background: "#1C1C1E", border: "1px solid transparent",
                borderRadius: 16, color: "#fff", outline: "none",
                fontFamily: "'Inter', sans-serif",
              }}
            />
          </div>
        ))}
      </div>

      <SectionLabel>States</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 48, maxWidth: 600 }}>
        {[
          { label: "Default", border: "transparent", bg: "#1C1C1E" },
          { label: "Focus", border: "#727272", bg: "#1C1C1E" },
          { label: "Error", border: "#EF4444", bg: "#1C1C1E" },
          { label: "Disabled", border: "transparent", bg: "#0C0C0C", opacity: 0.6 },
        ].map(s => (
          <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12, fontFamily: "'Geist Mono', monospace", color: "#515151" }}>{s.label}</span>
            <input
              type="text"
              placeholder="Input text"
              disabled={s.label === "Disabled"}
              style={{
                height: 48, padding: "12px 14px", fontSize: 16,
                background: s.bg, border: "1px solid " + s.border,
                borderRadius: 16, color: "#fff", outline: "none",
                fontFamily: "'Inter', sans-serif", opacity: s.opacity || 1,
                cursor: s.label === "Disabled" ? "not-allowed" : "text",
              }}
            />
          </div>
        ))}
      </div>

      <SectionLabel>Token Reference</SectionLabel>
      <SpecTable
        headers={["Property", "Token"]}
        rows={[
          ["Border radius", <span key="v" style={S.code}>--radius-2 (16px)</span>],
          ["Default bg", <span key="v" style={S.code}>--bg-tertiary (#1C1C1E)</span>],
          ["Focus border", <span key="v" style={S.code}>--color-neutral-500</span>],
          ["Error border", <span key="v" style={S.code}>--border-error / --color-red-500</span>],
          ["Disabled opacity", "0.6"],
          ["Placeholder color", <span key="v" style={S.code}>--text-tertiary (#727272)</span>],
        ]}
      />
    </>
  );
}

function CardsPage() {
  return (
    <>
      <h1 style={S.pageTitle}>Cards</h1>
      <p style={S.pageDesc}>Card variants and feature card pattern. Radius: 24px (--radius-3). Hover: translateY(-4px).</p>

      <SectionLabel>Card Variants</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 48 }}>
        {[
          { name: "default", bg: "#0C0C0C", border: "#252525", label: "bg-secondary / border-card (border-primary)" },
          { name: "elevated", bg: "#1C1C1E", border: "#252525", label: "bg-tertiary / border-primary" },
          { name: "dark", bg: "#000", border: "#252525", label: "bg-primary / border-card" },
          { name: "accent", bg: "#6D28D9", border: "#7C3AED", label: "purple-700 / purple-600" },
        ].map(c => (
          <div key={c.name} style={{
            background: c.bg, border: "1px solid " + c.border, borderRadius: 24,
            padding: 24, transition: "all 160ms", cursor: "pointer",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
            <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>card-{c.name}</div>
            <div style={{ fontSize: 13, fontFamily: "'Geist Mono', monospace", color: c.name === "accent" ? "#BEB4FF" : "#515151" }}>{c.label}</div>
          </div>
        ))}
      </div>

      <SectionLabel>Card Padding</SectionLabel>
      <div style={{ display: "flex", gap: 16, marginBottom: 48 }}>
        {[
          { name: "sm", px: 16, token: "--space-2" },
          { name: "md", px: 24, token: "--space-3" },
          { name: "lg", px: 32, token: "--space-4" },
        ].map(p => (
          <div key={p.name} style={{
            background: "#0C0C0C", border: "1px solid #252525", borderRadius: 24,
            padding: p.px, flex: 1,
          }}>
            <div style={{ background: "rgba(148,122,252,0.12)", borderRadius: 12, padding: 16, border: "1px dashed rgba(148,122,252,0.3)" }}>
              <span style={S.code}>card-padding-{p.name}</span>
              <div style={{ fontSize: 12, color: "#515151", marginTop: 4 }}>{p.token} ({p.px}px)</div>
            </div>
          </div>
        ))}
      </div>

      <SectionLabel>Feature Card</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 48 }}>
        {[
          { icon: "\u26A1", title: "Feature Title" },
          { icon: "\uD83C\uDFAF", title: "Feature Title" },
        ].map((card, i) => (
          <div key={i} style={{
            background: "#0C0C0C", border: "1px solid #252525", borderRadius: 24,
            padding: 32, transition: "all 160ms",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "#515151"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#252525"; }}>
            <div style={{
              width: 48, height: 48, background: "#1C1C1E", borderRadius: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#947AFC", fontSize: 20, marginBottom: 24,
            }}>{card.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>{card.title}</div>
            <div style={{ fontSize: 14, color: "#A3A3A3", lineHeight: 1.5 }}>Feature description text that explains the benefit clearly.</div>
          </div>
        ))}
      </div>

      <SectionLabel>Stat Card</SectionLabel>
      <div style={{ display: "flex", gap: 16, marginBottom: 48 }}>
        <div style={{
          background: "#0C0C0C", border: "1px solid #252525", borderRadius: 24,
          padding: 32, textAlign: "center", flex: 1, transition: "all 160ms",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
          <div style={{ fontSize: 32, fontWeight: 500, marginBottom: 8 }}>39%</div>
          <div style={{ fontSize: 14, color: "#727272" }}>More accurate</div>
        </div>
        <div style={{
          background: "#6D28D9", border: "1px solid #7C3AED", borderRadius: 24,
          padding: 32, textAlign: "center", flex: 1, transition: "all 160ms",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
          <div style={{ fontSize: 32, fontWeight: 500, marginBottom: 8 }}>300K+</div>
          <div style={{ fontSize: 14, color: "#BEB4FF" }}>Developers worldwide</div>
        </div>
      </div>
    </>
  );
}

function BadgesPage() {
  return (
    <>
      <h1 style={S.pageTitle}>Badges & Tags</h1>
      <p style={S.pageDesc}>Badge variants, tag labels, section markers, and pills. Radius: 9999px (--radius-full).</p>

      <SectionLabel>{"Badge Variants \u00D7 Sizes"}</SectionLabel>
      <SpecTable
        headers={["Variant", "badge-sm", "badge-md"]}
        rows={[
          ["default", <span key="s" style={badgeStyle("default", "sm")}>Label</span>, <span key="m" style={badgeStyle("default", "md")}>Label</span>],
          ["brand", <span key="s" style={badgeStyle("brand", "sm")}>Label</span>, <span key="m" style={badgeStyle("brand", "md")}>Label</span>],
          ["success", <span key="s" style={badgeStyle("success", "sm")}>Active</span>, <span key="m" style={badgeStyle("success", "md")}>Active</span>],
          ["warning", <span key="s" style={badgeStyle("warning", "sm")}>Pending</span>, <span key="m" style={badgeStyle("warning", "md")}>Pending</span>],
          ["error", <span key="s" style={badgeStyle("error", "sm")}>Failed</span>, <span key="m" style={badgeStyle("error", "md")}>Failed</span>],
        ]}
      />

      <SectionLabel>Tag Label (Section Marker)</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "#0C0C0C", border: "1px solid #252525", borderRadius: 16 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 16 }}>
            <span style={{ width: 16, height: 8, borderRadius: 9999, background: "#947AFC" }} />
            <span style={{
              fontSize: 12, fontWeight: 500, fontFamily: "'Geist Mono', monospace",
              textTransform: "uppercase", letterSpacing: "0.16em", color: "#947AFC",
            }}>SECTION TITLE</span>
          </div>
          <span style={{ ...S.code, marginLeft: "auto" }}>tag-label</span>
        </div>
        <div style={{ fontSize: 13, color: "#515151", fontFamily: "'Geist Mono', monospace", padding: "0 20px" }}>
          {"tag-indicator: 16\u00D78px, radius-full, purple-400 \u00B7 tag-text: 12px, semibold, mono, uppercase, widest"}
        </div>
      </div>

      <SectionLabel>Section Pill</SectionLabel>
      <div style={{ display: "flex", gap: 12, marginBottom: 48 }}>
        {["PERFORMANCE", "SCALING", "INTEGRATION"].map(label => (
          <div key={label} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", background: "#1C1C1E",
            border: "1px solid #1C1C1E", borderRadius: 9999,
            fontSize: 12, fontWeight: 500, fontFamily: "'Geist Mono', monospace",
            textTransform: "uppercase", letterSpacing: "0.16em", color: "#A3A3A3",
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 9999, background: "#947AFC" }} />
            {label}
          </div>
        ))}
      </div>

      <SectionLabel>Announcement Banner</SectionLabel>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "6px 16px 6px 8px", background: "#0C0C0C",
        border: "1px solid #1C1C1E", borderRadius: 9999,
        fontSize: 14, color: "#A3A3A3", cursor: "pointer",
        marginBottom: 48,
      }}>
        <span style={{
          background: "#6D28D9", color: "#BEB4FF",
          padding: "2px 8px", borderRadius: 9999,
          fontSize: 12, fontWeight: 500,
        }}>NEW</span>
        <span>Announcement text here</span>
        <span style={{ marginLeft: 4 }}>{"\u2192"}</span>
      </div>

      <SectionLabel>SDK Pill</SectionLabel>
      <div style={{ display: "flex", gap: 8, marginBottom: 48 }}>
        {["Python", "JavaScript", "Twilio", "Vonage"].map(label => (
          <span key={label} style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "4px 12px", background: "#1C1C1E",
            border: "1px solid #1C1C1E", borderRadius: 9999,
            fontSize: 12, color: "#A3A3A3", fontWeight: 500,
          }}>{label}</span>
        ))}
      </div>
    </>
  );
}

function AccordionDemo() {
  const [open, setOpen] = useState(null);
  const items = [
    { q: "What languages do you support?", a: "We support 100+ languages with leading accuracy in EN, FR, ES, and IT." },
    { q: "How fast is the transcription?", a: "Sub-300ms latency for real-time streaming. Async processing is also available." },
    { q: "Do you offer a free tier?", a: "Yes, start for free with generous usage limits. Scale as you grow." },
  ];
  return (
    <div style={{ maxWidth: 600, marginBottom: 48 }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: "1px solid #1C1C1E" }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{
            width: "100%", display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: 24, padding: "24px 0",
            background: "transparent", border: "none", cursor: "pointer",
            color: open === i ? "#947AFC" : "#fff", fontSize: 18,
            fontWeight: 400, fontFamily: "'Inter', sans-serif",
            textAlign: "left", transition: "color 160ms",
          }}>
            <span>{item.q}</span>
            <span style={{
              color: "#727272", transition: "transform 160ms",
              transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
            }}>{"\u25BC"}</span>
          </button>
          <div style={{
            maxHeight: open === i ? 200 : 0, overflow: "hidden",
            transition: "max-height 240ms cubic-bezier(0,0,0.2,1)",
          }}>
            <p style={{ paddingBottom: 24, fontSize: 16, lineHeight: 1.5, color: "#A3A3A3" }}>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function NavPage() {
  return (
    <>
      <h1 style={S.pageTitle}>Navigation</h1>
      <p style={S.pageDesc}>Glassmorphism navbar, TOC items, accordion pattern, and section headers.</p>

      <SectionLabel>Navbar (Glassmorphism)</SectionLabel>
      <div style={{ position: "relative", height: 100, marginBottom: 48, background: "linear-gradient(135deg, #0C0C0C, #1C1C1E)", borderRadius: 24, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: "90%", height: 56, background: "rgba(12,12,12,0.8)",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24,
          backdropFilter: "blur(20px)", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0 24px",
        }}>
          <span style={{ fontWeight: 500, fontSize: 16 }}>gladia</span>
          <div style={{ display: "flex", gap: 24, fontSize: 14, color: "#A3A3A3" }}>
            <span>Product</span><span>Solutions</span><span>Pricing</span><span>Developers</span>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={btnStyle("ghost", "sm")}>Request a demo</button>
            <button style={btnStyle("primary", "sm")}>Sign up</button>
          </div>
        </div>
      </div>

      <SectionLabel>TOC Item</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 500, marginBottom: 48 }}>
        {["What is speech-to-text?", "How does it work?", "Key benefits"].map((label, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 24, padding: 24,
            background: "#1C1C1E", border: "1px solid #1C1C1E", borderRadius: 16,
            cursor: "pointer", transition: "all 160ms",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateX(8px)"; e.currentTarget.style.borderColor = "#947AFC"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderColor = "#252525"; }}>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 14, color: "#947AFC" }}>0{i + 1}</span>
            <span style={{ flex: 1, fontSize: 14 }}>{label}</span>
            <span style={{ color: "#515151", transition: "all 160ms" }}>{"\u2192"}</span>
          </div>
        ))}
      </div>

      <SectionLabel>Numbered Section Header</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 24, fontFamily: "'Geist Mono', monospace", fontWeight: 500, color: "#947AFC" }}>01</span>
          <span style={{
            fontSize: 12, fontWeight: 500, fontFamily: "'Geist Mono', monospace",
            textTransform: "uppercase", letterSpacing: "0.16em", color: "#727272",
          }}>DEFINITION</span>
        </div>
        <span style={S.code}>section-header + section-number + section-label</span>
      </div>

      <SectionLabel>Accordion</SectionLabel>
      <AccordionDemo />

      <SectionLabel>Navbar Token Reference</SectionLabel>
      <SpecTable
        headers={["Property", "Token"]}
        rows={[
          ["Position", "fixed, top: 24px"],
          ["Height", <span key="v" style={S.code}>--space-9 (72px)</span>],
          ["Background", <span key="v" style={S.code}>--bg-glass rgba(12,12,12,0.8)</span>],
          ["Border", <span key="v" style={S.code}>--border-transparent-subtle</span>],
          ["Radius", <span key="v" style={S.code}>--radius-3 (24px)</span>],
          ["Backdrop filter", "blur(20px)"],
          ["Z-index", "100"],
          ["Animation", <span key="v" style={S.code}>fadeInDown 0.6s</span>],
        ]}
      />
    </>
  );
}

function PatternsPage() {
  return (
    <>
      <h1 style={S.pageTitle}>Page Patterns</h1>
      <p style={S.pageDesc}>Layout primitives, section structure, interaction patterns, and grid system.</p>

      <SectionLabel>Container</SectionLabel>
      <SpecTable
        headers={["Property", "Value"]}
        rows={[
          ["Max width", <span key="v" style={S.code}>--container-max-width (1200px)</span>],
          ["Padding X", <span key="v" style={S.code}>--space-3 (24px)</span>],
          ["Margin", "0 auto"],
        ]}
      />

      <SectionLabel>Section Spacing</SectionLabel>
      <SpecTable
        headers={["Property", "Value"]}
        rows={[
          ["Section padding", <span key="v" style={S.code}>--space-15 (120px) vertical</span>],
          ["Content gap", <span key="v" style={S.code}>--space-6 to --space-8</span>],
          ["Border between sections", <span key="v">1px solid <span style={S.code}>--border-tertiary</span></span>],
          ["Section dark variant", <span key="v" style={S.code}>--bg-secondary</span>],
        ]}
      />

      <SectionLabel>Grid System</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
        {[
          { cols: 2, label: "2-column", code: "1fr 1fr" },
          { cols: 3, label: "3-column", code: "repeat(3, 1fr)" },
          { cols: 4, label: "4-column", code: "repeat(4, 1fr)" },
        ].map(g => (
          <div key={g.cols}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#A3A3A3" }}>{g.label}</span>
              <span style={S.code}>{g.code}</span>
              <span style={{ fontSize: 12, color: "#515151", fontFamily: "'Geist Mono', monospace" }}>gap: --space-3 (24px)</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(" + g.cols + ", 1fr)", gap: 24 }}>
              {Array.from({ length: g.cols }).map((_, i) => (
                <div key={i} style={{
                  height: 48, background: "rgba(148,122,252,0.08)",
                  border: "1px dashed rgba(148,122,252,0.25)", borderRadius: 12,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontFamily: "'Geist Mono', monospace", color: "#515151",
                }}>{i + 1}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <SectionLabel>Responsive Breakpoints</SectionLabel>
      <SpecTable
        headers={["Breakpoint", "Width", "Changes"]}
        rows={[
          ["Desktop", "> 1024px", "Default layout"],
          ["Tablet", <span key="v" style={S.code}>{"\u2264"} 1024px</span>, "4-col \u2192 2-col, section padding \u2192 space-12"],
          ["Mobile", <span key="v" style={S.code}>{"\u2264"} 768px</span>, "All \u2192 1-col, hero title \u2192 32px, padding \u2192 space-10"],
        ]}
      />

      <SectionLabel>Interaction Patterns</SectionLabel>
      <SpecTable
        headers={["Element", "Hover Effect", "Token"]}
        rows={[
          ["Cards", "translateY(-4px)", <span key="v" style={S.code}>--duration-2 --easing-out</span>],
          ["Buttons", "scale(1.02)", <span key="v" style={S.code}>--duration-2 --easing-out</span>],
          ["Links w/ arrow", "arrow translateX(4px)", "color \u2192 purple-400"],
          ["TOC items", "translateX(8px)", "border \u2192 purple-400"],
          ["Checklist items", "translateX(8px)", "border \u2192 rgba(255,255,255,0.1)"],
        ]}
      />

      <SectionLabel>Hero Section Structure</SectionLabel>
      <div style={{
        background: "#0C0C0C", border: "1px solid #252525", borderRadius: 24,
        padding: 32, marginBottom: 48, position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
        minHeight: 280,
      }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "#1C1C1E", border: "1px solid #252525", borderRadius: 9999, fontSize: 12, fontWeight: 500, fontFamily: "'Geist Mono', monospace", textTransform: "uppercase", letterSpacing: "0.16em", color: "#A3A3A3", marginBottom: 16 }}>
          <span style={{ width: 8, height: 8, borderRadius: 9999, background: "#947AFC" }} />
          TAG LABEL
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 8 }}>Hero Title Here</h2>
        <p style={{ fontSize: 16, color: "#A3A3A3", marginBottom: 24, maxWidth: 400 }}>Supporting subtitle text with secondary color.</p>
        <div style={{ display: "flex", gap: 12 }}>
          <button style={btnStyle("primary", "lg")}>Primary CTA</button>
          <button style={btnStyle("secondary", "lg")}>Secondary CTA</button>
        </div>
        <div style={{
          position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
          fontSize: 11, fontFamily: "'Geist Mono', monospace", color: "#515151",
        }}>{"min-height: 100vh \u00B7 padding: space-20 / space-15 \u00B7 max-width: 800px"}</div>
      </div>

      <SectionLabel>Checklist Item</SectionLabel>
      <div style={{ maxWidth: 500, display: "flex", flexDirection: "column", gap: 8, marginBottom: 48 }}>
        {["Leading STT accuracy", "Sub-300ms latency", "100+ languages"].map(label => (
          <div key={label} style={{
            display: "flex", alignItems: "center", gap: 16,
            padding: "16px 24px", background: "#0C0C0C",
            border: "1px solid transparent", borderRadius: 16,
            transition: "all 160ms", cursor: "pointer",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateX(8px)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderColor = "transparent"; }}>
            <span style={{ color: "#22C55E", fontWeight: 500 }}>{"\u2714"}</span>
            <span style={{ fontSize: 14, color: "#A3A3A3" }}>{label}</span>
          </div>
        ))}
      </div>

      <SectionLabel>Step Card</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 48 }}>
        {[1, 2, 3].map(n => (
          <div key={n} style={{
            background: "#0C0C0C", border: "1px solid #252525",
            borderRadius: 24, padding: 32,
          }}>
            <div style={{
              width: 32, height: 32, background: "#6D28D9", borderRadius: 9999,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 500, color: "#BEB4FF", marginBottom: 24,
            }}>{n}</div>
            <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 16 }}>Step title</div>
            <div style={{ fontSize: 14, color: "#A3A3A3", lineHeight: 1.5 }}>Step description text here.</div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── BENTO PAGE ──────────────────────────────────────────────

const COMPOSITIONS = [
  { id: "A", name: "50/50", grid: "1fr 1fr", cells: "4 (2\u00D72)", inv: true, use: "Balanced sections, equal weight" },
  { id: "B", name: "Stacked 1\u00D73", grid: "1fr / 1fr auto", cells: "3", inv: false, use: "Visual-dominant hero, fewer features" },
  { id: "C", name: "Stacked 1\u00D74", grid: "1fr / 1fr auto", cells: "4", inv: false, use: "Equal-weight features, wide screens" },
  { id: "D", name: "Hero 2/3 + col", grid: "2fr 1fr", cells: "3", inv: true, use: "Strong visual, compact sidebar" },
  { id: "E", name: "L-shape", grid: "3-col mosaic", cells: "4 (individual)", inv: false, use: "Editorial, asymmetric tension" },
  { id: "F", name: "Hero + 4-stack", grid: "1fr 1fr", cells: "4 (vertical)", inv: true, use: "Many features, tall hero" },
];

const BENTO_CARD_SHELL = [
  { prop: "Background", token: "--bg-primary", value: "#000000" },
  { prop: "Border", token: "--border-transparent-subtle", value: "rgba(255,255,255,0.08)" },
  { prop: "Border-radius", token: "--radius-3", value: "24px" },
  { prop: "Hover border", token: "--border-transparent", value: "rgba(255,255,255,0.12)" },
  { prop: "Transition", token: "--duration-2 --easing-out", value: "border-color only" },
];

const BENTO_HERO_SPECS = [
  { prop: "Padding", token: "--space-5 top/bottom, --space-4 L/R", value: "40px / 32px" },
  { prop: "Title", token: "--font-size-40 / semibold", value: "line-height-tight, letter-spacing-tight" },
  { prop: "Title (tablet)", token: "--font-size-32", value: "\u2264 1024px" },
  { prop: "Subtitle", token: "--font-size-16 / --text-secondary", value: "line-height-relaxed" },
];

const BENTO_CTA_SPECS = [
  { prop: "Height", value: "48px" },
  { prop: "Padding", value: "0 --space-3 (24px)" },
  { prop: "Background", value: "--bg-inverse (#FFFFFF)" },
  { prop: "Text", value: "--text-inverse / --font-size-14 / medium" },
  { prop: "Radius", value: "--radius-5 (40px)" },
  { prop: "Position", value: "absolute, bottom: --space-4, left: --space-4" },
  { prop: "Hover", value: "scale(1.02) + box-shadow" },
];

const BENTO_CELL_SPECS = [
  { prop: "Padding", token: "--space-4", value: "32px" },
  { prop: "Icon", token: "--radius-full", value: "48\u00D748, bg: --bg-tertiary, stroke: --text-primary" },
  { prop: "Icon SVG", value: "20\u00D720, stroke-width: 2, round caps/joins" },
  { prop: "Title", token: "--font-size-20 / semibold", value: "line-height-snug (tablet \u2192 18px)" },
  { prop: "Description", token: "--font-size-16 / --text-secondary", value: "tablet \u2192 14px" },
];

const BENTO_ANIMATION = [
  { element: "Root", keyframe: "fadeInUp", duration: "0.8s", delay: "0s" },
  { element: "Hero", keyframe: "fadeInUp", duration: "0.8s", delay: "0.1s" },
  { element: "Features card", keyframe: "fadeInUp", duration: "0.8s", delay: "0.25s" },
  { element: "Cell 1", keyframe: "fadeInUp", duration: "0.6s", delay: "0.3s" },
  { element: "Cell 2", keyframe: "fadeInUp", duration: "0.6s", delay: "0.4s" },
  { element: "Cell 3", keyframe: "fadeInUp", duration: "0.6s", delay: "0.5s" },
  { element: "Cell 4", keyframe: "fadeInUp", duration: "0.6s", delay: "0.6s" },
];

const BENTO_CLASSES = [
  { cls: ".bento-{a|b|c|d|e|f}", desc: "Composition root" },
  { cls: ".b__card", desc: "Card shell" },
  { cls: ".b__hero", desc: "Stacked hero" },
  { cls: ".b__hero-overlay", desc: "Overlay hero (text on visual)" },
  { cls: ".b__hero-content", desc: "Hero text zone" },
  { cls: ".b__hero-title", desc: "Hero heading" },
  { cls: ".b__hero-subtitle", desc: "Hero body text" },
  { cls: ".b__hero-visual", desc: "Hero visual slot" },
  { cls: ".b__cta", desc: "Call-to-action button" },
  { cls: ".b__features", desc: "Features card (unified)" },
  { cls: ".b__cell", desc: "Feature cell" },
  { cls: ".b__cell-card", desc: "Individual cell card (comp. E only)" },
  { cls: ".b__cell-icon", desc: "Circular icon container" },
  { cls: ".b__cell-title", desc: "Cell heading" },
  { cls: ".b__cell-desc", desc: "Cell body text" },
  { cls: ".b--animated", desc: "Entry animation modifier" },
  { cls: ".bento-{x}--inv", desc: "Inversion modifier (A, D, F only)" },
];

/* Reusable mini-cell for composition previews */
function MiniCell({ label, style: extraStyle }) {
  return (
    <div style={{
      background: "#1C1C1E", borderRadius: 8, padding: "10px 12px",
      display: "flex", flexDirection: "column", gap: 6,
      border: "1px solid rgba(255,255,255,0.06)", ...extraStyle,
    }}>
      <div style={{ width: 20, height: 20, borderRadius: 9999, background: "#252525", border: "1px solid #333" }} />
      <div style={{ fontSize: 10, fontFamily: "'Geist Mono', monospace", color: "#727272" }}>{label || "Cell"}</div>
    </div>
  );
}

function MiniHero({ label, color, style: extraStyle }) {
  const bg = color || "#008CFF";
  return (
    <div style={{
      background: "#0C0C0C", borderRadius: 8, overflow: "hidden",
      display: "flex", flexDirection: "column", border: "1px solid rgba(255,255,255,0.06)",
      ...extraStyle,
    }}>
      <div style={{ padding: "8px 10px" }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: "#fff", marginBottom: 2 }}>Title</div>
        <div style={{ fontSize: 8, color: "#727272" }}>Subtitle</div>
      </div>
      <div style={{ flex: 1, minHeight: 40, background: "radial-gradient(ellipse at 60% 80%, " + bg + "33 0%, transparent 70%)" }} />
    </div>
  );
}

function BentoPage() {
  const [activeComp, setActiveComp] = useState("A");
  const [overlayDemo, setOverlayDemo] = useState(false);

  return (
    <>
      <h1 style={S.pageTitle}>Bento Section</h1>
      <p style={S.pageDesc}>
        Hero + features layout for marketing pages. One hero card paired with a unified features card
        (or individual cell cards). 6 official compositions, 2 hero variants, staggered entry animations.
      </p>

      {/* ─── COMPOSITIONS ─── */}
      <SectionLabel>Compositions (A–F)</SectionLabel>
      <p style={{ fontSize: 14, color: "#A3A3A3", marginBottom: 20, lineHeight: 1.6 }}>
        Six official grid layouts. All share the same sub-components and card shell.
        Gap: <span style={S.code}>--space-2</span> (16px) between all cards.
      </p>

      <SpecTable
        headers={["ID", "Name", "Grid", "Cells", "Inv.", "Use case"]}
        rows={COMPOSITIONS.map(c => [
          <span key="id" style={{ ...S.code, background: activeComp === c.id ? "#947AFC" : "#1C1C1E", color: activeComp === c.id ? "#fff" : "#BEB4FF", cursor: "pointer" }}
            onClick={() => setActiveComp(c.id)}>{c.id}</span>,
          <span key="n" style={{ fontWeight: 500, color: "#fff" }}>{c.name}</span>,
          <span key="g" style={S.code}>{c.grid}</span>,
          c.cells,
          c.inv ? <span key="i" style={{ color: "#22C55E" }}>{"\u2714"}</span> : <span key="i" style={{ color: "#515151" }}>{"\u2716"}</span>,
          <span key="u" style={{ fontSize: 13, color: "#515151" }}>{c.use}</span>,
        ])}
      />

      {/* Visual composition preview */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 12, fontFamily: "'Geist Mono', monospace", color: "#515151", marginBottom: 12 }}>
          Composition preview — click ID above to switch
        </div>
        <div style={{
          background: "#0C0C0C", border: "1px solid #252525", borderRadius: 16,
          padding: 24, minHeight: 200,
        }}>
          {activeComp === "A" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, height: 200 }}>
              <MiniHero label="Hero" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 0, background: "#1C1C1E", borderRadius: 8, overflow: "hidden" }}>
                <MiniCell label="Cell 1" style={{ borderRadius: 0, borderRight: "1px solid #0C0C0C", borderBottom: "1px solid #0C0C0C" }} />
                <MiniCell label="Cell 2" style={{ borderRadius: 0, borderBottom: "1px solid #0C0C0C" }} />
                <MiniCell label="Cell 3" style={{ borderRadius: 0, borderRight: "1px solid #0C0C0C" }} />
                <MiniCell label="Cell 4" style={{ borderRadius: 0 }} />
              </div>
            </div>
          )}
          {activeComp === "B" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, height: 200 }}>
              <MiniHero label="Hero" style={{ flex: 2 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, background: "#1C1C1E", borderRadius: 8, overflow: "hidden", flex: 1 }}>
                <MiniCell label="Cell 1" style={{ borderRadius: 0, borderRight: "1px solid #0C0C0C" }} />
                <MiniCell label="Cell 2" style={{ borderRadius: 0, borderRight: "1px solid #0C0C0C" }} />
                <MiniCell label="Cell 3" style={{ borderRadius: 0 }} />
              </div>
            </div>
          )}
          {activeComp === "C" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, height: 200 }}>
              <MiniHero label="Hero" style={{ flex: 2 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 0, background: "#1C1C1E", borderRadius: 8, overflow: "hidden", flex: 1 }}>
                <MiniCell label="C1" style={{ borderRadius: 0, borderRight: "1px solid #0C0C0C" }} />
                <MiniCell label="C2" style={{ borderRadius: 0, borderRight: "1px solid #0C0C0C" }} />
                <MiniCell label="C3" style={{ borderRadius: 0, borderRight: "1px solid #0C0C0C" }} />
                <MiniCell label="C4" style={{ borderRadius: 0 }} />
              </div>
            </div>
          )}
          {activeComp === "D" && (
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, height: 200 }}>
              <MiniHero label="Hero (2/3)" />
              <div style={{ display: "flex", flexDirection: "column", gap: 0, background: "#1C1C1E", borderRadius: 8, overflow: "hidden" }}>
                <MiniCell label="Cell 1" style={{ borderRadius: 0, borderBottom: "1px solid #0C0C0C", flex: 1 }} />
                <MiniCell label="Cell 2" style={{ borderRadius: 0, borderBottom: "1px solid #0C0C0C", flex: 1 }} />
                <MiniCell label="Cell 3" style={{ borderRadius: 0, flex: 1 }} />
              </div>
            </div>
          )}
          {activeComp === "E" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr 1fr", gap: 12, height: 200 }}>
              <MiniHero label="Hero" style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }} />
              <MiniCell label="Cell 1" style={{ gridColumn: 3, gridRow: 1 }} />
              <MiniCell label="Cell 2" style={{ gridColumn: 3, gridRow: 2 }} />
              <MiniCell label="Cell 3" style={{ gridColumn: 1, gridRow: 3 }} />
              <MiniCell label="Cell 4" style={{ gridColumn: "2 / 4", gridRow: 3 }} />
            </div>
          )}
          {activeComp === "F" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, height: 240 }}>
              <MiniHero label="Hero (tall)" style={{ height: "100%" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 0, background: "#1C1C1E", borderRadius: 8, overflow: "hidden" }}>
                <MiniCell label="Cell 1" style={{ borderRadius: 0, borderBottom: "1px solid #0C0C0C", flex: 1 }} />
                <MiniCell label="Cell 2" style={{ borderRadius: 0, borderBottom: "1px solid #0C0C0C", flex: 1 }} />
                <MiniCell label="Cell 3" style={{ borderRadius: 0, borderBottom: "1px solid #0C0C0C", flex: 1 }} />
                <MiniCell label="Cell 4" style={{ borderRadius: 0, flex: 1 }} />
              </div>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          {COMPOSITIONS.map(c => (
            <button key={c.id} onClick={() => setActiveComp(c.id)} style={{
              ...S.code, cursor: "pointer", border: "none",
              background: activeComp === c.id ? "#947AFC" : "#1C1C1E",
              color: activeComp === c.id ? "#fff" : "#BEB4FF",
              padding: "4px 12px", borderRadius: 8, fontSize: 13, fontWeight: 500,
              transition: "all 160ms",
            }}>{c.id}</button>
          ))}
        </div>
      </div>

      {/* ─── GRID RULES ─── */}
      <SectionLabel>Grid Rules</SectionLabel>
      <SpecTable
        headers={["Property", "Value"]}
        rows={[
          ["Gap", <span key="v" style={S.code}>--space-2 (16px)</span>],
          ["Min-height", <span key="v" style={S.code}>{"calc(100vh - var(--space-20))"}</span>],
          ["Min-height (mobile)", "auto"],
          ["Inversion (A, D, F)", <span key="v">direction: rtl on parent, ltr on children</span>],
          ["Inversion reset", <span key="v">{"\u2264"} 768px: ltr</span>],
        ]}
      />

      {/* ─── HERO VARIANTS ─── */}
      <SectionLabel>Hero Variants</SectionLabel>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button onClick={() => setOverlayDemo(false)} style={{
          ...S.code, cursor: "pointer", border: "none",
          background: !overlayDemo ? "#947AFC" : "#1C1C1E",
          color: !overlayDemo ? "#fff" : "#BEB4FF",
          padding: "6px 16px", borderRadius: 8, fontSize: 13,
        }}>Stacked (default)</button>
        <button onClick={() => setOverlayDemo(true)} style={{
          ...S.code, cursor: "pointer", border: "none",
          background: overlayDemo ? "#947AFC" : "#1C1C1E",
          color: overlayDemo ? "#fff" : "#BEB4FF",
          padding: "6px 16px", borderRadius: 8, fontSize: 13,
        }}>Overlay</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Stacked / Overlay live preview */}
        <div style={{
          background: "#000", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24,
          overflow: "hidden", display: "flex", flexDirection: "column", minHeight: 320,
          transition: "all 240ms",
        }}>
          {!overlayDemo ? (
            <>
              <div style={{ padding: "32px 24px", flexShrink: 0 }}>
                <div style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 8 }}>
                  Performance that{"\n"}won{"'"}t disappoint
                </div>
                <div style={{ fontSize: 14, color: "#A3A3A3", lineHeight: 1.5 }}>
                  Async and real-time STT models with top precision.
                </div>
              </div>
              <div style={{
                flex: 1, position: "relative", minHeight: 140,
                background: "radial-gradient(ellipse 90% 70% at 65% 110%, rgba(0,140,255,0.45) 0%, transparent 65%), #0C0C0C",
              }}>
                <button style={{
                  position: "absolute", bottom: 16, left: 16,
                  height: 40, padding: "0 20px", background: "#fff", color: "#000",
                  border: "none", borderRadius: 40, fontSize: 13, fontWeight: 500, cursor: "pointer",
                }}>Check benchmarks</button>
              </div>
            </>
          ) : (
            <div style={{ position: "relative", flex: 1, minHeight: 320 }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse 90% 70% at 65% 110%, rgba(0,140,255,0.45) 0%, transparent 65%), #0C0C0C",
              }} />
              <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                background: "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.10) 70%, rgba(0,0,0,0.45) 100%)",
              }} />
              <div style={{ position: "relative", zIndex: 2, padding: "32px 24px" }}>
                <div style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: 8, color: "#fff" }}>
                  Performance that{"\n"}won{"'"}t disappoint
                </div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>
                  Async and real-time STT models with top precision.
                </div>
              </div>
              <button style={{
                position: "absolute", bottom: 16, left: 16, zIndex: 3,
                height: 40, padding: "0 20px", background: "#fff", color: "#000",
                border: "none", borderRadius: 40, fontSize: 13, fontWeight: 500, cursor: "pointer",
              }}>Check benchmarks</button>
            </div>
          )}
        </div>

        {/* Anatomy label */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "#A3A3A3", marginBottom: 4 }}>
            {overlayDemo ? "Overlay Hero" : "Stacked Hero"} — Structure
          </div>
          {!overlayDemo ? (
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: "#727272", lineHeight: 2, background: "#0C0C0C", border: "1px solid #1C1C1E", borderRadius: 12, padding: 16 }}>
              <div style={{ color: "#947AFC" }}>.b__hero</div>
              <div style={{ paddingLeft: 16 }}>
                <div style={{ color: "#BEB4FF" }}>.b__hero-content</div>
                <div style={{ paddingLeft: 16, color: "#515151" }}>.b__hero-title</div>
                <div style={{ paddingLeft: 16, color: "#515151" }}>.b__hero-subtitle</div>
              </div>
              <div style={{ paddingLeft: 16 }}>
                <div style={{ color: "#BEB4FF" }}>.b__hero-visual</div>
                <div style={{ paddingLeft: 16, color: "#515151" }}>[content slot]</div>
              </div>
              <div style={{ paddingLeft: 16, color: "#22C55E" }}>.b__cta <span style={{ color: "#515151" }}>— absolute bottom-left</span></div>
            </div>
          ) : (
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: "#727272", lineHeight: 2, background: "#0C0C0C", border: "1px solid #1C1C1E", borderRadius: 12, padding: 16 }}>
              <div style={{ color: "#947AFC" }}>.b__hero-overlay</div>
              <div style={{ paddingLeft: 16 }}>
                <div style={{ color: "#BEB4FF" }}>.b__hero-visual <span style={{ color: "#515151" }}>— absolute inset 0</span></div>
                <div style={{ paddingLeft: 16, color: "#EF4444" }}>{"::after (gradient scrim, z-1)"}</div>
              </div>
              <div style={{ paddingLeft: 16 }}>
                <div style={{ color: "#BEB4FF" }}>.b__hero-content <span style={{ color: "#515151" }}>— z-2</span></div>
                <div style={{ paddingLeft: 16, color: "#515151" }}>.b__hero-title</div>
                <div style={{ paddingLeft: 16, color: "#515151" }}>.b__hero-subtitle <span style={{ color: "#F2CB45" }}>rgba(255,255,255,0.7)</span></div>
              </div>
              <div style={{ paddingLeft: 16, color: "#22C55E" }}>.b__cta <span style={{ color: "#515151" }}>— z-3</span></div>
            </div>
          )}
          {overlayDemo && (
            <div style={{ fontSize: 12, color: "#515151", fontFamily: "'Geist Mono', monospace", lineHeight: 1.6 }}>
              Subtitle uses rgba(255,255,255,0.7) instead of --text-secondary for scrim contrast.
            </div>
          )}
        </div>
      </div>

      {/* ─── SCRIM ANATOMY (overlay only) ─── */}
      {overlayDemo && (
        <>
          <SectionLabel>Gradient Scrim Anatomy</SectionLabel>
          <div style={{ display: "flex", gap: 16, marginBottom: 48 }}>
            <div style={{
              width: 80, height: 240, borderRadius: 12, overflow: "hidden", flexShrink: 0,
              background: "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.10) 70%, rgba(0,0,0,0.45) 100%)",
              border: "1px solid #1C1C1E",
            }} />
            <div style={{ flex: 1 }}>
              <SpecTable
                headers={["Stop", "Opacity", "Zone", "Text?"]}
                rows={[
                  ["0%", <span key="v" style={{ color: "#fff", fontWeight: 500 }}>72%</span>, <span key="z" style={{ color: "#22C55E" }}>Title zone (heavy)</span>, <span key="t" style={{ color: "#22C55E" }}>{"\u2714"} AAA</span>],
                  ["40%", "35%", "Transition", <span key="t" style={{ color: "#F2CB45" }}>Caution</span>],
                  ["70%", <span key="v" style={{ color: "#EF4444" }}>10%</span>, <span key="z" style={{ color: "#EF4444" }}>Visual breathing (light)</span>, <span key="t" style={{ color: "#EF4444" }}>{"\u2716"} Fail</span>],
                  ["100%", "45%", <span key="z" style={{ color: "#22C55E" }}>CTA zone (medium)</span>, <span key="t" style={{ color: "#22C55E" }}>{"\u2714"} AAA</span>],
                ]}
              />
              <div style={{
                padding: "12px 16px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: 12, fontSize: 13, color: "#EF4444", lineHeight: 1.5,
              }}>
                <strong>Text-free zone rule:</strong> Never place text in the 40%–70% band. Contrast is insufficient (fails WCAG).
              </div>
            </div>
          </div>
        </>
      )}

      {/* ─── CARD SHELL ─── */}
      <SectionLabel>Card Shell (shared)</SectionLabel>
      <p style={{ fontSize: 14, color: "#A3A3A3", marginBottom: 16, lineHeight: 1.5 }}>
        All cards (hero, features, cell cards in E) use the same shell.
      </p>
      <SpecTable
        headers={["Property", "Token", "Value"]}
        rows={BENTO_CARD_SHELL.map(r => [
          r.prop,
          <span key="t" style={S.code}>{r.token}</span>,
          <span key="v" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: "#515151" }}>{r.value}</span>,
        ])}
      />

      {/* ─── HERO CONTENT ─── */}
      <SectionLabel>Hero Content Specs</SectionLabel>
      <SpecTable
        headers={["Property", "Token", "Detail"]}
        rows={BENTO_HERO_SPECS.map(r => [
          r.prop,
          <span key="t" style={S.code}>{r.token}</span>,
          <span key="v" style={{ fontSize: 13, color: "#515151" }}>{r.value}</span>,
        ])}
      />

      {/* ─── HERO VISUAL ─── */}
      <SectionLabel>Hero Visual</SectionLabel>
      <SpecTable
        headers={["Property", "Value"]}
        rows={[
          ["Background", <span key="v" style={S.code}>--bg-secondary (#0C0C0C)</span>],
          ["Min-height (default)", "300px"],
          ["Min-height (B, C)", "360px"],
          ["Min-height (mobile)", "220px"],
          ["Content", "Neutral slot \u2014 no glow, no gradients. Content injected per use case."],
        ]}
      />

      {/* ─── CTA ─── */}
      <SectionLabel>CTA Button</SectionLabel>
      <div style={{ display: "flex", gap: 24, marginBottom: 48 }}>
        <div style={{ flex: 1 }}>
          <SpecTable
            headers={["Property", "Value"]}
            rows={BENTO_CTA_SPECS.map(r => [
              r.prop,
              <span key="v" style={S.code}>{r.value}</span>,
            ])}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", justifyContent: "center" }}>
          <button style={{
            height: 48, padding: "0 24px", background: "#fff", color: "#000",
            border: "none", borderRadius: 40, fontSize: 14, fontWeight: 500,
            cursor: "pointer", transition: "all 160ms",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 24px -8px rgba(0,0,0,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
            Check benchmarks
          </button>
          <span style={{ fontSize: 11, fontFamily: "'Geist Mono', monospace", color: "#515151" }}>b__cta — optional</span>
        </div>
      </div>

      {/* ─── CELL ─── */}
      <SectionLabel>Cell Specs</SectionLabel>
      <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <SpecTable
            headers={["Property", "Token / Value"]}
            rows={BENTO_CELL_SPECS.map(r => [
              r.prop,
              <span key="v">{r.token ? <span style={S.code}>{r.token}</span> : null} <span style={{ fontSize: 12, color: "#515151" }}>{r.value}</span></span>,
            ])}
          />
        </div>
        <div style={{
          width: 240, background: "#0C0C0C", border: "1px solid #252525", borderRadius: 16,
          padding: 24, display: "flex", flexDirection: "column", gap: 12, flexShrink: 0,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 9999, background: "#1C1C1E",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.3 }}>Cell Title</div>
          <div style={{ fontSize: 14, color: "#A3A3A3", lineHeight: 1.5 }}>Cell description text here.</div>
        </div>
      </div>

      {/* ─── INTERNAL DIVIDERS ─── */}
      <SectionLabel>Internal Dividers</SectionLabel>
      <SpecTable
        headers={["Context", "Rule"]}
        rows={[
          [<span key="c" style={{ fontWeight: 500, color: "#fff" }}>{"2\u00D72 grid (A)"}</span>, "right-border on odd cells, bottom-border on first 2 cells"],
          [<span key="c" style={{ fontWeight: 500, color: "#fff" }}>Row (B, C)</span>, "right-border on all except :last-child"],
          [<span key="c" style={{ fontWeight: 500, color: "#fff" }}>Column (D, F)</span>, "bottom-border on all except :last-child"],
          ["Color", <span key="v" style={S.code}>--border-transparent-subtle (1px solid)</span>],
        ]}
      />

      {/* ─── DIVIDER WIREFRAME ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 48 }}>
        {/* 2x2 */}
        <div>
          <div style={{ fontSize: 11, fontFamily: "'Geist Mono', monospace", color: "#515151", marginBottom: 8 }}>{"2\u00D72 (A)"}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", background: "#0C0C0C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, overflow: "hidden", height: 120 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: 11, color: "#515151", fontFamily: "'Geist Mono', monospace" }}>1</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: 11, color: "#515151", fontFamily: "'Geist Mono', monospace" }}>2</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid rgba(255,255,255,0.08)", fontSize: 11, color: "#515151", fontFamily: "'Geist Mono', monospace" }}>3</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#515151", fontFamily: "'Geist Mono', monospace" }}>4</div>
          </div>
        </div>
        {/* Row */}
        <div>
          <div style={{ fontSize: 11, fontFamily: "'Geist Mono', monospace", color: "#515151", marginBottom: 8 }}>Row (B, C)</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#0C0C0C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, overflow: "hidden", height: 120 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid rgba(255,255,255,0.08)", fontSize: 11, color: "#515151", fontFamily: "'Geist Mono', monospace" }}>1</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid rgba(255,255,255,0.08)", fontSize: 11, color: "#515151", fontFamily: "'Geist Mono', monospace" }}>2</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#515151", fontFamily: "'Geist Mono', monospace" }}>3</div>
          </div>
        </div>
        {/* Column */}
        <div>
          <div style={{ fontSize: 11, fontFamily: "'Geist Mono', monospace", color: "#515151", marginBottom: 8 }}>Column (D, F)</div>
          <div style={{ display: "flex", flexDirection: "column", background: "#0C0C0C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, overflow: "hidden", height: 120 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", flex: 1, fontSize: 11, color: "#515151", fontFamily: "'Geist Mono', monospace" }}>1</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", flex: 1, fontSize: 11, color: "#515151", fontFamily: "'Geist Mono', monospace" }}>2</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, fontSize: 11, color: "#515151", fontFamily: "'Geist Mono', monospace" }}>3</div>
          </div>
        </div>
      </div>

      {/* ─── ENTRY ANIMATION ─── */}
      <SectionLabel>Entry Animation</SectionLabel>
      <p style={{ fontSize: 14, color: "#A3A3A3", marginBottom: 16 }}>
        Add <span style={S.code}>.b--animated</span> to composition root. Easing: <span style={S.code}>--easing-out</span>. Fill: forwards.
      </p>
      <SpecTable
        headers={["Element", "Keyframe", "Duration", "Delay"]}
        rows={BENTO_ANIMATION.map(a => [
          <span key="e" style={{ fontWeight: 500, color: "#fff" }}>{a.element}</span>,
          <span key="k" style={S.code}>{a.keyframe}</span>,
          a.duration,
          <span key="d" style={{ color: "#947AFC", fontFamily: "'Geist Mono', monospace", fontSize: 12 }}>{a.delay}</span>,
        ])}
      />

      {/* ─── SECTION CONTEXT ─── */}
      <SectionLabel>Section Context Wrapper</SectionLabel>
      <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: "#727272", lineHeight: 2, background: "#0C0C0C", border: "1px solid #1C1C1E", borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <div style={{ color: "#947AFC" }}>section.section-ctx</div>
        <div style={{ paddingLeft: 16 }}>
          <div style={{ color: "#BEB4FF" }}>.container</div>
          <div style={{ paddingLeft: 16 }}>
            <div style={{ color: "#BEB4FF" }}>.section-ctx__header</div>
            <div style={{ paddingLeft: 16, color: "#515151" }}>.tag-label <span style={{ color: "#727272" }}>(pill + uppercase label)</span></div>
            <div style={{ paddingLeft: 16, color: "#515151" }}>.section-ctx__title <span style={{ color: "#727272" }}>(48px, semibold)</span></div>
            <div style={{ paddingLeft: 16, color: "#515151" }}>.section-ctx__subtitle <span style={{ color: "#727272" }}>(18px, text-secondary)</span></div>
          </div>
          <div style={{ paddingLeft: 16, color: "#22C55E" }}>{".bento-{a|b|c|d|e|f}"}</div>
        </div>
      </div>
      <SpecTable
        headers={["Property", "Token"]}
        rows={[
          ["Padding", <span key="v" style={S.code}>--space-15 (120px) top/bottom</span>],
          ["Border-top", <span key="v">1px solid <span style={S.code}>--border-tertiary</span></span>],
          ["Header margin-bottom", <span key="v" style={S.code}>--space-6 (48px)</span>],
          ["Title", <span key="v" style={S.code}>--font-size-48 / semibold / letter-spacing-tighter</span>],
        ]}
      />

      {/* ─── RESPONSIVE ─── */}
      <SectionLabel>Responsive Breakpoints</SectionLabel>
      <SpecTable
        headers={["Breakpoint", "Changes"]}
        rows={[
          [
            <span key="b" style={S.code}>{"\u2264"} 1024px</span>,
            "Hero title \u2192 32px. Cell title \u2192 18px. Cell desc \u2192 14px. D grid \u2192 1fr 1fr. C features \u2192 2-col. Section padding \u2192 space-12.",
          ],
          [
            <span key="b" style={S.code}>{"\u2264"} 768px</span>,
            "All grids \u2192 1-col. Min-height \u2192 auto. Inverted resets ltr. Hero visual \u2192 220px. Content padding \u2192 space-4/space-3. Section padding \u2192 space-10. Features 1-col, bottom-border all except last.",
          ],
        ]}
      />

      {/* ─── EDGE CASES ─── */}
      <SectionLabel>Edge Cases</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 48 }}>
        {[
          { case: "Long title", rule: "Wraps naturally. No truncation. No max-width on title." },
          { case: "Long descriptions", rule: "Cells grow vertically. Grid rows stretch via 1fr." },
          { case: "No CTA", rule: "Hero valid. Visual extends to full card height." },
          { case: "No subtitle", rule: "Hero-content shrinks. No empty space left behind." },
          { case: "Mixed content lengths", rule: "Cells in same row may differ. Grid handles via 1fr." },
        ].map(e => (
          <div key={e.case} style={{
            display: "flex", gap: 16, padding: "12px 16px",
            background: "#0C0C0C", border: "1px solid #252525", borderRadius: 12,
          }}>
            <span style={{ ...S.code, minWidth: 160, flexShrink: 0 }}>{e.case}</span>
            <span style={{ fontSize: 14, color: "#A3A3A3", lineHeight: 1.5 }}>{e.rule}</span>
          </div>
        ))}
      </div>

      {/* ─── NAMING CONVENTION ─── */}
      <SectionLabel>Naming Convention</SectionLabel>
      <p style={{ fontSize: 14, color: "#A3A3A3", marginBottom: 16 }}>
        All classes use <span style={S.code}>b__</span> prefix (short for bento).
      </p>
      <SpecTable
        headers={["Class", "Element"]}
        rows={BENTO_CLASSES.map(c => [
          <span key="c" style={S.code}>{c.cls}</span>,
          c.desc,
        ])}
      />
    </>
  );
}

// ─── APP ─────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("colors");
  const [search, setSearch] = useState("");

  const renderPage = () => {
    switch (page) {
      case "colors": return <ColorsPage search={search} />;
      case "spacing": return <SpacingPage search={search} />;
      case "typography": return <TypographyPage search={search} />;
      case "shadows": return <ShadowsPage />;
      case "animation": return <AnimationPage />;
      case "buttons": return <ButtonsPage />;
      case "inputs": return <InputsPage />;
      case "cards": return <CardsPage />;
      case "badges": return <BadgesPage />;
      case "nav": return <NavPage />;
      case "patterns": return <PatternsPage />;
      case "bento": return <BentoPage />;
      default: return <ColorsPage search={search} />;
    }
  };

  return (
    <div style={S.root}>
      {/* Global keyframes */}
      <style>{GLOBAL_STYLES}</style>

      {/* Sidebar */}
      <div style={S.sidebar}>
        <div style={S.logo}>
          <span style={S.logoDot} />
          <span>Gladia DS</span>
        </div>

        <div style={{ padding: "16px 12px 8px" }}>
          <input
            type="text"
            placeholder="Search tokens..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              ...S.searchBar, marginBottom: 0, height: 36, fontSize: 13,
              borderRadius: 10, padding: "0 12px",
            }}
            onFocus={e => { e.target.style.borderColor = "#252525"; }}
            onBlur={e => { e.target.style.borderColor = "transparent"; }}
          />
        </div>

        <div style={S.navGroup}>
          <div style={S.navGroupLabel}>Tokens</div>
          {PAGES.slice(0, 5).map(p => (
            <button key={p.id} style={S.navItem(page === p.id)}
              onClick={() => setPage(p.id)}
              onMouseEnter={e => { if (page !== p.id) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={e => { if (page !== p.id) e.currentTarget.style.background = "transparent"; }}>
              <span style={S.navIcon}>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>

        <div style={S.navGroup}>
          <div style={S.navGroupLabel}>Components</div>
          {PAGES.slice(5).map(p => (
            <button key={p.id} style={S.navItem(page === p.id)}
              onClick={() => setPage(p.id)}
              onMouseEnter={e => { if (page !== p.id) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={e => { if (page !== p.id) e.currentTarget.style.background = "transparent"; }}>
              <span style={S.navIcon}>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>

        <div style={{ marginTop: "auto", padding: "16px 24px", borderTop: "1px solid #1C1C1E" }}>
          <div style={{ fontSize: 11, color: "#515151", fontFamily: "'Geist Mono', monospace", lineHeight: 1.6 }}>
            Click any token to copy<br />
            <span style={{ color: "#947AFC" }}>{"var(--token-name)"}</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={S.main}>
        {renderPage()}
      </div>
    </div>
  );
}
