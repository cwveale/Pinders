function Nav({ onEstimate }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Services", "#services"],
    ["Work", "#work"],
    ["Process", "#process"],
    ["Service Area", "#area"],
    ["About", "#about"],
  ];

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: scrolled ? "12px 28px" : "22px 28px",
        transition: "padding .3s ease, background .3s ease, border-color .3s ease",
        background: scrolled ? "rgba(11,20,16,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        color: "var(--bone)",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Icon.mark style={{ color: "var(--lime)" }}/>
            <div style={{ lineHeight: 1 }}>
              <div className="serif" style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em" }}>
                Pinder's
              </div>
              <div className="mono" style={{ fontSize: 9, color: "var(--sage)", marginTop: 2 }}>
                Property Maintenance · est. 2008
              </div>
            </div>
          </a>

          <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
            {links.map(([label, href]) => (
              <a key={href} href={href} style={{
                padding: "8px 14px", fontSize: 13.5, color: "var(--bone)",
                opacity: 0.85, transition: "opacity .15s",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.85}
              >{label}</a>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="tel:6095550142" style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 13, color: "var(--bone)", opacity: 0.8,
            }} className="desktop-nav">
              <Icon.phone/> (609) 555-0142
            </a>
            <button onClick={onEstimate} style={{
              padding: "10px 18px",
              background: "var(--lime)", color: "var(--ink)",
              fontSize: 13, fontWeight: 500, letterSpacing: "-0.01em",
              borderRadius: 999, display: "flex", alignItems: "center", gap: 8,
              transition: "transform .15s, background .15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#d6e88a"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--lime)"; }}
            >Free estimate <Icon.arrow/></button>
          </div>
        </div>
      </header>
      <style>{`
        @media (max-width: 820px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}

window.Nav = Nav;
