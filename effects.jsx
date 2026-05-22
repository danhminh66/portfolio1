// Motion & effect primitives — bundled so we can toggle all motion via tweak.
const { useEffect, useRef, useState, useLayoutEffect } = React;

/* ────────────────────────────────────────────────────────────────────── */
/* useInView — fire once when an element enters viewport                  */
/* ────────────────────────────────────────────────────────────────────── */
function useInView(opts = { rootMargin: "-80px 0px", threshold: 0.15 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { setSeen(true); io.disconnect(); break; }
      }
    }, opts);
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen];
}

/* ────────────────────────────────────────────────────────────────────── */
/* <Reveal> — fade + translate-up wrapper                                 */
/* ────────────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 18, as = "div", className = "", style = {} }) {
  const [ref, seen] = useInView();
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: seen ? 1 : 0,
        transform: seen ? "none" : `translateY(${y}px)`,
        transition: `opacity .8s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .8s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/* RevealSparkline — draws the line using stroke-dashoffset when visible  */
/* ────────────────────────────────────────────────────────────────────── */
function RevealSparkline({ data, width = 120, height = 36, color = "#c8ff3e", fillId = "sparkFill", strokeWidth = 1.6, duration = 1500 }) {
  const [ref, seen] = useInView();
  if (!data || data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const pad = 2;
  const W = width - pad * 2, H = height - pad * 2;
  const step = W / (data.length - 1);
  const y = (v) => pad + H - ((v - min) / (max - min || 1)) * H;
  const pts = data.map((v, i) => [pad + i * step, y(v)]);
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const dFill = `${d} L${pts[pts.length - 1][0]},${height} L${pts[0][0]},${height} Z`;
  // approximate length — use perimeter heuristic
  const len = pts.reduce((acc, p, i) => i ? acc + Math.hypot(p[0] - pts[i-1][0], p[1] - pts[i-1][1]) : 0, 0);

  return (
    <svg ref={ref} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={dFill} fill={`url(#${fillId})`} opacity={seen ? 0.7 : 0} style={{ transition: `opacity ${duration}ms ease ${duration*0.2}ms` }} />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={seen ? 0 : len}
        style={{ transition: `stroke-dashoffset ${duration}ms cubic-bezier(.2,.7,.2,1)` }}
      />
      <circle
        cx={pts[pts.length - 1][0]}
        cy={pts[pts.length - 1][1]}
        r="2.4"
        fill={color}
        opacity={seen ? 1 : 0}
        style={{ transition: `opacity .4s ease ${duration*0.7}ms` }}
      />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/* RevealCountUp — number tweens up when visible                          */
/* ────────────────────────────────────────────────────────────────────── */
function RevealCountUp({ to, duration = 1400, decimals = 0, suffix = "", prefix = "" }) {
  const [ref, seen] = useInView();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!seen) return;
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
  }, [seen, to]);
  return (
    <span ref={ref} className="tnum">
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/* CursorSpotlight — subtle neon glow that follows the cursor             */
/* ────────────────────────────────────────────────────────────────────── */
function CursorSpotlight({ enabled = true }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    let raf;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let cx = tx, cy = ty;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.transform = `translate3d(${cx - 320}px, ${cy - 320}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);
  if (!enabled) return null;
  return <div ref={ref} className="cursor-spot" aria-hidden="true" />;
}

/* ────────────────────────────────────────────────────────────────────── */
/* ScrambleText — cycles through random chars before settling             */
/* ────────────────────────────────────────────────────────────────────── */
function ScrambleText({ text, duration = 900, className = "", style = {} }) {
  const [out, setOut] = useState("");
  const [ref, seen] = useInView();
  useEffect(() => {
    if (!seen) return;
    const chars = "█▓▒░ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?#*";
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const reveal = Math.floor(p * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        if (i < reveal || text[i] === " ") s += text[i];
        else s += chars[Math.floor(Math.random() * chars.length)];
      }
      setOut(s);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, text]);
  return <span ref={ref} className={className} style={style}>{out || text.replace(/./g, "·")}</span>;
}

/* ────────────────────────────────────────────────────────────────────── */
/* TypingCaret — types out text with blinking caret                       */
/* ────────────────────────────────────────────────────────────────────── */
function TypingCaret({ text, speed = 38, delay = 200, className = "", caret = true }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    let id;
    const tick = () => {
      i++;
      setOut(text.slice(0, i));
      if (i < text.length) id = setTimeout(tick, speed + Math.random() * 20);
    };
    const d = setTimeout(tick, delay);
    return () => { clearTimeout(d); clearTimeout(id); };
  }, [text]);
  return (
    <span className={className}>
      {out}
      {caret && <span className="caret" />}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/* MagneticButton — slight pull toward cursor                             */
/* ────────────────────────────────────────────────────────────────────── */
function MagneticButton({ as: Tag = "a", strength = 0.25, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let rafId;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(rafId);
      el.style.transform = "translate(0,0)";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [strength]);
  return <Tag ref={ref} {...rest} style={{ ...rest.style, transition: "transform .3s cubic-bezier(.2,.7,.2,1)" }}>{children}</Tag>;
}

/* ────────────────────────────────────────────────────────────────────── */
/* TickerPulse — adds a pulsing dot near KPI value                        */
/* ────────────────────────────────────────────────────────────────────── */
function PulseDot({ color = "var(--accent)", size = 8 }) {
  return (
    <span className="pulse-dot" style={{ "--pd-color": color, width: size, height: size }} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

Object.assign(window, {
  useInView, Reveal, RevealSparkline, RevealCountUp,
  CursorSpotlight, ScrambleText, TypingCaret, MagneticButton, PulseDot,
});
