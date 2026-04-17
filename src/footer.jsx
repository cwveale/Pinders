function CtaFooter({ onEstimate }) {
  return (
    <>
      <section style={{
        background: "var(--lime)", color: "var(--ink)",
        padding: "100px 28px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr", gap: 48, alignItems: "center" }} className="cta-grid">
          <h2 className="serif" style={{
            fontSize: "clamp(48px, 8vw, 128px)", lineHeight: 0.9,
            fontWeight: 400, letterSpacing: "-0.035em",
          }}>
            Let's get you<br/>
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>on the route.</em>
          </h2>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 24, color: "rgba(11,20,16,0.8)" }}>
              Most first-time estimates happen within three business days. We'll walk the property, write a plan, and you'll know exactly what you're getting.
            </p>
            <button onClick={onEstimate} style={{
              padding: "18px 28px", background: "var(--ink)", color: "var(--lime)",
              borderRadius: 999, fontSize: 15, fontWeight: 500,
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>
              Schedule a free estimate <Icon.arrow/>
            </button>
          </div>
        </div>
        <style>{`@media (max-width: 820px) { .cta-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      <footer style={{
        background: "var(--ink)", color: "var(--bone)", padding: "80px 28px 28px",
        borderTop: "1px solid var(--line)",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }} className="ft-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <Icon.mark style={{ color: "var(--lime)" }}/>
                <div>
                  <div className="serif" style={{ fontSize: 22, fontWeight: 500 }}>Pinder's</div>
                  <div className="mono" style={{ fontSize: 9, color: "var(--sage)", marginTop: 2 }}>Property Maintenance</div>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(242,237,226,0.6)", maxWidth: 340, marginBottom: 20 }}>
                Grounds keeping for Burlington & Camden County. Weekly routes, seasonal cleanups, hardscape, and whatever else the property asks for.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                {[["f", "https://www.facebook.com/pinderspropertymaintenance/"], ["ig", "#"], ["g", "#"]].map(([s, href]) => (
                  <a key={s} href={href} target={href !== "#" ? "_blank" : undefined} rel="noopener noreferrer" style={{
                    width: 36, height: 36, borderRadius: 999,
                    border: "1px solid var(--line)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, color: "var(--bone)",
                  }}>{s}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="mono" style={{ color: "var(--sage)", marginBottom: 16 }}>Services</div>
              {DATA.services.map(s => (
                <a key={s.id} href="#services" style={{ display: "block", fontSize: 14, padding: "5px 0", color: "rgba(242,237,226,0.75)" }}>
                  {s.title}
                </a>
              ))}
            </div>
            <div>
              <div className="mono" style={{ color: "var(--sage)", marginBottom: 16 }}>Company</div>
              {[["About", "#about"], ["Work", "#work"], ["Process", "#process"], ["Service area", "#area"], ["Careers", "#"]].map(([l, h]) => (
                <a key={l} href={h} style={{ display: "block", fontSize: 14, padding: "5px 0", color: "rgba(242,237,226,0.75)" }}>{l}</a>
              ))}
            </div>
            <div>
              <div className="mono" style={{ color: "var(--sage)", marginBottom: 16 }}>Get in touch</div>
              <a href="tel:6095550142" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, padding: "5px 0" }}>
                <Icon.phone/> (609) 555-0142
              </a>
              <a href="mailto:hello@pinderspm.com" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, padding: "5px 0" }}>
                <Icon.mail/> hello@pinderspm.com
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, padding: "5px 0", color: "rgba(242,237,226,0.75)" }}>
                <Icon.pin/> Marlton, NJ 08053
              </div>
              <div className="mono" style={{ color: "var(--sage)", marginTop: 14 }}>
                Mon – Sat · 7a – 6p
              </div>
            </div>
          </div>

          <div className="serif" style={{
            fontSize: "clamp(64px, 16vw, 240px)", lineHeight: 0.85,
            fontWeight: 300, letterSpacing: "-0.05em",
            color: "var(--forest)", borderTop: "1px solid var(--line)",
            paddingTop: 40, marginBottom: 28, userSelect: "none",
            whiteSpace: "nowrap", overflow: "hidden",
          }}>
            Pinder's <em style={{ fontStyle: "italic", color: "var(--moss)" }}>Property Maintenance.</em>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "1px solid var(--line)", flexWrap: "wrap", gap: 12 }}>
            <div className="mono" style={{ color: "var(--sage)" }}>© 2008–2026 Pinder's Property Maintenance LLC</div>
            <div className="mono" style={{ color: "var(--sage)" }}>NJ 13VH-10432 · Insured</div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .ft-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </footer>
    </>
  );
}
window.CtaFooter = CtaFooter;
