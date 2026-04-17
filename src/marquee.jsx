function Marquee() {
  const items = [
    "Mowing & edging", "Garden beds", "Mulch & stone", "Hardscape",
    "Tree & shrub", "Irrigation", "Seasonal cleanup", "Snow & ice",
    "Drainage", "Pruning & shaping", "Sod & seed", "Lighting",
  ];

  return (
    <div style={{
      borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)",
      overflow: "hidden", padding: "22px 0",
      background: "var(--ink)",
    }}>
      <div style={{
        display: "flex", gap: 48, whiteSpace: "nowrap",
        animation: "scroll-l 40s linear infinite",
      }}>
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 48 }}>
            <span className="serif" style={{ fontSize: 28, fontStyle: "italic", fontWeight: 300, color: "var(--bone)" }}>
              {item}
            </span>
            <span style={{ color: "var(--lime)", fontSize: 16 }}>✦</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll-l {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
window.Marquee = Marquee;
