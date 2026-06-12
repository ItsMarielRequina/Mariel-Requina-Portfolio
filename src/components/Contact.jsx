import { useEffect, useRef, useState, useCallback } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const contactInfo = [
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "youremail@gmail.com",
    href: "mailto:youremail@gmail.com",
    accent: "124,58,237",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Location",
    value: "Cotabato City, Philippines",
    href: null,
    accent: "99,102,241",
  },
  {
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/yourprofile",
    href: "https://linkedin.com",
    accent: "139,92,246",
  },
  {
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    label: "GitHub",
    value: "github.com/yourusername",
    href: "https://github.com",
    accent: "167,139,250",
  },
];

// ─── Particle Canvas (matching Hero exactly) ─────────────────────────────────

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

// ─── Magnetic Info Card ──────────────────────────────────────────────────────

function ContactInfoCard({ item, i }) {
  const ref = useRef(null);
  const raf = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const onMove = useCallback((e) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  }, []);

  const onLeave = useCallback(() => {
    setHovered(false);
    if (ref.current) ref.current.style.transform = "";
  }, []);

  const delay = i * 0.1;

  const inner = (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", gap: "14px",
        padding: "14px 16px", borderRadius: "18px",
        border: `1px solid ${hovered ? `rgba(${item.accent},0.45)` : "rgba(255,255,255,0.07)"}`,
        background: hovered
          ? `rgba(${item.accent},0.07)`
          : "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        boxShadow: hovered
          ? `0 8px 32px rgba(0,0,0,0.4), 0 0 30px rgba(${item.accent},0.15)`
          : "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        cursor: item.href ? "pointer" : "default",
        textDecoration: "none", color: "inherit",
        willChange: "transform",
        transform: hovered ? "translateX(6px) translateY(-2px)" : "translateX(0) translateY(0)",
        transition: `transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.25s, box-shadow 0.25s, background 0.25s, opacity 0.6s ease ${delay}s, translate 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        opacity: visible ? 1 : 0,
        translate: visible ? "0 0" : "-30px 0",
      }}
    >
      {/* Mouse spotlight */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit",
        background: `radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(${item.accent},0.12), transparent 65%)`,
        opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
      }} />
      {/* Top shimmer — matches Hero divider style */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: `linear-gradient(90deg, transparent, rgba(${item.accent},0.8), transparent)`,
        opacity: hovered ? 1 : 0.2, transition: "opacity 0.3s",
      }} />

      {/* Icon box */}
      <div style={{
        width: "44px", height: "44px", borderRadius: "14px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: `rgb(${item.accent})`,
        background: `linear-gradient(145deg, rgba(${item.accent},0.22), rgba(${item.accent},0.07))`,
        border: `1px solid rgba(${item.accent},0.28)`,
        boxShadow: hovered ? `0 0 18px rgba(${item.accent},0.35)` : "none",
        transition: "box-shadow 0.3s",
        position: "relative", zIndex: 1,
      }}>
        {item.icon}
      </div>

      {/* Text */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{
          color: "rgba(100,116,139,0.8)", fontSize: "10px", fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "3px",
        }}>
          {item.label}
        </p>
        <p style={{ color: "#f8fafc", fontSize: "13px", fontWeight: 600 }}>
          {item.value}
        </p>
      </div>

      {/* Arrow */}
      {item.href && (
        <div style={{
          marginLeft: "auto", position: "relative", zIndex: 1,
          opacity: hovered ? 1 : 0.3,
          transform: hovered ? "translate(3px,-3px)" : "translate(0,0)",
          transition: "opacity 0.25s, transform 0.25s",
          color: `rgb(${item.accent})`, flexShrink: 0,
        }}>
          <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      )}
    </div>
  );

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
        {inner}
      </a>
    );
  }
  return inner;
}

// ─── Animated Floating-Label Input ──────────────────────────────────────────

function AnimatedInput({ label, name, type = "text", value, onChange, required, multiline, rows, focused, onFocus, onBlur }) {
  const isFocused = focused === name;
  const hasValue = value.length > 0;
  const floated = isFocused || hasValue;

  const baseStyle = {
    width: "100%", outline: "none", resize: "none",
    background: isFocused ? "rgba(124,58,237,0.07)" : "rgba(255,255,255,0.025)",
    border: `1px solid ${isFocused ? "rgba(124,58,237,0.55)" : "rgba(255,255,255,0.09)"}`,
    borderRadius: "14px",
    padding: multiline ? "14px 16px" : "13px 16px",
    color: "#f8fafc", fontSize: "14px",
    transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
    boxShadow: isFocused
      ? "0 0 0 3px rgba(124,58,237,0.12), 0 0 20px rgba(124,58,237,0.07)"
      : "none",
    fontFamily: "inherit",
  };

  return (
    <div style={{ position: "relative" }}>
      <label style={{
        position: "absolute",
        left: "15px",
        top: floated ? "-9px" : (multiline ? "14px" : "13px"),
        fontSize: floated ? "10px" : "13px",
        fontWeight: 700,
        letterSpacing: floated ? "0.1em" : "0",
        textTransform: floated ? "uppercase" : "none",
        color: isFocused ? "rgba(196,181,253,0.9)" : "rgba(100,116,139,0.8)",
        background: floated ? "#050816" : "transparent",
        padding: floated ? "0 4px" : "0",
        borderRadius: "4px",
        pointerEvents: "none",
        zIndex: 2,
        transition: "all 0.22s cubic-bezier(0.22,1,0.36,1)",
      }}>
        {label}
      </label>

      {/* Bottom accent bar — matches Hero's gradient divider */}
      <div style={{
        position: "absolute", bottom: "1px", left: "14px", right: "14px", height: "2px",
        background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
        borderRadius: "0 0 14px 14px",
        transform: isFocused ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
        zIndex: 1,
      }} />

      {multiline
        ? <textarea name={name} value={value} onChange={onChange} onFocus={onFocus}
            onBlur={onBlur} rows={rows} required={required} style={baseStyle} />
        : <input type={type} name={name} value={value} onChange={onChange} onFocus={onFocus}
            onBlur={onBlur} required={required} style={baseStyle} />
      }
    </div>
  );
}

// ─── Success Overlay ─────────────────────────────────────────────────────────

function SendSuccess({ visible }) {
  return (
    <div style={{
      position: "absolute", inset: 0, borderRadius: "inherit",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: "14px", zIndex: 20,
      background: "linear-gradient(160deg, rgba(5,8,22,0.97), rgba(5,8,22,0.97))",
      backdropFilter: "blur(6px)",
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? "all" : "none",
      transition: "opacity 0.4s ease",
    }}>
      <div style={{
        width: "64px", height: "64px", borderRadius: "50%",
        background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(167,139,250,0.15))",
        border: "1px solid rgba(124,58,237,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 0 50px rgba(124,58,237,0.4), 0 0 80px rgba(167,139,250,0.2)",
        animation: visible ? "pop-in 0.5s cubic-bezier(0.22,1,0.36,1)" : "none",
      }}>
        <svg width="28" height="28" fill="none" stroke="#a78bfa" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p style={{ color: "#fff", fontWeight: 800, fontSize: "17px", margin: 0 }}>
        Message sent!
      </p>
      <p style={{ color: "rgba(148,163,184,0.75)", fontSize: "13px", margin: 0 }}>
        I'll get back to you soon.
      </p>
      <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
        {["#a78bfa", "#818cf8", "#c4b5fd"].map((color, i) => (
          <div key={i} style={{
            width: "6px", height: "6px", borderRadius: "50%", background: color,
            animation: `float-up 0.6s ${i * 0.1}s both`,
          }} />
        ))}
      </div>
    </div>
  );
}

// ─── Section Header ──────────────────────────────────────────────────────────

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
    <div ref={ref} style={{ textAlign: "center", marginBottom: "64px" }}>
      {/* Eyebrow — matches Hero badge style */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
        marginBottom: "16px",
        opacity: v ? 1 : 0, transition: "opacity 0.6s ease 0.1s",
      }}>
        <div style={{
          height: "1px", width: "32px", borderRadius: "999px",
          background: "linear-gradient(90deg, transparent, #7c3aed)",
        }} />
        <p style={{
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.35em",
          textTransform: "uppercase", color: "rgba(196,181,253,0.8)", margin: 0,
        }}>
          Let's Talk
        </p>
        <div style={{
          height: "1px", width: "32px", borderRadius: "999px",
          background: "linear-gradient(90deg, #7c3aed, transparent)",
        }} />
      </div>

      {/* Title — matches Hero h1 gradient */}
      <div style={{ overflow: "hidden" }}>
        <h2 style={{
          fontSize: "clamp(2.5rem, 6vw, 4rem)",
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          textTransform: "uppercase",
          background: "linear-gradient(135deg, #fff 30%, rgba(196,181,253,0.7) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "0",
          opacity: v ? 1 : 0,
          transform: v ? "translateY(0)" : "translateY(50px)",
          transition: "opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s",
        }}>
          Get in Touch
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

      <p style={{
        maxWidth: "400px", margin: "0 auto",
        color: "rgba(148,163,184,0.75)", fontSize: "14px", lineHeight: 1.7,
        opacity: v ? 1 : 0, transition: "opacity 0.6s ease 0.5s",
      }}>
        Whether it's a project, collaboration, or just a hello — my inbox is always open.
      </p>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState(null);
  const [btnHover, setBtnHover] = useState(false);

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [leftV, setLeftV] = useState(false);
  const [rightV, setRightV] = useState(false);

  useEffect(() => {
    const pairs = [[leftRef, setLeftV], [rightRef, setRightV]];
    pairs.forEach(([r, s]) => {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) s(true); },
        { threshold: 0.1 }
      );
      if (r.current) obs.observe(r.current);
    });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 3500);
    }, 1300);
  };

  return (
    <>
      <style>{`
        @keyframes pop-in {
          0%   { transform: scale(0.4); opacity: 0; }
          60%  { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes float-up {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
          70%  { box-shadow: 0 0 0 8px rgba(74,222,128,0); }
          100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
        }
      `}</style>

      <section
        id="contact"
        style={{
          position: "relative",
          padding: "112px 32px 96px",
          background: "#050816",
          overflow: "hidden",
        }}
      >
        {/* Particle canvas — same as Hero */}
        <ParticleCanvas />

        {/* Ambient glows — mirrors Hero */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          <div style={{
            position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)",
            top: "-10%", left: "-5%",
          }} />
          <div style={{
            position: "absolute", width: "600px", height: "600px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
            bottom: "-10%", right: "-5%",
          }} />
          <div style={{
            position: "absolute", width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
            top: "40%", left: "40%",
          }} />
        </div>

        {/* Noise texture — same as Hero */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat", backgroundSize: "128px",
        }} />

        {/* Grid overlay — same as Hero */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />

        {/* Watermark — section-specific */}
        <div style={{
          position: "absolute",
          fontSize: "clamp(5rem, 16vw, 16rem)",
          color: "rgba(255,255,255,0.018)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          letterSpacing: "-0.02em",
          fontWeight: 900,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}>
          CONTACT
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1140px", margin: "0 auto" }}>
          <SectionHeader />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
            alignItems: "start",
          }}>

            {/* ── Left: info ── */}
            <div
              ref={leftRef}
              style={{
                display: "flex", flexDirection: "column", gap: "12px",
                opacity: leftV ? 1 : 0,
                transform: leftV ? "translateX(0)" : "translateX(-40px)",
                transition: "opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s",
              }}
            >
              {/* Availability banner — matches Hero's "Available for opportunities" badge */}
              <div style={{
                position: "relative", overflow: "hidden",
                borderRadius: "22px", padding: "22px 24px",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(139,92,246,0.3)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
                marginBottom: "4px",
              }}>
                {/* Top shimmer */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.9), rgba(167,139,250,0.6), transparent)",
                }} />
                {/* Corner glow */}
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  width: "130px", height: "130px",
                  background: "radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)",
                  pointerEvents: "none",
                }} />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
                  <div>
                    {/* Ping dot — taken directly from Hero badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <div style={{ position: "relative", display: "flex", height: "10px", width: "10px" }}>
                        <span style={{
                          position: "absolute", display: "inline-flex",
                          height: "100%", width: "100%", borderRadius: "50%",
                          background: "rgba(167,139,250,0.75)",
                          animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
                        }} />
                        <span style={{
                          position: "relative", display: "inline-flex",
                          borderRadius: "50%", height: "10px", width: "10px",
                          background: "#8b5cf6",
                        }} />
                      </div>
                      <span style={{
                        fontSize: "10px", fontWeight: 700,
                        letterSpacing: "0.35em", textTransform: "uppercase",
                        color: "rgba(196,181,253,0.8)",
                      }}>
                        Available for opportunities
                      </span>
                    </div>
                    <p style={{ color: "rgba(148,163,184,0.75)", fontSize: "12px", lineHeight: 1.6, maxWidth: "240px", margin: 0 }}>
                      Available for freelance work and full-time web development roles.
                    </p>
                  </div>
                </div>
              </div>

              {/* Info cards */}
              {contactInfo.map((item, i) => (
                <ContactInfoCard key={item.label} item={item} i={i} />
              ))}

              {/* Response time — styled as a stat card matching Hero's stats */}
              <div style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "12px 16px", borderRadius: "16px",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                marginTop: "4px",
              }}>
                <div style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: "rgba(139,92,246,0.8)", flexShrink: 0,
                }} />
                <span style={{ fontSize: "12px", color: "rgba(196,181,253,0.7)", fontWeight: 600 }}>
                  Usually responds within 24 hours
                </span>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div
              ref={rightRef}
              style={{
                position: "relative", overflow: "hidden",
                borderRadius: "28px", padding: "36px",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
                opacity: rightV ? 1 : 0,
                transform: rightV ? "translateX(0)" : "translateX(40px)",
                transition: "opacity 0.8s ease 0.25s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s",
              }}
            >
              {/* Top shimmer — matches Hero divider */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.9), rgba(167,139,250,0.6), transparent)",
              }} />
              {/* Corner glow */}
              <div style={{
                position: "absolute", top: "-50px", right: "-50px",
                width: "200px", height: "200px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)",
                pointerEvents: "none",
              }} />

              <SendSuccess visible={sent} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <h3 style={{
                  fontWeight: 700, fontSize: "19px", marginBottom: "28px",
                  background: "linear-gradient(135deg, #fff 30%, rgba(196,181,253,0.7) 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Send a message
                </h3>

                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                      <AnimatedInput
                        label="Your name" name="name" value={form.name}
                        onChange={handleChange} required
                        focused={focused}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                      />
                      <AnimatedInput
                        label="Email" name="email" type="email" value={form.email}
                        onChange={handleChange} required
                        focused={focused}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>

                    <AnimatedInput
                      label="Subject" name="subject" value={form.subject}
                      onChange={handleChange}
                      focused={focused}
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                    />

                    <AnimatedInput
                      label="Message" name="message" multiline rows={6}
                      value={form.message} onChange={handleChange} required
                      focused={focused}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                    />

                    {/* Submit — matches Hero's primary CTA button */}
                    <button
                      type="submit"
                      disabled={sending}
                      onMouseEnter={() => setBtnHover(true)}
                      onMouseLeave={() => setBtnHover(false)}
                      style={{
                        width: "100%", padding: "14px", border: "none",
                        borderRadius: "14px",
                        background: sending
                          ? "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(109,40,217,0.6))"
                          : "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                        color: "white", fontSize: "14px", fontWeight: 700,
                        cursor: sending ? "not-allowed" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                        boxShadow: btnHover && !sending
                          ? "0 0 36px rgba(124,58,237,0.65)"
                          : "0 0 24px rgba(124,58,237,0.4)",
                        transform: btnHover && !sending ? "translateY(-1px)" : "translateY(0)",
                        transition: "all 0.25s",
                        letterSpacing: "0.03em",
                        position: "relative", overflow: "hidden",
                      }}
                    >
                      {sending ? (
                        <>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            style={{ animation: "spin 0.8s linear infinite" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            style={{
                              transform: btnHover ? "translate(2px,-2px)" : "translate(0,0)",
                              transition: "transform 0.2s",
                            }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </button>

                    <p style={{ color: "rgba(100,116,139,0.6)", fontSize: "11px", textAlign: "center", lineHeight: 1.5 }}>
                      Your message is private and will only be seen by me.
                    </p>

                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>

        {/* Ping keyframe */}
        <style>{`
          @keyframes ping {
            75%, 100% { transform: scale(2); opacity: 0; }
          }
        `}</style>
      </section>
    </>
  );
}
