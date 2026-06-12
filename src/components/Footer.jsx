import { FiGithub, FiLinkedin, FiFacebook, FiMail } from "react-icons/fi";

const links = [
  "About", "Skills", "Education",
  "Experience", "Projects", "Certifications", "Contact"
];

const socials = [
  { icon: <FiGithub size={15} />, href: "#", label: "GitHub" },
  { icon: <FiLinkedin size={15} />, href: "#", label: "LinkedIn" },
  { icon: <FiFacebook size={15} />, href: "#", label: "Facebook" },
  { icon: <FiMail size={15} />, href: "#", label: "Email" },
];

const stack = [
  { name: "React",        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Vite",         url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
  { name: "Tailwind CSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Laravel",      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t"
      style={{ background: "#050816", borderColor: "rgba(255,255,255,0.06)" }}>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px]"
          style={{ background: "radial-gradient(ellipse at center bottom, rgba(124,58,237,0.12) 0%, transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.35), rgba(99,102,241,0.35), transparent)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* Main grid */}
        <div className="grid md:grid-cols-3 gap-12 pb-12"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <div>
              <a href="#about" className="inline-block text-2xl font-black tracking-tight text-white">
                Mariel
                <span style={{
                  background: "linear-gradient(90deg, #a78bfa, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>Requina</span>
              </a>
              <p className="mt-3 text-sm leading-relaxed max-w-[260px]"
                style={{ color: "rgba(148,163,184,0.7)" }}>
                Full-stack developer passionate about building responsive interfaces and scalable web applications.
              </p>
            </div>

            {/* Social icons */}
            <div className="flex gap-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="group w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(148,163,184,0.65)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(139,92,246,0.12)";
                    e.currentTarget.style.borderColor = "rgba(139,92,246,0.35)";
                    e.currentTarget.style.color = "#c4b5fd";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(148,163,184,0.65)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Available badge */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl w-fit"
              style={{
                background: "rgba(74,222,128,0.07)",
                border: "1px solid rgba(74,222,128,0.18)",
              }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0"
                style={{ boxShadow: "0 0 6px #4ade80" }} />
              <span className="text-xs font-semibold" style={{ color: "#4ade80" }}>
                Available for hire
              </span>
            </div>
          </div>

          {/* Navigation column */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-3"
              style={{ color: "rgba(139,92,246,0.7)" }}>
              Navigation
            </p>
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="group flex items-center gap-2 text-sm w-fit transition-colors duration-200"
                style={{ color: "rgba(148,163,184,0.6)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#e2e8f0"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(148,163,184,0.6)"; }}
              >
                <span className="w-3 h-px transition-all duration-200"
                  style={{ background: "rgba(139,92,246,0.35)" }} />
                {l}
              </a>
            ))}
          </div>

          {/* Stack column */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-1"
              style={{ color: "rgba(139,92,246,0.7)" }}>
              Built With
            </p>
            {stack.map((tech) => (
              <div key={tech.name} className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}>
                  <img src={tech.url} alt={tech.name} className="w-4 h-4 object-contain"
                    onError={(e) => { e.currentTarget.parentElement.style.display = "none"; }} />
                </div>
                <span className="text-sm" style={{ color: "rgba(148,163,184,0.7)" }}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-7">
          <p className="text-xs" style={{ color: "rgba(100,116,139,0.5)" }}>
            © {new Date().getFullYear()} Mariel Requina. All rights reserved.
          </p>

          <div className="flex items-center gap-1.5">
            <span className="text-xs" style={{ color: "rgba(100,116,139,0.4)" }}>
              Designed & built with
            </span>
            <span style={{ color: "#a78bfa", fontSize: "14px" }}>♥</span>
            <span className="text-xs" style={{ color: "rgba(100,116,139,0.4)" }}>
              by Mariel
            </span>
          </div>

          {/* Back to top */}
          <a href="#about"
            className="flex items-center gap-1.5 text-xs transition-all duration-200"
            style={{ color: "rgba(100,116,139,0.5)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#c4b5fd"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(100,116,139,0.5)"; }}
          >
            Back to top
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 9V3M6 3L3 6M6 3L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </footer>
  );
}
