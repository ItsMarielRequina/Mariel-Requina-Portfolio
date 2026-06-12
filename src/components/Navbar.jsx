import { useState, useEffect } from "react";

const links = [
"About",
"Skills",
"Education",
"Experience",
"Projects",
"Certifications",
];

export default function Navbar() {
const [scrolled, setScrolled] = useState(false);
const [open, setOpen] = useState(false);
const [active, setActive] = useState("About");

useEffect(() => {
const handleScroll = () => {
setScrolled(window.scrollY > 40);

  const sections = links.map((link) =>
    document.getElementById(link.toLowerCase())
  );

  sections.forEach((section, index) => {
    if (!section) return;

    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;

    if (window.scrollY >= top && window.scrollY < bottom) {
      setActive(links[index]);
    }
  });
};

window.addEventListener("scroll", handleScroll);
handleScroll();

return () => window.removeEventListener("scroll", handleScroll);

}, []);

return (
<header
style={{
backdropFilter: "blur(20px)",
WebkitBackdropFilter: "blur(20px)",
}}
className={
scrolled
? "fixed top-0 left-0 right-0 z-50 bg-slate-950/85 border-b border-white/[0.06] shadow-lg shadow-black/20 transition-all duration-300"
: "fixed top-0 left-0 right-0 z-50 bg-transparent border-b border-transparent transition-all duration-300"
}
> <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
{/* Logo */} <a
       href="#hero"
       className="text-lg font-black tracking-tight text-white"
     >
Mariel<span className="text-violet-400">Requina</span> </a>

    {/* Desktop Navigation */}
    <ul className="hidden md:flex items-center gap-1 text-sm font-medium">
      {links.map((link) => (
        <li key={link}>
          <a
            href={`#${link.toLowerCase()}`}
            onClick={() => setActive(link)}
            className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
              active === link
                ? "text-violet-400 bg-violet-400/10"
                : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            {link}
          </a>
        </li>
      ))}
    </ul>

    {/* Right Section */}
    <div className="flex items-center gap-3">
      <a
        href="#contact"
        className="hidden md:inline-flex px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition"
      >
        Contact
      </a>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.06] border border-white/[0.08] text-slate-400 hover:text-white transition"
        aria-label="Toggle menu"
      >
        {open ? (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M4 8h16M4 16h16"
            />
          </svg>
        )}
      </button>
    </div>
  </nav>

  {/* Mobile Menu */}
  {open && (
    <div className="md:hidden border-t border-white/[0.06] bg-slate-950 px-6 pt-3 pb-6 flex flex-col gap-1">
      {links.map((link) => (
        <a
          key={link}
          href={`#${link.toLowerCase()}`}
          onClick={() => {
            setActive(link);
            setOpen(false);
          }}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
            active === link
              ? "text-violet-400 bg-violet-400/[0.08]"
              : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              active === link ? "bg-violet-400" : "bg-slate-600"
            }`}
          />
          {link}
        </a>
      ))}

      <div className="h-px bg-white/[0.05] my-2" />

      <a
        href="#contact"
        onClick={() => setOpen(false)}
        className="mt-1 text-center px-4 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition"
      >
        Contact Me
      </a>
    </div>
  )}
</header>
);
}
