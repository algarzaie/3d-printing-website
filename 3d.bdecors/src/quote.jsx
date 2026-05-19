// Quote calculator + simulated file upload
const D = window.SITE_DATA;
const Q_MATERIALS = D.materials;

const QUALITY = [
  { id: "draft", label: "Draft", layer: 0.3, mult: 0.8 },
  { id: "standard", label: "Standard", layer: 0.2, mult: 1.0 },
  { id: "fine", label: "Fine", layer: 0.12, mult: 1.4 },
  { id: "ultra", label: "Ultra", layer: 0.05, mult: 2.1 },
];

const FINISH = [
  { id: "as-printed", label: "As-printed", mult: 1.0 },
  { id: "sanded", label: "Sanded", mult: 1.2 },
  { id: "vapor", label: "Vapor smoothed", mult: 1.6 },
  { id: "painted", label: "Painted", mult: 2.2 },
];

const fmtMoney = (v) => v.toFixed(2);

const QuoteCalculator = () => {
  const [material, setMaterial] = React.useState(Q_MATERIALS[0].name);
  const [quality, setQuality] = React.useState("standard");
  const [finish, setFinish] = React.useState("as-printed");
  const [infill, setInfill] = React.useState(20);
  const [volume, setVolume] = React.useState(45);
  const [qty, setQty] = React.useState(1);
  const [rush, setRush] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const [dragging, setDragging] = React.useState(false);
  const fileRef = React.useRef(null);

  const mat = Q_MATERIALS.find(m => m.name === material) || Q_MATERIALS[0];
  const qual = QUALITY.find(q => q.id === quality);
  const fin = FINISH.find(f => f.id === finish);

  // Pricing model (no per-material price — flat material rate)
  const matRate = 0.18; // SAR/cm³ baseline
  const matCost = volume * (0.3 + infill / 200) * matRate * qty;
  const machineCost = (volume / qual.layer) * 0.018 * qty;
  const finishCost = matCost * (fin.mult - 1);
  const subtotal = (matCost + machineCost + finishCost);
  const rushFee = rush ? subtotal * 0.35 : 0;
  const total = subtotal + rushFee + 25; // setup
  const eta = rush ? "12–24 hrs" : qty > 50 ? "5–7 days" : qty > 10 ? "3–5 days" : "24–72 hrs";

  const onFile = (file) => {
    if (!file) return;
    const id = Date.now() + Math.random();
    const entry = { id, name: file.name, size: file.size, progress: 0 };
    setFiles(f => [...f, entry]);
    // Simulate upload
    let p = 0;
    const tick = setInterval(() => {
      p += 5 + Math.random() * 12;
      setFiles(prev => prev.map(x => x.id === id ? { ...x, progress: Math.min(100, p) } : x));
      if (p >= 100) clearInterval(tick);
    }, 100);
    // Estimate volume from filename / size — fake
    const v = Math.max(8, Math.min(800, Math.round(file.size / 12000)));
    setVolume(v);
  };

  const onDrop = (e) => {
    e.preventDefault(); setDragging(false);
    Array.from(e.dataTransfer.files || []).forEach(onFile);
  };

  const removeFile = (id) => setFiles(f => f.filter(x => x.id !== id));

  return (
    <div className="quote-grid">
      <div className="quote-form">
        <div className="quote-field">
          <label>1 · Upload your files</label>
          <div
            className={`upload-zone ${dragging ? "dragging" : ""}`}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
          >
            <Icon name="upload" size={28}/>
            <div style={{ marginTop: 12, fontFamily: "var(--display)", fontSize: 18, fontWeight: 500 }}>
              Drop STL · STEP · OBJ · 3MF
            </div>
            <div style={{ color: "var(--ink-3)", fontSize: 13, marginTop: 4 }}>
              Or click to browse — up to 200MB per file
            </div>
            <input ref={fileRef} type="file" multiple hidden accept=".stl,.step,.stp,.obj,.3mf,.iges"
              onChange={(e) => Array.from(e.target.files || []).forEach(onFile)}/>
          </div>
          {files.map(f => (
            <div key={f.id} className="upload-file">
              <div className="upload-file-icon"><Icon name="file" size={16}/></div>
              <div className="upload-file-meta">
                <div className="name">{f.name}</div>
                <div className="size">{(f.size / 1024).toFixed(1)} KB · {Math.floor(f.progress)}%</div>
                <div className="upload-file-progress"><span style={{ width: `${f.progress}%` }}/></div>
              </div>
              <button onClick={() => removeFile(f.id)} aria-label="Remove" style={{ color: "var(--ink-3)" }}>
                <Icon name="x" size={16}/>
              </button>
            </div>
          ))}
        </div>

        <div className="quote-field">
          <label>2 · Material</label>
          <select value={material} onChange={(e) => setMaterial(e.target.value)}>
            {Q_MATERIALS.map(m => <option key={m.name} value={m.name}>{m.name} — {m.tag}</option>)}
          </select>
        </div>

        <div className="quote-field">
          <label>3 · Print Quality</label>
          <div className="quote-segments">
            {QUALITY.map(q => (
              <button key={q.id} className={`seg ${quality === q.id ? "active" : ""}`} onClick={() => setQuality(q.id)}>
                {q.label}<br/>
                <span style={{ fontSize: 9, opacity: 0.7 }}>{q.layer}mm</span>
              </button>
            ))}
          </div>
        </div>

        <div className="quote-field-row">
          <div className="quote-field">
            <label>4 · Infill Density</label>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <input type="range" min="10" max="100" step="5" value={infill} onChange={(e) => setInfill(+e.target.value)} style={{ flex: 1 }}/>
              <span className="mono" style={{ fontSize: 13, minWidth: 48, textAlign: "right" }}>{infill}%</span>
            </div>
          </div>
          <div className="quote-field">
            <label>5 · Volume (cm³)</label>
            <input type="number" min="1" max="2000" value={volume} onChange={(e) => setVolume(+e.target.value || 1)}/>
          </div>
        </div>

        <div className="quote-field-row">
          <div className="quote-field">
            <label>6 · Quantity</label>
            <input type="number" min="1" max="10000" value={qty} onChange={(e) => setQty(+e.target.value || 1)}/>
          </div>
          <div className="quote-field">
            <label>7 · Finish</label>
            <select value={finish} onChange={(e) => setFinish(e.target.value)}>
              {FINISH.map(f => <option key={f.id} value={f.id}>{f.label}</option>)}
            </select>
          </div>
        </div>

        <div className="quote-field">
          <label>
            <input type="checkbox" checked={rush} onChange={(e) => setRush(e.target.checked)} style={{ marginRight: 8 }}/>
            Rush order (12–24 hr turnaround, +35%)
          </label>
        </div>
      </div>

      <div className="quote-summary">
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-3)" }}>
          Estimate
        </div>
        <div className="summary-total">
          <span className="currency">SAR</span>{fmtMoney(total)}
        </div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-2)", marginTop: -8 }}>
          Estimated · VAT excluded · valid 30 days
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="summary-row"><span className="lbl">Material ({material})</span><span className="val">{fmtMoney(matCost)}</span></div>
          <div className="summary-row"><span className="lbl">Machine time ({qual.label})</span><span className="val">{fmtMoney(machineCost)}</span></div>
          <div className="summary-row"><span className="lbl">Finishing ({fin.label})</span><span className="val">{fmtMoney(finishCost)}</span></div>
          <div className="summary-row"><span className="lbl">Setup</span><span className="val">25.00</span></div>
          {rush && <div className="summary-row"><span className="lbl">Rush fee (+35%)</span><span className="val" style={{ color: "var(--accent)" }}>+{fmtMoney(rushFee)}</span></div>}
        </div>

        <div style={{ padding: 16, border: "1px solid var(--line)", borderRadius: 4, background: "var(--bg)" }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-3)" }}>Estimated delivery</div>
          <div style={{ fontFamily: "var(--display)", fontSize: 22, fontWeight: 600, marginTop: 4 }}>{eta}</div>
        </div>

        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "16px 20px" }}>
          Submit Order <Icon name="arrow" size={14}/>
        </button>
        <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
          Save quote · Email PDF
        </button>
      </div>
    </div>
  );
};

window.QuoteCalculator = QuoteCalculator;
