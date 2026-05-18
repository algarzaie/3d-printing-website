// AI 2D→3D Studio widget
const D = window.SITE_DATA;

const STYLES = ["Realistic", "Stylized", "Low-Poly", "Mechanical"];
const FORMATS = ["STL", "STEP", "OBJ", "3MF"];

const AIStudio = () => {
  const [image, setImage] = React.useState(null);
  const [stage, setStage] = React.useState("idle"); // idle | analyzing | generating | done
  const [progress, setProgress] = React.useState(0);
  const [style, setStyle] = React.useState("Realistic");
  const [format, setFormat] = React.useState("STL");
  const [detail, setDetail] = React.useState(7);
  const [thickness, setThickness] = React.useState(2);
  const [dragging, setDragging] = React.useState(false);
  const fileRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const fileInput = React.useRef(null);

  const onPick = (e) => {
    e?.stopPropagation?.();
    fileInput.current?.click();
  };
  const onFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target.result);
      runPipeline();
    };
    reader.readAsDataURL(file);
  };
  const runPipeline = () => {
    setStage("analyzing");
    setProgress(0);
    let p = 0;
    const id = setInterval(() => {
      p += 2 + Math.random() * 4;
      if (p >= 100) {
        clearInterval(id);
        setProgress(100);
        setStage("done");
        return;
      }
      setProgress(p);
      if (p > 45) setStage("generating");
    }, 80);
  };

  const onDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onFile(f);
  };

  // Render rotating wireframe preview when "done"
  React.useEffect(() => {
    if (stage !== "done") return;
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    let raf, t = 0, dpr = window.devicePixelRatio || 1;
    const resize = () => { const r = cv.getBoundingClientRect(); cv.width = r.width * dpr; cv.height = r.height * dpr; };
    resize(); window.addEventListener("resize", resize);

    // Create points based on detail level (more pts = denser mesh)
    const dens = Math.floor(8 + detail * 1.5);
    const pts = [];
    const edges = [];
    for (let i = 0; i < dens; i++) {
      for (let j = 0; j < dens / 2; j++) {
        const u = (i / dens) * Math.PI * 2;
        const v = (j / (dens/2)) * Math.PI;
        const radius = 1 + 0.18 * Math.sin(u * 4) * Math.cos(v * 3);
        pts.push([
          radius * Math.sin(v) * Math.cos(u),
          radius * Math.cos(v),
          radius * Math.sin(v) * Math.sin(u),
        ]);
      }
    }
    const cols = Math.floor(dens/2);
    for (let i = 0; i < dens; i++) {
      for (let j = 0; j < cols; j++) {
        const a = i * cols + j;
        const b = ((i+1) % dens) * cols + j;
        const c = i * cols + Math.min(j+1, cols-1);
        edges.push([a,b],[a,c]);
      }
    }

    const accent = () => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();

    const draw = () => {
      const w = cv.width, h = cv.height;
      ctx.clearRect(0,0,w,h);
      t += 0.01;
      const cx = w/2, cy = h/2, sc = Math.min(w,h) * 0.32;
      const cosA = Math.cos(t), sinA = Math.sin(t);
      const cosB = Math.cos(t * 0.6), sinB = Math.sin(t * 0.6);
      const proj = pts.map(([x,y,z]) => {
        const x1 = x*cosA + z*sinA;
        const z1 = -x*sinA + z*cosA;
        const y1 = y*cosB - z1*sinB;
        const z2 = y*sinB + z1*cosB;
        const f = 3/(3+z2);
        return [cx+x1*sc*f, cy+y1*sc*f, z2];
      });
      ctx.lineWidth = 1 * dpr;
      const acc = accent();
      for (const [a,b] of edges) {
        const z = (proj[a][2] + proj[b][2])/2;
        const alpha = Math.max(0.1, Math.min(1, 0.7 - z * 0.4));
        ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.55})`;
        ctx.beginPath();
        ctx.moveTo(proj[a][0], proj[a][1]);
        ctx.lineTo(proj[b][0], proj[b][1]);
        ctx.stroke();
      }
      // accent highlight points
      ctx.fillStyle = acc;
      for (let i = 0; i < proj.length; i += 7) {
        if (proj[i][2] < 0) {
          ctx.fillRect(proj[i][0]-1.5*dpr, proj[i][1]-1.5*dpr, 3*dpr, 3*dpr);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [stage, detail]);

  const reset = () => { setImage(null); setStage("idle"); setProgress(0); };

  const stageLabel = stage === "analyzing" ? "Analyzing geometry"
    : stage === "generating" ? "Generating mesh"
    : stage === "done" ? "Complete" : "Ready";

  return (
    <div className="ai-studio">
      <div className="ai-pane">
        <div className="ai-pane-head">
          <span>01 · Source Image</span>
          <span className="led"></span>
        </div>
        <input type="file" ref={fileInput} accept="image/*" style={{ display: "none" }} onChange={(e) => onFile(e.target.files?.[0])}/>
        {!image ? (
          <div
            className={`ai-drop ${dragging ? "dragging" : ""}`}
            onClick={() => fileInput.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
          >
            <div className="ai-drop-inner">
              <div className="ai-drop-icon"><Icon name="upload" size={24}/></div>
              <div className="ai-drop-title">Drop an image or sketch</div>
              <div className="ai-drop-sub">Our model converts 2D references into print-ready 3D geometry</div>
              <div className="ai-drop-formats">PNG · JPG · WEBP · SVG</div>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 8 }} type="button" onClick={(e) => { e.stopPropagation(); fileInput.current?.click(); }}>
                Choose file
              </button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ position: "relative", borderRadius: 4, border: "1px solid var(--line)", overflow: "hidden", flex: 1, minHeight: 240, background: "var(--bg-2)" }}>
              <img src={image} style={{ width: "100%", height: "100%", objectFit: "contain" }}/>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={reset} style={{ alignSelf: "flex-start" }}>
              <Icon name="x" size={12}/> Replace
            </button>
          </>
        )}

        <div className="ai-controls">
          <div className="ai-row">
            <label>Style</label>
            <div className="ai-chips">
              {STYLES.map(s => (
                <button key={s} className={`ai-chip ${style===s?"active":""}`} onClick={() => setStyle(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div className="ai-row">
            <label>Detail Level</label>
            <div style={{ display:"flex", alignItems:"center", gap: 12 }}>
              <input className="ai-slider" type="range" min="1" max="10" value={detail} onChange={(e) => setDetail(+e.target.value)}/>
              <span className="val">{detail}/10</span>
            </div>
          </div>
          <div className="ai-row">
            <label>Wall Thickness</label>
            <div style={{ display:"flex", alignItems:"center", gap: 12 }}>
              <input className="ai-slider" type="range" min="0.5" max="5" step="0.1" value={thickness} onChange={(e) => setThickness(+e.target.value)}/>
              <span className="val">{thickness.toFixed(1)} mm</span>
            </div>
          </div>
          <div className="ai-row">
            <label>Output Format</label>
            <div className="ai-chips">
              {FORMATS.map(f => (
                <button key={f} className={`ai-chip ${format===f?"active":""}`} onClick={() => setFormat(f)}>{f}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="ai-pane">
        <div className="ai-pane-head">
          <span>02 · Generated Model</span>
          <span style={{ color: stage === "done" ? "var(--accent)" : "var(--ink-3)" }}>{stageLabel}</span>
        </div>
        <div className="ai-preview" style={{ position: "relative" }}>
          {stage === "idle" && (
            <div style={{ textAlign: "center", color: "var(--ink-3)", padding: 32 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>Awaiting input</div>
              <div style={{ marginTop: 12, fontSize: 13 }}>Upload a reference to begin generation</div>
            </div>
          )}
          {(stage === "analyzing" || stage === "generating") && (
            <div className="ai-preview-overlay">
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)" }}>
                  {stage === "analyzing" ? "Analyzing depth & contours" : "Generating mesh & UVs"}<span className="dots"><span/><span/><span/></span>
                </div>
                <div className="ai-progress"><span style={{ width: `${progress}%` }}/></div>
                <div className="ai-progress-label">{Math.floor(progress)}%</div>
              </div>
            </div>
          )}
          {stage === "done" && <canvas ref={canvasRef}/>}
          {stage === "done" && (
            <div style={{ position: "absolute", left: 16, bottom: 16, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--ink-2)", textTransform: "uppercase" }}>
              {format} · {(15.4 + detail * 0.8).toFixed(1)}MB · {Math.floor(2400 + detail * 380)} polys
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: "auto", flexWrap: "wrap" }}>
          <button
            className="btn btn-primary"
            disabled={stage !== "done"}
            style={{ opacity: stage !== "done" ? 0.4 : 1, cursor: stage !== "done" ? "not-allowed" : "pointer" }}
          >
            <Icon name="arrow" size={14}/> Download .{format.toLowerCase()}
          </button>
          <a href="#quote" className="btn btn-ghost" style={{ opacity: stage !== "done" ? 0.4 : 1, pointerEvents: stage !== "done" ? "none" : "auto" }}>
            Send to printer
          </a>
        </div>
      </div>
    </div>
  );
};

window.AIStudio = AIStudio;
