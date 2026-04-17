// SVG placeholder scenes — stylized, not realistic.
function seededRand(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function Scene({ kind = "colonial", className = "", label = "", ratio = "4/3" }) {
  const id = React.useMemo(() => "s" + Math.random().toString(36).slice(2, 8), []);
  const rand = React.useMemo(() => seededRand(kind.charCodeAt(0) * 31 + kind.length), [kind]);

  const scenes = {
    colonial: (
      <>
        <rect width="400" height="300" fill={`url(#${id}-sky)`} />
        <path d="M0 170 Q 60 140 120 170 T 240 170 T 400 170 L400 220 L0 220z" fill="#1a3824" opacity="0.7"/>
        <rect x="110" y="130" width="180" height="90" fill="#d9cfb8"/>
        <polygon points="110,130 200,80 290,130" fill="#4a3a2a"/>
        <rect x="190" y="165" width="22" height="55" fill="#2a1f15"/>
        <rect x="140" y="150" width="18" height="18" fill="#87a89e"/>
        <rect x="240" y="150" width="18" height="18" fill="#87a89e"/>
        <rect x="140" y="185" width="18" height="18" fill="#87a89e"/>
        <rect x="240" y="185" width="18" height="18" fill="#87a89e"/>
        <ellipse cx="125" cy="220" rx="30" ry="14" fill="#1f3a2a"/>
        <ellipse cx="175" cy="222" rx="22" ry="11" fill="#1f3a2a"/>
        <ellipse cx="230" cy="222" rx="22" ry="11" fill="#1f3a2a"/>
        <ellipse cx="285" cy="220" rx="30" ry="14" fill="#1f3a2a"/>
        <rect x="0" y="218" width="400" height="82" fill={`url(#${id}-lawn)`}/>
        <polygon points="200,225 180,300 220,300" fill="#b8b0a0" opacity="0.9"/>
      </>
    ),
    paver: (
      <>
        <rect width="400" height="300" fill="#1f3a2a"/>
        {Array.from({length: 10}).map((_,i) =>
          Array.from({length: 14}).map((_,j) => {
            const x = j*30 + (i%2)*15 - 10;
            const y = i*28 + 40;
            return <rect key={`${i}-${j}`} x={x} y={y} width="28" height="13" rx="1" fill={`hsl(${28 + rand()*10}, ${18 + rand()*10}%, ${55 + rand()*12}%)`} stroke="#0a1a12" strokeWidth="0.5"/>;
          })
        )}
        <rect x="0" y="0" width="400" height="40" fill="#1f3a2a"/>
        <rect x="0" y="0" width="400" height="40" fill={`url(#${id}-lawn)`}/>
        <rect x="290" y="120" width="50" height="40" rx="4" fill="#0b1410" opacity="0.7"/>
        <rect x="295" y="100" width="40" height="25" rx="3" fill="#0b1410" opacity="0.7"/>
      </>
    ),
    beds: (
      <>
        <rect width="400" height="300" fill={`url(#${id}-lawn)`}/>
        <path d="M20 180 Q 100 140 200 160 T 380 180 L380 280 L20 280z" fill="#3a2618"/>
        {Array.from({length: 60}).map((_,i) => {
          const x = 30 + rand()*340;
          const y = 185 + rand()*80;
          const hue = [340, 20, 60, 290, 200][Math.floor(rand()*5)];
          return <circle key={i} cx={x} cy={y} r={3 + rand()*3} fill={`hsl(${hue}, 70%, 65%)`}/>;
        })}
        {Array.from({length: 30}).map((_,i) => {
          const x = 30 + rand()*340;
          const y = 175 + rand()*90;
          return <ellipse key={i} cx={x} cy={y} rx={8 + rand()*8} ry={4 + rand()*4} fill="#2d5233" opacity="0.8"/>;
        })}
        <path d="M20 180 Q 100 140 200 160 T 380 180" stroke="#0b1410" strokeWidth="1.5" fill="none" opacity="0.3"/>
      </>
    ),
    patio: (
      <>
        <rect width="400" height="300" fill={`url(#${id}-sky)`}/>
        <ellipse cx="60" cy="140" rx="60" ry="80" fill="#1f3a2a"/>
        <ellipse cx="340" cy="130" rx="55" ry="85" fill="#1f3a2a"/>
        <rect x="0" y="180" width="400" height="120" fill={`url(#${id}-lawn)`}/>
        <polygon points="120,220 280,220 310,290 90,290" fill="#6b4a2a"/>
        {Array.from({length: 8}).map((_,i) =>
          <line key={i} x1={120 + i*20 + (i*3)} y1="220" x2={90 + i*28 + (i*3)} y2="290" stroke="#2a1a10" strokeWidth="0.6" opacity="0.5"/>
        )}
        <ellipse cx="200" cy="250" rx="28" ry="9" fill="#1a1410"/>
        <ellipse cx="200" cy="247" rx="22" ry="6" fill="#b8552f"/>
        <path d="M190 243 Q 195 230 200 240 Q 205 225 210 240 Q 215 235 212 245" stroke="#e9a24a" strokeWidth="1.5" fill="none"/>
      </>
    ),
    hedge: (
      <>
        <rect width="400" height="300" fill="#d9cfb8"/>
        <rect width="400" height="60" fill={`url(#${id}-sky)`}/>
        <rect x="0" y="80" width="400" height="120" fill="#1a3824"/>
        <path d="M0 80 Q 25 72 50 80 T 100 80 T 150 80 T 200 80 T 250 80 T 300 80 T 350 80 T 400 80 L400 200 L0 200z" fill="#1f3a2a"/>
        {Array.from({length: 200}).map((_,i) =>
          <circle key={i} cx={rand()*400} cy={85 + rand()*110} r={1.5} fill="#0f2a1d" opacity={0.3 + rand()*0.4}/>
        )}
        <rect x="0" y="200" width="400" height="100" fill={`url(#${id}-lawn)`}/>
        <rect x="160" y="200" width="80" height="100" fill="#b8b0a0"/>
      </>
    ),
    stone: (
      <>
        <rect width="400" height="300" fill="#2a3628"/>
        {Array.from({length: 15}).map((_,i) => {
          const x = 30 + rand()*340;
          const y = 40 + i*16 + rand()*8;
          const w = 40 + rand()*30;
          const h = 18 + rand()*8;
          return <ellipse key={i} cx={x} cy={y} rx={w/2} ry={h/2} fill={`hsl(${30+rand()*20}, ${10+rand()*15}%, ${45+rand()*20}%)`} stroke="#0b1410" strokeWidth="0.5"/>;
        })}
        {Array.from({length: 12}).map((_,i) => {
          const x = 40 + (i%4)*100 + rand()*20;
          const y = 60 + Math.floor(i/4)*90 + rand()*20;
          return <g key={i}>
            <ellipse cx={x+2} cy={y+3} rx="22" ry="20" fill="#0b1410" opacity="0.3"/>
            <ellipse cx={x} cy={y} rx="22" ry="20" fill="#2d5233"/>
            <ellipse cx={x-5} cy={y-5} rx="8" ry="6" fill="#3d6a42" opacity="0.7"/>
          </g>;
        })}
      </>
    ),
    fall: (
      <>
        <rect width="400" height="300" fill="#6a5436"/>
        {Array.from({length: 300}).map((_,i) => {
          const x = rand()*400;
          const y = rand()*300;
          const hue = [20, 30, 10, 45, 0][Math.floor(rand()*5)];
          return <ellipse key={i} cx={x} cy={y} rx={3 + rand()*3} ry={2 + rand()*2} fill={`hsl(${hue}, ${50+rand()*30}%, ${35+rand()*30}%)`} transform={`rotate(${rand()*360} ${x} ${y})`}/>;
        })}
        <path d="M0 150 Q 100 140 200 160 T 400 150 L 400 200 Q 300 210 200 200 T 0 200z" fill={`url(#${id}-lawn)`}/>
      </>
    ),
    walk: (
      <>
        <rect width="400" height="300" fill={`url(#${id}-lawn)`}/>
        <polygon points="140,0 260,0 290,300 110,300" fill="#c0b9a8"/>
        {Array.from({length: 12}).map((_,i) => {
          const y = i*25;
          return <line key={i} x1={140 + (y/300)*(110-140)} y1={y} x2={260 + (y/300)*(290-260)} y2={y} stroke="#8a8272" strokeWidth="0.8"/>;
        })}
        {Array.from({length: 8}).map((_,i) => {
          const y = i*40 + 10;
          return <g key={i}>
            <ellipse cx={120 - i*2} cy={y} rx="15" ry="10" fill="#2d5233"/>
            <ellipse cx={285 + i*2} cy={y} rx="15" ry="10" fill="#2d5233"/>
          </g>;
        })}
        <rect x="120" y="0" width="160" height="20" fill="#8a8272"/>
      </>
    ),
    hero: (
      <>
        <rect width="400" height="300" fill={`url(#${id}-lawn)`}/>
        {Array.from({length: 2000}).map((_,i) => {
          const x = rand()*400;
          const y = rand()*300;
          return <line key={i} x1={x} y1={y} x2={x + (rand()*1.5-0.5)} y2={y + 2 + rand()*2} stroke={`hsl(${90 + rand()*30}, ${35+rand()*25}%, ${20+rand()*25}%)`} strokeWidth="0.5" opacity={0.6 + rand()*0.4}/>;
        })}
      </>
    ),
  };

  return (
    <div className={className} style={{ position: "relative", width: "100%", aspectRatio: ratio, overflow: "hidden", background: "#0f2a1d" }}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c9d5c4"/>
            <stop offset="1" stopColor="#e8e0cf"/>
          </linearGradient>
          <linearGradient id={`${id}-lawn`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a6e3f"/>
            <stop offset="1" stopColor="#2d5233"/>
          </linearGradient>
          <pattern id={`${id}-grain`} width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.4" fill="#000" opacity="0.08"/>
            <circle cx="3" cy="3" r="0.4" fill="#fff" opacity="0.05"/>
          </pattern>
        </defs>
        {scenes[kind] || scenes.colonial}
        <rect width="400" height="300" fill={`url(#${id}-grain)`} opacity="0.6"/>
      </svg>
      {label && (
        <div style={{
          position: "absolute", left: 10, bottom: 10,
          fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "rgba(242,237,226,0.85)",
          background: "rgba(11,20,16,0.45)", padding: "3px 7px", borderRadius: 2,
          backdropFilter: "blur(6px)"
        }}>{label}</div>
      )}
    </div>
  );
}

window.Scene = Scene;
