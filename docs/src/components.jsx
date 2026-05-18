// Gallery with category filter
const D = window.SITE_DATA;

const Gallery = ({ limit }) => {
  const [filter, setFilter] = React.useState("All");
  const items = limit ? D.gallery.slice(0, limit) : D.gallery;
  const cats = ["All", ...new Set(D.gallery.map(g => g.category))];
  const filtered = filter === "All" ? items : items.filter(g => g.category === filter);
  return (
    <>
      {!limit && (
        <div className="gallery-filters">
          {cats.map(c => (
            <button key={c} className={`filter ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
      )}
      <div className="gallery">
        {filtered.map((g, i) => (
          <div key={i} className="gallery-item fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            {g.img ? (
              <div className="gallery-photo">
                <img src={g.img} alt={g.name} loading="lazy"/>
              </div>
            ) : (
              <div className="gallery-art" style={{ color: i % 3 === 0 ? "var(--accent)" : "var(--accent-2)" }}>
                <GalleryArt shape={g.shape} arabicName={g.arabicName} romanName={g.romanName}/>
              </div>
            )}
            <div className="gallery-meta">
              <span className="name">{g.name}</span>
              <span className="tag">{g.category}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const Materials = ({ preview }) => {
  const items = preview ? D.materials.slice(0, 4) : D.materials;
  return (
    <div className="materials-grid">
      {items.map((m, i) => (
        <div key={m.name} className="material-card fade-in" style={{ animationDelay: `${i * 50}ms` }}>
          <div className="material-swatch" style={{ background: m.color }}></div>
          <div>
            <div className="material-tag">{m.tag}</div>
            <div className="material-name">{m.name}</div>
          </div>
          <div className="material-stats">
            <div><span>Strength</span><span>{m.strength}</span></div>
            <div><span>Heat</span><span>{m.heat}°</span></div>
            <div><span>Flex</span><span>{m.flex}</span></div>
            <div><span>Max Temp</span><span>{m.heat + 30}°C</span></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const MaterialsTable = () => (
  <table className="mat-table">
    <thead>
      <tr>
        <th>Material</th>
        <th>Use Case</th>
        <th>Tensile Strength</th>
        <th>Heat Resistance</th>
        <th>Flexibility</th>
        <th style={{ textAlign: "right" }}>Best For</th>
      </tr>
    </thead>
    <tbody>
      {D.materials.map(m => (
        <tr key={m.name}>
          <td>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 24, height: 24, borderRadius: 4, background: m.color, border: "1px solid var(--line)" }}/>
              <strong>{m.name}</strong>
            </div>
          </td>
          <td style={{ color: "var(--ink-2)" }}>{m.tag}</td>
          <td><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div className="mat-bar"><span style={{ width: m.strength + "%" }}/></div><span className="mono" style={{ fontSize: 11 }}>{m.strength}</span></div></td>
          <td><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div className="mat-bar"><span style={{ width: m.heat + "%" }}/></div><span className="mono" style={{ fontSize: 11 }}>{m.heat}</span></div></td>
          <td><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div className="mat-bar"><span style={{ width: m.flex + "%" }}/></div><span className="mono" style={{ fontSize: 11 }}>{m.flex}</span></div></td>
          <td className="mono" style={{ textAlign: "right", color: "var(--ink-2)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.tag}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// FAQ accordion
const FAQ = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <div className="faq">
      {D.faqs.map((f, i) => (
        <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
            {f.q}
            <span className="icon"><Icon name="plus" size={16}/></span>
          </button>
          <div className="faq-a">{f.a}</div>
        </div>
      ))}
    </div>
  );
};

// Industries grid
const Industries = () => (
  <div className="industries">
    {D.industries.map((it, i) => (
      <div key={i} className="industry">
        <div className="industry-icon"><Icon name={it.icon} size={28} stroke={1.4}/></div>
        <h4>{it.title}</h4>
        <p>{it.desc}</p>
      </div>
    ))}
  </div>
);

// How it works
const HowItWorks = () => (
  <div className="how">
    {D.steps.map((s, i) => (
      <div key={i} className="how-step">
        <div className="how-num">{s.n}</div>
        <h4>{s.title}</h4>
        <p>{s.desc}</p>
      </div>
    ))}
  </div>
);

// Services rich showcase — 3 images per service, alternating layout
const ServiceShowcase = () => (
  <div className="showcase">
    {D.services.map((s, i) => {
      const reversed = i % 2 === 1;
      return (
        <article key={s.num} className={`showcase-row ${reversed ? "reverse" : ""}`}>
          <div className="showcase-text">
            <div className="showcase-num">{s.num} / 0{D.services.length}</div>
            <div className="showcase-icon"><Icon name={s.icon} size={28}/></div>
            <h3 className="showcase-title">{s.title}</h3>
            <p className="showcase-desc">{s.desc}</p>
            <a href="#quote" className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start" }}>
              Get a quote <Icon name="arrow" size={14}/>
            </a>
          </div>
          <div className="showcase-images">
            {s.images.map((img, j) => (
              <div key={j} className={`showcase-img showcase-img-${j}`}>
                {img.type === "photo"
                  ? <img src={img.src} alt={s.title} loading="lazy"/>
                  : <ServiceArt shape={img.shape}/>}
              </div>
            ))}
          </div>
        </article>
      );
    })}
  </div>
);

// Services grid (kept for compatibility — legacy callsites)
const Services = ({ preview }) => {
  const items = preview ? D.services.slice(0, 3) : D.services;
  return (
    <div className="services">
      {items.map((s, i) => (
        <a key={s.num} href="#quote" className="service fade-in" style={{ animationDelay: `${i * 50}ms` }}>
          <div className="service-num">{s.num} / {String(D.services.length).padStart(2, "0")}</div>
          <div className="service-icon"><Icon name={s.icon} size={28}/></div>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
          <span className="service-cta">Learn more <Icon name="arrow" size={12}/></span>
        </a>
      ))}
    </div>
  );
};

// Contact form
const ContactForm = () => {
  const [sent, setSent] = React.useState(false);
  return (
    <form className="quote-form" style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 4 }} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <div className="quote-field-row">
        <div className="quote-field"><label>Name</label><input type="text" required placeholder="Jane Engineer"/></div>
        <div className="quote-field"><label>Company</label><input type="text" placeholder="Acme Robotics"/></div>
      </div>
      <div className="quote-field-row">
        <div className="quote-field"><label>Email</label><input type="email" required placeholder="jane@acme.com"/></div>
        <div className="quote-field"><label>Phone</label><input type="tel" placeholder="+1 555 0100"/></div>
      </div>
      <div className="quote-field">
        <label>Project type</label>
        <select>
          <option>Rapid prototype</option>
          <option>Production run</option>
          <option>Engineering consultation</option>
          <option>3D scanning</option>
          <option>Other</option>
        </select>
      </div>
      <div className="quote-field">
        <label>Project details</label>
        <textarea rows="6" placeholder="Quantity, materials, tolerance requirements, deadline…"/>
      </div>
      <button className="btn btn-primary" type="submit" disabled={sent}>
        {sent ? <><Icon name="check" size={14}/> Sent — we'll reply within 1 hr</> : <>Send Inquiry <Icon name="arrow" size={14}/></>}
      </button>
    </form>
  );
};

// Simple 3-card services
const SimpleServices = () => (
  <div className="simple-services">
    {D.simpleServices.map((s, i) => (
      <div key={i} className="simple-service fade-in" style={{ animationDelay: `${i * 80}ms` }}>
        <div className="simple-service-icon"><Icon name={s.icon} size={32} stroke={1.8}/></div>
        <h3>{s.title}</h3>
        <p>{s.desc}</p>
      </div>
    ))}
  </div>
);

// Print categories grid
const PrintCategories = () => (
  <div className="print-categories">
    {D.printCategories.map((cat, i) => (
      <div key={i} className="print-category fade-in" style={{ animationDelay: `${i * 30}ms` }}>
        <div className="print-category-icon"><Icon name={cat.icon} size={28}/></div>
        <div className="print-category-name">{cat.name}</div>
        <div className="print-category-tag">{cat.tag}</div>
      </div>
    ))}
  </div>
);

window.Gallery = Gallery;
window.Materials = Materials;
window.MaterialsTable = MaterialsTable;
window.FAQ = FAQ;
window.Industries = Industries;
window.HowItWorks = HowItWorks;
window.Services = Services;
window.ServiceShowcase = ServiceShowcase;
window.SimpleServices = SimpleServices;
window.PrintCategories = PrintCategories;
window.ContactForm = ContactForm;
