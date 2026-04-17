function Testimonials() {
  const [idx, setIdx] = React.useState(0);
  const t = DATA.testimonials;

  React.useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % t.length), 6000);
    return () => clearInterval(id);
  }, [t.length]);

  return (
    <section style={{
      background: "var(--ink)", color: "var(--bone)",
      padding: "120px 28px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <div className="eyebrow" style={{ color: "var(--lime)", marginBottom: 40, display: "inline-flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--lime)" }}/>
          05 — What neighbors say
          <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--lime)" }}/>
        </div>

        <div style={{ position: "relative", minHeight: 280 }}>
          {t.map((q, i) => (
            <div key={i} style={{
              position: i === idx ? "relative" : "absolute",
              top: 0, left: 0, right: 0,
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? "translateY(0)" : "translateY(12px)",
              transition: "opacity .5s, transform .5s",
              pointerEvents: i === idx ? "auto" : "none",
            }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 24, color: "var(--lime)" }}>
                {Array.from({ length: q.rating }).map((_, j) => <Icon.star key={j}/>)}
              </div>
              <p className="serif" style={{
                fontSize: "clamp(26px, 3.5vw, 42px)", lineHeight: 1.25,
                fontWeight: 300, letterSpacing: "-0.015em",
                maxWidth: 900, margin: "0 auto 32px",
                color: "var(--bone)",
              }}>
                <span style={{ color: "var(--lime)", fontSize: "1.2em" }}>"</span>{q.quote}<span style={{ color: "var(--lime)", fontSize: "1.2em" }}>"</span>
              </p>
              <div className="serif" style={{ fontSize: 17, color: "var(--bone)", marginBottom: 4 }}>{q.name}</div>
              <div className="mono" style={{ color: "var(--sage)" }}>{q.place}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 6 }}>
          {t.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: i === idx ? 24 : 8, height: 4, borderRadius: 999,
              background: i === idx ? "var(--lime)" : "var(--line)",
              transition: "all .3s",
            }}/>
          ))}
        </div>
      </div>
    </section>
  );
}
window.Testimonials = Testimonials;
