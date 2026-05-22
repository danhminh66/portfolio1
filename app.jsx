// Root app.

const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroLayout": "terminal",
  "motion": true,
  "cursorGlow": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lightbox, setLightbox] = useState(null);

  // Toggle no-motion class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle("no-motion", !t.motion);
  }, [t.motion]);

  return (
    <>
      <CursorSpotlight enabled={t.motion && t.cursorGlow} />
      <Header />
      <div className="rise">
        <Hero layout={t.heroLayout} />
      </div>
      <TickerMarquee />
      <Services />
      <CaseStudies />
      <Portfolio onOpen={setLightbox} />
      <Workflow />
      <ContactFooter />
      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero">
          <TweakSelect
            label="Layout"
            value={t.heroLayout}
            onChange={(v) => setTweak("heroLayout", v)}
            options={[
              { value: "terminal",  label: "A · Terminal + KPI rail" },
              { value: "split",     label: "B · Big-type split" },
              { value: "editorial", label: "C · Editorial centered" },
              { value: "dashboard", label: "D · KPI dashboard" },
            ]}
          />
        </TweakSection>
        <TweakSection label="Motion">
          <TweakToggle
            label="Hiệu ứng động"
            value={t.motion}
            onChange={(v) => setTweak("motion", v)}
          />
          <TweakToggle
            label="Cursor glow"
            value={t.cursorGlow}
            onChange={(v) => setTweak("cursorGlow", v)}
          />
          <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "rgba(255,255,255,.5)", lineHeight: 1.5, marginTop: 6 }}>
            Tắt nếu cần screenshot tĩnh hoặc thiết bị yếu.
          </div>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
