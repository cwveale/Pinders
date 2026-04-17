function ServiceMap() {
  const [hoveredArea, setHoveredArea] = React.useState(null);
  const [checkZip, setCheckZip] = React.useState("");
  const [zipResult, setZipResult] = React.useState(null);

  const areas = [
    { zip: "08053", town: "Marlton",       x: 50, y: 50, r: 34, primary: true },
    { zip: "08055", town: "Medford",       x: 65, y: 64, r: 22 },
    { zip: "08088", town: "Vincentown",    x: 78, y: 78, r: 18 },
    { zip: "08054", town: "Mt. Laurel",    x: 36, y: 36, r: 22 },
    { zip: "08003", town: "Cherry Hill E", x: 22, y: 44, r: 20 },
    { zip: "08048", town: "Lumberton",     x: 72, y: 48, r: 18 },
    { zip: "08052", town: "Maple Shade",   x: 26, y: 28, r: 17 },
    { zip: "08046", town: "Willingboro",   x: 82, y: 28, r: 18 },
  ];

  const allZips = areas.map(a => a.zip);
  const checkCoverage = (e) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(checkZip)) { setZipResult({ ok: false, msg: "Enter a 5-digit zip." }); return; }
    const hit = allZips.includes(checkZip);
    setZipResult(hit
      ? { ok: true,  msg: `We cover ${areas.find(a => a.zip===checkZip).town}. Let's schedule.` }
      : { ok: false, msg: "That zip's outside our regular route — give us a call to check." });
  };

  return (
    <section id="area" style={{
      background: "var(--bone)", color: "var(--ink)",
      padding: "120px 28px",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "end", marginBottom: 60 }} className="map-head">
          <div>
            <div className="eyebrow" style={{ color: "var(--moss)", marginBottom: 20 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--moss)", verticalAlign: "middle", marginRight: 10 }}/>
              04 — Service area
            </div>
            <h2 className="serif" style={{
              fontSize: "clamp(42px, 6vw, 84px)", lineHeight: 0.95,
              fontWeight: 400, letterSpacing: "-0.03em",
              color: "var(--forest)",
            }}>
              Rooted in <em style={{ fontStyle: "italic", fontWeight: 300, color: "var(--moss)" }}>08053.</em>
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(11,20,16,0.7)", maxWidth: 440 }}>
              Based in Marlton, working the townships around Route 70 and the edge of the Pinelands. If you're within a 20-minute drive, we're probably already on your street.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 32 }} className="map-grid">
          <div style={{
            background: "var(--forest)", borderRadius: 4,
            position: "relative", aspectRatio: "4/3", overflow: "hidden",
          }}>
            <svg viewBox="0 0 100 75" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              <defs>
                <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                  <path d="M 5 0 L 0 0 0 5" stroke="rgba(242,237,226,0.06)" strokeWidth="0.15" fill="none"/>
                </pattern>
                <pattern id="bigGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 25 0 L 0 0 0 25" stroke="rgba(242,237,226,0.1)" strokeWidth="0.2" fill="none"/>
                </pattern>
              </defs>
              <rect width="100" height="75" fill="url(#grid)"/>
              <rect width="100" height="75" fill="url(#bigGrid)"/>

              <path d="M -5 38 Q 30 36 55 42 T 110 45" stroke="rgba(199,217,122,0.15)" strokeWidth="0.8" fill="none"/>
              <path d="M 45 -5 Q 50 20 52 45 T 58 80" stroke="rgba(199,217,122,0.15)" strokeWidth="0.6" fill="none"/>
              <path d="M -5 60 Q 40 55 65 60 T 110 68" stroke="rgba(199,217,122,0.1)" strokeWidth="0.5" fill="none"/>

              <path d="M 70 55 Q 90 50 100 65 L 100 75 L 60 75 Q 65 65 70 55z" fill="rgba(199,217,122,0.05)" stroke="rgba(199,217,122,0.2)" strokeWidth="0.2" strokeDasharray="1 1"/>
              <path d="M 5 10 Q 20 25 18 45 T 15 75" stroke="rgba(135,168,158,0.3)" strokeWidth="1.2" fill="none"/>

              <circle cx="50" cy="50" r="20" stroke="rgba(199,217,122,0.2)" strokeWidth="0.15" fill="none" strokeDasharray="1 1"/>
              <circle cx="50" cy="50" r="30" stroke="rgba(199,217,122,0.12)" strokeWidth="0.15" fill="none" strokeDasharray="1 1"/>
              <circle cx="50" cy="50" r="42" stroke="rgba(199,217,122,0.08)" strokeWidth="0.15" fill="none" strokeDasharray="1 1"/>

              {areas.map((a) => {
                const isHot = hoveredArea === a.zip;
                return (
                  <g key={a.zip}
                    onMouseEnter={() => setHoveredArea(a.zip)}
                    onMouseLeave={() => setHoveredArea(null)}
                    style={{ cursor: "pointer" }}
                  >
                    <circle
                      cx={a.x} cy={a.y} r={(a.r/6)}
                      fill={a.primary ? "var(--lime)" : "rgba(199,217,122,0.15)"}
                      stroke="var(--lime)"
                      strokeWidth={isHot ? "0.5" : "0.2"}
                      opacity={isHot ? 1 : 0.85}
                      style={{ transition: "all .2s" }}
                    />
                    {a.primary && (
                      <circle cx={a.x} cy={a.y} r={a.r/6 + 1.5} fill="none" stroke="var(--lime)" strokeWidth="0.3" opacity="0.5">
                        <animate attributeName="r" values={`${a.r/6 + 1.5};${a.r/6 + 4};${a.r/6 + 1.5}`} dur="3s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite"/>
                      </circle>
                    )}
                    <text x={a.x} y={a.y + a.r/6 + 3}
                      fontSize="1.8" fontFamily="JetBrains Mono, monospace"
                      fill={a.primary ? "var(--lime)" : "rgba(242,237,226,0.6)"}
                      textAnchor="middle"
                      letterSpacing="0.1"
                    >
                      {a.town.toUpperCase()}
                    </text>
                    <text x={a.x} y={a.y + a.r/6 + 5.5}
                      fontSize="1.3" fontFamily="JetBrains Mono, monospace"
                      fill="rgba(242,237,226,0.4)"
                      textAnchor="middle"
                    >
                      {a.zip}
                    </text>
                  </g>
                );
              })}

              <g transform="translate(50 50)">
                <path d="M 0 -4 L 2 0 L 0 4 L -2 0 Z" fill="var(--ink)" stroke="var(--lime)" strokeWidth="0.3"/>
                <circle cx="0" cy="0" r="0.8" fill="var(--lime)"/>
              </g>
            </svg>

            <div style={{
              position: "absolute", top: 20, left: 20, right: 20,
              display: "flex", justifyContent: "space-between", gap: 12,
              pointerEvents: "none",
            }}>
              <div className="mono" style={{ color: "var(--sage)", fontSize: 10 }}>
                ◉ HQ · Marlton, NJ<br/>
                <span style={{ color: "rgba(242,237,226,0.4)" }}>39.8915°N, 74.9227°W</span>
              </div>
              <div className="mono" style={{ color: "var(--sage)", fontSize: 10, textAlign: "right" }}>
                Burlington & Camden Co.<br/>
                <span style={{ color: "rgba(242,237,226,0.4)" }}>20-mi radius · 8 primary zips</span>
              </div>
            </div>

            <div style={{
              position: "absolute", bottom: 20, right: 20,
              color: "var(--sage)", fontFamily: "var(--mono)", fontSize: 10,
              textAlign: "center", lineHeight: 1,
            }}>
              <div style={{ marginBottom: 4 }}>N</div>
              <div style={{ width: 1, height: 20, background: "var(--sage)", margin: "0 auto" }}/>
            </div>

            <div style={{
              position: "absolute", bottom: 20, left: 20,
              color: "var(--sage)", fontFamily: "var(--mono)", fontSize: 9,
            }}>
              <div style={{ width: 60, height: 2, background: "var(--sage)", marginBottom: 4, position: "relative" }}>
                <div style={{ position: "absolute", top: -2, left: 0, width: 1, height: 6, background: "var(--sage)" }}/>
                <div style={{ position: "absolute", top: -2, right: 0, width: 1, height: 6, background: "var(--sage)" }}/>
                <div style={{ position: "absolute", top: -2, left: "50%", width: 1, height: 6, background: "var(--sage)" }}/>
              </div>
              0 — 5mi
            </div>
          </div>

          <div>
            <div style={{
              background: "var(--forest)", color: "var(--bone)",
              padding: 28, borderRadius: 4, marginBottom: 16,
            }}>
              <div className="mono" style={{ color: "var(--sage)", marginBottom: 14 }}>Coverage check</div>
              <form onSubmit={checkCoverage} style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <input
                  value={checkZip}
                  onChange={e => setCheckZip(e.target.value)}
                  placeholder="Enter your zip"
                  style={{
                    flex: 1, padding: "14px 16px",
                    background: "rgba(242,237,226,0.06)", border: "1px solid var(--line)",
                    color: "var(--bone)", fontSize: 14, fontFamily: "var(--mono)",
                    letterSpacing: "0.05em",
                    outline: "none", borderRadius: 2,
                  }}
                />
                <button type="submit" style={{
                  padding: "14px 20px", background: "var(--lime)", color: "var(--ink)",
                  fontSize: 13, fontWeight: 500, borderRadius: 2,
                }}>Check</button>
              </form>
              {zipResult && (
                <div style={{
                  padding: "10px 14px", fontSize: 13,
                  background: zipResult.ok ? "rgba(199,217,122,0.1)" : "rgba(184,85,47,0.12)",
                  color: zipResult.ok ? "var(--lime)" : "var(--rust)",
                  borderLeft: `2px solid ${zipResult.ok ? "var(--lime)" : "var(--rust)"}`,
                  borderRadius: 2,
                }}>
                  {zipResult.msg}
                </div>
              )}
            </div>

            <div style={{ border: "1px solid var(--line-dark)", borderRadius: 4 }}>
              <div className="mono" style={{ color: "rgba(11,20,16,0.5)", padding: "14px 20px", borderBottom: "1px solid var(--line-dark)" }}>
                Towns we service
              </div>
              {areas.map((a) => (
                <div key={a.zip}
                  onMouseEnter={() => setHoveredArea(a.zip)}
                  onMouseLeave={() => setHoveredArea(null)}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "14px 20px", borderBottom: "1px solid var(--line-dark)",
                    background: hoveredArea === a.zip ? "rgba(31,58,42,0.05)" : "transparent",
                    transition: "background .15s", cursor: "pointer",
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: 999,
                      background: a.primary ? "var(--lime)" : "var(--moss)",
                    }}/>
                    <span className="serif" style={{ fontSize: 18, color: "var(--forest)" }}>{a.town}</span>
                    {a.primary && <span className="mono" style={{ fontSize: 9, color: "var(--rust)" }}>HQ</span>}
                  </div>
                  <span className="mono" style={{ color: "rgba(11,20,16,0.5)" }}>{a.zip}</span>
                </div>
              ))}
              <div style={{ padding: "14px 20px", fontSize: 13, color: "rgba(11,20,16,0.6)" }}>
                Outside these areas? Still call — we'll let you know.
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .map-head, .map-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
window.ServiceMap = ServiceMap;
