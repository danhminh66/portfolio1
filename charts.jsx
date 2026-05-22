// Lightweight SVG chart components. Exposed globally.

const { useEffect, useRef, useState } = React;

/** Sparkline — given numeric series, draws path + filled area. */
function Sparkline({ data, width = 120, height = 36, color = "#c8ff3e", fillId = "sparkFill", strokeWidth = 1.6 }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const pad = 2;
  const W = width - pad * 2, H = height - pad * 2;
  const step = W / (data.length - 1);
  const y = (v) => pad + H - ((v - min) / (max - min || 1)) * H;
  const pts = data.map((v, i) => [pad + i * step, y(v)]);
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const dFill = `${d} L${pts[pts.length - 1][0]},${height} L${pts[0][0]},${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={dFill} fill={`url(#${fillId})`} opacity="0.7" />
      <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.4" fill={color} />
    </svg>
  );
}

/** Bar chart with labels — used for spend vs revenue per month. Animates from 0 on enter. */
function DualBars({ rows, height = 220, leftKey = "spend", rightKey = "rev", labelKey = "m", duration = 1200 }) {
  const max = Math.max(...rows.map((r) => Math.max(r[leftKey], r[rightKey])));
  const [ref, seen] = useInView();
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setP(eased);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, duration]);
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: `repeat(${rows.length},1fr)`, gap: 12, alignItems: "end", height }}>
      {rows.map((r, i) => {
        const lH = (r[leftKey] / max) * (height - 50) * p;
        const rH = (r[rightKey] / max) * (height - 50) * p;
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--accent)", opacity: p }}>
              {(r[rightKey] * p).toFixed(p < 1 ? 0 : (r[rightKey] % 1 ? 1 : 0))}M
            </div>
            <div style={{ display: "flex", gap: 4, alignItems: "end", height: height - 50 }}>
              <div
                title={`Spend ${r[leftKey]}M`}
                style={{
                  width: 14,
                  height: lH,
                  background: "rgba(255,255,255,.18)",
                  borderRadius: 3,
                }}
              />
              <div
                title={`Revenue ${r[rightKey]}M`}
                style={{
                  width: 14,
                  height: rH,
                  background: "var(--accent)",
                  borderRadius: 3,
                  boxShadow: "0 0 18px rgba(200,255,62,.35)",
                }}
              />
            </div>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--mute)" }}>{r[labelKey]}</div>
          </div>
        );
      })}
    </div>
  );
}

/** ROI bars only — vertical single-series chart with values on top. Animates from 0. */
function RoiBars({ rows, height = 140, duration = 1200 }) {
  const max = Math.max(...rows.map((r) => r.roi));
  const [ref, seen] = useInView();
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setP(eased);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, duration]);
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: `repeat(${rows.length},1fr)`, gap: 12, alignItems: "end", height }}>
      {rows.map((r, i) => {
        const h = (r.roi / max) * (height - 36) * p;
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--text)", fontWeight: 500, opacity: p }}>{Math.round(r.roi * p)}x</div>
            <div
              style={{
                width: "100%",
                maxWidth: 32,
                height: h,
                background: "linear-gradient(180deg,var(--accent),#7ac415)",
                borderRadius: 3,
              }}
            />
            <div className="mono" style={{ fontSize: 10, color: "var(--mute)" }}>{r.m}</div>
          </div>
        );
      })}
    </div>
  );
}

/** Animated count-up — for KPI big numbers. */
function CountUp({ to, duration = 1200, decimals = 0, suffix = "", prefix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf, start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return (
    <span className="tnum">
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Donut-like ratio indicator — sweeps from 0 to target value, number counts up. */
function Donut({ value = 87, label = "KPI", size = 96, duration = 1400 }) {
  const r = (size - 12) / 2;
  const C = 2 * Math.PI * r;
  const [ref, seen] = useInView();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      setV(value * eased);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, value, duration]);
  const off = C - (Math.min(v, 100) / 100) * C;
  return (
    <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,.08)" strokeWidth="6" fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="var(--accent)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={C}
        strokeDashoffset={off}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="48%" textAnchor="middle" dominantBaseline="middle" className="mono"
        style={{ fontFamily: "JetBrains Mono", fontSize: 16, fill: "var(--text)", fontWeight: 600 }}>
        {Math.round(v)}%
      </text>
      <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle"
        style={{ fontFamily: "JetBrains Mono", fontSize: 9, fill: "var(--mute)", letterSpacing: ".1em" }}>
        {label}
      </text>
    </svg>
  );
}

Object.assign(window, { Sparkline, DualBars, RoiBars, CountUp, Donut });
