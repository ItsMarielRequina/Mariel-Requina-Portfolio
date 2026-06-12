import { FiGithub, FiLinkedin, FiFacebook, FiMail } from "react-icons/fi";

const links = ["About", "Skills", "Education", "Experience", "Projects", "Certifications", "Contact"];

const socials = [
  { icon: <FiGithub size={16} />, href: "#", label: "GitHub" },
  { icon: <FiLinkedin size={16} />, href: "#", label: "LinkedIn" },
  { icon: <FiFacebook size={16} />, href: "#", label: "Facebook" },
  { icon: <FiMail size={16} />, href: "#", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 overflow-hidden border-t border-white/[0.06]">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-700/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-14 pb-8">

        {/* Top row */}
        <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-white/[0.06]">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a href="#hero" className="text-2xl font-black tracking-tight text-white">
              Mariel<span className="text-violet-400">Requina</span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Full-stack developer passionate about building responsive interfaces and scalable web applications.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.04] text-slate-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400 mb-1">
              Navigation
            </p>
            {links.map((l) => (
              <a
                key={l}
                href={"#" + l.toLowerCase()}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200 w-fit"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Stack */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400 mb-1">
              Built With
            </p>
            {[
              { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
              { name: "Vite", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
              { name: "Tailwind CSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
              { name: "Laravel", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
            ].map((tech) => (
              <div key={tech.name} className="flex items-center gap-2">
                <img
                  src={tech.url}
                  alt={tech.name}
                  className="w-4 h-4 object-contain"
                  style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))" }}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <span className="text-sm text-slate-400">{tech.name}</span>
              </div>
            ))}

            {/* Available badge */}
            <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20 w-fit">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-green-400 text-xs font-semibold">Available for hire</span>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-slate-600 text-xs">
            {"© " + new Date().getFullYear() + " Mariel Requina. All rights reserved."}
          </p>
          <p className="text-slate-600 text-xs flex items-center gap-1">
            Designed & built with
            <span className="text-violet-400 mx-1">♥</span>
            by Mariel
          </p>
        </div>

      </div>
    </footer>
  );
}
