import { useState, useEffect } from "react";

const links = ["About", "Skills", "Education", "Experience", "Projects", "Certifications", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur shadow-sm" : "bg-transparent"}`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="font-display text-xl font-bold text-violet-600 tracking-tight">
          Mariel<span className="text-violet-400">.</span>
        </a>
        {/* Desktop */}
        <ul className="hidden md:flex gap-6 text-sm font-medium text-violet-900">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="hover:text-violet-600 transition-colors">
                {l}
              </a>
            </li>
          ))}
        </ul>
        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-violet-700 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>
      {open && (
        <ul className="md:hidden bg-white border-t border-violet-100 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-violet-900">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="hover:text-violet-600">{l}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
