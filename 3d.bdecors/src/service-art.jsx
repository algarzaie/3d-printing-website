// Polished SVG illustrations for service showcases — styled like product renders
// Each renders inside a 400×500 viewBox with a soft studio backdrop.

const Backdrop = ({ tone = "warm" }) => {
  const palettes = {
    warm: ["#fce8d4", "#f5d4b0", "#e8b88e"],
    cool: ["#dceaf2", "#b8d6e8", "#8fc0d8"],
    mint: ["#d9f0e6", "#b3e0cd", "#8acdb0"],
    sand: ["#f0e5d0", "#dccba8", "#c4b083"],
    lilac: ["#e6dcf0", "#cdb8e0", "#b39ed0"],
    blush: ["#f8dce4", "#f0b8c8", "#e89cae"],
  };
  const [a, b, c] = palettes[tone] || palettes.warm;
  return (
    <>
      <defs>
        <linearGradient id={`bd-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={a}/>
          <stop offset="50%" stopColor={b}/>
          <stop offset="100%" stopColor={c}/>
        </linearGradient>
        <radialGradient id={`vig-${tone}`} cx="50%" cy="70%" r="60%">
          <stop offset="0%" stopColor={a} stopOpacity="0.6"/>
          <stop offset="100%" stopColor={c} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#bd-${tone})`}/>
      <ellipse cx="200" cy="440" rx="180" ry="34" fill={c} opacity="0.45"/>
    </>
  );
};

const ServiceArt = ({ shape }) => {
  const wrap = (children, tone = "warm") => (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
      <Backdrop tone={tone}/>
      {children}
    </svg>
  );

  switch (shape) {
    // -------------------- FURNITURE --------------------
    case "cabinet-handle":
      return wrap(<g>
        <defs>
          <linearGradient id="brass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4d68a"/>
            <stop offset="50%" stopColor="#c9974b"/>
            <stop offset="100%" stopColor="#8a6020"/>
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="430" rx="120" ry="14" fill="#000" opacity="0.18"/>
        <rect x="80" y="170" width="240" height="60" rx="30" fill="url(#brass)"/>
        <rect x="80" y="170" width="240" height="18" rx="9" fill="#fff" opacity="0.35"/>
        <circle cx="105" cy="200" r="8" fill="#5a3d12"/>
        <circle cx="295" cy="200" r="8" fill="#5a3d12"/>
        <rect x="95" y="225" width="20" height="80" rx="3" fill="#3a2810"/>
        <rect x="285" y="225" width="20" height="80" rx="3" fill="#3a2810"/>
      </g>, "warm");

    case "drawer-knob":
      return wrap(<g>
        <defs>
          <radialGradient id="knobShine" cx="35%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
            <stop offset="40%" stopColor="#d6a8e8" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#6e3d8a"/>
          </radialGradient>
        </defs>
        <ellipse cx="200" cy="420" rx="120" ry="14" fill="#000" opacity="0.18"/>
        <circle cx="200" cy="250" r="100" fill="url(#knobShine)"/>
        <circle cx="200" cy="250" r="100" fill="none" stroke="#3a1f55" strokeWidth="2" opacity="0.5"/>
        <circle cx="200" cy="250" r="60" fill="none" stroke="#3a1f55" strokeWidth="1" opacity="0.4"/>
        <circle cx="200" cy="250" r="20" fill="#3a1f55"/>
        <circle cx="170" cy="220" r="22" fill="#fff" opacity="0.45"/>
      </g>, "lilac");

    case "bracket":
      return wrap(<g>
        <defs>
          <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5a6878"/>
            <stop offset="50%" stopColor="#2a3445"/>
            <stop offset="100%" stopColor="#161d28"/>
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="440" rx="130" ry="16" fill="#000" opacity="0.2"/>
        <path d="M120 120 L280 120 L280 200 L200 200 L200 380 L120 380 Z" fill="url(#metal)"/>
        <path d="M120 120 L280 120 L280 140 L120 140 Z" fill="#fff" opacity="0.18"/>
        {[150, 180, 210, 240, 270].map((y) => (
          <circle key={y} cx="155" cy={y} r="6" fill="#0a0f17"/>
        ))}
        <circle cx="240" cy="160" r="10" fill="#0a0f17"/>
        <circle cx="240" cy="160" r="4" fill="#5a6878"/>
      </g>, "cool");

    // -------------------- AUTOMOTIVE --------------------
    case "vent-clip":
      return wrap(<g>
        <defs>
          <linearGradient id="darkPlastic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3f48"/>
            <stop offset="100%" stopColor="#10141b"/>
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="430" rx="130" ry="16" fill="#000" opacity="0.2"/>
        <rect x="100" y="160" width="200" height="160" rx="10" fill="url(#darkPlastic)"/>
        <rect x="100" y="160" width="200" height="20" rx="4" fill="#fff" opacity="0.1"/>
        {[200, 230, 260, 290].map((y) => (
          <rect key={y} x="120" y={y} width="160" height="4" rx="2" fill="#5a6171"/>
        ))}
        <circle cx="130" cy="190" r="6" fill="#5a6171"/>
        <rect x="160" y="186" width="80" height="8" rx="2" fill="#5a6171"/>
      </g>, "cool");

    case "dash-mount":
      return wrap(<g>
        <defs>
          <linearGradient id="mountGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#222831"/>
            <stop offset="100%" stopColor="#070a10"/>
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="430" rx="130" ry="16" fill="#000" opacity="0.22"/>
        <path d="M120 340 Q200 320 280 340 L290 380 Q200 360 110 380 Z" fill="url(#mountGrad)"/>
        <rect x="170" y="180" width="60" height="160" fill="url(#mountGrad)"/>
        <rect x="120" y="120" width="160" height="100" rx="14" fill="url(#mountGrad)"/>
        <rect x="135" y="135" width="130" height="70" rx="6" fill="#0a4a8a"/>
        <circle cx="200" cy="170" r="14" fill="#fff" opacity="0.18"/>
        <rect x="135" y="135" width="60" height="20" fill="#fff" opacity="0.08"/>
      </g>, "cool");

    case "badge":
      return wrap(<g>
        <defs>
          <linearGradient id="emblem" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe7a1"/>
            <stop offset="50%" stopColor="#c89b3d"/>
            <stop offset="100%" stopColor="#6c4a14"/>
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="430" rx="130" ry="14" fill="#000" opacity="0.2"/>
        <path d="M200 80 L320 160 L290 360 L200 420 L110 360 L80 160 Z" fill="url(#emblem)"/>
        <path d="M200 80 L320 160 L290 360 L200 420 L110 360 L80 160 Z" fill="none" stroke="#5a3b0e" strokeWidth="2"/>
        <text x="200" y="270" textAnchor="middle" fill="#3a2208" fontFamily="serif" fontSize="64" fontWeight="800">B</text>
        <path d="M200 110 L290 165 L270 340 L200 390 L130 340 L110 165 Z" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.5"/>
      </g>, "sand");

    // -------------------- INDUSTRIAL --------------------
    case "l-bracket":
      return wrap(<g>
        <defs>
          <linearGradient id="cf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3a3f4a"/>
            <stop offset="100%" stopColor="#0a0e15"/>
          </linearGradient>
          <pattern id="weave" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <rect width="6" height="6" fill="#1a1f2a"/>
            <rect width="3" height="6" fill="#2a3140"/>
          </pattern>
        </defs>
        <ellipse cx="200" cy="430" rx="130" ry="16" fill="#000" opacity="0.2"/>
        <path d="M100 140 L300 140 L300 210 L170 210 L170 380 L100 380 Z" fill="url(#weave)"/>
        <path d="M100 140 L300 140 L300 210 L170 210 L170 380 L100 380 Z" fill="url(#cf)" opacity="0.4"/>
        <path d="M100 140 L300 140 L300 160 L100 160 Z" fill="#fff" opacity="0.1"/>
        {[170, 230, 270, 330].map((y) => (
          <circle key={y} cx="135" cy={y} r="7" fill="#000"/>
        ))}
        {[200, 250].map((x) => (
          <circle key={x} cx={x} cy="175" r="7" fill="#000"/>
        ))}
      </g>, "cool");

    case "maquette":
      return wrap(<g>
        <defs>
          <linearGradient id="mq1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fafaf6"/>
            <stop offset="100%" stopColor="#c2bea8"/>
          </linearGradient>
          <linearGradient id="mq2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dad4be"/>
            <stop offset="100%" stopColor="#8a8470"/>
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="440" rx="160" ry="18" fill="#000" opacity="0.18"/>
        <rect x="60" y="380" width="280" height="50" fill="#dad4be"/>
        <rect x="60" y="380" width="280" height="8" fill="#fff" opacity="0.5"/>
        <path d="M100 200 L100 380 L160 380 L160 200 L130 170 Z" fill="url(#mq1)"/>
        <path d="M130 170 L130 380" stroke="#9a9482" strokeWidth="1"/>
        <path d="M180 130 L180 380 L260 380 L260 130 L220 90 Z" fill="url(#mq2)"/>
        <path d="M220 90 L220 380" stroke="#5a5440" strokeWidth="1"/>
        <path d="M280 240 L280 380 L330 380 L330 240 L305 220 Z" fill="url(#mq1)"/>
        {/* Windows */}
        {[[110,230],[110,260],[110,290],[110,320],[140,230],[140,260],[140,290],[140,320]].map(([x,y],i)=> <rect key={i} x={x} y={y} width="10" height="14" fill="#0a4a8a" opacity="0.7"/>)}
        {[[190,150],[230,150],[190,180],[230,180],[190,220],[230,220],[190,260],[230,260],[190,300],[230,300],[190,340],[230,340]].map(([x,y],i)=> <rect key={"a"+i} x={x} y={y} width="14" height="18" fill="#0a4a8a" opacity="0.75"/>)}
      </g>, "sand");

    case "jig":
      return wrap(<g>
        <defs>
          <linearGradient id="petg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff9a3d"/>
            <stop offset="100%" stopColor="#c25d10"/>
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="430" rx="140" ry="16" fill="#000" opacity="0.2"/>
        <rect x="70" y="170" width="260" height="200" rx="10" fill="url(#petg)"/>
        <rect x="70" y="170" width="260" height="30" rx="10" fill="#fff" opacity="0.2"/>
        {[
          [115,220], [200,220], [285,220],
          [115,290], [200,290], [285,290],
          [115,340], [200,340], [285,340],
        ].map(([x,y],i)=> <g key={i}>
          <circle cx={x} cy={y} r="18" fill="#3a1908"/>
          <circle cx={x} cy={y} r="12" fill="#1a0a04"/>
          <circle cx={x-3} cy={y-3} r="3" fill="#fff" opacity="0.4"/>
        </g>)}
      </g>, "warm");

    // -------------------- LAMPS / FIGURES --------------------
    case "name-lamp-aisha":
      return wrap(<g>
        <defs>
          <radialGradient id="aishaGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#fff9d4" stopOpacity="1"/>
            <stop offset="50%" stopColor="#ffe48a" stopOpacity="0.95"/>
            <stop offset="100%" stopColor="#d99020" stopOpacity="0.7"/>
          </radialGradient>
        </defs>
        <ellipse cx="200" cy="450" rx="140" ry="16" fill="#000" opacity="0.22"/>
        <rect x="140" y="430" width="120" height="20" rx="4" fill="#3a2410"/>
        <rect x="160" y="420" width="80" height="14" rx="3" fill="#5a3a18"/>
        <rect x="100" y="120" width="200" height="310" rx="20" fill="url(#aishaGlow)"/>
        <rect x="100" y="120" width="200" height="310" rx="20" fill="none" stroke="#a86810" strokeWidth="2" opacity="0.6"/>
        <text x="200" y="260" textAnchor="middle" fontFamily="serif" fontSize="80" fontWeight="700" fill="#fff">عائشة</text>
        <text x="200" y="330" textAnchor="middle" fontFamily="sans-serif" fontSize="22" letterSpacing="6" fontWeight="600" fill="#fff" opacity="0.9">AISHA</text>
        <circle cx="120" cy="160" r="40" fill="#fff" opacity="0.35"/>
      </g>, "warm");

    case "pokemon-lamp-pika":
      return wrap(<g>
        <defs>
          <radialGradient id="pikaGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#FFEC80" stopOpacity="1"/>
            <stop offset="60%" stopColor="#FFC107" stopOpacity="0.95"/>
            <stop offset="100%" stopColor="#E08000" stopOpacity="0.65"/>
          </radialGradient>
        </defs>
        <ellipse cx="200" cy="450" rx="140" ry="16" fill="#000" opacity="0.22"/>
        <rect x="140" y="430" width="120" height="20" rx="4" fill="#3a2410"/>
        <rect x="160" y="420" width="80" height="14" rx="3" fill="#5a3a18"/>
        {/* Ears */}
        <path d="M140 90 L120 170 L180 180 Z" fill="url(#pikaGlow)" stroke="#5a3a00" strokeWidth="2"/>
        <path d="M260 90 L280 170 L220 180 Z" fill="url(#pikaGlow)" stroke="#5a3a00" strokeWidth="2"/>
        <path d="M138 100 Q135 130 145 155" stroke="#3a2410" strokeWidth="6" fill="none"/>
        <path d="M262 100 Q265 130 255 155" stroke="#3a2410" strokeWidth="6" fill="none"/>
        {/* Body */}
        <ellipse cx="200" cy="280" rx="110" ry="130" fill="url(#pikaGlow)" stroke="#a86010" strokeWidth="2"/>
        {/* Cheeks */}
        <circle cx="120" cy="320" r="22" fill="#ff5050" opacity="0.85"/>
        <circle cx="280" cy="320" r="22" fill="#ff5050" opacity="0.85"/>
        {/* Eyes */}
        <circle cx="155" cy="260" r="14" fill="#1a1a1a"/>
        <circle cx="245" cy="260" r="14" fill="#1a1a1a"/>
        <circle cx="158" cy="256" r="5" fill="#fff"/>
        <circle cx="248" cy="256" r="5" fill="#fff"/>
        {/* Mouth */}
        <path d="M180 320 Q200 340 220 320" stroke="#1a1a1a" strokeWidth="4" fill="none" strokeLinecap="round"/>
      </g>, "warm");

    case "dino-lamp":
      return wrap(<g>
        <defs>
          <radialGradient id="dinoLamp" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#c4f0ad" stopOpacity="1"/>
            <stop offset="60%" stopColor="#7ed957" stopOpacity="0.95"/>
            <stop offset="100%" stopColor="#3a8a25" stopOpacity="0.7"/>
          </radialGradient>
        </defs>
        <ellipse cx="200" cy="450" rx="140" ry="16" fill="#000" opacity="0.22"/>
        <rect x="140" y="430" width="120" height="20" rx="4" fill="#3a2410"/>
        <path d="M100 360 Q80 230 130 160 Q170 110 220 120 Q300 130 320 240 Q335 360 290 400 L290 420 L260 420 L260 405 L170 405 L170 420 L140 420 L140 400 Q110 380 100 360 Z" fill="url(#dinoLamp)" stroke="#2a6a18" strokeWidth="2"/>
        {/* Spikes */}
        <path d="M170 130 L175 100 L185 130 Z" fill="#3a8a25"/>
        <path d="M200 115 L205 80 L215 115 Z" fill="#3a8a25"/>
        <path d="M230 115 L235 80 L245 115 Z" fill="#3a8a25"/>
        <path d="M260 140 L265 110 L275 140 Z" fill="#3a8a25"/>
        {/* Eye */}
        <circle cx="265" cy="190" r="14" fill="white"/>
        <circle cx="270" cy="190" r="7" fill="#1a1a1a"/>
        {/* Mouth */}
        <path d="M275 240 L320 235 L320 255 L275 255 Z" fill="#3a8a25"/>
        <path d="M280 245 L315 245" stroke="white" strokeWidth="1.2"/>
        {/* Belly */}
        <ellipse cx="200" cy="290" rx="55" ry="40" fill="#dcf5ce" opacity="0.7"/>
      </g>, "mint");

    // -------------------- GIFTS / SIGNAGE --------------------
    case "trophy":
      return wrap(<g>
        <defs>
          <linearGradient id="goldT" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe7a1"/>
            <stop offset="50%" stopColor="#d4a02a"/>
            <stop offset="100%" stopColor="#7a5a10"/>
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="440" rx="150" ry="18" fill="#000" opacity="0.22"/>
        <rect x="130" y="380" width="140" height="50" rx="4" fill="#3a2810"/>
        <rect x="130" y="380" width="140" height="10" rx="4" fill="#5a3d12"/>
        <rect x="170" y="320" width="60" height="60" fill="url(#goldT)"/>
        <path d="M100 140 L300 140 L290 270 Q260 320 200 320 Q140 320 110 270 Z" fill="url(#goldT)"/>
        <path d="M100 140 L300 140 L295 165 L105 165 Z" fill="#fff" opacity="0.4"/>
        <path d="M100 180 Q60 200 60 240 Q60 280 100 280" stroke="url(#goldT)" strokeWidth="20" fill="none"/>
        <path d="M300 180 Q340 200 340 240 Q340 280 300 280" stroke="url(#goldT)" strokeWidth="20" fill="none"/>
        <text x="200" y="240" textAnchor="middle" fill="#3a2208" fontFamily="serif" fontSize="56" fontWeight="800">1</text>
      </g>, "sand");

    case "keychain":
      return wrap(<g>
        <defs>
          <linearGradient id="keyAcc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0aaec3"/>
            <stop offset="100%" stopColor="#055f6e"/>
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="430" rx="130" ry="14" fill="#000" opacity="0.18"/>
        <circle cx="200" cy="110" r="32" fill="none" stroke="#666" strokeWidth="8"/>
        <circle cx="200" cy="110" r="32" fill="none" stroke="#aaa" strokeWidth="3"/>
        <circle cx="200" cy="142" r="4" fill="#888"/>
        <rect x="100" y="170" width="200" height="220" rx="24" fill="url(#keyAcc)"/>
        <rect x="100" y="170" width="200" height="60" rx="24" fill="#fff" opacity="0.2"/>
        <text x="200" y="290" textAnchor="middle" fill="#fff" fontFamily="sans-serif" fontSize="48" fontWeight="800">B3D</text>
        <text x="200" y="340" textAnchor="middle" fill="#fff" fontFamily="sans-serif" fontSize="14" letterSpacing="4" opacity="0.85">RIYADH</text>
      </g>, "cool");

    case "plaque":
      return wrap(<g>
        <defs>
          <linearGradient id="walnut" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a06a3a"/>
            <stop offset="100%" stopColor="#4a2a10"/>
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="440" rx="160" ry="18" fill="#000" opacity="0.2"/>
        <rect x="50" y="120" width="300" height="280" rx="8" fill="url(#walnut)"/>
        <rect x="50" y="120" width="300" height="20" rx="8" fill="#fff" opacity="0.18"/>
        <rect x="65" y="135" width="270" height="250" rx="4" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.4"/>
        <text x="200" y="220" textAnchor="middle" fill="#fff" fontFamily="serif" fontSize="36" fontWeight="700">EMPLOYEE</text>
        <text x="200" y="265" textAnchor="middle" fill="#fff" fontFamily="serif" fontSize="36" fontWeight="700">OF THE YEAR</text>
        <line x1="120" y1="295" x2="280" y2="295" stroke="#fff" strokeWidth="1.5" opacity="0.5"/>
        <text x="200" y="340" textAnchor="middle" fill="#fff" fontFamily="serif" fontSize="22" fontStyle="italic">Ahmed Al-Saud · 2026</text>
      </g>, "sand");

    default:
      return wrap(<g><rect x="100" y="100" width="200" height="200" fill="#ccc"/></g>);
  }
};

window.ServiceArt = ServiceArt;
