function Hero({ onEstimate }) {
  const [wallpaper, setWallpaper] = React.useState(() => {
    try { return localStorage.getItem("pinders_wp") || "meadow"; } catch { return "meadow"; }
  });
  const changeWp = (id) => {
    setWallpaper(id);
    try { localStorage.setItem("pinders_wp", id); } catch {}
  };

  const [time, setTime] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const h = time.getHours();
  const greeting = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  const season = [0,1].includes(time.getMonth()) ? "Winter" : [2,3,4].includes(time.getMonth()) ? "Spring" : [5,6,7].includes(time.getMonth()) ? "Summer" : "Autumn";

  const current = WALLPAPERS.find(w => w.id === wallpaper) || WALLPAPERS[0];

  return (
    <section id="top" className="hero-section" style={{
      position: "relative", minHeight: "100vh",
      background: "var(--ink)", overflow: "hidden", color: "var(--bone)",
      display: "flex", flexDirection: "column", justifyContent: "flex-end",
      paddingBottom: 80,
    }}>
      <WallpaperHost id={wallpaper}/>

      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: "45%",
        background: "linear-gradient(180deg, transparent 0%, rgba(11,20,16,0.85) 80%)",
        pointerEvents: "none", zIndex: 1,
      }}/>

      <div className="hide-sm" style={{
        position: "absolute", top: 100, left: 0, right: 0, zIndex: 3,
        display: "flex", justifyContent: "center", gap: 28,
        color: "var(--sage)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.15em",
        textTransform: "uppercase", pointerEvents: "none",
      }}>
        <span>◉ Booking {season} 2026</span>
        <span>{greeting}, Marlton · 68°F · Clear</span>
        <span>Wallpaper: {current.name.toLowerCase()}</span>
      </div>

      <div style={{ position: "relative", zIndex: 3, maxWidth: 1400, margin: "0 auto", padding: "0 28px", width: "100%", pointerEvents: "none" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "end" }} className="hero-grid">
          <div style={{ pointerEvents: "auto" }}>
            <div className="eyebrow" style={{ color: "var(--lime)", marginBottom: 24 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--lime)", verticalAlign: "middle", marginRight: 10 }}/>
              Marlton · Medford · Evesham Twp.
            </div>
            <h1 className="serif" style={{
              fontSize: "clamp(56px, 8vw, 128px)",
              lineHeight: 0.92, fontWeight: 400,
              letterSpacing: "-0.03em", marginBottom: 28,
            }}>
              The quiet art<br/>
              of a <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--lime)" }}>well-kept</em><br/>
              property.
            </h1>
            <p style={{
              fontSize: 17, lineHeight: 1.55, maxWidth: 480,
              color: "rgba(242,237,226,0.8)", marginBottom: 36,
            }}>
              Family-run, environmentally friendly grounds care in Burlington County since 2008. Weekly mowing, gardens, hardscape — all handled by the same crew, season after season.<span className="hide-sm"> The background is interactive — move your mouse.</span>
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={onEstimate} style={{
                padding: "16px 28px", background: "var(--lime)", color: "var(--ink)",
                fontSize: 15, fontWeight: 500, borderRadius: 999,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                Schedule a free estimate <Icon.arrow/>
              </button>
              <a href="#work" style={{
                padding: "16px 28px", border: "1px solid var(--line)", color: "var(--bone)",
                fontSize: 15, borderRadius: 999, display: "flex", alignItems: "center", gap: 10,
                backdropFilter: "blur(8px)", background: "rgba(11,20,16,0.3)",
              }}>
                See the work
              </a>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", pointerEvents: "auto" }} className="hero-right">
            <div style={{
              width: "100%", maxWidth: 400,
              background: "rgba(11,20,16,0.55)", border: "1px solid var(--line)",
              backdropFilter: "blur(20px)", borderRadius: 4, padding: 22,
            }}>
              <div className="mono" style={{ color: "var(--sage)", marginBottom: 18, display: "flex", justifyContent: "space-between" }}>
                <span>Today's crew schedule</span>
                <span style={{ color: "var(--lime)" }}>◉ live</span>
              </div>
              {[
                { t: "7:00a", p: "Kings Grant — weekly mow", crew: "A" },
                { t: "9:30a", p: "Medford Lakes — bed install", crew: "B" },
                { t: "11:00a", p: "Mt. Laurel — hedge trim", crew: "A" },
                { t: "1:30p", p: "Evesham — paver estimate", crew: "—" },
                { t: "3:00p", p: "Marlton — fall cleanup", crew: "C" },
              ].map((r, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "56px 1fr 24px",
                  padding: "10px 0", borderTop: i === 0 ? "none" : "1px solid var(--line)",
                  alignItems: "center", gap: 12, fontSize: 13,
                }}>
                  <div className="mono" style={{ color: "var(--sage)" }}>{r.t}</div>
                  <div>{r.p}</div>
                  <div className="mono" style={{ color: "var(--lime)", fontSize: 10, textAlign: "right" }}>crew {r.crew}</div>
                </div>
              ))}
              <div style={{
                marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--line)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                fontSize: 12, color: "var(--sage)",
              }}>
                <span>3 estimate slots open this week</span>
                <button onClick={onEstimate} style={{ color: "var(--lime)", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                  Reserve <Icon.arrowUp/>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          marginTop: 80, paddingTop: 28, borderTop: "1px solid var(--line)",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
          pointerEvents: "auto",
        }} className="stats-row">
          {DATA.stats.map((s, i) => (
            <div key={i}>
              <div className="serif" style={{ fontSize: 44, fontWeight: 300, lineHeight: 1, letterSpacing: "-0.02em" }}>{s.k}</div>
              <div className="mono" style={{ color: "var(--sage)", marginTop: 8, fontSize: 10 }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      <WallpaperPicker value={wallpaper} onChange={changeWp}/>

      <style>{`
        @media (max-width: 900px) {
          .hero-section { justify-content: flex-start !important; padding-top: 96px !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
          .stats-row { grid-template-columns: repeat(2, 1fr) !important; }
          .hide-sm { display: none !important; }
        }
      `}</style>
    </section>
  );
}
window.Hero = Hero;
