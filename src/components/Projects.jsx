import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "DSWD Purchase Request Tracking System",
    description:
      "A full-featured procurement management system for the Department of Social Welfare and Development. Multi-stage document workflows, role-based access for 6 roles, and approval chains from End User to RD.",
    stack: ["Laravel", "PHP", "MySQL", "Blade", "Bootstrap", "OpenSpout"],
    highlights: ["6 user roles", "Multi-stage workflows", "Excel export", "Document uploads"],
    emoji: "🏛️",
    accent: "#7c3aed",
    accentSoft: "rgba(124,58,237,0.12)",
    images: [
      "https://placehold.co/800x500/1e1b4b/a78bfa?text=Dashboard",
      "https://placehold.co/800x500/1e1b4b/a78bfa?text=Purchase+Request",
      "https://placehold.co/800x500/1e1b4b/a78bfa?text=Approval+Flow",
    ],
  },
  {
    title: "Sisters Chick'n Love – POS & Inventory",
    description:
      "A Vite + React point-of-sale and inventory management system for a food business. Features role-based admin/staff flows, sales recording, daily inventory tracking, and a brand-aligned UI.",
    stack: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    highlights: ["Role-based access", "Sales recording", "Inventory tracking", "Brand UI"],
    emoji: "🍗",
    accent: "#6366f1",
    accentSoft: "rgba(99,102,241,0.12)",
    images: [
      "https://placehold.co/800x500/1e1b4b/a78bfa?text=POS+Screen",
      "https://placehold.co/800x500/1e1b4b/a78bfa?text=Inventory",
      "https://placehold.co/800x500/1e1b4b/a78bfa?text=Dashboard",
    ],
  },
  {
    title: "Inventory Tracking System",
    description:
      "A PHP/MySQL inventory system with admin and staff roles, bcrypt authentication, and session management. Deployed on InfinityFree for live access.",
    stack: ["PHP", "MySQL", "Bootstrap", "XAMPP"],
    highlights: ["Admin & staff roles", "Bcrypt auth", "Live deployment", "Session management"],
    emoji: "📦",
    accent: "#8b5cf6",
    accentSoft: "rgba(139,92,246,0.12)",
    images: [
      "https://placehold.co/800x500/1e1b4b/a78bfa?text=Login",
      "https://placehold.co/800x500/1e1b4b/a78bfa?text=Products",
      "https://placehold.co/800x500/1e1b4b/a78bfa?text=Reports",
    ],
  },
  {
    title: "Personal IT Portfolio Website",
    description:
      "A dark cyberpunk-themed portfolio website with particle canvas, typewriter effects, and Devicons icon grids. Single-page with black and purple aesthetic.",
    stack: ["HTML", "CSS", "JavaScript"],
    highlights: ["Particle canvas", "Typewriter effect", "Cyberpunk theme", "Devicons"],
    emoji: "🌐",
    accent: "#a78bfa",
    accentSoft: "rgba(167,139,250,0.12)",
    images: [
      "https://placehold.co/800x500/1e1b4b/a78bfa?text=Hero+Section",
      "https://placehold.co/800x500/1e1b4b/a78bfa?text=Skills+Section",
      "https://placehold.co/800x500/1e1b4b/a78bfa?text=Projects+Section",
    ],
  },
];

function ProjectModal({ project, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const prev = () => setActiveImg((a) => (a === 0 ? project.images.length - 1 : a - 1));
  const next = () => setActiveImg((a) => (a === project.images.length - 1 ? 0 : a + 1));

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 100,
    background: "rgba(2,6,23,0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  };

  const modalStyle = {
    background: "linear-gradient(145deg, #1e293b, #0f172a)",
    border: "1px solid " + project.accent + "33",
    boxShadow: "0 0 60px " + project.accentSoft + ", inset 0 1px 0 rgba(255,255,255,0.06)",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "760px",
    overflow: "hidden",
  };

  const thumbActiveStyle = {
    border: "2px solid " + project.accent,
    opacity: 1,
  };

  const thumbStyle = {
    border: "2px solid transparent",
    opacity: 0.5,
    cursor: "pointer",
    borderRadius: "10px",
    overflow: "hidden",
    transition: "opacity 0.2s, border-color 0.2s",
    flex: 1,
  };

  const arrowStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.5)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "white",
    transition: "background 0.2s",
  };

  return (
    <div ref={overlayRef} style={overlayStyle} onClick={handleOverlayClick}>
      <div style={modalStyle}>

        {/* Modal header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]"
          style={{ background: "linear-gradient(135deg, " + project.accent + "22, " + project.accent + "08)" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{project.emoji}</span>
            <h3 className="text-white font-bold text-base">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 bg-white/[0.04] hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main image */}
        <div className="relative bg-slate-950 overflow-hidden" style={{ height: "380px" }}>
          <img
            src={project.images[activeImg]}
            alt={"Screenshot " + (activeImg + 1)}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {/* Arrows */}
          <button style={{ ...arrowStyle, left: "12px" }} onClick={prev}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button style={{ ...arrowStyle, right: "12px" }} onClick={next}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-3 right-4 text-xs text-slate-400 bg-black/50 px-2 py-1 rounded-full">
            {activeImg + 1} / {project.images.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 px-6 py-4">
          {project.images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImg(idx)}
              style={idx === activeImg ? { ...thumbStyle, ...thumbActiveStyle } : thumbStyle}
            >
              <img
                src={img}
                alt={"Thumb " + (idx + 1)}
                className="w-full object-cover"
                style={{ height: "60px" }}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function ProjectCard({ project, i, onPreview }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const delay = (i * 0.12) + "s";

  const getTransform = () => {
    if (!visible) return "translateY(40px)";
    if (hovered) return "translateY(-6px)";
    return "translateY(0)";
  };

  const getBoxShadow = () => {
    if (hovered) {
      return "4px 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 40px " + project.accentSoft;
    }
    return "4px 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)";
  };

  const wrapperStyle = {
    background: "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
    boxShadow: getBoxShadow(),
    borderColor: hovered ? project.accent + "55" : "rgba(255,255,255,0.1)",
    transitionProperty: "opacity, transform, box-shadow, border-color",
    transitionDuration: "0.6s, 0.6s, 0.3s, 0.3s",
    transitionTimingFunction: "ease",
    transitionDelay: delay + ", " + delay + ", 0s, 0s",
    opacity: visible ? 1 : 0,
    transform: getTransform(),
  };

  const headerStyle = {
    background: "linear-gradient(135deg, " + project.accent + "22, " + project.accent + "08)",
  };

  const emojiBoxStyle = {
    background: "linear-gradient(145deg, " + project.accent + "33, " + project.accent + "11)",
    border: "1px solid " + project.accent + "33",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
  };

  const glowOverlayStyle = {
    background: "radial-gradient(ellipse at top left, " + project.accentSoft + ", transparent 70%)",
    opacity: hovered ? 1 : 0,
  };

  const highlightStyle = {
    color: project.accent,
    background: project.accentSoft,
    borderColor: project.accent + "33",
  };

  const previewBtnStyle = {
    background: project.accentSoft,
    border: "1px solid " + project.accent + "44",
    color: project.accent,
    borderRadius: "12px",
    padding: "8px 16px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "background 0.2s, border-color 0.2s",
    marginTop: "4px",
    width: "100%",
    justifyContent: "center",
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-3xl border backdrop-blur-xl flex flex-col"
      style={wrapperStyle}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={glowOverlayStyle}
      />

      {/* Card header */}
      <div
        className="relative flex items-center justify-between px-7 py-6 border-b border-white/[0.06]"
        style={headerStyle}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={emojiBoxStyle}
          >
            {project.emoji}
          </div>
          <h3 className="text-base font-bold text-white leading-snug">{project.title}</h3>
        </div>
      </div>

      {/* Card body */}
      <div className="relative z-10 flex flex-col flex-1 px-7 py-6 gap-5">

        <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.highlights.map((h) => (
            <span
              key={h}
              className="flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full border transition-all duration-200"
              style={highlightStyle}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {h}
            </span>
          ))}
        </div>

        <div className="h-px bg-white/[0.06]" />

        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-xs font-medium px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white transition-all duration-300"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Preview button */}
        <button style={previewBtnStyle} onClick={() => onPreview(project)}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
          </svg>
          View Screenshots
        </button>

      </div>
    </div>
  );
}

export default function Projects() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const headerStyle = {
    transition: "opacity 0.7s ease, transform 0.7s ease",
    opacity: headerVisible ? 1 : 0,
    transform: headerVisible ? "translateY(0)" : "translateY(30px)",
  };

  return (
    <section id="projects" className="relative py-28 bg-slate-950 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[450px] h-[450px] bg-violet-700/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-blue-600/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-20" style={headerStyle}>
          <p className="uppercase tracking-[0.3em] text-violet-400 text-sm mb-3">
            What I've Built
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Projects
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-slate-400">
            A selection of real-world systems and apps I've designed and developed from scratch.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} i={i} onPreview={setActiveProject} />
          ))}
        </div>

      </div>

      {/* Modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}

    </section>
  );
}
