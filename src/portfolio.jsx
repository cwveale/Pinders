function Portfolio() {
  const [filter, setFilter] = React.useState("all");
  const [hovered, setHovered] = React.useState(null);

  const filters = [
    ["all", "All work"],
    ["maintenance", "Maintenance"],
    ["hardscape", "Hardscape"],
    ["gardens", "Gardens"],
    ["design", "Design / build"],
  ];

  const filterMap = {
    maintenance: ["Full property", "Pruning"],
    hardscape: ["Hardscape"],
    gardens: ["Gardens"],
    design: ["Design / build"],
  };

  const visible = DATA.portfolio.filter(p => filter === "all" || filterMap[filter]?.includes(p.tag));

  return (
    <section id="work" style={{
      background: "var(--ink)", color: "var(--bone)",
      padding: "120px 0", position: "relative",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 60, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--lime)", marginBottom: 20 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--lime)", verticalAlign: "middle", marginRight: 10 }}/>
              02 — Selected work
            </div>
            <h2 className="serif" style={{
              fontSize: "clamp(42px, 6vw, 84px)", lineHeight: 0.95,
              fontWeight: 400, letterSpacing: "-0.03em",
            }}>
              Properties we've<br/>
              <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--lime)" }}>shaped, kept, grown.</em>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {filters.map(([k, label]) => (
              <button key={k} onClick={() => setFilter(k)} style={{
                padding: "8px 16px", borderRadius: 999, fontSize: 12.5,
                border: "1px solid var(--line)",
                background: filter === k ? "var(--bone)" : "transparent",
                color: filter === k ? "var(--ink)" : "var(--bone)",
                transition: "all .2s",
              }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 28px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "180px",
          gap: 12,
        }} className="bento">
          {visible.map((p, i) => (
            <div key={p.id}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                gridColumn: p.span === "wide" ? "span 6" : p.span === "tall" ? "span 3" : "span 3",
                gridRow: p.span === "wide" ? "span 2" : p.span === "tall" ? "span 3" : "span 2",
                position: "relative", overflow: "hidden", borderRadius: 2,
                cursor: "pointer", background: "var(--moss)",
              }}
              className="bento-cell"
            >
              <div style={{
                position: "absolute", inset: 0,
                transform: hovered === p.id ? "scale(1.04)" : "scale(1)",
                transition: "transform .8s cubic-bezier(.2,.8,.2,1)",
              }}>
                {p.photo
                  ? <img src={p.photo} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
                  : <Scene kind={p.img} ratio={p.span === "tall" ? "3/4" : p.span === "wide" ? "2/1" : "1/1"}/>
                }
              </div>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, transparent 40%, rgba(11,20,16,0.85) 100%)",
                pointerEvents: "none",
              }}/>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, padding: 20,
                display: "flex", justifyContent: "space-between", alignItems: "end", gap: 12,
                transform: hovered === p.id ? "translateY(0)" : "translateY(8px)",
                transition: "transform .4s ease",
              }}>
                <div>
                  <div className="mono" style={{ color: "var(--lime)", marginBottom: 6 }}>
                    {p.tag} · {p.year}
                  </div>
                  <h3 className="serif" style={{
                    fontSize: p.span === "wide" ? 28 : 20, fontWeight: 400,
                    letterSpacing: "-0.01em", color: "var(--bone)",
                  }}>
                    {p.title}
                  </h3>
                </div>
                <div style={{
                  width: 36, height: 36, borderRadius: 999,
                  background: "var(--bone)", color: "var(--ink)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transform: hovered === p.id ? "scale(1) rotate(0deg)" : "scale(0.8) rotate(-45deg)",
                  opacity: hovered === p.id ? 1 : 0.5,
                  transition: "all .3s",
                }}>
                  <Icon.arrowUp/>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: "center" }}>
          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "14px 24px", border: "1px solid var(--line)",
            borderRadius: 999, fontSize: 13.5,
          }}>
            View the full archive <Icon.arrow/>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .bento { grid-template-columns: repeat(2, 1fr) !important; grid-auto-rows: 140px !important; }
          .bento-cell { grid-column: span 1 !important; grid-row: span 2 !important; }
        }
      `}</style>
    </section>
  );
}
window.Portfolio = Portfolio;
