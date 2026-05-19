// Layout: Nav, Footer, Marquee
const D = window.SITE_DATA;

const NAV = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "materials", label: "Materials" },
  { id: "ai-studio", label: "AI Studio" },
  { id: "contact", label: "Contact" },
];

const Logo = () => (
  <a href="#home" className="logo">
    <span className="logo-mark">
      <svg viewBox="0 0 40 40" fill="none">
        <defs>
          <linearGradient id="layerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--accent)", stopOpacity: 1 }}/>
            <stop offset="100%" style={{ stopColor: "var(--accent-2)", stopOpacity: 1 }}/>
          </linearGradient>
        </defs>
        <path d="M8 24 L20 30 L32 24" stroke="url(#layerGrad)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round"/>
        <path d="M8 18 L20 24 L32 18" stroke="url(#layerGrad)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round"/>
        <path d="M8 12 L20 18 L32 12 L20 6 Z" stroke="url(#layerGrad)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round"/>
      </svg>
    </span>
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <strong style={{ fontWeight: 700, color: "var(--ink)" }}>BDecors</strong>
        <em style={{ color: "var(--accent)", fontStyle: "normal", fontWeight: 700 }}>3D</em>
      </span>
      <span style={{ fontSize: 10, color: "var(--ink-3)", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>Advanced 3D Printing</span>
    </div>
  </a>
);

const ThemeSwitch = ({ theme, setTheme }) => (
  <div className="theme-switch" title="Theme">
    {[
      { id: "printpro", color: "#00b4ff" },
      { id: "industrial", color: "#ff5b1f" },
      { id: "futuristic", color: "#b8ff00" },
      { id: "premium", color: "#d44a18" },
    ].map(t => (
      <button
        key={t.id}
        className={`theme-dot ${theme === t.id ? "active" : ""}`}
        onClick={() => setTheme(t.id)}
        aria-label={t.id}
      ><span style={{ background: t.color }}></span></button>
    ))}
  </div>
);

const Nav = ({ route, setRoute, theme, setTheme }) => {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Logo />
        <div className="nav-links">
          {NAV.map(n => (
            <a key={n.id} href={`#${n.id}`} className={`nav-link ${route === n.id ? "active" : ""}`}>
              {n.label}
            </a>
          ))}
        </div>
        <div className="nav-cta">
          <ThemeSwitch theme={theme} setTheme={setTheme} />
          <a href="#contact" className="btn btn-google btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.46 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38Z"/></svg>
            Sign in
          </a>
          <a href="#quote" className="btn btn-primary btn-sm">
            Request Quote
          </a>
        </div>
      </div>
    </nav>
  );
};

const Marquee = () => (
  <div className="marquee" aria-hidden="true">
    <div className="marquee-track">
      {[...D.marquee, ...D.marquee].map((m, i) => (
        <span key={i} className="marquee-item">
          <span className="dot"></span>{m}
        </span>
      ))}
    </div>
  </div>
);

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-tagline">
        Design it. Print it. <em>Deliver it.</em>
      </div>
      <div className="footer-grid">
        <div className="footer-col">
          <Logo />
          <p style={{ color: "var(--ink-2)", marginTop: 16, maxWidth: 32 + "ch" }}>
            Custom 3D printing for interior design, furniture, automotive, industrial, and collectible projects. Based in Riyadh, KSA.
          </p>
        </div>
        <div className="footer-col">
          <h5>Services</h5>
          <a href="#services">Interior Design</a>
          <a href="#services">Furniture Accessories</a>
          <a href="#services">Automotive Parts</a>
          <a href="#services">Industrial & Engineering</a>
          <a href="#services">Figures & Gifts</a>
        </div>
        <div className="footer-col">
          <h5>Resources</h5>
          <a href="#materials">Material Library</a>
          <a href="#ai-studio">AI Studio</a>
          <a href="#quote">Instant Quote</a>
          <a href="#contact">Tech Support</a>
        </div>
        <div className="footer-col">
          <h5>Contact</h5>
          <a href="mailto:3d@bdecors.com">3d@bdecors.com</a>
          <a href="tel:+966568400053">+966 56 840 0053</a>
          <a href="https://share.google/WF4cLDMaVjPvSCXI0" target="_blank" rel="noreferrer">Riyadh · Kingdom of Saudi Arabia</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 BDecors 3D · Riyadh, KSA</span>
        <span>v3.2.1 · Build 2104</span>
      </div>
    </div>
  </footer>
);

const CTABanner = () => (
  <section className="cta-banner">
    <div className="container cta-banner-inner">
      <h2>Ready to print something real?</h2>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a href="#quote" className="btn btn-primary">Start a quote <Icon name="arrow" size={14}/></a>
        <a href="#contact" className="btn btn-ghost" style={{ borderColor: "var(--accent-ink)", color: "var(--accent-ink)" }}>Talk to engineering</a>
      </div>
    </div>
  </section>
);

const PageHeader = ({ crumb, title, sub }) => (
  <section className="page-header">
    <div className="container" style={{ textAlign: "center" }}>
      <div className="crumbs" style={{ justifyContent: "center" }}>Home <span>/</span> {crumb}</div>
      <h1 className="section-title" style={{ marginBottom: 16, marginLeft: "auto", marginRight: "auto", fontSize: "clamp(40px, 5.4vw, 80px)" }}>{title}</h1>
      {sub && <p className="section-sub" style={{ fontSize: 20, margin: "0 auto" }}>{sub}</p>}
    </div>
  </section>
);

window.Nav = Nav;
window.Marquee = Marquee;
window.Footer = Footer;
window.CTABanner = CTABanner;
window.PageHeader = PageHeader;
window.Logo = Logo;
