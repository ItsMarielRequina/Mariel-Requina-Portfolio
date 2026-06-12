import { useEffect, useRef, useState } from "react";

const certifications = [
  {
    title: "Your Certification Title",
    issuer: "Issuing Organization",
    date: "2024",
    credentialId: "CERT-XXXX-XXXX",
    description: "Add a short description of what this certification covers.",
    badge: "🏆",
    link: "#",
    image: "https://placehold.co/800x560/1e1b4b/a78bfa?text=Certificate+1",
    accent: "#7c3aed",
    accentSoft: "rgba(124,58,237,0.12)",
  },
  {
    title: "Another Certification",
    issuer: "Another Organization",
    date: "2023",
    credentialId: "CERT-YYYY-YYYY",
    description: "Brief description of this certification and what skills it validates.",
    badge: "🎖️",
    link: "#",
    image: "https://placehold.co/800x560/1e1b4b/a78bfa?text=Certificate+2",
    accent: "#6366f1",
    accentSoft: "rgba(99,102,241,0.12)",
  },
  {
    title: "Web Development Certificate",
    issuer: "Online Platform (e.g. freeCodeCamp / Udemy)",
    date: "2023",
    credentialId: "WD-ZZZZ",
    description: "Completed comprehensive training in full-stack web development.",
    badge: "📜",
    link: "#",
    image: "https://placehold.co/800x560/1e1b4b/a78bfa?text=Certificate+3",
    accent: "#8b5cf6",
    accentSoft: "rgba(139,92,246,0.12)",
  },
];

function CertModal({ cert, onClose }) {
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

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 100,
    background: "rgba(2,6,23,0.88)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  };

  const modalStyle = {
    background: "linear-gradient(145deg, #1e293b, #0f172a)",
    border: "1px solid " + cert.accent + "44",
    boxShadow: "0 0 80px " + cert.accentSoft + ", inset 0 1px 0 rgba(255,255,255,0.06)",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "680px",
    overflow: "hidden",
  };

  const headerBgStyle = {
    background: "linear-gradient(135deg, " + cert.accent + "22, " + cert.accent + "08)",
  };

  const linkBtnStyle = {
    color: cert.accent,
    background: cert.accentSoft,
    borderColor: cert.accent + "44",
    borderRadius: "12px",
    padding: "8px 16px",
    fontSize: "12px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "6px",
    border: "1px solid " + cert.accent + "44",
    textDecoration: "none",
    transition: "opacity 0.2s",
  };

  return (
    <div ref={overlayRef} style={overlayStyle} onClick={handleOverlayClick}>
      <div style={modalStyle}>

        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]"
          style={headerBgStyle}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{cert.badge}</span>
            <div>
              <h3 className="text-white font-bold text-sm leading-tight">{cert.title}</h3>
              <p className="text-slate-400 text-xs">{cert.issuer}</p>
            </div>
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

        {/* Certificate image */}
        <div className="bg-slate-950 p-4">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full rounded-xl object-contain"
            style={{ maxHeight: "420px" }}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.06]">
          <span className="text-xs text-slate-500 font-mono">{cert.credentialId}</span>
          
          <a
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            style={linkBtnStyle}
          >
            View Credential
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
}

function CertCard({ cert, i, onView }) {
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
      return "4px 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 40px " + cert.accentSoft;
    }
    return "4px 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)";
  };

  const wrapperStyle = {
    background: "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
    boxShadow: getBoxShadow(),
    borderColor: hovered ? cert.accent + "55" : "rgba(255,255,255,0.1)",
    transitionProperty: "opacity, transform, box-shadow, border-color",
    transitionDuration: "0.6s, 0.6s, 0.3s, 0.3s",
    transitionTimingFunction: "ease",
    transitionDelay: delay + ", " + delay + ", 0s, 0s",
    opacity: visible ? 1 : 0,
    transform: getTransform(),
  };

  const emojiBoxStyle = {
    background: "linear-gradient(145deg, " + cert.accent + "33, " + cert.accent + "11)",
    border: "1px solid " + cert.accent + "33",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
  };

  const glowStyle = {
    background: "radial-gradient(ellipse at top left, " + cert.accentSoft + ", transparent 70%)",
    opacity: hovered ? 1 : 0,
  };

  const imgContainerStyle = {
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    overflow: "hidden",
    position: "relative",
  };

  const imgStyle = {
    height: "160px",
    width: "100%",
    objectFit: "cover",
    objectPosition: "top",
    transform: hovered ? "scale(1.04)" : "scale(1)",
    transition: "transform 0.5s ease",
    display: "block",
  };

  const fadeBotStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "48px",
    background: "linear-gradient(to top, #0f172a, transparent)",
    pointerEvents: "none",
  };

  const btnStyle = {
    color: cert.accent,
    background: cert.accentSoft,
    border: "1px solid " + cert.accent + "44",
    borderRadius: "12px",
    padding: "8px 0",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    width: "100%",
    transition: "opacity 0.2s",
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-3xl border backdrop-blur-xl flex flex-col"
      style={wrapperStyle}
    >
      {/* Glow overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={glowStyle}
      />

      {/* Certificate preview image */}
      <div style={imgContainerStyle}>
        <img src={cert.image} alt={cert.title} style={imgStyle} />
        <div style={fadeBotStyle} />
      </div>

      {/* Card body */}
      <div className="relative z-10 flex flex-col flex-1 px-6 py-5 gap-4">

        {/* Badge + date */}
        <div className="flex items-center justify-between">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={emojiBoxStyle}
          >
            {cert.badge}
          </div>
          <span className="text-xs font-semibold text-slate-400 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full">
            {cert.date}
          </span>
        </div>

        {/* Title + issuer */}
        <div>
          <h3 className="text-white font-bold text-base leading-snug mb-1">{cert.title}</h3>
          <p className="text-violet-400 text-sm font-semibold">{cert.issuer}</p>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed">{cert.description}</p>

        <div className="h-px bg-white/[0.06]" />

        {/* Credential ID */}
        <p className="text-slate-600 text-xs font-mono">{cert.credentialId}</p>

        {/* View button */}
        <button style={btnStyle} onClick={() => onView(cert)}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Certificate
        </button>

      </div>
    </div>
  );
}

export default function Certifications() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeCert, setActiveCert] = useState(null);

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
    <section id="certifications" className="relative py-28 bg-slate-950 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-[450px] h-[450px] bg-violet-700/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-600/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-20" style={headerStyle}>
          <p className="uppercase tracking-[0.3em] text-violet-400 text-sm mb-3">
            Credentials
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Certifications
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-slate-400">
            Courses, training, and certifications that back my technical skills.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <CertCard key={i} cert={cert} i={i} onView={setActiveCert} />
          ))}
        </div>

      </div>

      {/* Modal */}
      {activeCert && (
        <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
      )}

    </section>
  );
}
