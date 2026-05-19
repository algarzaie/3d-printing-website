// Animated hero canvas: rotating wireframe 3D objects with grid + particles
const HeroBackground = () => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let raf, t = 0, w = 0, h = 0, dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const r = cv.getBoundingClientRect();
      w = cv.width = Math.floor(r.width * dpr);
      h = cv.height = Math.floor(r.height * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const accent = () => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#0aaec3";
    const ink = () => getComputedStyle(document.documentElement).getPropertyValue("--ink-2").trim() || "#475569";
    const accent2 = () => getComputedStyle(document.documentElement).getPropertyValue("--accent-2").trim() || "#f97316";

    // Detect light vs dark theme by reading bg luminance
    const isLightTheme = () => {
      const bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
      const hex = bg.replace("#", "");
      const r = parseInt(hex.slice(0,2), 16);
      const g = parseInt(hex.slice(2,4), 16);
      const b = parseInt(hex.slice(4,6), 16);
      return (r * 0.299 + g * 0.587 + b * 0.114) > 128;
    };

    // Build a torus knot-ish set of 3D points
    const points = [];
    const edges = [];
    const N = 18, M = 8;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        const u = (i / N) * Math.PI * 2;
        const v = (j / M) * Math.PI * 2;
        const R = 1, r = 0.36;
        const x = (R + r * Math.cos(v)) * Math.cos(u);
        const y = (R + r * Math.cos(v)) * Math.sin(u);
        const z = r * Math.sin(v);
        points.push([x, y, z]);
      }
    }
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        const a = i * M + j;
        const b = ((i + 1) % N) * M + j;
        const c = i * M + ((j + 1) % M);
        edges.push([a, b]);
        edges.push([a, c]);
      }
    }

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: Math.random(),
      vy: 0.0002 + Math.random() * 0.0008,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.004;

      // Background scanline
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = ink();
      ctx.lineWidth = 1 * dpr;
      const scanY = ((Math.sin(t * 0.5) + 1) / 2) * h;
      ctx.beginPath();
      ctx.moveTo(0, scanY); ctx.lineTo(w, scanY);
      ctx.stroke();
      ctx.restore();

      // Particles
      ctx.save();
      const accCol = accent();
      const acc2Col = accent2();
      for (const p of particles) {
        p.y -= p.vy;
        if (p.y < 0) p.y = 1;
        ctx.globalAlpha = p.a * (isLightTheme() ? 0.4 : 1);
        ctx.fillStyle = Math.random() > 0.5 ? accCol : acc2Col;
        ctx.fillRect(p.x * w, p.y * h, p.r * dpr, p.r * dpr);
      }
      ctx.restore();

      // 3D wireframe — rotate
      const cx = w * 0.7, cy = h * 0.55;
      const scale = Math.min(w, h) * 0.32;
      const cosA = Math.cos(t * 0.6), sinA = Math.sin(t * 0.6);
      const cosB = Math.cos(t * 0.4), sinB = Math.sin(t * 0.4);

      const project = ([x, y, z]) => {
        // rotate Y
        let x1 = x * cosA + z * sinA;
        let z1 = -x * sinA + z * cosA;
        // rotate X
        let y1 = y * cosB - z1 * sinB;
        let z2 = y * sinB + z1 * cosB;
        const f = 2.6 / (2.6 + z2);
        return [cx + x1 * scale * f, cy + y1 * scale * f, z2];
      };

      const projected = points.map(project);

      // Draw edges
      ctx.lineWidth = 1 * dpr;
      const light = isLightTheme();
      for (const [a, b] of edges) {
        const [ax, ay, az] = projected[a];
        const [bx, by, bz] = projected[b];
        const z = (az + bz) / 2;
        const alpha = Math.max(0.1, Math.min(1, 0.7 - z * 0.3));
        ctx.strokeStyle = light
          ? `rgba(10, 174, 195, ${alpha * 0.35})`
          : `rgba(255,255,255,${alpha * 0.45})`;
        ctx.beginPath();
        ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
        ctx.stroke();
      }

      // Vertices
      for (const [x, y, z] of projected) {
        const alpha = Math.max(0.2, Math.min(1, 0.7 - z * 0.4));
        const isHot = Math.random() > 0.985;
        ctx.fillStyle = isHot ? accCol : (light ? `rgba(15, 23, 42, ${alpha * 0.5})` : `rgba(255,255,255,${alpha})`);
        ctx.fillRect(x - dpr, y - dpr, 2 * dpr, 2 * dpr);
      }

      // A second smaller cube
      const cubePts = [
        [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
        [-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1],
      ];
      const cubeEdges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
      const cx2 = w * 0.18, cy2 = h * 0.7, sc2 = Math.min(w,h) * 0.08;
      const cosC = Math.cos(t * 0.9), sinC = Math.sin(t * 0.9);
      const cp = cubePts.map(([x,y,z]) => {
        const x1 = x * cosC + z * sinC;
        const z1 = -x * sinC + z * cosC;
        const y1 = y * cosA - z1 * sinA;
        const z2 = y * sinA + z1 * cosA;
        const f = 3 / (3 + z2);
        return [cx2 + x1 * sc2 * f, cy2 + y1 * sc2 * f, z2];
      });
      ctx.strokeStyle = `${accCol}`;
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 1.2 * dpr;
      for (const [a,b] of cubeEdges) {
        ctx.beginPath();
        ctx.moveTo(cp[a][0], cp[a][1]);
        ctx.lineTo(cp[b][0], cp[b][1]);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="hero-bg">
      <canvas ref={ref}></canvas>
    </div>
  );
};

window.HeroBackground = HeroBackground;
