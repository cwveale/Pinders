function Services({ onEstimate }) {
  const [active, setActive] = React.useState(0);

  return (
    <section id="services" style={{
      background: "var(--bone)", color: "var(--ink)",
      padding: "120px 28px",
      position: "relative",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "end", marginBottom: 80 }} className="svc-head">
          <div>
            <div className="eyebrow" style={{ color: "var(--moss)", marginBottom: 20 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--moss)", verticalAlign: "middle", marginRight: 10 }}/>
              01 — Services
            </div>
            <h2 className="serif" style={{
              fontSize: "clamp(42px, 6vw, 84px)", lineHeight: 0.95,
              fontWeight: 400, letterSpacing: "-0.03em",
              color: "var(--forest)",
            }}>
              Full-service grounds,<br/>
              <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--moss)" }}>one crew, one call.</em>
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(11,20,16,0.7)", maxWidth: 440 }}>
              From the mow you can set your watch by, to the paver patio that'll hold up to thirty winters — we handle the whole property so you don't have to juggle vendors.
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--line-dark)" }}>
          {DATA.services.map((s, i) => {
            const isActive = active === i;
            return (
              <div
                key={s.id}
                onMouseEnter={() => setActive(i)}
                style={{
                  borderBottom: "1px solid var(--line-dark)",
                  padding: isActive ? "36px 0" : "28px 0",
                  transition: "padding .4s cubic-bezier(.2,.8,.2,1), background .3s",
                  background: isActive ? "rgba(31,58,42,0.04)" : "transparent",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1.2fr 2fr 180px 40px",
                  gap: 24, alignItems: "start",
                }} className="svc-row">
                  <div className="mono" style={{ color: "var(--sage)", paddingTop: 8 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="serif" style={{
                      fontSize: isActive ? "clamp(36px, 4.5vw, 56px)" : "clamp(28px, 3.5vw, 42px)",
                      fontWeight: 400, lineHeight: 1, letterSpacing: "-0.02em",
                      color: "var(--forest)",
                      transition: "font-size .4s cubic-bezier(.2,.8,.2,1)",
                    }}>
                      {s.title}
                    </h3>
                    {isActive && (
                      <div style={{ marginTop: 16, display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {s.items.map((it) => (
                          <span key={it} className="mono" style={{
                            padding: "5px 10px", border: "1px solid var(--line-dark)",
                            borderRadius: 999, color: "var(--moss)", fontSize: 10,
                          }}>{it}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ paddingTop: 10 }}>
                    <p style={{
                      fontSize: isActive ? 17 : 15, lineHeight: 1.55,
                      color: "rgba(11,20,16,0.75)", maxWidth: 480,
                      transition: "font-size .4s",
                    }}>
                      {s.lede}
                    </p>
                  </div>
                  <div className="mono" style={{
                    paddingTop: 14, textAlign: "right",
                    color: "var(--forest)",
                  }}>
                    {s.price}
                  </div>
                  <div style={{ paddingTop: 10, display: "flex", justifyContent: "flex-end" }}>
                    <button onClick={onEstimate} style={{
                      width: 36, height: 36, borderRadius: 999,
                      border: "1px solid var(--line-dark)",
                      color: "var(--forest)", transition: "background .2s, color .2s",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: isActive ? "var(--forest)" : "transparent",
                    }}>
                      <span style={{ color: isActive ? "var(--lime)" : "var(--forest)" }}>
                        <Icon.arrow/>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <style>{`
          @media (max-width: 900px) {
            .svc-head { grid-template-columns: 1fr !important; }
            .svc-row { grid-template-columns: 40px 1fr 40px !important; }
            .svc-row > :nth-child(3), .svc-row > :nth-child(4) { display: none; }
          }
        `}</style>
      </div>
    </section>
  );
}
window.Services = Services;
