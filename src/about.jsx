function About({ onEstimate }) {
  return (
    <section id="about" style={{
      background: "var(--paper)", color: "var(--ink)",
      padding: "120px 28px", overflow: "hidden", position: "relative",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="about-grid">
          <div style={{ position: "relative" }}>
            <div style={{ aspectRatio: "4/5", borderRadius: 4, overflow: "hidden" }}>
              <Scene kind="hedge" ratio="4/5" label="Crew · summer 2025"/>
            </div>
            <div style={{
              position: "absolute", bottom: -30, right: -30,
              width: 180, aspectRatio: "1",
              borderRadius: 999, background: "var(--forest)", color: "var(--lime)",
              display: "flex", alignItems: "center", justifyContent: "center",
              textAlign: "center", padding: 24,
              animation: "spin 30s linear infinite", transformOrigin: "center",
            }}>
              <svg viewBox="0 0 200 200" width="100%" height="100%">
                <defs>
                  <path id="circlePath" d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"/>
                </defs>
                <text fill="currentColor" style={{ fontFamily: "var(--mono)", fontSize: 12, letterSpacing: "0.2em" }}>
                  <textPath href="#circlePath">FAMILY RUN · LICENSED · INSURED · SINCE 2008 ·&nbsp;&nbsp;</textPath>
                </text>
                <g transform="translate(100 100)" fill="currentColor">
                  <path d="M -15 0 C -15 -10, -5 -15, 0 -15 C 5 -15, 15 -10, 15 0 C 15 10, 5 15, 0 15 C -5 15, -15 10, -15 0z" opacity="0.9"/>
                </g>
              </svg>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>

          <div>
            <div className="eyebrow" style={{ color: "var(--moss)", marginBottom: 20 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--moss)", verticalAlign: "middle", marginRight: 10 }}/>
              06 — About Pinder's
            </div>
            <h2 className="serif" style={{
              fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1,
              fontWeight: 400, letterSpacing: "-0.03em",
              color: "var(--forest)", marginBottom: 28,
            }}>
              A landscaping company<br/>run by people who<br/>
              <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--moss)" }}>actually landscape.</em>
            </h2>
            <div style={{ fontSize: 16, lineHeight: 1.65, color: "rgba(11,20,16,0.75)", display: "grid", gap: 16, marginBottom: 32 }}>
              <p>Rob Pinder grew up mowing his neighbors' lawns in Marlton. Seventeen years later, his crew of eight still works within the same handful of zip codes — same trucks, same day of the week, same knock on the door.</p>
              <p>We stayed small on purpose. It means your estimate is done by the owner, the crew leader knows your dog, and a dead shrub doesn't get lost in a ticket queue.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, paddingTop: 28, borderTop: "1px solid var(--line-dark)" }}>
              {[
                ["Licensed", "NJ 13VH-10432"],
                ["Insured", "$2M liability"],
                ["Safety", "EPA Cert. pesticide"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="mono" style={{ color: "var(--moss)", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 14, color: "var(--forest)" }}>{v}</div>
                </div>
              ))}
            </div>
            <button onClick={onEstimate} style={{
              marginTop: 36, padding: "16px 26px", background: "var(--forest)", color: "var(--lime)",
              borderRadius: 999, fontSize: 14, fontWeight: 500,
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>
              Meet the crew — book an estimate <Icon.arrow/>
            </button>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>
  );
}
window.About = About;
