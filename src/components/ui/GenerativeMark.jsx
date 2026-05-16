import { memo, useMemo } from "react";

/**
 * Seeded RNG (mulberry32). Same project -> same composition every time.
 */
const mulberry32 = (seed) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const hash = (str) => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

/* ── Color helpers ───────────────────────────────────────── */
const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const num = parseInt(full, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};

const rgbToHex = ({ r, g, b }) =>
  "#" +
  [r, g, b]
    .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
    .join("");

const mix = (hex, target, t) => {
  const a = hexToRgb(hex);
  const b = hexToRgb(target);
  return rgbToHex({
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t,
  });
};

const luminance = (hex) => {
  const { r, g, b } = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

/* ── Composition archetypes ──────────────────────────────── */

// archetype 0: arc constellation — one bold hero arc + 3-5 supporting arcs that fill the canvas
const arcs = (rng, palette) => {
  const elements = [];
  // Hero arc: large, centered, thick — anchors the composition
  const heroR = 38 + rng() * 18;
  const heroCx = 50 + (rng() - 0.5) * 20;
  const heroCy = 50 + (rng() - 0.5) * 20;
  const heroStart = rng() * Math.PI * 2;
  const heroSweep = Math.PI * (0.7 + rng() * 1.1);
  const hx1 = heroCx + heroR * Math.cos(heroStart);
  const hy1 = heroCy + heroR * Math.sin(heroStart);
  const hx2 = heroCx + heroR * Math.cos(heroStart + heroSweep);
  const hy2 = heroCy + heroR * Math.sin(heroStart + heroSweep);
  const hLg = heroSweep > Math.PI ? 1 : 0;
  elements.push(
    <path
      key="hero"
      d={`M ${hx1.toFixed(2)} ${hy1.toFixed(2)} A ${heroR.toFixed(2)} ${heroR.toFixed(2)} 0 ${hLg} 1 ${hx2.toFixed(2)} ${hy2.toFixed(2)}`}
      fill="none"
      stroke={palette[2]}
      strokeWidth={2.2 + rng() * 1.2}
      strokeLinecap="round"
      opacity={0.9}
    />
  );

  // Supporting arcs: distributed across the canvas, varied sizes
  const count = 3 + Math.floor(rng() * 3);
  for (let i = 0; i < count; i += 1) {
    // Force distribution: divide canvas into quadrants and place one arc per quadrant when possible
    const quadX = (i % 2) * 50 + 10 + rng() * 30;
    const quadY = Math.floor(i / 2) * 50 + 10 + rng() * 30;
    const r = 14 + rng() * 28;
    const stroke = palette[Math.floor(rng() * 2)]; // skip brightest for support arcs
    const sw = 0.7 + rng() * 1.6;
    const start = rng() * Math.PI * 2;
    const sweep = Math.PI * (0.5 + rng() * 1.2);
    const x1 = quadX + r * Math.cos(start);
    const y1 = quadY + r * Math.sin(start);
    const x2 = quadX + r * Math.cos(start + sweep);
    const y2 = quadY + r * Math.sin(start + sweep);
    const large = sweep > Math.PI ? 1 : 0;
    elements.push(
      <path
        key={`a${i}`}
        d={`M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r.toFixed(2)} ${r.toFixed(2)} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`}
        fill="none"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
        opacity={0.55 + rng() * 0.3}
      />
    );
  }
  return elements;
};

// archetype 1: stacked bars — vertical, varied widths/heights
const bars = (rng, palette) => {
  const elements = [];
  const count = 5 + Math.floor(rng() * 5);
  const totalGap = 8;
  const usable = 100 - totalGap;
  const gap = totalGap / (count + 1);
  const barW = usable / count;
  for (let i = 0; i < count; i += 1) {
    const h = 15 + rng() * 60;
    const y = 50 - h / 2 + (rng() - 0.5) * 18;
    const fill = palette[Math.floor(rng() * palette.length)];
    const x = gap + i * (barW + 0); // simpler distribution
    elements.push(
      <rect
        key={`b${i}`}
        x={x.toFixed(2)}
        y={y.toFixed(2)}
        width={(barW - 1).toFixed(2)}
        height={h.toFixed(2)}
        fill={fill}
        opacity={0.45 + rng() * 0.45}
        rx="0.6"
      />
    );
  }
  return elements;
};

// archetype 2: dot field — orderly grid with size jitter
const dotField = (rng, palette) => {
  const elements = [];
  const cols = 6 + Math.floor(rng() * 4);
  const rows = cols;
  const cellW = 100 / (cols + 1);
  const cellH = 100 / (rows + 1);
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      const cx = (i + 1) * cellW;
      const cy = (j + 1) * cellH;
      const r = 0.6 + rng() * 2.6;
      const fill = palette[Math.floor(rng() * palette.length)];
      elements.push(
        <circle
          key={`d${i}-${j}`}
          cx={cx.toFixed(2)}
          cy={cy.toFixed(2)}
          r={r.toFixed(2)}
          fill={fill}
          opacity={0.35 + rng() * 0.5}
        />
      );
    }
  }
  return elements;
};

// archetype 3: angled stack — diagonal slashes with a strong primary
const lineGrid = (rng, palette) => {
  const elements = [];
  // Pick a base angle in degrees (15-75 or 105-165)
  const baseAngle = (rng() > 0.5 ? 15 : 105) + rng() * 60;
  const baseRad = (baseAngle * Math.PI) / 180;
  const count = 6 + Math.floor(rng() * 4);
  const spread = 70;
  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    const center = 15 + t * spread;
    const len = 35 + rng() * 35;
    const cx = center + (rng() - 0.5) * 10;
    const cy = 50 + (rng() - 0.5) * 50;
    const x1 = cx - (len / 2) * Math.cos(baseRad);
    const y1 = cy - (len / 2) * Math.sin(baseRad);
    const x2 = cx + (len / 2) * Math.cos(baseRad);
    const y2 = cy + (len / 2) * Math.sin(baseRad);
    const isPrimary = i % 3 === 0;
    const stroke = palette[isPrimary ? 2 : 0];
    const sw = isPrimary ? 2.4 + rng() * 1.4 : 0.5 + rng() * 0.8;
    elements.push(
      <line
        key={`l${i}`}
        x1={x1.toFixed(2)}
        y1={y1.toFixed(2)}
        x2={x2.toFixed(2)}
        y2={y2.toFixed(2)}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
        opacity={isPrimary ? 0.85 : 0.45 + rng() * 0.3}
      />
    );
  }
  return elements;
};

// archetype 4: node graph — points connected with lines, like a network diagram
const orbit = (rng, palette) => {
  const elements = [];
  const nodeCount = 7 + Math.floor(rng() * 4);
  const nodes = [];
  // Place nodes in two loose clusters for a balanced graph
  for (let i = 0; i < nodeCount; i += 1) {
    nodes.push({
      x: 15 + rng() * 70,
      y: 15 + rng() * 70,
      r: 1.8 + rng() * 3.0,
    });
  }
  // Draw connecting lines (each node to its 2 nearest neighbors)
  nodes.forEach((n, i) => {
    const dists = nodes
      .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
      .filter((m) => m.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    dists.forEach(({ j }) => {
      if (j > i) {
        const m = nodes[j];
        elements.push(
          <line
            key={`e${i}-${j}`}
            x1={n.x.toFixed(2)}
            y1={n.y.toFixed(2)}
            x2={m.x.toFixed(2)}
            y2={m.y.toFixed(2)}
            stroke={palette[0]}
            strokeWidth="0.6"
            opacity="0.55"
          />
        );
      }
    });
  });
  // Draw nodes on top
  nodes.forEach((n, i) => {
    elements.push(
      <circle
        key={`n${i}`}
        cx={n.x.toFixed(2)}
        cy={n.y.toFixed(2)}
        r={n.r.toFixed(2)}
        fill={palette[i % 3 === 0 ? 2 : 1]}
        opacity={0.85}
      />
    );
  });
  return elements;
};

const ARCHETYPES = [arcs, bars, dotField, lineGrid, orbit];

/* ── Component ───────────────────────────────────────────── */

const GenerativeMark = memo(({ project, className = "" }) => {
  const composition = useMemo(() => {
    const seed = hash(`${project.id}-${project.title}`);
    const rng = mulberry32(seed);

    // Build palette: three tones derived from the base color.
    // For light backgrounds we mix toward black aggressively so shapes have weight.
    // For dark backgrounds we mix toward white for visible lift.
    const base = project.color;
    const isLight = luminance(base) > 0.65;
    const palette = isLight
      ? [mix(base, "#000000", 0.55), mix(base, "#000000", 0.72), mix(base, "#000000", 0.88)]
      : [mix(base, "#ffffff", 0.22), mix(base, "#ffffff", 0.5), mix(base, "#ffffff", 0.85)];

    // Pick archetype seeded
    const archetype = Math.floor(rng() * ARCHETYPES.length);
    return ARCHETYPES[archetype](rng, palette);
  }, [project.id, project.title, project.color]);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    >
      {composition}
    </svg>
  );
});

GenerativeMark.displayName = "GenerativeMark";

export default GenerativeMark;
