// Five interactive wallpapers for the hero.
function useInteraction(canvasRef) {
  const [mouse, setMouse] = React.useState({ x: 0.5, y: 0.5, down: false });
  const [clicks, setClicks] = React.useState([]);

  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const getPos = (e, r) => ({
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    });
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      setMouse(m => ({ ...m, ...getPos(e, r) }));
    };
    const onDown = (e) => {
      const r = el.getBoundingClientRect();
      const { x, y } = getPos(e, r);
      setMouse(m => ({ ...m, down: true }));
      const id = Date.now() + Math.random();
      setClicks(c => [...c, { id, x, y, born: performance.now() }]);
      setTimeout(() => setClicks(c => c.filter(k => k.id !== id)), 2200);
    };
    const onUp = () => setMouse(m => ({ ...m, down: false }));
    const onTouchMove = (e) => {
      const t = e.touches[0]; if (!t) return;
      const r = el.getBoundingClientRect();
      setMouse(m => ({ ...m, x: (t.clientX - r.left) / r.width, y: (t.clientY - r.top) / r.height }));
    };
    const onTouchStart = (e) => {
      const t = e.touches[0]; if (!t) return;
      const r = el.getBoundingClientRect();
      const x = (t.clientX - r.left) / r.width;
      const y = (t.clientY - r.top) / r.height;
      setMouse(m => ({ ...m, x, y, down: true }));
      const id = Date.now() + Math.random();
      setClicks(c => [...c, { id, x, y, born: performance.now() }]);
      setTimeout(() => setClicks(c => c.filter(k => k.id !== id)), 2200);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mousedown", onDown);
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("mouseup", onUp);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("mouseup", onUp);
    };
  }, [canvasRef]);

  return { mouse, clicks };
}

function useTick(fps = 60) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf, start = performance.now();
    const loop = (now) => { setT((now - start) / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return t;
}

// 1. MEADOW
function WallpaperMeadow() {
  const ref = React.useRef(null);
  const { mouse, clicks } = useInteraction(ref);
  const t = useTick();

  const blades = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 140; i++) {
      const x = (i * 13 + (i % 7) * 3) % 100;
      const y = 60 + ((i * 7) % 35);
      const h = 8 + ((i * 31) % 18);
      const hue = 80 + ((i * 11) % 40);
      const sat = 25 + ((i * 17) % 25);
      const lit = 20 + ((i * 13) % 18);
      arr.push({ x, y, h, color: `hsl(${hue}, ${sat}%, ${lit}%)`, phase: (i % 10) * 0.3 });
    }
    return arr;
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
         style={{ position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "crosshair" }}>
      <defs>
        <linearGradient id="meadow-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1410"/>
          <stop offset="0.6" stopColor="#0f2a1d"/>
          <stop offset="1" stopColor="#1a3824"/>
        </linearGradient>
        <radialGradient id="meadow-sun" cx="0.5" cy="0.2" r="0.5">
          <stop offset="0" stopColor="rgba(199,217,122,0.15)"/>
          <stop offset="1" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#meadow-sky)"/>
      <rect width="100" height="100" fill="url(#meadow-sun)"/>
      <path d="M0 70 Q 25 60 50 68 T 100 65 L100 100 L0 100z" fill="#0f2a1d" opacity="0.7"/>

      {blades.map((b, i) => {
        const dx = (b.x - mouse.x * 100);
        const dy = (b.y - mouse.y * 100);
        const d = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - d / 22);
        const wind = Math.sin(t * 1.5 + b.phase) * 1.2;
        const bend = (dx > 0 ? 1 : -1) * influence * 6 + wind;
        const topX = b.x + bend;
        const topY = b.y - b.h;
        const midX = b.x + bend * 0.5;
        const midY = b.y - b.h * 0.5;
        return (
          <path key={i} d={`M ${b.x} ${b.y} Q ${midX} ${midY} ${topX} ${topY}`}
                stroke={b.color} strokeWidth="0.5" strokeLinecap="round" fill="none"/>
        );
      })}

      {clicks.map(c => {
        const age = (performance.now() - c.born) / 2200;
        const scale = Math.min(1, age * 3);
        const petalHue = ((c.x * 360) | 0) % 360;
        return (
          <g key={c.id} transform={`translate(${c.x*100} ${c.y*100}) scale(${scale})`}>
            {[0,1,2,3,4].map(p => (
              <ellipse key={p} cx="0" cy="-2" rx="1.2" ry="2.2"
                       fill={`hsl(${(petalHue + p*20) % 360}, 70%, 65%)`}
                       transform={`rotate(${p * 72})`}/>
            ))}
            <circle cx="0" cy="0" r="0.9" fill="#d8b150"/>
          </g>
        );
      })}

      <rect width="100" height="100" fill="url(#wp-grain)" opacity="0.4"/>
    </svg>
  );
}

// 2. FIREFLIES
function WallpaperFireflies() {
  const ref = React.useRef(null);
  const { mouse, clicks } = useInteraction(ref);
  const t = useTick();

  const flies = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 50; i++) {
      arr.push({
        seed: i,
        baseX: (i * 23 + (i%5)*7) % 100,
        baseY: (i * 17 + (i%3)*13) % 100,
        speed: 0.2 + ((i % 5) * 0.08),
        radius: 8 + ((i * 13) % 15),
        phase: i * 0.6,
        size: 0.4 + ((i % 4) * 0.2),
      });
    }
    return arr;
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
         style={{ position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "crosshair" }}>
      <defs>
        <radialGradient id="ff-sky" cx="0.5" cy="1" r="1">
          <stop offset="0" stopColor="#1f3a2a"/>
          <stop offset="0.5" stopColor="#0f2a1d"/>
          <stop offset="1" stopColor="#0b1410"/>
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.8"/>
        </filter>
      </defs>
      <rect width="100" height="100" fill="url(#ff-sky)"/>
      <path d="M0 80 Q 10 70 20 78 L 25 70 L 30 78 L 40 72 L 50 80 L 60 74 L 70 80 L 80 72 L 90 78 L 100 74 L 100 100 L 0 100z"
            fill="#0b1410"/>

      {flies.map((f, i) => {
        const orbitStrength = 0.4 + Math.sin(t * f.speed + f.phase) * 0.3;
        const angle = t * f.speed + f.phase;
        const homeX = f.baseX + Math.cos(angle) * 3;
        const homeY = f.baseY + Math.sin(angle) * 3;
        const fx = homeX * (1 - orbitStrength) + (mouse.x * 100 + Math.cos(angle * 2) * f.radius) * orbitStrength;
        const fy = homeY * (1 - orbitStrength) + (mouse.y * 100 + Math.sin(angle * 2) * f.radius) * orbitStrength;
        const blink = 0.5 + 0.5 * Math.sin(t * 3 + f.phase * 2);
        return (
          <g key={i}>
            <circle cx={fx} cy={fy} r={f.size * 2.5} fill="rgba(199,217,122,0.25)" filter="url(#glow)" opacity={blink}/>
            <circle cx={fx} cy={fy} r={f.size} fill="#c7d97a" opacity={0.6 + blink * 0.4}/>
          </g>
        );
      })}

      {clicks.map(c => {
        const age = (performance.now() - c.born) / 2200;
        const r = age * 14;
        return (
          <circle key={c.id} cx={c.x*100} cy={c.y*100} r={r}
                  stroke="rgba(199,217,122,0.6)" strokeWidth={0.3 * (1 - age)} fill="none" opacity={1 - age}/>
        );
      })}
    </svg>
  );
}

// 3. TOPOGRAPHY
function WallpaperTopography() {
  const ref = React.useRef(null);
  const { mouse, clicks } = useInteraction(ref);
  const t = useTick();

  return (
    <svg ref={ref} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
         style={{ position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "crosshair" }}>
      <rect width="100" height="100" fill="#0b1410"/>

      {Array.from({ length: 18 }).map((_, i) => {
        const r = 4 + i * 5;
        const offset = Math.sin(t * 0.5 + i * 0.3) * 0.5;
        const pushed = clicks.reduce((acc, c) => {
          const age = (performance.now() - c.born) / 2200;
          const dist = Math.hypot(c.x * 100 - mouse.x * 100, c.y * 100 - mouse.y * 100);
          return acc + Math.sin(age * 6 - dist * 0.1) * (1 - age) * 1.5;
        }, 0);
        return (
          <circle key={i}
                  cx={mouse.x * 100} cy={mouse.y * 100}
                  r={r + offset + pushed}
                  fill="none"
                  stroke={`rgba(199, 217, 122, ${0.5 - i * 0.025})`}
                  strokeWidth={i === 0 ? 0.4 : 0.2}/>
        );
      })}

      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 5} x2="100" y2={i * 5}
              stroke="rgba(31,58,42,0.3)" strokeWidth="0.1"/>
      ))}
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 5} y1="0" x2={i * 5} y2="100"
              stroke="rgba(31,58,42,0.3)" strokeWidth="0.1"/>
      ))}

      {[
        { x: 22, y: 30, label: "08054" },
        { x: 68, y: 68, label: "08055" },
        { x: 78, y: 25, label: "08046" },
        { x: 38, y: 82, label: "08088" },
      ].map(m => (
        <g key={m.label}>
          <circle cx={m.x} cy={m.y} r="0.6" fill="var(--lime, #c7d97a)"/>
          <text x={m.x + 1.5} y={m.y + 0.5} fontSize="1.5" fontFamily="monospace" fill="rgba(242,237,226,0.5)">{m.label}</text>
        </g>
      ))}

      <g transform={`translate(${mouse.x*100} ${mouse.y*100})`}>
        <circle r="1.2" fill="#c7d97a"/>
        <circle r="2.5" fill="none" stroke="#c7d97a" strokeWidth="0.2" opacity="0.6"/>
      </g>
    </svg>
  );
}

// 4. GARDEN GROWTH
function WallpaperGarden() {
  const ref = React.useRef(null);
  const { mouse, clicks } = useInteraction(ref);
  const t = useTick();
  const [trails, setTrails] = React.useState([]);
  const lastPos = React.useRef({ x: -1, y: -1 });

  React.useEffect(() => {
    const dx = mouse.x - lastPos.current.x;
    const dy = mouse.y - lastPos.current.y;
    if (Math.hypot(dx, dy) > 0.02) {
      const id = performance.now() + Math.random();
      setTrails(tr => [...tr.slice(-50), {
        id, x: mouse.x, y: mouse.y, born: performance.now(),
        kind: Math.floor(Math.random() * 3),
      }]);
      lastPos.current = { x: mouse.x, y: mouse.y };
    }
  }, [mouse.x, mouse.y]);

  React.useEffect(() => {
    const id = setInterval(() => {
      const now = performance.now();
      setTrails(tr => tr.filter(t => now - t.born < 8000));
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
         style={{ position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "crosshair" }}>
      <defs>
        <linearGradient id="gd-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1410"/>
          <stop offset="1" stopColor="#1a3824"/>
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#gd-sky)"/>

      {trails.map(tr => {
        const age = Math.min(1, (performance.now() - tr.born) / 3000);
        const fade = Math.max(0, 1 - Math.max(0, (performance.now() - tr.born - 5000) / 3000));
        const x = tr.x * 100;
        const y = tr.y * 100;
        const h = age * 3;
        if (tr.kind === 0) {
          return (
            <g key={tr.id} opacity={fade}>
              {[-1, 0, 1].map(k => (
                <line key={k} x1={x + k * 0.4} y1={y} x2={x + k * 0.6} y2={y - h}
                      stroke="#4a6e3f" strokeWidth="0.25" strokeLinecap="round"/>
              ))}
            </g>
          );
        }
        if (tr.kind === 1) {
          return (
            <g key={tr.id} opacity={fade}>
              <path d={`M ${x} ${y} Q ${x+0.5} ${y-h*0.6} ${x+1} ${y-h}`}
                    stroke="#2d5233" strokeWidth="0.3" fill="none" strokeLinecap="round"/>
              <circle cx={x + 1} cy={y - h} r={age * 0.5} fill="#4a6e3f"/>
            </g>
          );
        }
        return (
          <g key={tr.id} opacity={fade}>
            <line x1={x} y1={y} x2={x} y2={y - h * 0.8} stroke="#2d5233" strokeWidth="0.2"/>
            {[0, 120, 240].map(deg => (
              <ellipse key={deg} cx={x} cy={y - h * 0.8 - 0.5} rx={age * 0.6} ry={age * 0.8}
                       fill="#4a6e3f"
                       transform={`rotate(${deg} ${x} ${y - h * 0.8})`}/>
            ))}
          </g>
        );
      })}

      {clicks.map(c => {
        const age = (performance.now() - c.born) / 2200;
        const s = Math.min(1, age * 2);
        const fade = Math.max(0, 1 - Math.max(0, age - 0.6) * 2.5);
        const hue = ((c.x + c.y) * 360) | 0;
        return (
          <g key={c.id} transform={`translate(${c.x*100} ${c.y*100}) scale(${s})`} opacity={fade}>
            {Array.from({ length: 8 }).map((_, p) => (
              <ellipse key={p} cx="0" cy="-3" rx="1.5" ry="3"
                       fill={`hsl(${(hue + p*45)%360}, 65%, 65%)`}
                       opacity="0.9"
                       transform={`rotate(${p * 45})`}/>
            ))}
            <circle r="1.2" fill="#d8b150"/>
          </g>
        );
      })}

      <circle cx={mouse.x * 100} cy={mouse.y * 100} r="1.5"
              fill="none" stroke="rgba(199,217,122,0.4)" strokeWidth="0.2"/>
      <circle cx={mouse.x * 100} cy={mouse.y * 100} r="0.4" fill="#c7d97a"/>
    </svg>
  );
}

// 5. LEAF FALL
function WallpaperLeaves() {
  const ref = React.useRef(null);
  const { mouse, clicks } = useInteraction(ref);
  const t = useTick();

  const leaves = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 45; i++) {
      arr.push({
        seed: i,
        x: (i * 23) % 100,
        yOffset: (i * 37) % 100,
        speed: 1 + ((i % 5) * 0.4),
        size: 0.7 + ((i % 4) * 0.3),
        hue: [30, 20, 45, 80, 100, 340][i % 6],
        sway: 3 + ((i % 3) * 2),
        rotSpeed: 0.5 + ((i % 5) * 0.2),
      });
    }
    return arr;
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
         style={{ position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "crosshair" }}>
      <defs>
        <linearGradient id="lv-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a2a1e"/>
          <stop offset="0.6" stopColor="#0f2a1d"/>
          <stop offset="1" stopColor="#0b1410"/>
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#lv-sky)"/>

      <g opacity="0.4">
        <path d="M 85 100 L 85 50 L 82 35 L 78 25 M 85 50 L 90 40 L 95 30 M 85 65 L 80 55 L 75 45 M 85 75 L 88 65 L 94 55"
              stroke="#0b1410" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
      </g>

      {leaves.map((l, i) => {
        const baseT = t * l.speed + i;
        const fallY = (baseT * 10 + l.yOffset) % 120 - 10;
        const swayX = Math.sin(baseT) * l.sway;

        const dx = l.x + swayX - mouse.x * 100;
        const dy = fallY - mouse.y * 100;
        const d = Math.hypot(dx, dy);
        const wind = Math.max(0, 1 - d / 30);
        const pushX = dx / (d || 1) * wind * 18;
        const pushY = dy / (d || 1) * wind * 12;

        const gust = clicks.reduce((acc, c) => {
          const age = (performance.now() - c.born) / 2200;
          const cdx = l.x - c.x * 100;
          const cdy = fallY - c.y * 100;
          const cd = Math.hypot(cdx, cdy);
          const influence = Math.max(0, (1 - cd / 40)) * (1 - age);
          return { x: acc.x + cdx / (cd || 1) * influence * 30, y: acc.y + cdy / (cd || 1) * influence * 20 };
        }, { x: 0, y: 0 });

        const x = l.x + swayX + pushX + gust.x;
        const y = fallY + pushY + gust.y;
        const rot = baseT * 60 * l.rotSpeed;

        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${rot}) scale(${l.size})`}>
            <path d="M 0 0 Q 1.2 -1.5 2 0 Q 1.2 1.5 0 0 z"
                  fill={`hsl(${l.hue}, 60%, 55%)`}/>
            <line x1="0" y1="0" x2="2" y2="0" stroke="rgba(0,0,0,0.3)" strokeWidth="0.08"/>
          </g>
        );
      })}

      <g opacity="0.3">
        {Array.from({ length: 5 }).map((_, i) => (
          <path key={i}
                d={`M ${mouse.x*100 - 8 - i*2} ${mouse.y*100 + i*0.5} Q ${mouse.x*100 - 3} ${mouse.y*100 + i*0.5 - 0.3} ${mouse.x*100 + 2} ${mouse.y*100 + i*0.5}`}
                stroke="rgba(199,217,122,0.4)" strokeWidth="0.15" fill="none"/>
        ))}
      </g>
    </svg>
  );
}

const WALLPAPERS = [
  { id: "meadow",    name: "Meadow",      sub: "Grass bends · click to bloom",   Comp: WallpaperMeadow },
  { id: "fireflies", name: "Fireflies",   sub: "Lights orbit the cursor",        Comp: WallpaperFireflies },
  { id: "topo",      name: "Topography",  sub: "Contours map to your mouse",     Comp: WallpaperTopography },
  { id: "garden",    name: "Garden",      sub: "Plant where you pass",           Comp: WallpaperGarden },
  { id: "leaves",    name: "Leaf fall",   sub: "Wind follows · click to gust",   Comp: WallpaperLeaves },
];

function WallpaperHost({ id }) {
  const W = WALLPAPERS.find(w => w.id === id) || WALLPAPERS[0];
  const Comp = W.Comp;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <pattern id="wp-grain" width="3" height="3" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.15" fill="rgba(255,255,255,0.06)"/>
            <circle cx="2" cy="2" r="0.15" fill="rgba(0,0,0,0.08)"/>
          </pattern>
        </defs>
      </svg>
      <Comp/>
    </div>
  );
}

function WallpaperPicker({ value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const current = WALLPAPERS.find(w => w.id === value) || WALLPAPERS[0];

  return (
    <>
      {/* Desktop: full pill bar */}
      <div className="wp-desktop" style={{
        position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
        zIndex: 5,
        background: "rgba(11,20,16,0.55)", backdropFilter: "blur(20px)",
        border: "1px solid var(--line)", borderRadius: 999,
        padding: 6, display: "flex", gap: 2,
      }}>
        {WALLPAPERS.map(w => (
          <button key={w.id} onClick={() => onChange(w.id)} style={{
            padding: "8px 16px", borderRadius: 999, fontSize: 12,
            fontFamily: "var(--sans)",
            background: value === w.id ? "var(--lime)" : "transparent",
            color: value === w.id ? "var(--ink)" : "var(--bone)",
            transition: "all .2s",
            display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1.1,
            minWidth: 90,
          }}>
            <span style={{ fontWeight: 500 }}>{w.name}</span>
            <span style={{
              fontFamily: "var(--mono)", fontSize: 8, letterSpacing: "0.1em",
              textTransform: "uppercase", marginTop: 3,
              opacity: value === w.id ? 0.7 : 0.5,
            }}>{w.sub}</span>
          </button>
        ))}
      </div>

      {/* Mobile: FAB + popover */}
      <div className="wp-mobile" style={{ position: "absolute", bottom: 24, right: 20, zIndex: 5 }}>
        {open && (
          <div style={{
            position: "absolute", bottom: "calc(100% + 10px)", right: 0,
            background: "rgba(11,20,16,0.92)", backdropFilter: "blur(20px)",
            border: "1px solid var(--line)", borderRadius: 14,
            padding: 8, display: "flex", flexDirection: "column", gap: 2, minWidth: 150,
          }}>
            <div className="mono" style={{ fontSize: 9, color: "var(--sage)", padding: "4px 10px 8px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Background
            </div>
            {WALLPAPERS.map(w => (
              <button key={w.id} onClick={() => { onChange(w.id); setOpen(false); }} style={{
                padding: "10px 12px", borderRadius: 8, fontSize: 14,
                fontFamily: "var(--sans)", textAlign: "left",
                background: value === w.id ? "var(--lime)" : "transparent",
                color: value === w.id ? "var(--ink)" : "var(--bone)",
                fontWeight: value === w.id ? 500 : 400,
                transition: "all .15s",
              }}>
                {w.name}
              </button>
            ))}
          </div>
        )}
        <button onClick={() => setOpen(o => !o)} style={{
          width: 44, height: 44, borderRadius: 999,
          background: open ? "var(--lime)" : "rgba(11,20,16,0.65)",
          backdropFilter: "blur(16px)",
          border: "1px solid var(--line)",
          color: open ? "var(--ink)" : "var(--lime)",
          fontSize: 18, lineHeight: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all .2s",
        }}>✦</button>
      </div>

      <style>{`
        .wp-mobile { display: none; }
        @media (max-width: 820px) {
          .wp-desktop { display: none !important; }
          .wp-mobile { display: block; }
        }
      `}</style>
    </>
  );
}

window.WallpaperHost = WallpaperHost;
window.WallpaperPicker = WallpaperPicker;
window.WALLPAPERS = WALLPAPERS;
