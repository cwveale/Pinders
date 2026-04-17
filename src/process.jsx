function Process() {
  const steps = [
    { n: "01", t: "Walk the property", d: "We meet you on-site, walk every bed and corner, and listen. No clipboard sales pitch.", tag: "Day 1" },
    { n: "02", t: "A plan you'll recognize", d: "Within 24 hours you get a written scope, a fixed-price quote, and a start window. Plain English.", tag: "Day 2" },
    { n: "03", t: "We show up", d: "Same crew, same truck, same day of the week. Arrival window texted the night before.", tag: "Week 1+" },
    { n: "04", t: "We keep showing up", d: "Weekly, seasonal, or project-based. You get a report after every visit with photos of what we did.", tag: "Ongoing" },
  ];

  return (
    <section id="process" style={{
      background: "var(--forest)", color: "var(--bone)",
      padding: "120px 28px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: "20%", right: "-5%", opacity: 0.06,
        fontFamily: "var(--serif)", fontSize: "28vw", fontWeight: 300,
        letterSpacing: "-0.05em", lineHeight: 1, color: "var(--lime)",
        pointerEvents: "none", fontStyle: "italic",
      }}>
        keep.
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 80 }} className="proc-head">
          <div>
            <div className="eyebrow" style={{ color: "var(--lime)", marginBottom: 20 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--lime)", verticalAlign: "middle", marginRight: 10 }}/>
              03 — How we work
            </div>
            <h2 className="serif" style={{
              fontSize: "clamp(42px, 6vw, 84px)", lineHeight: 0.95,
              fontWeight: 400, letterSpacing: "-0.03em",
            }}>
              No surprises.<br/>
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>Ever.</em>
            </h2>
          </div>
          <div style={{ alignSelf: "end" }}>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(242,237,226,0.7)", maxWidth: 440 }}>
              Our goal is to be the easiest call you make all season. Here's exactly what happens from the first ring to the hundredth mow.
            </p>
          </div>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1,
          background: "var(--line)",
          border: "1px solid var(--line)",
        }} className="proc-grid">
          {steps.map((s, i) => (
            <div key={s.n} style={{
              background: "var(--forest)",
              padding: 32, minHeight: 300,
              display: "flex", flexDirection: "column",
              justifyContent: "space-between",
              transition: "background .3s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#163524"}
              onMouseLeave={e => e.currentTarget.style.background = "var(--forest)"}
            >
              <div>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  marginBottom: 28,
                }}>
                  <div className="serif" style={{ fontSize: 48, fontWeight: 300, color: "var(--lime)", lineHeight: 1 }}>
                    {s.n}
                  </div>
                  <span className="mono" style={{ color: "var(--sage)" }}>{s.tag}</span>
                </div>
                <h3 className="serif" style={{
                  fontSize: 26, fontWeight: 400, lineHeight: 1.1,
                  letterSpacing: "-0.015em", marginBottom: 14,
                }}>
                  {s.t}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "rgba(242,237,226,0.7)" }}>
                  {s.d}
                </p>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 900px) {
            .proc-head { grid-template-columns: 1fr !important; }
            .proc-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 560px) {
            .proc-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
window.Process = Process;
