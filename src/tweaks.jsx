function Tweaks() {
  const [active, setActive] = React.useState(false);
  const [tweaks, setTweaks] = React.useState(window.__TWEAKS__ || {});

  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === "__activate_edit_mode") setActive(true);
      if (e.data?.type === "__deactivate_edit_mode") setActive(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;
    const accentMap = {
      lime: "#c7d97a", rust: "#b8552f", gold: "#d8b150", sky: "#9bc4c9", pink: "#e0a3b4",
    };
    root.style.setProperty("--lime", accentMap[tweaks.accent] || accentMap.lime);
  }, [tweaks]);

  const update = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.__TWEAKS__ = next;
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
  };

  if (!active) return null;

  return (
    <div style={{
      position: "fixed", bottom: 20, right: 20, zIndex: 200,
      width: 280, background: "rgba(11,20,16,0.95)", color: "var(--bone)",
      border: "1px solid var(--line)", borderRadius: 4,
      backdropFilter: "blur(20px)", padding: 20,
      fontFamily: "var(--sans)", fontSize: 13,
      boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    }}>
      <div className="mono" style={{ color: "var(--lime)", marginBottom: 14, fontSize: 10 }}>Tweaks</div>

      <div style={{ marginBottom: 16 }}>
        <div className="mono" style={{ color: "var(--sage)", marginBottom: 8, fontSize: 9 }}>Accent color</div>
        <div style={{ display: "flex", gap: 6 }}>
          {[
            ["lime", "#c7d97a"], ["rust", "#b8552f"], ["gold", "#d8b150"],
            ["sky", "#9bc4c9"], ["pink", "#e0a3b4"],
          ].map(([k, v]) => (
            <button key={k} onClick={() => update("accent", k)} style={{
              width: 32, height: 32, borderRadius: 999, background: v,
              border: tweaks.accent === k ? "2px solid var(--bone)" : "2px solid transparent",
              cursor: "pointer",
            }}/>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div className="mono" style={{ color: "var(--sage)", marginBottom: 8, fontSize: 9 }}>Hero style</div>
        <div style={{ display: "flex", gap: 4 }}>
          {["immersive", "minimal"].map(v => (
            <button key={v} onClick={() => update("heroVariant", v)} style={{
              flex: 1, padding: "8px", fontSize: 11, textTransform: "capitalize",
              border: "1px solid var(--line)", borderRadius: 2,
              background: tweaks.heroVariant === v ? "var(--lime)" : "transparent",
              color: tweaks.heroVariant === v ? "var(--ink)" : "var(--bone)",
              cursor: "pointer",
            }}>{v}</button>
          ))}
        </div>
      </div>

      <div>
        <div className="mono" style={{ color: "var(--sage)", marginBottom: 8, fontSize: 9 }}>Services layout</div>
        <div style={{ display: "flex", gap: 4 }}>
          {["editorial", "cards"].map(v => (
            <button key={v} onClick={() => update("serviceLayout", v)} style={{
              flex: 1, padding: "8px", fontSize: 11, textTransform: "capitalize",
              border: "1px solid var(--line)", borderRadius: 2,
              background: tweaks.serviceLayout === v ? "var(--lime)" : "transparent",
              color: tweaks.serviceLayout === v ? "var(--ink)" : "var(--bone)",
              cursor: "pointer",
            }}>{v}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
window.Tweaks = Tweaks;
