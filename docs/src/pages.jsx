// Pages: Home, Services, Materials, AIStudio, Gallery, Quote, Contact
const D = window.SITE_DATA;

const Home = () => (
  <>
    <section className="hero">
      <HeroBackground/>
      <div className="hero-grid"></div>
      <div className="container hero-inner">
        <div className="hero-eyebrow">
          <span className="pulse"></span> Advanced 3D Printing · Riyadh, KSA
        </div>
        <h1 className="hero-title">
          <em>Transform Ideas</em><br/>Into Reality
        </h1>
        <p className="hero-sub">
          Custom 3D printing services for interior design, furniture, automotive, industrial parts,
          collectibles, and gifts — with an AI Studio that turns sketches into print-ready models.
        </p>
        <div className="hero-actions">
          <a href="#quote" className="btn btn-primary">Get Instant Quote <Icon name="arrow" size={14}/></a>
          <a href="#services" className="btn btn-ghost">Explore Services</a>
        </div>

        <div className="hero-stats">
          {D.stats.map((s, i) => (
            <div key={i} className="hero-stat">
              <div className="hero-stat-num">{s.num}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-head section-head-center">
          <div>
            <h2 className="section-title">Our Services</h2>
            <p className="section-sub">Cutting-edge 3D printing solutions for every need</p>
          </div>
        </div>
        <SimpleServices/>
      </div>
    </section>

    <section className="section" style={{ background: "var(--bg-2)", padding: "80px 0" }}>
      <div className="container">
        <div className="section-head section-head-center">
          <div>
            <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.8vw, 40px)" }}>2D Photo to 3D Model in Minutes</h2>
            <p className="section-sub">Our advanced AI technology converts any 2D image into a printable 3D model. Simply upload a photo, and we do the rest.</p>
          </div>
        </div>
        <AIStudio/>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-head section-head-center">
          <div>
            <h2 className="section-title">What We Can Print</h2>
            <p className="section-sub">From prototypes to production parts</p>
          </div>
        </div>
        <PrintCategories/>
      </div>
    </section>

    <CTABanner/>
  </>
);

const ServicesPage = () => (
  <>
    <PageHeader crumb="Services" title="What we print." sub="From sculptural decor to functional parts — every job runs through the same custom workflow."/>
    <section className="section"><div className="container"><ServiceShowcase/></div></section>
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <div className="section-head section-head-center"><div>
          <div className="section-eyebrow">Process</div>
          <h2 className="section-title">How a job moves through our studio.</h2>
        </div></div>
        <HowItWorks/>
      </div>
    </section>
    <CTABanner/>
  </>
);

const MaterialsPage = () => (
  <>
    <PageHeader crumb="Materials" title="The material library." sub="Eight production-grade filaments, all in stock, in a wide range of colors. Compare specs, then quote."/>
    <section className="section"><div className="container"><Materials/></div></section>
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <div className="section-head section-head-center"><div>
          <div className="section-eyebrow">Comparison</div>
          <h2 className="section-title">Side by side.</h2>
          <p className="section-sub">Values are normalized 0–100. Use as a relative guide — we'll recommend the right pick for your project.</p>
        </div></div>
        <MaterialsTable/>
      </div>
    </section>
    <CTABanner/>
  </>
);

const AIStudioPage = () => (
  <>
    <PageHeader crumb="AI Studio" title="2D in. 3D out." sub="Drop a sketch, photo, or reference image and our generative engine produces a watertight, print-ready mesh in under 60 seconds."/>
    <section className="section"><div className="container"><AIStudio/></div></section>
    <section className="section" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <div className="section-head"><div>
          <div className="section-eyebrow">Notes</div>
          <h2 className="section-title">What the engine handles.</h2>
        </div></div>
        <div className="services">
          {[
            { num: "A", icon: "spark", title: "Single-image depth", desc: "Monocular depth inference followed by mesh extraction. Best for organic shapes and reliefs." },
            { num: "B", icon: "scan", title: "Multi-view fusion", desc: "Upload 4–12 photos around an object; we fuse them into a high-fidelity scan-quality mesh." },
            { num: "C", icon: "wrench", title: "Mechanical priors", desc: "When you mark a part as 'mechanical', we snap edges, regularize features, and add draft angles." },
          ].map((s, i) => (
            <div key={i} className="service">
              <div className="service-num">{s.num}</div>
              <div className="service-icon"><Icon name={s.icon} size={28}/></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <CTABanner/>
  </>
);

const GalleryPage = () => null; // removed

const QuotePage = () => (
  <>
    <PageHeader crumb="Quote" title="Instant quote." sub="Upload your geometry, configure material and finish, and see a live price. Submit when ready."/>
    <section className="section"><div className="container"><QuoteCalculator/></div></section>
  </>
);

const ContactPage = () => (
  <>
    <PageHeader crumb="Contact" title="Talk to our team." sub="Same-day reply during KSA business hours. We sign NDAs before any technical exchange."/>
    <section className="section">
      <div className="container">
        <div className="contact-grid">
          <div>
            <ContactForm/>
          </div>
          <div className="contact-info">
            <div className="contact-card">
              <div className="lbl">Email</div>
              <a className="val" href={`mailto:${D.email}`}>{D.email}</a>
            </div>
            <div className="contact-card">
              <div className="lbl">Phone / WhatsApp</div>
              <a className="val" href={`tel:${D.phone.replace(/\s/g, "")}`}>{D.phone}</a>
            </div>
            <div className="contact-card">
              <div className="lbl">Workshop</div>
              <div className="val">Olaya District</div>
              <div style={{ color: "var(--ink-2)", marginTop: 8, fontSize: 14 }}>
                King Fahd Road<br/>Riyadh, Kingdom of Saudi Arabia
              </div>
              <a href="https://share.google/WF4cLDMaVjPvSCXI0" target="_blank" rel="noreferrer" className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)" }}>
                Open in Google Maps <Icon name="arrow" size={12}/>
              </a>
            </div>
            <div className="contact-card">
              <div className="lbl">Hours</div>
              <div className="val">Sun – Thu, 09:00 – 18:00 AST</div>
              <div style={{ color: "var(--ink-2)", marginTop: 8, fontSize: 14 }}>
                Rush queue 24/7 on request
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

window.Pages = { Home, ServicesPage, MaterialsPage, AIStudioPage, QuotePage, ContactPage };
