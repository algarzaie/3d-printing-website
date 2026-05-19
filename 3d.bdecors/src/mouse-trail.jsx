// Mouse trail — small particles that follow the cursor and fade out
const MouseTrail = () => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    let raf, dpr = window.devicePixelRatio || 1;
    let particles = [];
    let lastSpawn = 0;
    let mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999 };

    const resize = () => {
      cv.width = window.innerWidth * dpr;
      cv.height = window.innerHeight * dpr;
      cv.style.width = window.innerWidth + "px";
      cv.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      mouse.x = e.clientX * dpr;
      mouse.y = e.clientY * dpr;
    };
    window.addEventListener("pointermove", onMove);

    const accent = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      return v || "#00b4ff";
    };
    const accent2 = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--accent-2").trim();
      return v || "#00ffd1";
    };

    // Convert hex to rgb
    const hex2rgb = (hex) => {
      const h = hex.replace("#", "");
      const n = h.length === 3
        ? h.split("").map(c => parseInt(c + c, 16))
        : [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
      return n;
    };

    const draw = (ts) => {
      ctx.clearRect(0, 0, cv.width, cv.height);

      // Spawn particles along path
      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      const dist = Math.hypot(dx, dy);
      if (mouse.prevX !== -9999 && dist > 2) {
        const steps = Math.min(Math.floor(dist / 6), 6);
        for (let i = 0; i < steps; i++) {
          const t = i / Math.max(steps, 1);
          const x = mouse.prevX + dx * t;
          const y = mouse.prevY + dy * t;
          particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 0.6 * dpr,
            vy: (Math.random() - 0.5) * 0.6 * dpr,
            life: 1,
            size: (Math.random() * 2 + 1.4) * dpr,
            color: Math.random() > 0.5 ? accent() : accent2(),
          });
        }
      }
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      // Cap particles
      if (particles.length > 220) particles = particles.slice(-220);

      // Draw + decay
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.018;
      }
      particles = particles.filter(p => p.life > 0);

      // Sort connects: draw lines between near particles for trail effect
      ctx.lineWidth = 1 * dpr;
      for (let i = 0; i < particles.length - 1; i++) {
        const a = particles[i], b = particles[i + 1];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 24 * dpr) {
          const [r,g,bl] = hex2rgb(a.color);
          ctx.strokeStyle = `rgba(${r},${g},${bl},${Math.min(a.life, b.life) * 0.4})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Dots
      for (const p of particles) {
        const [r,g,b] = hex2rgb(p.color);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }

      // Glow at cursor
      if (mouse.x > 0) {
        const [r,g,b] = hex2rgb(accent());
        const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 24 * dpr);
        grd.addColorStop(0, `rgba(${r},${g},${b},0.5)`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 24 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // Detect touch — skip on mobile
  const [touch, setTouch] = React.useState(false);
  React.useEffect(() => {
    setTouch(window.matchMedia("(hover: none)").matches);
  }, []);
  if (touch) return null;

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

window.MouseTrail = MouseTrail;
