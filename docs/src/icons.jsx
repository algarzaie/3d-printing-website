// Icon library — minimal stroke icons for BDecors 3D
const Icon = ({ name, size = 24, stroke = 1.6 }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: stroke,
    strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (name) {
    case "cube":
      return <svg {...props}><path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v10"/></svg>;
    case "layers":
      return <svg {...props}><path d="m12 2 10 6-10 6L2 8l10-6Z"/><path d="m2 14 10 6 10-6"/><path d="m2 11 10 6 10-6"/></svg>;
    case "spark":
      return <svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>;
    case "wrench":
      return <svg {...props}><path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 1 5.4-5.4l-2 2 1.4 1.4 2-2-2-2Z"/></svg>;
    case "scan":
      return <svg {...props}><path d="M3 7V5a2 2 0 0 1 2-2h2M21 7V5a2 2 0 0 0-2-2h-2M3 17v2a2 2 0 0 0 2 2h2M21 17v2a2 2 0 0 1-2 2h-2M3 12h18"/></svg>;
    case "polish":
      return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M8 12c2-2 6-2 8 0M8 8c2 2 6 2 8 0"/></svg>;
    case "rocket":
      return <svg {...props}><path d="M12 2c4 3 6 7 6 11 0 2-1 4-2 5l-4-2-4 2c-1-1-2-3-2-5 0-4 2-8 6-11Z"/><circle cx="12" cy="10" r="2"/><path d="M9 18c-1 1-2 3-2 4 1 0 3-1 4-2M15 18c1 1 2 3 2 4-1 0-3-1-4-2"/></svg>;
    case "stethoscope":
      return <svg {...props}><path d="M5 3v6a4 4 0 0 0 8 0V3M9 13v3a4 4 0 0 0 8 0v-1"/><circle cx="17" cy="14" r="2"/></svg>;
    case "car":
      return <svg {...props}><path d="M3 13l2-5a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 5v5h-3v-2H6v2H3v-5Z"/><circle cx="7" cy="16" r="1"/><circle cx="17" cy="16" r="1"/></svg>;
    case "chip":
      return <svg {...props}><rect x="6" y="6" width="12" height="12" rx="1"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/></svg>;
    case "building":
      return <svg {...props}><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/></svg>;
    case "lamp":
      return <svg {...props}><path d="M9 18h6M10 18l-2-7h8l-2 7M12 4v3M5 8l2 1M19 8l-2 1"/></svg>;
    case "vase":
      return <svg {...props}><path d="M9 3h6M9 3v3a3 3 0 0 0 1 2 4 4 0 0 1 1 3v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-5M15 3v3a3 3 0 0 1-1 2 4 4 0 0 0-1 3v8a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-5"/></svg>;
    case "handle":
      return <svg {...props}><rect x="5" y="9" width="14" height="6" rx="3"/><circle cx="8" cy="12" r="1"/><circle cx="16" cy="12" r="1"/></svg>;
    case "upload":
      return <svg {...props}><path d="M12 16V4M6 10l6-6 6 6M4 20h16"/></svg>;
    case "arrow":
      return <svg {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "play":
      return <svg {...props}><path d="M6 4l14 8-14 8V4Z"/></svg>;
    case "plus":
      return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case "check":
      return <svg {...props}><path d="m4 12 5 5L20 6"/></svg>;
    case "file":
      return <svg {...props}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/></svg>;
    case "x":
      return <svg {...props}><path d="m6 6 12 12M18 6 6 18"/></svg>;
    case "phone":
      return <svg {...props}><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M10 19h4"/></svg>;
    case "heart":
      return <svg {...props}><path d="M12 21c-6-4-10-8-10-12a5 5 0 0 1 10-2 5 5 0 0 1 10 2c0 4-4 8-10 12Z"/></svg>;
    case "user":
      return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>;
    case "diamond":
      return <svg {...props}><path d="M2.7 10.3l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4l-9-9a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4Z"/></svg>;
    case "book":
      return <svg {...props}><path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14M4 19a2 2 0 0 1 2-2h12M4 19v-2"/><path d="M9 9h6M9 13h6"/></svg>;
    case "tool":
      return <svg {...props}><path d="M14 7l-2-2M18 11l-2-2M7 17l-2 2M3 21l2-2M14 7l-3 3M18 11l-3 3M7 17l3-3"/></svg>;
    case "mask":
      return <svg {...props}><ellipse cx="12" cy="11" rx="10" ry="7"/><circle cx="8" cy="10" r="2"/><circle cx="16" cy="10" r="2"/><path d="M8 15c1 1 3 1 4 0 1 1 3 1 4 0"/></svg>;
    case "box":
      return <svg {...props}><path d="M3 7l9-5 9 5v10l-9 5-9-5V7Z"/><path d="M12 7v10M3 7l9 5 9-5"/></svg>;
    case "sign":
      return <svg {...props}><path d="M4 7h12l4 5-4 5H4M12 7v14"/></svg>;
    case "trophy":
      return <svg {...props}><path d="M6 9h12M8 3h8a1 1 0 0 1 1 1v5c0 3-2 6-5 6s-5-3-5-6V4a1 1 0 0 1 1-1Z"/><path d="M12 15v3M8 21h8M6 6v3M18 6v3"/></svg>;
    case "paw":
      return <svg {...props}><ellipse cx="12" cy="16" rx="3" ry="4"/><circle cx="8" cy="10" r="2"/><circle cx="16" cy="10" r="2"/><circle cx="7" cy="14" r="1.5"/><circle cx="17" cy="14" r="1.5"/></svg>;
    case "utensil":
      return <svg {...props}><path d="M10 3v6a4 4 0 0 0 4 4h0v8M6 3v18M6 9h4"/></svg>;
    default: return <svg {...props}/>;
  }
};

// Render a small abstract SVG illustration for gallery items
const GalleryArt = ({ shape, arabicName, romanName }) => {
  const common = { width: "100%", height: "100%", viewBox: "0 0 200 200", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinejoin: "round", strokeLinecap: "round" };
  switch (shape) {
    case "name-lamp":
      return (
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none">
          {/* Lamp base */}
          <ellipse cx="100" cy="175" rx="50" ry="6" fill="currentColor" opacity="0.18"/>
          <path d="M65 170 L135 170 L130 158 L70 158 Z" fill="currentColor" opacity="0.6"/>
          {/* Lamp body — soft glow */}
          <defs>
            <radialGradient id="lampGlow" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.95"/>
              <stop offset="60%" stopColor="currentColor" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.1"/>
            </radialGradient>
          </defs>
          <rect x="50" y="40" width="100" height="120" rx="14" fill="url(#lampGlow)"/>
          <rect x="50" y="40" width="100" height="120" rx="14" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.7"/>
          {/* Name typography */}
          <text x="100" y="105" textAnchor="middle" fontFamily="serif" fontSize="40" fontWeight="700" fill="white" opacity="0.95">{arabicName || "اسم"}</text>
          <text x="100" y="135" textAnchor="middle" fontFamily="sans-serif" fontSize="14" fontWeight="600" fill="white" opacity="0.85" letterSpacing="2">{(romanName || "NAME").toUpperCase()}</text>
        </svg>
      );
    case "pokemon-lamp":
      return (
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none">
          <ellipse cx="100" cy="180" rx="42" ry="5" fill="currentColor" opacity="0.18"/>
          {/* Base */}
          <path d="M70 178 L130 178 L126 168 L74 168 Z" fill="currentColor" opacity="0.5"/>
          {/* Pikachu silhouette glowing */}
          <defs>
            <radialGradient id="pokeGlow" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#FFD93D" stopOpacity="1"/>
              <stop offset="60%" stopColor="#FFC107" stopOpacity="0.85"/>
              <stop offset="100%" stopColor="#FFA000" stopOpacity="0.4"/>
            </radialGradient>
          </defs>
          {/* Ears */}
          <path d="M75 30 L70 60 L88 65 Z" fill="url(#pokeGlow)"/>
          <path d="M125 30 L130 60 L112 65 Z" fill="url(#pokeGlow)"/>
          <path d="M75 30 L73 42" stroke="#5a3a00" strokeWidth="2"/>
          <path d="M125 30 L127 42" stroke="#5a3a00" strokeWidth="2"/>
          {/* Body / head */}
          <ellipse cx="100" cy="100" rx="48" ry="55" fill="url(#pokeGlow)"/>
          {/* Cheeks */}
          <circle cx="75" cy="115" r="8" fill="#FF6B6B" opacity="0.7"/>
          <circle cx="125" cy="115" r="8" fill="#FF6B6B" opacity="0.7"/>
          {/* Eyes */}
          <circle cx="84" cy="95" r="4" fill="#1a1a1a"/>
          <circle cx="116" cy="95" r="4" fill="#1a1a1a"/>
          <circle cx="85" cy="93" r="1.5" fill="white"/>
          <circle cx="117" cy="93" r="1.5" fill="white"/>
          {/* Mouth */}
          <path d="M92 112 Q100 118 108 112" stroke="#1a1a1a" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
          {/* Glow halo */}
          <circle cx="100" cy="100" r="70" fill="none" stroke="url(#pokeGlow)" strokeWidth="3" opacity="0.4"/>
        </svg>
      );
    case "dino-lamp":
      return (
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none">
          <ellipse cx="100" cy="180" rx="48" ry="5" fill="currentColor" opacity="0.18"/>
          <path d="M65 178 L135 178 L130 168 L70 168 Z" fill="currentColor" opacity="0.5"/>
          <defs>
            <radialGradient id="dinoGlow" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#7ed957" stopOpacity="1"/>
              <stop offset="60%" stopColor="#4caf50" stopOpacity="0.85"/>
              <stop offset="100%" stopColor="#2e7d32" stopOpacity="0.4"/>
            </radialGradient>
          </defs>
          {/* Dino body */}
          <path d="M60 140 Q55 100 75 80 Q90 65 110 70 Q140 75 145 110 Q148 140 130 155 L130 165 L120 165 L120 155 L85 155 L85 165 L75 165 L75 155 Q62 148 60 140 Z" fill="url(#dinoGlow)"/>
          {/* Spikes */}
          <path d="M80 70 L82 60 L88 70 Z" fill="#388e3c"/>
          <path d="M95 65 L97 53 L103 65 Z" fill="#388e3c"/>
          <path d="M110 65 L112 53 L118 65 Z" fill="#388e3c"/>
          <path d="M125 73 L127 63 L133 73 Z" fill="#388e3c"/>
          {/* Eye */}
          <circle cx="125" cy="92" r="6" fill="white"/>
          <circle cx="127" cy="92" r="3" fill="#1a1a1a"/>
          {/* Mouth */}
          <path d="M130 110 L142 108 L142 115 L130 115 Z" fill="#388e3c"/>
          <path d="M133 112 L139 112" stroke="white" strokeWidth="0.6"/>
          {/* Belly */}
          <ellipse cx="100" cy="125" rx="20" ry="14" fill="#a8e6a3" opacity="0.7"/>
          {/* Halo */}
          <circle cx="100" cy="115" r="68" fill="none" stroke="url(#dinoGlow)" strokeWidth="3" opacity="0.4"/>
        </svg>
      );
    case "vase":
      return <svg {...common}>
        <path d="M70 40 L70 60 Q70 70 80 78 Q60 100 60 130 Q60 165 100 175 Q140 165 140 130 Q140 100 120 78 Q130 70 130 60 L130 40 Z"/>
        <path d="M65 40 H135"/>
        {[90, 110, 130, 150].map(y => <path key={y} d={`M${70 + Math.abs(y-130)*0.4} ${y} Q100 ${y-4} ${130 - Math.abs(y-130)*0.4} ${y}`}/>)}
      </svg>;
    case "handle":
      return <svg {...common}>
        <path d="M30 80 L30 120 M170 80 L170 120"/>
        <path d="M30 100 Q30 50 100 50 Q170 50 170 100"/>
        <circle cx="30" cy="100" r="6"/><circle cx="170" cy="100" r="6"/>
        <path d="M40 140 L160 140"/>
      </svg>;
    case "figure":
      return <svg {...common}>
        <circle cx="100" cy="50" r="20"/>
        <path d="M100 70 L100 130"/>
        <path d="M100 85 L70 110 M100 85 L130 110"/>
        <path d="M100 130 L80 175 M100 130 L120 175"/>
        <path d="M65 105 L60 120 M135 105 L140 120"/>
        <path d="M85 50 L82 45 M115 50 L118 45"/>
      </svg>;
    case "shade":
      return <svg {...common}>
        <path d="M70 60 L130 60 L150 130 L50 130 Z"/>
        <path d="M60 130 L140 130"/>
        <path d="M100 30 L100 60"/>
        <path d="M100 140 L100 175"/>
        <circle cx="100" cy="25" r="5"/>
        {[80,100,120].map(x => <path key={x} d={`M${x} 60 L${x + (x-100)*0.3} 130`}/>)}
      </svg>;
    case "logo":
      return <svg {...common}>
        <rect x="30" y="50" width="140" height="100" rx="6"/>
        <path d="M60 100 L80 80 L100 100 L120 80 L140 100"/>
        <circle cx="100" cy="120" r="6"/>
        <path d="M30 60 L170 60 M30 140 L170 140"/>
      </svg>;
    case "planter":
      return <svg {...common}>
        <path d="M50 90 L150 90 L140 170 L60 170 Z"/>
        <path d="M55 110 L145 110"/>
        <path d="M85 90 Q90 50 100 40 Q105 30 110 25"/>
        <path d="M100 90 Q105 60 115 50 Q120 45 125 40"/>
        <path d="M115 90 Q120 70 130 65"/>
      </svg>;
    case "bust":
      return <svg {...common}>
        <path d="M70 60 Q70 30 100 30 Q130 30 130 60 Q130 90 120 110 L120 130 L80 130 L80 110 Q70 90 70 60 Z"/>
        <circle cx="88" cy="65" r="3"/><circle cx="112" cy="65" r="3"/>
        <path d="M95 80 L100 95 L105 80"/>
        <path d="M50 175 L60 145 L140 145 L150 175 Z"/>
      </svg>;
    case "sign":
      return <svg {...common}>
        <path d="M30 70 L170 70 L160 130 L40 130 Z"/>
        <path d="M30 70 L40 130"/>
        <path d="M65 95 L75 110 L65 110 Z"/>
        <path d="M85 90 L85 110 M85 90 L95 110 M95 90 L95 110"/>
        <path d="M110 90 L110 110 L120 110"/>
        <circle cx="140" cy="100" r="8"/>
      </svg>;
    case "manifold":
      return <svg {...common}>
        <rect x="40" y="80" width="120" height="40" rx="4"/>
        <circle cx="70" cy="100" r="10"/><circle cx="100" cy="100" r="10"/><circle cx="130" cy="100" r="10"/>
        <path d="M70 80 v-30 M100 80 v-30 M130 80 v-30"/>
        <path d="M40 100 h-15 M160 100 h15"/>
      </svg>;
    case "drone":
      return <svg {...common}>
        <rect x="80" y="80" width="40" height="40" rx="4"/>
        <path d="M80 100 L40 60 M120 100 L160 60 M80 100 L40 140 M120 100 L160 140"/>
        <circle cx="40" cy="60" r="14"/><circle cx="160" cy="60" r="14"/>
        <circle cx="40" cy="140" r="14"/><circle cx="160" cy="140" r="14"/>
      </svg>;
    case "guide":
      return <svg {...common}>
        <path d="M50 100 Q100 50 150 100 Q100 150 50 100Z"/>
        <circle cx="100" cy="100" r="8"/>
        <path d="M70 80 v40 M100 75 v50 M130 80 v40"/>
      </svg>;
    case "heatsink":
      return <svg {...common}>
        {[40,55,70,85,100,115,130,145,160].map(x=> <path key={x} d={`M${x} 50 v100`}/>)}
        <rect x="40" y="50" width="120" height="100"/>
        <rect x="40" y="140" width="120" height="20"/>
      </svg>;
    case "tower":
      return <svg {...common}>
        <path d="M100 30 L140 170 L60 170 Z"/>
        <path d="M80 100 h40 M70 130 h60 M60 160 h80"/>
        <path d="M100 30 v140"/>
      </svg>;
    case "housing":
      return <svg {...common}>
        <circle cx="100" cy="100" r="50"/>
        <circle cx="100" cy="100" r="35"/>
        <circle cx="100" cy="100" r="20"/>
        <path d="M100 50 v-15 M100 165 v-15 M50 100 h-15 M165 100 h-15"/>
      </svg>;
    case "bracket":
      return <svg {...common}>
        <path d="M40 40 h60 v60 h60 v60 h-120 Z"/>
        <circle cx="60" cy="60" r="6"/><circle cx="140" cy="140" r="6"/>
        <path d="M100 40 L160 100 M40 100 L100 160"/>
      </svg>;
    default:
      return <svg {...common}><rect x="40" y="40" width="120" height="120"/></svg>;
  }
};

window.Icon = Icon;
window.GalleryArt = GalleryArt;
