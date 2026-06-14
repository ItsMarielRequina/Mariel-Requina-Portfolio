import { useEffect, useRef, useState, useCallback } from "react";

const certifications = [
  {
    title: "Internship Completion Certification",
    issuer: "DSWD",
    date: "May 25, 2026",
    description: "Successfully completed 486 hours of supervised On-the-Job Training (OJT) at DSWD Field Office XI from February 18 to May 25, 2026. Contributed to the development of the Purchase Request Tracking System Project for the Pantawid Pamilyang Pilipino Program (4Ps) in the Davao Region, applying skills in database management, system workflows, and compliance-focused software development.",
    badge: "🏆",
    image: "./src/assets/cert.png",
    accent: "#7c3aed",
    accentRgb: "124,58,237",
  },
  {
    title: "Legacy Responsive Web Design V8",
    issuer: "FreeCodeCamp",
    date: "April 15, 2026",
    description: "Earned certification in responsive web design principles, covering HTML, CSS, and accessibility best practices. Demonstrated ability to build adaptive layouts, mobile-first designs, and user-friendly interfaces aligned with modern web standards.",
    badge: "🏆",
    image: "./src/assets/cert1.png",
    accent: "#7c3aed",
    accentRgb: "124,58,237",
  },
  {
    title: "Getting Started with Full Stack Java Development",
    issuer: "SimpliLearn",
    date: "April 14, 2026",
    description: "Completed certification in Full Stack Java Development, covering core Java programming, Spring framework, Hibernate, RESTful APIs, and front-end technologies. Validates ability to build, test, and deploy scalable web applications using end-to-end Java-based solutions.",
    badge: "🎖️",
    image: "./src/assets/cert2.png",
    accent: "#6366f1",
    accentRgb: "99,102,241",
  },
  {
    title: "Critical Thinking in the AI Era",
    issuer: "Hp Life / Hp Foundation",
    date: "April 16, 2026",
    description: "Completed certification focused on developing critical thinking skills in the context of artificial intelligence. Validates the ability to analyze AI-driven challenges, evaluate ethical implications, and apply problem-solving strategies to adapt in a rapidly evolving digital era.",
    badge: "📜",
    image: "./src/assets/cert3.png",
    accent: "#8b5cf6",
    accentRgb: "139,92,246",
  },
  {
    title: "CS205: Building with Artificial Intelligence",
    issuer: "Sailor Unniversity",
    date: "April 14, 2026",
    description: "Completed certification course focused on the foundations of artificial intelligence. Covered key concepts such as machine learning, neural networks, natural language processing, and ethical considerations in AI. Validates ability to apply AI techniques in building intelligent systems and applications.",
    badge: "📜",
    image: "./src/assets/cert4.png",
    accent: "#8b5cf6",
    accentRgb: "139,92,246",
  },
  {
    title: "Cyber Treat Management",
    issuer: "Cisco Networking Academy",
    date: "April 14, 2026",
    description: "Completed certification in Cyber Threat Management, focusing on identifying, analyzing, and mitigating cybersecurity risks. Validates skills in threat detection, incident response, and the application of security best practices to protect networks and data against evolving cyber threats.",
    badge: "📜",
    image: "./src/assets/cert5.png",
    accent: "#8b5cf6",
    accentRgb: "139,92,246",
  },
];

/* ─── Particle Canvas (matching Hero) ─── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y
          );
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

/* ─── Cinematic modal ─── */
function CertModal({ cert, onClose }) {
  const overlayRef = useRef(null);
  const [entering, setEntering] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntering(false), 20);
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(5,8,22,0.92)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
        opacity: entering ? 0 : 1, transition: "opacity 0.3s ease",
      }}
    >
      <div
        style={{
          width: "100%", maxWidth: "700px",
          background: "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${cert.accent}55`,
          borderRadius: "28px", overflow: "hidden",
          boxShadow: `0 0 0 1px ${cert.accent}22, 0 40px 100px rgba(0,0,0,0.8), 0 0 80px rgba(${cert.accentRgb},0.15)`,
          transform: entering ? "scale(0.93) translateY(24px)" : "scale(1) translateY(0)",
          transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Modal header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: `linear-gradient(135deg, rgba(${cert.accentRgb},0.18), rgba(${cert.accentRgb},0.05))`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "42px", height: "42px", borderRadius: "12px",
              background: `linear-gradient(145deg, rgba(${cert.accentRgb},0.3), rgba(${cert.accentRgb},0.1))`,
              border: `1px solid rgba(${cert.accentRgb},0.35)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px",
              boxShadow: `0 0 16px rgba(${cert.accentRgb},0.25)`,
            }}>{cert.badge}</div>
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "15px", margin: 0 }}>{cert.title}</p>
              <p style={{ color: cert.accent, fontSize: "12px", margin: 0, opacity: 0.85 }}>{cert.issuer}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "32px", height: "32px", borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)",
              color: "#94a3b8", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#94a3b8"; }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Certificate image */}
        <div style={{ position: "relative", background: "#050816", padding: "20px" }}>
          <div style={{
            position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
          }} />
          {["left", "right"].map((side) => (
            <div key={side} style={{
              position: "absolute", top: 20, [side]: 20,
              width: "100px", height: "100px", borderRadius: "50%",
              background: `radial-gradient(circle, rgba(${cert.accentRgb},0.12), transparent 70%)`,
              pointerEvents: "none", zIndex: 1,
            }} />
          ))}
          <img
            src={cert.image}
            alt={cert.title}
            onLoad={() => setImgLoaded(true)}
            style={{
              width: "100%", borderRadius: "16px", objectFit: "contain",
              maxHeight: "400px", display: "block", position: "relative", zIndex: 1,
              border: `1px solid rgba(${cert.accentRgb},0.2)`,
              boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 30px rgba(${cert.accentRgb},0.1)`,
              opacity: imgLoaded ? 1 : 0,
              transform: imgLoaded ? "scale(1)" : "scale(0.98)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          />
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#475569", letterSpacing: "0.05em" }}>
            {cert.credentialId}
          </span>
          
            <a
              href={cert.link}
            target="_blank"
            rel="noreferrer"
            style={{
              color: cert.accent, background: `rgba(${cert.accentRgb},0.1)`,
              border: `1px solid rgba(${cert.accentRgb},0.35)`,
              borderRadius: "12px", padding: "8px 16px",
              fontSize: "12px", fontWeight: 600,
              display: "flex", alignItems: "center", gap: "6px", textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = `rgba(${cert.accentRgb},0.2)`}
            onMouseLeave={e => e.currentTarget.style.background = `rgba(${cert.accentRgb},0.1)`}
          >
            View Credential
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Holographic tilt card ─── */
function HoloCard({ cert, i, onView }) {
  const ref = useRef(null);
  const raf = useRef(null);
  const [visible, setVisible] = useState(false);
  const [mx, setMx] = useState(50);
  const [my, setMy] = useState(50);
  const [hovered, setHovered] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const onMove = useCallback((e) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = ((e.clientX - r.left) / r.width) * 100;
      const py = ((e.clientY - r.top) / r.height) * 100;
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      setMx(px); setMy(py);
      el.style.transform = `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 5}deg) translateY(-8px) scale(1.02)`;
    });
  }, []);

  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0) rotateX(0) translateY(0) scale(1)";
    setHovered(false);
  }, []);

  const delay = i * 0.14;
  const holoAngle = hovered ? `${mx * 1.2}deg` : "135deg";
  const holoOpacity = hovered ? 0.18 : 0;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl border flex flex-col"
      style={{
        willChange: "transform",
        transition: `transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.8s ease ${delay}s, translate 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        opacity: visible ? 1 : 0,
        translate: visible ? "0 0" : "0 50px",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        borderColor: hovered ? `${cert.accent}66` : "rgba(255,255,255,0.07)",
        boxShadow: hovered
          ? `0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.09), 0 0 60px rgba(${cert.accentRgb},0.16)`
          : "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
      onMouseMove={(e) => { setHovered(true); onMove(e); }}
      onMouseLeave={onLeave}
    >
      {/* Holographic foil shimmer */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", borderRadius: "inherit",
        background: `linear-gradient(${holoAngle}, transparent 20%, rgba(${cert.accentRgb},0.22) 40%, rgba(167,139,250,0.18) 50%, rgba(${cert.accentRgb},0.22) 60%, transparent 80%)`,
        opacity: holoOpacity,
        transition: "opacity 0.3s ease",
        mixBlendMode: "screen",
      }} />

      {/* Mouse spotlight */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", borderRadius: "inherit",
        background: `radial-gradient(300px circle at ${mx}% ${my}%, rgba(${cert.accentRgb},0.1), transparent 65%)`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
      }} />

      {/* Top shimmer bar — matches Hero's gradient divider */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px", zIndex: 2,
        background: `linear-gradient(90deg, transparent, ${cert.accent}cc, transparent)`,
        opacity: hovered ? 1 : 0.35, transition: "opacity 0.3s",
      }} />

      {/* Preview image strip */}
      <div style={{ position: "relative", overflow: "hidden", height: "160px" }}>
        <img
          src={cert.image}
          alt={cert.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover", objectPosition: "top",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
            display: "block",
          }}
        />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "60px",
          background: "linear-gradient(to top, #050816, transparent)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "10px", right: "10px",
          background: "rgba(5,8,22,0.75)", backdropFilter: "blur(8px)",
          border: `1px solid rgba(${cert.accentRgb},0.35)`,
          borderRadius: "20px", padding: "3px 10px",
          fontSize: "11px", fontWeight: 600, color: cert.accent,
        }}>{cert.date}</div>
      </div>

      {/* Card body */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", flex: 1, padding: "20px 22px", gap: "14px" }}>

        {/* Badge row */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "14px", flexShrink: 0,
            background: `linear-gradient(145deg, rgba(${cert.accentRgb},0.28), rgba(${cert.accentRgb},0.08))`,
            border: `1px solid rgba(${cert.accentRgb},0.3)`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px",
            boxShadow: hovered ? `0 0 18px rgba(${cert.accentRgb},0.3)` : "none",
            transition: "box-shadow 0.3s",
          }}>{cert.badge}</div>

          {/* Verified stamp */}
          <div style={{
            display: "flex", alignItems: "center", gap: "5px",
            background: `rgba(${cert.accentRgb},0.08)`,
            border: `1px solid rgba(${cert.accentRgb},0.25)`,
            borderRadius: "20px", padding: "4px 10px",
            fontSize: "10px", fontWeight: 700, color: cert.accent, letterSpacing: "0.05em",
          }}>
            <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            VERIFIED
          </div>
        </div>

        {/* Title + issuer */}
        <div>
          <h3 style={{
            color: "#fff", fontWeight: 700, fontSize: "15px", lineHeight: "1.35",
            marginBottom: "4px",
            position: "relative", display: "inline-block",
          }}>
            {cert.title}
            <span style={{
              position: "absolute", bottom: "-2px", left: 0,
              height: "1px", background: `linear-gradient(90deg, ${cert.accent}, transparent)`,
              width: visible ? "100%" : "0%",
              transition: `width 0.9s ease ${delay + 0.5}s`,
            }} />
          </h3>
          <p style={{ color: cert.accent, fontSize: "12px", fontWeight: 600, marginTop: "6px", opacity: 0.9 }}>{cert.issuer}</p>
        </div>

        {/* Description */}
        <p style={{ color: "rgba(148,163,184,0.75)", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>{cert.description}</p>

        {/* Divider — matches Hero's gradient divider */}
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)",
        }} />

        {/* Credential ID */}
        <p style={{ fontFamily: "monospace", fontSize: "10px", color: "#334155", letterSpacing: "0.06em" }}>
          {cert.credentialId}
        </p>

        {/* CTA button — matches Hero's secondary button style */}
        <button
          onClick={() => onView(cert)}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            marginTop: "auto",
            width: "100%", padding: "10px 0",
            borderRadius: "14px",
            border: `1px solid ${btnHover ? `rgba(${cert.accentRgb},0.5)` : "rgba(255,255,255,0.12)"}`,
            background: btnHover ? `rgba(${cert.accentRgb},0.15)` : "rgba(255,255,255,0.04)",
            backdropFilter: "blur(10px)",
            color: btnHover ? cert.accent : "rgba(148,163,184,0.8)",
            fontSize: "13px", fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
            transition: "all 0.25s",
            boxShadow: btnHover ? `0 0 24px rgba(${cert.accentRgb},0.2)` : "none",
            transform: btnHover ? "translateY(-1px)" : "translateY(0)",
          }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Certificate
          <svg
            width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            style={{ opacity: btnHover ? 1 : 0, transform: btnHover ? "translateX(0)" : "translateX(-4px)", transition: "all 0.2s" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Section header ─── */
function SectionHeader() {
  const ref = useRef(null);
  const [v, setV] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center mb-20">
      {/* Availability badge style — matches Hero */}
      <div
        className="flex items-center justify-center gap-2 mb-4"
        style={{ opacity: v ? 1 : 0, transition: "opacity 0.6s ease 0.1s" }}
      >
        <div
          className="h-px w-8 rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, #7c3aed)" }}
        />
        <p
          className="uppercase tracking-[0.35em] text-xs font-medium"
          style={{ color: "rgba(196,181,253,0.8)" }}
        >
          Credentials
        </p>
        <div
          className="h-px w-8 rounded-full"
          style={{ background: "linear-gradient(90deg, #7c3aed, transparent)" }}
        />
      </div>

      {/* Title — matches Hero h1 gradient */}
      <div style={{ overflow: "hidden" }}>
        <h2
          className="font-black uppercase"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #fff 30%, rgba(196,181,253,0.7) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: v ? 1 : 0,
            transform: v ? "translateY(0)" : "translateY(50px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s",
          }}
        >
          Certifications
        </h2>
      </div>

      {/* Animated divider — matches Hero */}
      <div style={{ display: "flex", justifyContent: "center", margin: "14px 0" }}>
        <div style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, #7c3aed, #a78bfa, #7c3aed, transparent)",
          width: v ? "200px" : "0px",
          transition: "width 1.1s cubic-bezier(0.22,1,0.36,1) 0.4s",
        }} />
      </div>

      <p
        className="max-w-xl mx-auto text-sm"
        style={{
          color: "rgba(148,163,184,0.75)",
          opacity: v ? 1 : 0,
          transition: "opacity 0.6s ease 0.5s",
        }}
      >
        Courses, training, and certifications that back my technical skills.
      </p>
    </div>
  );
}

/* ─── Main export ─── */
export default function Certifications() {
  const [activeCert, setActiveCert] = useState(null);

  return (
    <section
      id="certifications"
      className="relative py-28 overflow-hidden"
      style={{ background: "#050816" }}
    >
      {/* Particle canvas — same as Hero */}
      <ParticleCanvas />

      {/* Ambient glows — mirrors Hero's glow placement */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)",
            top: "-10%",
            right: "-5%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
            bottom: "-10%",
            left: "-5%",
          }}
        />
        <div
          className="absolute w-[350px] h-[350px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
            top: "40%",
            left: "40%",
          }}
        />
      </div>

      {/* Noise texture — same as Hero */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Grid overlay — same as Hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Watermark — section-specific */}
      <div
        className="absolute select-none pointer-events-none whitespace-nowrap font-black uppercase"
        style={{
          fontSize: "clamp(5rem, 16vw, 16rem)",
          color: "rgba(255,255,255,0.018)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          letterSpacing: "-0.02em",
        }}
      >
        CERTS
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionHeader />
        <div className="grid md:grid-cols-3 gap-7">
          {certifications.map((cert, i) => (
            <HoloCard key={i} cert={cert} i={i} onView={setActiveCert} />
          ))}
        </div>
      </div>

      {activeCert && (
        <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
