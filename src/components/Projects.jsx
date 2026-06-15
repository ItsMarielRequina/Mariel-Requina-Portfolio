import { useEffect, useRef, useState, useCallback } from "react";
import dswd1 from "../assets/dswd1.png";
import dswd2 from "../assets/dswd2.png";
import dswd3 from "../assets/dswd3.png";
import cknLogo from "../assets/cknlogo.jpg";
import ckn1 from "../assets/ckn1.png";
import ckn2 from "../assets/ckn2.png";
import ckn3 from "../assets/ckn3.png";
import moodifyIcon from "../assets/icon.png";
import mdfy from "../assets/mdfy.png";
import cftLogo from "../assets/cft.png";
import cft1 from "../assets/cft1.png";
import cft2 from "../assets/cft2.png";
import cft3 from "../assets/cft3.png";

const projects = [
  {
    title: "Procurement Management System for Pantawid Pamilyang Pilipino Program (4Ps)",
    description:
      "A full-featured Procurement Management System developed for the Department of Social Welfare and Development (DSWD). Features include multi-stage document workflows, role-based access for six distinct roles, and approval chains progressing from End User to Regional Director (RD). Built collaboratively by a team of eight members, ensuring robust functionality, compliance, and scalability.",
    stack: ["Laravel", "PHP", "MySQL"],
    highlights: ["6 user roles", "Multi-stage workflows", "Excel export", "Document uploads"],
    logo: "https://1000logos.net/wp-content/uploads/2019/03/DSWD-Logo.png",
    accent: "#7c3aed",
    accentRgb: "124,58,237",
    tag: "Internship",
    year: "2026",
    images: [dswd1, dswd2, dswd3],
  },
  {
    title: "Sisters Chick'n Love – POS & Inventory",
    description:
      "A Vite + React point-of-sale and inventory management system for a food business. Features role-based admin/staff flows, sales recording, daily inventory tracking, and a brand-aligned UI.",
    stack: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    highlights: ["Role-based access", "Sales recording", "Inventory tracking", "Brand UI"],
    logo:  cknLogo,
    accent: "#6366f1",
    accentRgb: "99,102,241",
    tag: "Freelance",
    year: "2026",
    images: [ckn1, ckn2, ckn3],
  },
  {
    title: "Moodify: An AI-based Music Recommendation System Using Facial Emotion Recognition",
description: "Moodify is an intelligent music recommendation system that leverages Facial Emotion Recognition (FER) to analyze user expressions in real time and suggest songs that match or enhance their emotional state. Designed to create personalized, emotion-driven listening experiences, it integrates AI/ML models with a sleek user interface for seamless interaction.",
stack: ["Expo", "React Native", "TypeScript", "Machine Learning", "API Integration"],
highlights: [
  "AI-powered Facial Emotion Recognition",
  "Personalized music recommendations",
  "Real-time emotion analysis",
  "Integration of ML models with mobile UI",
  "Capstone project showcasing applied AI/ML"
],
logo: moodifyIcon,
accent: "#8b5cf6",
accentRgb: "139,92,246",
tag: "Capstone Project",
year: "2025",
images: [mdfy],
  },
  {
    title: "Sales and Expense Tracking System for Coffee Town",
    description: "A comprehensive point-of-sale and management system designed for Coffee Town. It streamlines daily operations by integrating product catalog management, customer records, sales tracking, and expense monitoring. The system provides intuitive navigation for transactions, supplier management, and inventory control, ensuring efficient business oversight.",
    stack: ["PHP", "HTML", "CSS", "JavaScript", "MySQL"],
    highlights: [
      "Integrated POS interface for coffee shop sales",
      "Customer records with detailed transaction history",
      "Expense and inventory tracking modules",
      "Supplier and transaction management features",
      "User-friendly design with modern UI"
    ],
    logo: cftLogo,
    accent: "#a78bfa",
    accentRgb: "167,139,250",
    tag: "IM Project",
    year: "2024",
    images: [cft1, cft2, cft3],
  },
];

/* ─── Cinematic Modal ─── */
function ProjectModal({ project, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const [entering, setEntering] = useState(true);
  const [imgTransition, setImgTransition] = useState(false);
  const overlayRef = useRef(null);

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

  const switchImg = (idx) => {
    if (idx === activeImg) return;
    setImgTransition(true);
    setTimeout(() => { setActiveImg(idx); setImgTransition(false); }, 220);
  };

  const prev = () => switchImg(activeImg === 0 ? project.images.length - 1 : activeImg - 1);
  const next = () => switchImg(activeImg === project.images.length - 1 ? 0 : activeImg + 1);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(5,8,22,0.93)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        opacity: entering ? 0 : 1,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Noise texture inside modal overlay */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat", backgroundSize: "128px",
        }}
      />

      <div
        style={{
          width: "100%", maxWidth: "800px",
          background: "linear-gradient(160deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
          border: `1px solid ${project.accent}44`,
          borderRadius: "28px",
          overflow: "hidden",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: `0 0 0 1px ${project.accent}22, 0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(${project.accentRgb},0.12), inset 0 1px 0 rgba(255,255,255,0.07)`,
          transform: entering ? "scale(0.94) translateY(20px)" : "scale(1) translateY(0)",
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            height: "2px",
            background: `linear-gradient(90deg, transparent 0%, ${project.accent} 40%, ${project.accent} 60%, transparent 100%)`,
          }}
        />

        {/* Modal top bar */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "18px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: `linear-gradient(135deg, rgba(${project.accentRgb},0.12), rgba(${project.accentRgb},0.03))`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "22px" }}>{project.emoji}</span>
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "15px", margin: 0 }}>{project.title}</p>
              <p style={{ color: project.accent, fontSize: "11px", margin: 0, opacity: 0.8 }}>{project.tag} · {project.year}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "32px", height: "32px", borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.04)",
              color: "#94a3b8", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#94a3b8"; }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Image viewer */}
        <div style={{ position: "relative", height: "360px", background: "rgba(5,8,22,0.8)", overflow: "hidden" }}>
          <div style={{
            position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
          }} />
          <img
            src={project.images[activeImg]}
            alt={`Screenshot ${activeImg + 1}`}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              opacity: imgTransition ? 0 : 1,
              transform: imgTransition ? "scale(1.03)" : "scale(1)",
              transition: "opacity 0.22s ease, transform 0.22s ease",
            }}
          />
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
            background: `radial-gradient(ellipse at center, transparent 50%, rgba(5,8,22,0.6) 100%)`,
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
            background: `linear-gradient(to top, rgba(${project.accentRgb},0.08), transparent)`,
            pointerEvents: "none", zIndex: 2,
          }} />

          {[{ side: "left", fn: prev, icon: "M15 19l-7-7 7-7" }, { side: "right", fn: next, icon: "M9 5l7 7-7 7" }].map(({ side, fn, icon }) => (
            <button
              key={side}
              onClick={fn}
              style={{
                position: "absolute", top: "50%", [side]: "14px",
                transform: "translateY(-50%)", zIndex: 4,
                width: "38px", height: "38px", borderRadius: "12px",
                background: "rgba(5,8,22,0.6)", border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(4px)", transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = `rgba(${project.accentRgb},0.4)`}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(5,8,22,0.6)"}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
            </button>
          ))}

          <div style={{
            position: "absolute", bottom: "12px", right: "14px", zIndex: 4,
            background: "rgba(5,8,22,0.7)", backdropFilter: "blur(4px)",
            border: `1px solid ${project.accent}44`,
            borderRadius: "20px", padding: "3px 10px",
            fontSize: "11px", color: "#94a3b8",
          }}>
            {activeImg + 1} / {project.images.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div style={{ display: "flex", gap: "10px", padding: "14px 24px 18px" }}>
          {project.images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => switchImg(idx)}
              style={{
                flex: 1, borderRadius: "10px", overflow: "hidden", cursor: "pointer",
                border: `2px solid ${idx === activeImg ? project.accent : "rgba(255,255,255,0.08)"}`,
                opacity: idx === activeImg ? 1 : 0.45,
                transition: "border-color 0.2s, opacity 0.2s",
                transform: idx === activeImg ? "scale(1.04)" : "scale(1)",
              }}
            >
              <img src={img} alt="" style={{ width: "100%", height: "56px", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Magnetic wrapper ─── */
function MagneticCard({ children, style, className, onMouseEnter, onMouseLeave }) {
  const ref = useRef(null);
  const raf = useRef(null);

  const onMove = useCallback((e) => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      el.style.transform = `perspective(900px) rotateY(${dx * 5}deg) rotateX(${-dy * 3.5}deg) translateY(-6px) scale(1.015)`;
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  }, []);

  const leave = useCallback((e) => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)";
    onMouseLeave?.(e);
  }, [onMouseLeave]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, willChange: "transform", transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)" }}
      onMouseMove={onMove}
      onMouseLeave={leave}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </div>
  );
}

/* ─── Project card ─── */
function ProjectCard({ project, i, onPreview }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const delay = i * 0.13;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      <MagneticCard
        className="relative overflow-hidden rounded-3xl border flex flex-col h-full"
        style={{
          background: "linear-gradient(155deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: hovered ? `${project.accent}55` : "rgba(255,255,255,0.09)",
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 50px rgba(${project.accentRgb},0.14)`
            : "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Mouse spotlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl z-0"
          style={{
            background: `radial-gradient(340px circle at var(--mx,50%) var(--my,30%), rgba(${project.accentRgb},0.11), transparent 65%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${project.accent} 40%, ${project.accent} 60%, transparent 100%)`,
            opacity: hovered ? 1 : 0.35,
            transition: "opacity 0.3s",
          }}
        />

        {/* Header */}
        <div
          className="relative flex items-center gap-4 px-7 py-6 border-b border-white/[0.06]"
          style={{
            background: `linear-gradient(135deg, rgba(${project.accentRgb},0.14) 0%, rgba(${project.accentRgb},0.04) 100%)`,
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{
              background: `linear-gradient(145deg, rgba(${project.accentRgb},0.25), rgba(${project.accentRgb},0.08))`,
              border: `1px solid rgba(${project.accentRgb},0.3)`,
            }}
          >
            {project.logo ? (
              <img
                src={project.logo}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl">{project.emoji}</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white leading-snug">{project.title}</h3>
            <p className="text-xs mt-0.5 font-medium" style={{ color: `${project.accent}cc` }}>
              {project.tag} · {project.year}
            </p>
          </div>

          {/* Pulsing dot — same as Hero's "available" indicator */}
          <div className="absolute top-4 right-4 flex h-2.5 w-2.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: project.accent }}
            />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ background: project.accent }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="relative z-10 flex flex-col flex-1 px-7 py-6 gap-5">
          <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.75)" }}>
            {project.description}
          </p>

          {/* Highlight chips */}
          <div className="flex flex-wrap gap-2">
            {project.highlights.map((h, j) => (
              <span
                key={h}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border"
                style={{
                  color: project.accent,
                  background: `rgba(${project.accentRgb},0.08)`,
                  borderColor: `rgba(${project.accentRgb},0.25)`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "scale(1)" : "scale(0.85)",
                  transition: `opacity 0.4s ease ${delay + 0.2 + j * 0.05}s, transform 0.4s ease ${delay + 0.2 + j * 0.05}s`,
                }}
              >
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {h}
              </span>
            ))}
          </div>

          {/* Divider — same gradient style as Hero */}
          <div
            className="h-px w-full"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)",
            }}
          />

          {/* Stack tags */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s, j) => (
              <span
                key={s}
                className="text-xs font-medium px-3 py-1 rounded-full border border-white/10 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  color: "rgb(203,213,225)",
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.4s ease ${delay + 0.35 + j * 0.04}s, background 0.2s, border-color 0.2s, color 0.2s`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `rgba(${project.accentRgb},0.12)`;
                  e.currentTarget.style.borderColor = `rgba(${project.accentRgb},0.4)`;
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "rgb(203,213,225)";
                }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* CTA button — styled like Hero's ghost buttons */}
          <button
            onClick={() => onPreview(project)}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              marginTop: "auto",
              padding: "10px 0",
              width: "100%",
              borderRadius: "14px",
              border: `1px solid ${btnHover ? project.accent + "88" : `rgba(${project.accentRgb},0.25)`}`,
              background: btnHover ? `rgba(${project.accentRgb},0.18)` : "rgba(255,255,255,0.04)",
              backdropFilter: "blur(10px)",
              color: btnHover ? "#fff" : project.accent,
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              transition: "background 0.25s, border-color 0.25s, transform 0.15s, color 0.2s",
              transform: btnHover ? "translateY(-1px)" : "translateY(0)",
              boxShadow: btnHover ? `0 0 24px rgba(${project.accentRgb},0.3)` : "none",
            }}
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            </svg>
            View Screenshots
            <svg
              width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              style={{
                opacity: btnHover ? 1 : 0,
                transform: btnHover ? "translateX(0)" : "translateX(-4px)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </MagneticCard>
    </div>
  );
}

/* ─── Connected particle canvas (matches Hero exactly) ─── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
      {/* Pulsing badge — matches Hero */}
      <div
        className="inline-flex items-center gap-2 mb-4"
        style={{ opacity: v ? 1 : 0, transition: "opacity 0.6s ease 0.1s" }}
      >
        <div className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500" />
        </div>
        <span
          className="text-xs uppercase tracking-[0.35em] font-medium"
          style={{ color: "rgba(196,181,253,0.8)" }}
        >
          What I've Built
        </span>
      </div>

      {/* Title — gradient matches Hero's h1 */}
      <div className="overflow-hidden">
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
          Projects
        </h2>
      </div>

      {/* Expanding accent line */}
      <div className="flex justify-center my-4">
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, #7c3aed, #a78bfa, #7c3aed, transparent)",
            width: v ? "200px" : "0px",
            transition: "width 1.1s cubic-bezier(0.22,1,0.36,1) 0.4s",
          }}
        />
      </div>

      <p
        className="max-w-xl mx-auto text-sm"
        style={{
          color: "rgba(148,163,184,0.75)",
          opacity: v ? 1 : 0,
          transition: "opacity 0.6s ease 0.5s",
        }}
      >
        A selection of real-world systems and apps I've designed and developed from scratch.
      </p>
    </div>
  );
}

/* ─── Main export ─── */
export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.5); }
        }
      `}</style>

      <section
        id="projects"
        ref={sectionRef}
        className="relative py-28 bg-[#050816] text-white overflow-hidden"
      >
        {/* Connected particle canvas */}
        <ParticleCanvas />

        {/* Ambient glows with mouse parallax */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-[700px] h-[700px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)",
              top: "-10%",
              right: "-5%",
              transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * 0.5}px)`,
              transition: "transform 0.4s ease-out",
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
              bottom: "-10%",
              left: "-5%",
              transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * -0.4}px)`,
              transition: "transform 0.4s ease-out",
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
              top: "40%",
              left: "40%",
            }}
          />
        </div>

        {/* Noise texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* Decorative grid */}
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

        {/* Watermark */}
        <div>
        <h2
          className="absolute select-none pointer-events-none whitespace-nowrap font-black uppercase"
          style={{
            fontSize: "clamp(6rem, 18vw, 18rem)",
            color: "rgba(255,255,255,0.018)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            letterSpacing: "-0.02em",
          }}
        >
          PROJECTS
          </h2>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <SectionHeader />
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} i={i} onPreview={setActiveProject} />
            ))}
          </div>
        </div>
      </section>

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  );
}
