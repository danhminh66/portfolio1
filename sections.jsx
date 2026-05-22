// Major sections of the portfolio. All components exposed to window.

const { useEffect, useMemo, useRef, useState } = React;

/* ────────────────────────────────────────────────────────────────────── */
/* HEADER + LIVE HUD                                                      */
/* ────────────────────────────────────────────────────────────────────── */
function Header() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss} ICT`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="hud">
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="22" height="22" viewBox="0 0 22 22">
              <rect x="1" y="1" width="20" height="20" rx="4" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
              <path d="M5 14 L8 10 L11 13 L17 6" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="17" cy="6" r="1.6" fill="var(--accent)" />
            </svg>
            <span className="mono" style={{ fontSize: 12.5, letterSpacing: ".12em" }}>NCDM<span style={{ color: "var(--mute)" }}>.PERF</span></span>
          </div>
          <span className="chip"><PulseDot /> live</span>
        </div>
        <nav style={{ display: "flex", gap: 28 }}>
          {[
          ["overview", "#overview"],
          ["services", "#services"],
          ["cases", "#cases"],
          ["work", "#work"],
          ["process", "#process"],
          ["contact", "#contact"]].
          map(([l, h]) =>
          <a key={h} href={h} className="mono" style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--mute)" }}>
              {l}
            </a>
          )}
        </nav>
        <div className="mono" style={{ fontSize: 12, color: "var(--mute)", display: "flex", gap: 14 }}>
          <span>HÀ NỘI</span>
          <span style={{ color: "var(--accent)" }}>{time}</span>
        </div>
      </div>
    </div>);

}

/* ────────────────────────────────────────────────────────────────────── */
/* HERO — 4 layout variations driven by tweak                             */
/* ────────────────────────────────────────────────────────────────────── */
function Hero({ layout = "terminal" }) {
  return (
    <section id="overview" style={{ paddingTop: 56 }}>
      <div className="container">
        {layout === "terminal" && <HeroTerminal />}
        {layout === "split" && <HeroSplit />}
        {layout === "editorial" && <HeroEditorial />}
        {layout === "dashboard" && <HeroDashboard />}
      </div>
    </section>);

}

/* --- variant A: terminal/console intro + KPI rail right --- */
function HeroTerminal() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.3fr .9fr", gap: 32, alignItems: "stretch", minHeight: 560 }}>
      <div className="panel" style={{ padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
            <span className="chip"><PulseDot color="var(--up)" /> available · t6/2026</span>
            <span className="chip">hà nội · vn</span>
          </div>
          <div className="mono" style={{ fontSize: 12, color: "var(--mute)", marginBottom: 16 }}>
            <TypingCaret text="~/portfolio/nguyen-cao-danh-minh" />
          </div>
          <h1 style={{ fontSize: 76, lineHeight: .95, letterSpacing: "-.035em", fontWeight: 600, margin: 0 }}>
            Nguyễn Cao<br />Danh Minh<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <div style={{ marginTop: 22, fontSize: 18, lineHeight: 1.5, color: "var(--mute)", maxWidth: 540 }}>
            <b style={{ color: "var(--text)" }}>Performance Marketer</b> tập trung vào Meta Ads chuyển đổi qua
            tin nhắn & website. Mở rộng được kèm <em style={{ fontStyle: "normal", color: "var(--accent)" }}>creative</em>: viết content, edit video, design ảnh.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <a href="#cases" className="btn primary">Xem case studies →</a>
          <a href="#contact" className="btn">Đặt lịch trao đổi</a>
          <span className="mono" style={{ fontSize: 11.5, color: "var(--mute)", marginLeft: 4 }}>· avg reply &lt;2h</span>
        </div>
      </div>
      <HeroSideRail />
    </div>);

}

function HeroSideRail() {
  return (
    <div className="panel" style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: ".14em", color: "var(--mute)", textTransform: "uppercase" }}>Career Stats</span>
        <span className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>● LIVE</span>
      </div>
      <div className="kpi">
        <div className="lbl">Best ROI</div>
        <div className="val"><RevealCountUp to={22} suffix="x" /></div>
        <div className="sub">FICAR · T8/2025</div>
        <div className="spark">
          <RevealSparkline data={[9, 22, 10, 15, 14, 11]} width={240} height={36} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="kpi">
          <div className="lbl">Total Spend</div>
          <div className="val" style={{ fontSize: 26 }} data-comment-anchor="f6aa63df9d-div-125-11">~188<span style={{ color: "var(--mute)" }}>M₫</span></div>
          <div className="sub">Across 3 brands</div>
        </div>
        <div className="kpi">
          <div className="lbl">Total Rev.</div>
          <div className="val" style={{ fontSize: 26, color: "var(--accent)" }} data-comment-anchor="715332ac9e-div-130-11">~3.5<span style={{ color: "var(--mute)" }}>B₫</span></div>
          <div className="sub">Ghi nhận từ ads</div>
        </div>
      </div>
      <div className="kpi" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div className="lbl">Industries</div>
          <div className="mono" style={{ marginTop: 10, fontSize: 12, lineHeight: 1.9, color: "var(--text)" }}>
            <div>→ Linh kiện ô tô</div>
            <div>→ Gym &amp; Pilates</div>
            <div>→ Kỷ yếu / chụp ảnh</div>
            <div>→ Khóa học · giáo dục</div>
          </div>
        </div>
        <div className="mono" style={{ fontSize: 10.5, color: "var(--mute)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 14 }}>
          Updated 22.05.2026
        </div>
      </div>
    </div>);

}

/* --- variant B: split with full-width big name --- */
function HeroSplit() {
  return (
    <div style={{ minHeight: 560 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
            <span className="chip"><PulseDot color="var(--up)" /> available</span>
            <span className="chip">performance marketer</span>
          </div>
          <span className="mono" style={{ fontSize: 12, color: "var(--mute)", letterSpacing: ".12em" }}>PORTFOLIO · 2026</span>
        </div>
        <div className="mono" style={{ fontSize: 12, color: "var(--mute)", textAlign: "right", maxWidth: 280, lineHeight: 1.6 }}>
          Performance-driven advertising<br />for the messenger-conversion era
        </div>
      </div>
      <h1 style={{ fontSize: "clamp(72px, 14vw, 220px)", lineHeight: .88, letterSpacing: "-.04em", fontWeight: 600, margin: "32px 0 0" }}>
        Nguyễn<br />Cao Danh<br />Minh<span style={{ color: "var(--accent)" }}>.</span>
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr", gap: 20, marginTop: 40, alignItems: "end" }}>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "var(--mute)" }}>
          Meta Ads chuyển đổi qua tin nhắn &amp; website — biến ngân sách thành đơn hàng có thể đo đếm hằng ngày.
        </p>
        {[
        ["Best ROI", "22x", "FICAR"],
        ["Peak Rev.", "663.6M", "T1/2026"],
        ["Brands", "03", "Active"]].
        map(([l, v, s]) =>
        <div key={l}>
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: ".14em", color: "var(--mute)", textTransform: "uppercase" }}>{l}</div>
            <div className="big-num" style={{ fontSize: 40, marginTop: 4, color: "var(--accent)" }}>{v}</div>
            <div className="mono" style={{ fontSize: 11, color: "var(--mute)", marginTop: 4 }}>{s}</div>
          </div>
        )}
      </div>
    </div>);

}

/* --- variant C: editorial, name centered with stat overlays --- */
function HeroEditorial() {
  return (
    <div style={{ minHeight: 620, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px 0" }}>
      <span className="chip" style={{ marginBottom: 24 }}><PulseDot color="var(--up)" /> available for projects</span>
      <div className="mono" style={{ fontSize: 12, color: "var(--mute)", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 18 }}>
        Performance Marketer · Hà Nội · 2026
      </div>
      <h1 style={{ fontSize: "clamp(64px, 11vw, 168px)", lineHeight: .9, letterSpacing: "-.035em", fontWeight: 600, margin: 0 }}>
        Tôi biến<br />
        <span style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 500 }}>ngân sách</span> ads<br />
        thành doanh số.
      </h1>
      <p style={{ maxWidth: 620, color: "var(--mute)", fontSize: 17, lineHeight: 1.55, marginTop: 30 }}>
        Nguyễn Cao Danh Minh — chuyên Meta Ads chuyển đổi tin nhắn & website,
        kèm content và creative để đóng vòng từ insight tới đơn hàng.
      </p>

      {/* Floating stat callouts */}
      <div style={{ position: "absolute", top: 80, left: 0 }}>
        <FloatingStat label="ROI peak" value="22x" sub="FICAR · T8/25" />
      </div>
      <div style={{ position: "absolute", top: 140, right: 10 }}>
        <FloatingStat label="Revenue" value="3.5B₫" sub="T7/25 → T5/26" align="right" />
      </div>
      <div style={{ position: "absolute", bottom: 30, left: 30 }}>
        <FloatingStat label="CPA/Mess" value="62.9k" sub="FitForLife" />
      </div>
      <div style={{ position: "absolute", bottom: 80, right: 0 }}>
        <FloatingStat label="Leads" value="1.092" sub="Aloha · T4" align="right" />
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
        <a href="#cases" className="btn primary">Xem case studies →</a>
        <a href="#contact" className="btn">Liên hệ</a>
      </div>
    </div>);

}

function FloatingStat({ label, value, sub, align = "left" }) {
  return (
    <div className="panel" style={{ padding: "12px 16px", minWidth: 160, textAlign: align }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: ".14em", color: "var(--mute)", textTransform: "uppercase" }}>{label}</div>
      <div className="big-num" style={{ fontSize: 24, color: "var(--accent)", marginTop: 4 }}>{value}</div>
      <div className="mono" style={{ fontSize: 10.5, color: "var(--mute)", marginTop: 2 }}>{sub}</div>
    </div>);

}

/* --- variant D: dashboard-first, hero is a full KPI grid --- */
function HeroDashboard() {
  return (
    <div style={{ minHeight: 560 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <span className="chip"><PulseDot /> system online</span>
            <span className="chip">2026 · q2 snapshot</span>
          </div>
          <h1 style={{ fontSize: "clamp(48px, 7vw, 92px)", lineHeight: .95, letterSpacing: "-.03em", fontWeight: 600, margin: 0 }}>
            Nguyễn Cao Danh Minh<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p style={{ maxWidth: 520, color: "var(--mute)", fontSize: 16, lineHeight: 1.55, marginTop: 14 }}>
            Performance Marketer — Meta Ads chuyển đổi tin nhắn & website. Đây là bảng số liệu thật từ 3 brand đang chạy.
          </p>
        </div>
        <a href="#contact" className="btn primary">Đặt lịch trao đổi →</a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 36 }}>
        {[
        { l: "Best ROI", v: 22, suffix: "x", sub: "FICAR · T8/25", spark: [9, 22, 10, 15, 14, 11], color: "var(--accent)" },
        { l: "Peak Revenue", v: 663.6, suffix: "M", sub: "T1/2026 · FICAR", spark: [130, 269, 186, 663, 352, 358], color: "var(--accent)" },
        { l: "Total Spend", v: 188.7, suffix: "M", sub: "Across 3 brands", spark: [14, 12, 19, 44, 25, 32], color: "#fff" },
        { l: "CPA / Mess", v: 62.9, suffix: "k", sub: "FitForLife · T5", spark: [119, 95, 78, 70, 65, 62], color: "var(--cyan)" }].
        map((k, i) =>
        <div key={i} className="kpi" style={{ minHeight: 178 }}>
            <div className="lbl">{k.l}</div>
            <div className="val" style={{ color: k.color }}>
              <RevealCountUp to={k.v} decimals={k.v % 1 ? 1 : 0} suffix={k.suffix} />
            </div>
            <div className="sub">{k.sub}</div>
            <div className="spark">
              <RevealSparkline data={k.spark} width={240} height={40} color={k.color === "var(--cyan)" ? "#50e3ff" : "#c8ff3e"} fillId={k.color === "var(--cyan)" ? "sparkFillCyan" : "sparkFill"} />
            </div>
          </div>
        )}
      </div>

      <div className="panel" style={{ marginTop: 16, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="mono" style={{ fontSize: 12, color: "var(--mute)" }}>
          → <b style={{ color: "var(--text)" }}>Trading floor of brands.</b> Số liệu cập nhật từ Ads Manager — 10 tháng liên tục, 3 brand, 5 ngành.
        </div>
        <a href="#cases" className="mono" style={{ fontSize: 12, color: "var(--accent)", letterSpacing: ".1em", textTransform: "uppercase" }}>open cases ↗</a>
      </div>
    </div>);

}

/* ────────────────────────────────────────────────────────────────────── */
/* TICKER MARQUEE                                                         */
/* ────────────────────────────────────────────────────────────────────── */
function TickerMarquee() {
  const items = [...TICKERS, ...TICKERS]; // duplicate for seamless loop
  return (
    <section style={{ marginTop: 72, padding: "18px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", overflow: "hidden", background: "var(--bg-soft)" }}>
      <div className="marquee">
        {items.map((t, i) =>
        <div key={i} className="item">
            <span style={{ color: "var(--mute-2)" }}>◇</span>
            <span style={{ color: "var(--mute)" }}>{t.brand}</span>
            <span style={{ color: "var(--mute-2)" }}>/</span>
            <span style={{ color: "var(--mute)" }}>{t.kpi}</span>
            <b style={{ color: "var(--text)" }}>{t.val}</b>
            <span className="up">{t.d}</span>
            <span className="sep">·</span>
          </div>
        )}
      </div>
    </section>);

}

/* ────────────────────────────────────────────────────────────────────── */
/* SERVICES                                                               */
/* ────────────────────────────────────────────────────────────────────── */
function Services() {
  return (
    <section id="services" style={{ paddingTop: 120 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">02 / services</div>
            <h2 style={{ marginTop: 12 }}>3 dịch vụ — một bộ máy<br />chuyển đổi liền mạch.</h2>
          </div>
          <div className="meta">
            <span className="section-num">SECTION 02</span>
            <span className="mono" style={{ fontSize: 12, color: "var(--mute)" }}>Ads là core · Creative là bonus</span>
          </div>
        </div>
        <div className="svc">
          {SERVICES.map((s) =>
          <div key={s.code} className="svc-card">
              <div>
                <div className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".14em" }}>/ {s.code}</div>
                <h4 style={{ marginTop: 18 }}>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
              <div className="svc-list">
                {s.items.map((it) => <span key={it}>{it}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ────────────────────────────────────────────────────────────────────── */
/* CASE STUDIES                                                           */
/* ────────────────────────────────────────────────────────────────────── */
function CaseStudies() {
  return (
    <section id="cases" style={{ paddingTop: 120 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">03 / case studies</div>
            <h2 style={{ marginTop: 12 }}>Số thật. Khách thật.<br />Tối ưu hằng ngày.</h2>
          </div>
          <div className="meta">
            <span className="section-num">SECTION 03 · 03 CASES</span>
            <span className="mono" style={{ fontSize: 12, color: "var(--mute)" }}>Source: Ads Manager · Sheets nội bộ</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <FicarCase />
          <AlohaCase />
          <FflCase />
        </div>
      </div>
    </section>);

}

function CaseHead({ idx, title, industry, period, tag, kpi }) {
  return (
    <div className="case-head">
      <div className="case-title">
        <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".14em" }}>CASE/{idx}</span>
        <h3>{title}</h3>
        <span className="tag">{industry}</span>
        <span className="tag">{period}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span className="chip"><span className="dot" /> {tag}</span>
        {kpi && <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>{kpi}</span>}
      </div>
    </div>);

}

function FicarCase() {
  return (
    <div className="case">
      <CaseHead idx="01" title="FICAR" industry="Linh kiện ô tô" period={FICAR.period} tag="flagship" kpi="ROI peak 22x" />
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 0 }}>
        <div style={{ padding: 24, borderRight: "1px solid var(--line)" }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: ".14em", marginBottom: 8 }}>SPEND VS REVENUE · BY MONTH (₫M)</div>
          <DualBars rows={FICAR.rows} height={220} />
          <div style={{ display: "flex", gap: 18, marginTop: 18, fontSize: 12 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--mute)" }}>
              <span style={{ width: 10, height: 10, background: "rgba(255,255,255,.18)", borderRadius: 2 }} /> Spend
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text)" }}>
              <span style={{ width: 10, height: 10, background: "var(--accent)", borderRadius: 2 }} /> Revenue
            </span>
          </div>

          <div style={{ marginTop: 28 }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: ".14em", marginBottom: 8 }}>ROI BY MONTH</div>
            <RoiBars rows={FICAR.rows} />
          </div>
        </div>

        <div style={{ padding: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
            {FICAR.highlights.map(([l, v, s]) =>
            <div key={l} className="kpi" style={{ padding: "14px 16px" }}>
                <div className="lbl">{l}</div>
                <div className="val" style={{ fontSize: 24, color: "var(--accent)" }}>{v}</div>
                <div className="sub">{s}</div>
              </div>
            )}
          </div>
          <div>
            <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: ".14em", marginBottom: 8 }}>MONTHLY LEDGER</div>
            <table className="tbl">
              <thead><tr><th>Tháng</th><th>Spend</th><th>Revenue</th><th>ROI</th><th>CR%</th></tr></thead>
              <tbody>
                {FICAR.rows.map((r) =>
                <tr key={r.m}>
                    <td>{r.m}</td>
                    <td>{r.spend}M</td>
                    <td className="up">{r.rev}M</td>
                    <td>{r.roi}x</td>
                    <td>{r.cr}%</td>
                  </tr>
                )}
              </tbody>
            </table>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--mute)", marginTop: 18 }}>
              Bài học: structure CBO + creative refresh 7–10 ngày, audit CPmess hằng ngày. Giữ CPmess 9.7k–20k₫ suốt 10 tháng dù scale spend x3.
            </p>
          </div>
        </div>
      </div>
    </div>);

}

function AlohaCase() {
  const t4 = ALOHA.rows[1];
  return (
    <div className="case">
      <CaseHead idx="02" title="Kỷ yếu Aloha Sài Gòn" industry="Chụp ảnh kỷ yếu" period={ALOHA.period} tag="seasonal" kpi="87% KPI đơn · T4" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 0 }}>
        <div style={{ padding: 24, borderRight: "1px solid var(--line)" }}>
          <div style={{ display: "flex", gap: 22, alignItems: "center", marginBottom: 18 }}>
            <Donut value={87} label="ĐƠN" />
            <Donut value={74} label="DOANH SỐ" />
            <div>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--mute)", letterSpacing: ".14em" }}>KPI ATTAINMENT</div>
              <div className="mono" style={{ fontSize: 12, color: "var(--text)", marginTop: 6, lineHeight: 1.6 }}>
                T4/2026 ·<br />52/60 đơn · 578.6M/780M
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {ALOHA.highlights.map(([l, v, s]) =>
            <div key={l} className="kpi" style={{ padding: "14px 16px" }}>
                <div className="lbl">{l}</div>
                <div className="val" style={{ fontSize: 22, color: "var(--accent)" }}>{v}</div>
                <div className="sub">{s}</div>
              </div>
            )}
          </div>

          <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--mute)", marginTop: 18 }}>
            Mùa cao điểm: gom 1.092 leads chất lượng trong 1 tháng. Tỷ lệ data tiềm năng 100% — không có data rác. CPO online 897k₫ thấp hơn KPI nội bộ.
          </p>
        </div>

        <div style={{ padding: 24 }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: ".14em", marginBottom: 8 }}>3-MONTH PROGRESSION</div>
          <table className="tbl">
            <thead><tr><th>Tháng</th><th>Spend</th><th>Doanh thu</th><th>Đơn</th><th>CPO</th><th>ME/RE</th></tr></thead>
            <tbody>
              {ALOHA.rows.map((r) =>
              <tr key={r.m}>
                  <td>{r.m}{r.ongoing && <span style={{ color: "var(--mute)" }}> · ongoing</span>}</td>
                  <td>{r.spend}M</td>
                  <td className="up">{r.rev}M</td>
                  <td>{r.orders}</td>
                  <td className={r.cpo > 1000 ? "warn" : ""}>{r.cpo}k</td>
                  <td>{r.rate}%</td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={{ marginTop: 22 }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: ".14em", marginBottom: 12 }}>SPEND → REVENUE PROGRESSION</div>
            <DualBars rows={ALOHA.rows} height={180} />
          </div>
        </div>
      </div>
    </div>);

}

function FflCase() {
  return (
    <div className="case">
      <CaseHead idx="03" title="FitForLife Gym & Pilates" industry="Premium fitness" period={FFL.period} tag="quick-launch" kpi="CTR 44.15% Recruit" />
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 0 }}>
        <div style={{ padding: 24, borderRight: "1px solid var(--line)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {FFL.highlights.map(([l, v, s]) =>
            <div key={l} className="kpi" style={{ padding: "14px 16px" }}>
                <div className="lbl">{l}</div>
                <div className="val" style={{ fontSize: 22, color: "var(--accent)" }}>{v}</div>
                <div className="sub">{s}</div>
              </div>
            )}
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--mute)", marginTop: 18 }}>
            Setup &amp; test nhanh cho ngành premium fitness. Tuần đầu CPA cao do warm-up pixel; sau 20 ngày CPA/mess về 62.9k₫ — rất tốt cho phân khúc giá cao.
            Campaign tuyển dụng đạt CTR 44.15% — outlier so với benchmark ngành.
          </p>
          <div style={{ marginTop: 12, padding: 14, border: "1px dashed var(--line-2)", borderRadius: 10, background: "rgba(200,255,62,.03)" }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".14em" }}>LEARNING</div>
            <div style={{ fontSize: 13.5, color: "var(--text)", marginTop: 6, lineHeight: 1.55 }}>
              Scale từ 2.1M → 8.9M chỉ trong 1 tháng, lượng mess tăng <b style={{ color: "var(--accent)" }}>x10</b> mà CPA vẫn giảm — chứng tỏ creative & audience đã chạm đúng segment.
            </div>
          </div>
        </div>

        <div style={{ padding: 24 }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: ".14em", marginBottom: 8 }}>CAMPAIGN LEDGER</div>
          <table className="tbl">
            <thead><tr><th>Period</th><th>Spend</th><th>Mess</th><th>CPA</th><th>CTR</th><th>Type</th></tr></thead>
            <tbody>
              {FFL.rows.map((r) =>
              <tr key={r.m}>
                  <td>{r.m}</td>
                  <td>{r.spend}M</td>
                  <td>{r.mess}</td>
                  <td>{r.cpa}k</td>
                  <td className="up">{r.ctr}%</td>
                  <td><span className="tag" style={{ fontFamily: "JetBrains Mono", fontSize: 10, padding: "2px 6px", border: "1px solid var(--line-2)", borderRadius: 4, color: "var(--mute)" }}>{r.kind}</span></td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={{ marginTop: 22 }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: ".14em", marginBottom: 12 }}>CPA TRAJECTORY (₫k / mess)</div>
            <div className="panel soft" style={{ padding: 16 }}>
              <RevealSparkline data={[119, 95, 78, 70, 65, 62.9]} width={420} height={70} strokeWidth={2} duration={1800} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <span className="mono" style={{ fontSize: 10.5, color: "var(--mute)" }}>start · 119k</span>
                <span className="mono" style={{ fontSize: 10.5, color: "var(--accent)" }}>now · 62.9k ↓47%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}

/* ────────────────────────────────────────────────────────────────────── */
/* PORTFOLIO (creative bonus)                                             */
/* ────────────────────────────────────────────────────────────────────── */
const CREATIVES = [
{ id: "ficar-standee", src: "media/ficar-standee.jpg", brand: "FICAR · Trợ Lý Oto", kind: "Standee + key visual", label: "Mua lốp chuẩn — không lo hớ", ratio: "1:2.35", col: "1 / 5", row: "span 2", featured: true },
{ id: "ffl-8tuan", src: "media/ffl-8tuan.jpg", brand: "FitForLife", kind: "Carousel cover · IG", label: "8 tuần Pilates 1-1 — cơ thể thay đổi?", ratio: "4:5", col: "5 / 9" },
{ id: "ffl-reformer", src: "media/ffl-reformer.jpg", brand: "FitForLife", kind: "Single post · IG", label: "Pilates Reformer — thiết bị cốt lõi", ratio: "4:5", col: "9 / 13" },
{ id: "ficar-tcdm", src: "media/ficar-thu-cu-doi-moi.png", brand: "FICAR · Trợ Lý Oto", kind: "Static post · campaign", label: "Thu cũ đổi mới — Hankook · 1.000K", ratio: "1:1", col: "5 / 9" },
{ id: "ffl-phuchoi", src: "media/ffl-phuchoi.jpeg", brand: "FitForLife", kind: "Single post · IG", label: "Cơ thể cần phục hồi sau mỗi buổi tập", ratio: "4:5", col: "9 / 13" },
{ id: "ficar-bs", src: "media/ficar-bridgestone.png", brand: "FICAR · Thành Phát", kind: "Static post · promo", label: "Mua 3 tặng 1 — Bridgestone", ratio: "1:1", col: "1 / 5" },
{ id: "ficar-sailun", src: "media/ficar-sailun.png", brand: "FICAR · Trợ Lý Oto", kind: "Static post · promo", label: "Tài trợ vàng — Sailun · −400K", ratio: "1:1", col: "5 / 9" },
{ id: "ficar-laufenn", src: "media/ficar-laufenn.png", brand: "FICAR · Trợ Lý Oto", kind: "Static post · promo", label: "Mua 3 tặng 1 — Laufenn", ratio: "1:1", col: "9 / 13" }];


const VIDEOS = [
{ id: "tt1", external: "https://www.tiktok.com/@trolyoto.chamxe/video/7638458387277073680", brand: "FICAR · @trolyoto.chamxe", kind: "TikTok · 9:16", label: "Tip chăm xe — clip 5", duration: "TikTok" },
{ id: "tt2", external: "https://www.tiktok.com/@trolyoto.chamxe/video/7630748979306777873", brand: "FICAR · @trolyoto.chamxe", kind: "TikTok · 9:16", label: "Tip chăm xe — clip 4", duration: "TikTok" },
{ id: "tt3", external: "https://www.tiktok.com/@trolyoto.chamxe/video/7628197262941752577", brand: "FICAR · @trolyoto.chamxe", kind: "TikTok · 9:16", label: "Tip chăm xe — clip 3", duration: "TikTok" },
{ id: "tt4", external: "https://www.tiktok.com/@trolyoto.chamxe/video/7627057263223655697", brand: "FICAR · @trolyoto.chamxe", kind: "TikTok · 9:16", label: "Tip chăm xe — clip 2", duration: "TikTok" },
{ id: "tt5", external: "https://www.tiktok.com/@trolyoto.chamxe/video/7615572978096540929", brand: "FICAR · @trolyoto.chamxe", kind: "TikTok · 9:16", label: "Tip chăm xe — clip 1", duration: "TikTok" }];


function Portfolio({ onOpen }) {
  return (
    <section id="work" style={{ paddingTop: 120 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">04 / creative — bonus</div>
            <h2 style={{ marginTop: 12 }}>Ảnh thiết kế <span style={{ color: "var(--mute)" }}>—</span><br />đủ chủ động cho ads.</h2>
          </div>
          <div className="meta">
            <span className="section-num">SECTION 04 · {CREATIVES.length} STATIC · {VIDEOS.length} VIDEO</span>
            <span className="mono" style={{ fontSize: 12, color: "var(--mute)" }}>Static post · standee · carousel · reels</span>
          </div>
        </div>

        <div className="cgrid">
          {CREATIVES.map((c, i) =>
          <CreativeCard key={c.id} item={c} idx={i} onOpen={onOpen} />
          )}
        </div>

        <div className="mono" style={{ marginTop: 18, fontSize: 12, color: "var(--mute)", textAlign: "right" }}>
          → click 1 ảnh bất kỳ để xem fullscreen
        </div>

        {/* VIDEO REEL */}
        <div style={{ marginTop: 80 }}>
          <div className="section-head">
            <div>
              <div className="eyebrow">04b / video reel</div>
              <h2 style={{ marginTop: 12, fontSize: 36 }}>Reels &amp; TikTok edit.</h2>
            </div>
            <div className="meta">
              <span className="section-num">{VIDEOS.length} CLIPS · 9:16 · 1:1</span>
              <span className="mono" style={{ fontSize: 12, color: "var(--mute)" }}>Cắt cho ads chuyển đổi tin nhắn</span>
            </div>
          </div>

          <div className="vgrid">
            {VIDEOS.map((v, i) => <VideoCard key={v.id} item={v} idx={i} onOpen={onOpen} />)}
          </div>

          <div className="upload-note">
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: ".18em", color: "var(--accent)", textTransform: "uppercase" }}>How to add videos</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginTop: 12 }}>
              <div>
                <div className="mono" style={{ fontSize: 11, color: "var(--text)", marginBottom: 4 }}>1 · Upload .mp4</div>
                <div style={{ fontSize: 13, color: "var(--mute)", lineHeight: 1.55 }}>Kéo thả file mp4 (≤25MB/clip) vào chat như khi up ảnh. Mình copy vào <span className="mono" style={{ color: "var(--accent)" }}>media/</span> và embed.</div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 11, color: "var(--text)", marginBottom: 4 }}>2 · Link YouTube / Vimeo</div>
                <div style={{ fontSize: 13, color: "var(--mute)", lineHeight: 1.55 }}>Gửi link, mình embed iframe full-screen được luôn.</div>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 11, color: "var(--text)", marginBottom: 4 }}>3 · Link Reels / TikTok</div>
                <div style={{ fontSize: 13, color: "var(--mute)", lineHeight: 1.55 }}>Reels/TikTok không cho embed bên ngoài. Mình sẽ làm <em style={{ fontStyle: "normal", color: "var(--accent)" }}>thumbnail card → click sang link gốc</em>.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function VideoCard({ item, idx, onOpen }) {
  const isPh = !item.src && !item.external;
  const isExternal = !!item.external;
  const handleClick = () => {
    if (isExternal) window.open(item.external, "_blank", "noopener,noreferrer");else
    if (item.src) onOpen && onOpen({ ...item, video: true });
  };
  return (
    <div
      className="vcard"
      style={{ cursor: isPh ? "default" : "pointer" }}
      onClick={handleClick}>
      
      <div className={"vcard-frame" + (isPh || isExternal ? " placeholder" : "")}>
        {item.src &&
        <video src={item.src} muted loop playsInline preload="metadata"
        onMouseEnter={(e) => e.target.play()} onMouseLeave={(e) => e.target.pause()} />
        }
        {isExternal &&
        <div className="tt-card">
            <div className="tt-bg" />
            <div className="tt-logo">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M27.5 6.5c.6 2.3 2.4 4.2 4.7 4.8v4.4c-2.4 0-4.6-.8-6.4-2.1v9.6c0 4.8-3.9 8.8-8.8 8.8s-8.8-3.9-8.8-8.8 3.9-8.8 8.8-8.8c.5 0 .9 0 1.4.1v4.6c-.4-.1-.9-.2-1.4-.2-2.4 0-4.4 2-4.4 4.4s2 4.4 4.4 4.4 4.4-2 4.4-4.4V6.5h6.1z" fill="#fff" />
                <path d="M27.5 6.5c.6 2.3 2.4 4.2 4.7 4.8v4.4c-2.4 0-4.6-.8-6.4-2.1v9.6c0 4.8-3.9 8.8-8.8 8.8s-8.8-3.9-8.8-8.8 3.9-8.8 8.8-8.8c.5 0 .9 0 1.4.1v4.6c-.4-.1-.9-.2-1.4-.2-2.4 0-4.4 2-4.4 4.4s2 4.4 4.4 4.4 4.4-2 4.4-4.4V6.5h6.1z" fill="#25f4ee" style={{ mixBlendMode: "screen", transform: "translate(-2px,-1px)" }} />
                <path d="M27.5 6.5c.6 2.3 2.4 4.2 4.7 4.8v4.4c-2.4 0-4.6-.8-6.4-2.1v9.6c0 4.8-3.9 8.8-8.8 8.8s-8.8-3.9-8.8-8.8 3.9-8.8 8.8-8.8c.5 0 .9 0 1.4.1v4.6c-.4-.1-.9-.2-1.4-.2-2.4 0-4.4 2-4.4 4.4s2 4.4 4.4 4.4 4.4-2 4.4-4.4V6.5h6.1z" fill="#fe2c55" style={{ mixBlendMode: "screen", transform: "translate(2px,1px)" }} />
              </svg>
            </div>
            <div className="tt-handle mono">@trolyoto.chamxe</div>
            <div className="tt-play">
              <svg width="48" height="48" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="23" fill="rgba(0,0,0,.5)" stroke="rgba(255,255,255,.6)" strokeWidth="1.2" />
                <path d="M19 15 L34 24 L19 33 Z" fill="#fff" />
              </svg>
            </div>
            <div className="tt-id mono">#{item.id.replace("tt", "")}</div>
          </div>
        }
        {isPh && !isExternal &&
        <div className="ph-inner" style={{ textAlign: "center", padding: 24 }}>
            <svg width="36" height="36" viewBox="0 0 36 36" style={{ opacity: .45 }}>
              <circle cx="18" cy="18" r="17" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
              <path d="M14 11 L26 18 L14 25 Z" fill="var(--accent)" />
            </svg>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--mute)", letterSpacing: ".14em", marginTop: 10, textTransform: "uppercase" }}>awaiting upload</div>
          </div>
        }
        <div className="vcard-overlay">
          <span className="mono" style={{ fontSize: 10.5, color: "var(--accent)", letterSpacing: ".14em" }}>/ {String(idx + 1).padStart(2, "0")}</span>
          <span className="mono" style={{ fontSize: 10.5, color: "var(--text)", letterSpacing: ".14em" }}>{isExternal ? "OPEN ↗" : item.duration}</span>
        </div>
      </div>
      <div className="cgrid-caption" style={{ marginTop: 10 }}>
        <div className="mono" style={{ fontSize: 10.5, color: "var(--mute)", letterSpacing: ".14em", textTransform: "uppercase" }}>{item.brand}</div>
        <div style={{ fontSize: 14, color: "var(--text)", marginTop: 4, lineHeight: 1.4 }}>{item.label}</div>
        <div className="mono" style={{ fontSize: 10.5, color: "var(--mute-2)", marginTop: 4 }}>{item.kind}</div>
      </div>
    </div>);

}

function CreativeCard({ item, idx, onOpen }) {
  const isPh = !item.src;
  const span2 = item.row === "span 2";
  return (
    <div
      className="cgrid-item"
      style={{
        gridColumn: item.col,
        gridRow: item.row || "auto",
        cursor: isPh ? "default" : "zoom-in"
      }}
      onClick={() => !isPh && onOpen(item)}>
      
      <div className={"cgrid-frame" + (span2 ? " tall" : "") + (isPh ? " placeholder" : "")}>
        {item.src ?
        <img src={item.src} alt={item.label} loading="lazy" /> :

        <div className="ph-inner">
            <div className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: ".14em", textTransform: "uppercase" }}>placeholder</div>
            <div className="mono" style={{ fontSize: 11, color: "var(--accent)", marginTop: 8 }}>file pending</div>
          </div>
        }

        <div className="cgrid-overlay">
          <span className="mono" style={{ fontSize: 10.5, color: "var(--accent)", letterSpacing: ".14em" }}>
            / {String(idx + 1).padStart(2, "0")}
          </span>
          {!isPh && <span className="mono" style={{ fontSize: 10.5, color: "var(--text)", letterSpacing: ".14em" }}>VIEW ↗</span>}
        </div>
      </div>

      <div className="cgrid-caption">
        <div className="mono" style={{ fontSize: 10.5, color: "var(--mute)", letterSpacing: ".14em", textTransform: "uppercase" }}>
          {item.brand}
        </div>
        <div style={{ fontSize: 14, color: "var(--text)", marginTop: 4, lineHeight: 1.4 }}>{item.label}</div>
        <div className="mono" style={{ fontSize: 10.5, color: "var(--mute-2)", marginTop: 4 }}>
          {item.kind}{item.ratio ? ` · ${item.ratio}` : ""}
        </div>
      </div>
    </div>);

}

/* Lightbox */
function Lightbox({ item, onClose }) {
  React.useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!item) return null;
  return (
    <div className="lbox" onClick={onClose}>
      <div className="lbox-inner" onClick={(e) => e.stopPropagation()}>
        {item.video ?
        <video src={item.src} controls autoPlay style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: 10, background: "#0a0b0e" }} /> :

        <img src={item.src} alt={item.label} />
        }
        <div className="lbox-meta">
          <div>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--mute)", letterSpacing: ".14em", textTransform: "uppercase" }}>{item.brand}</div>
            <div style={{ fontSize: 16, color: "var(--text)", marginTop: 4 }}>{item.label}</div>
            <div className="mono" style={{ fontSize: 11, color: "var(--mute-2)", marginTop: 4 }}>{item.kind}{item.ratio ? ` · ${item.ratio}` : ""}</div>
          </div>
          <button className="btn" onClick={onClose}>Đóng · Esc</button>
        </div>
      </div>
    </div>);

}

Object.assign(window, { Lightbox });

/* ────────────────────────────────────────────────────────────────────── */
/* WORKFLOW                                                               */
/* ────────────────────────────────────────────────────────────────────── */
function Workflow() {
  return (
    <section id="process" style={{ paddingTop: 120 }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">05 / quy trình</div>
            <h2 style={{ marginTop: 12 }}>5 bước, vòng lặp tuần.</h2>
          </div>
          <div className="meta">
            <span className="section-num">SECTION 05</span>
            <span className="mono" style={{ fontSize: 12, color: "var(--mute)" }}>From audit to scale</span>
          </div>
        </div>

        <div className="flow">
          {WORKFLOW.map((s, i) =>
          <div key={s.n} className="flow-step">
              <div className="n">/ {s.n}</div>
              <h5>{s.title}</h5>
              <p>{s.desc}</p>
              {i < WORKFLOW.length - 1 &&
            <div style={{ position: "absolute", top: 28, right: -10, color: "var(--mute-2)", fontFamily: "JetBrains Mono", fontSize: 14, display: "none" }} className="arrow-hidden">→</div>
            }
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ────────────────────────────────────────────────────────────────────── */
/* CONTACT / FOOTER                                                       */
/* ────────────────────────────────────────────────────────────────────── */
function ContactFooter() {
  return (
    <footer id="contact">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 40, alignItems: "start" }}>
          <div>
            <div className="eyebrow">06 / contact</div>
            <h2 style={{ fontSize: 64, lineHeight: .98, letterSpacing: "-.02em", fontWeight: 600, margin: "14px 0 18px" }}>
              Sẵn sàng<br />cho dự án tiếp theo<span style={{ color: "var(--accent)" }}>.</span>
            </h2>
            <p style={{ color: "var(--mute)", fontSize: 16, lineHeight: 1.55, maxWidth: 460 }}>
              Đặt lịch trao đổi 30 phút để mình audit nhanh tình hình ads hiện tại của bạn. Miễn phí, không cam kết.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
              <a href="mailto:danhminh66@gmail.com" className="btn primary">danhminh66@gmail.com</a>
              <a href="https://www.facebook.com/minhdanh66/" target="_blank" rel="noreferrer" className="btn">Facebook ↗</a>
              <a href="tel:0528548406" className="btn">0528 548 406</a>
            </div>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Liên hệ</div>
            <div className="mono" style={{ fontSize: 13, lineHeight: 2, color: "var(--text)" }}>
              <div><span style={{ color: "var(--mute)" }}>EMAIL  </span>danhminh66@gmail.com</div>
              <div><span style={{ color: "var(--mute)" }}>PHONE  </span>0528 548 406</div>
              <div><span style={{ color: "var(--mute)" }}>FB     </span>fb.com/minhdanh66</div>
              <div><span style={{ color: "var(--mute)" }}>BASE   </span>Hà Nội, Việt Nam</div>
            </div>
          </div>

          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Status</div>
            <div className="mono" style={{ fontSize: 13, lineHeight: 2, color: "var(--text)" }}>
              <div><PulseDot color="var(--up)" /> Available · T6/2026</div>
              <div><span style={{ color: "var(--mute)" }}>RESPONSE  </span>&lt; 2h trong giờ</div>
              <div><span style={{ color: "var(--mute)" }}>BUDGET    </span>≥ 10M₫/tháng</div>
              <div><span style={{ color: "var(--mute)" }}>SLOTS     </span>02 / Q3-2026</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 60, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
          <span className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: ".14em" }}>© 2026 NGUYỄN CAO DANH MINH</span>
          <span className="mono" style={{ fontSize: 11, color: "var(--mute)", letterSpacing: ".14em" }}>BUILT WITH HTML · NO TEMPLATE</span>
          <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: ".14em" }}>● SYSTEM ONLINE</span>
        </div>
      </div>
    </footer>);

}

Object.assign(window, { Header, Hero, TickerMarquee, Services, CaseStudies, Portfolio, Workflow, ContactFooter });