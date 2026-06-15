import { useState, useEffect, useRef } from "react";

const links = [
  "About",
  "Skills",
  "Education",
  "Experience",
  "Projects",
  "Certifications",
  "Contact",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("About");
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const navRef = useRef(null);
  const linkRefs = useRef({});

  const updatePill = (activeLink) => {
    const el = linkRefs.current[activeLink];
    if (!el || !navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setPillStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
      opacity: 1,
    });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const matched = links.find(
            (l) => l.toLowerCase() === entry.target.id
          );
          if (matched) setActive(matched);
        });
      },
      { threshold: 0.4 }
    );
    links.forEach((link) => {
      const el = document.getElementById(link.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => updatePill(active), 60);
    return () => clearTimeout(t);
  }, [active]);

  useEffect(() => {
    const onResize = () => {
      requestAnimationFrame(() => updatePill(active));
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  return (
    <>
      {/* ── DESKTOP: floating pill ── */}
      <header
        className="hidden md:flex fixed top-5 left-1/2 z-50 -translate-x-1/2 transition-all duration-500"
        style={{
          filter: scrolled
            ? "drop-shadow(0 8px 32px rgba(109,40,217,0.35))"
            : "drop-shadow(0 4px 16px rgba(0,0,0,0.3))",
        }}
      >
        <div
          className="flex items-center gap-1 px-2 py-2 rounded-2xl"
          style={{
            background: scrolled
              ? "rgba(8,6,28,0.92)"
              : "rgba(8,6,28,0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(139,92,246,0.2)",
          }}
        >
          {/* Logo chip */}
          <a
            href="#about"
            onClick={() => setActive("About")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl mr-2 transition-all duration-200 hover:bg-white/5 group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
            </span>
            <span
              className="font-black text-sm tracking-tight"
              style={{
                background:
                  "linear-gradient(120deg,#fff 0%,#c4b5fd 60%,#a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MR
            </span>
          </a>

          {/* Divider */}
          <div
            className="w-px h-5 mr-2"
            style={{ background: "rgba(139,92,246,0.2)" }}
          />

          {/* Nav links with sliding pill */}
          <nav ref={navRef} className="flex items-center relative">
            {/* Sliding background pill */}
            <div
            className="absolute top-1/2 -translate-y-1/2 rounded-xl pointer-events-none"
            style={{
              left: pillStyle.left,
              width: pillStyle.width,
              height: "2rem",
              opacity: pillStyle.opacity,
              boxShadow: "none",
            }}
          />

            <ul className="flex items-center relative z-10">
              {links.map((link) => (
                <li key={link}>
                  <a
                    ref={(el) => (linkRefs.current[link] = el)}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setActive(link)}
                    className="block px-3.5 py-1.5 text-xs font-medium rounded-xl transition-colors duration-200"
                    style={{
                      color:
                        active === link
                          ? "#ddd6fe"
                          : "rgba(148,163,184,0.7)",
                      letterSpacing: active === link ? "0.01em" : "0",
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Divider */}
          <div
            className="w-px h-5 mx-2"
            style={{ background: "rgba(139,92,246,0.2)" }}
          />

          {/* CTA */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-95 whitespace-nowrap"
            style={{
              background:
                "linear-gradient(135deg,#7c3aed 0%,#6d28d9 100%)",
              boxShadow: "0 0 16px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Hire Me
          </a>
        </div>
      </header>

      {/* ── MOBILE: top bar ── */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: open
            ? "rgba(5,4,20,0.98)"
            : scrolled
            ? "rgba(5,4,20,0.92)"
            : "rgba(5,4,20,0.6)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled || open
            ? "1px solid rgba(139,92,246,0.18)"
            : "1px solid transparent",
        }}
      >
        {/* Top glow line when scrolled */}
        {scrolled && (
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg,transparent 0%,rgba(139,92,246,0.6) 40%,rgba(99,102,241,0.6) 60%,transparent 100%)",
            }}
          />
        )}

        <div className="flex items-center justify-between px-5 h-14">
          <a
            href="#about"
            onClick={() => setActive("About")}
            className="flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
            </span>
            <span
              className="font-black text-base"
              style={{
                background:
                  "linear-gradient(120deg,#fff 0%,#c4b5fd 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mariel Requina
            </span>
          </a>

          <button
            onClick={() => setOpen((p) => !p)}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{
              background: open
                ? "rgba(124,58,237,0.2)"
                : "rgba(255,255,255,0.05)",
              border: "1px solid rgba(139,92,246,0.2)",
              color: open ? "#c4b5fd" : "rgba(148,163,184,0.8)",
            }}
            aria-label="Toggle menu"
          >
            <span
              className="text-base leading-none select-none"
              style={{ fontFamily: "monospace" }}
            >
              {open ? "✕" : "≡"}
            </span>
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: open ? "420px" : "0px",
            opacity: open ? 1 : 0,
          }}
        >
          <div className="px-4 pb-5 pt-1 grid grid-cols-2 gap-1.5">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => {
                  setActive(link);
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all duration-200"
                style={{
                  background:
                    active === link
                      ? "rgba(124,58,237,0.15)"
                      : "rgba(255,255,255,0.03)",
                  border:
                    active === link
                      ? "1px solid rgba(139,92,246,0.3)"
                      : "1px solid rgba(255,255,255,0.06)",
                  color:
                    active === link
                      ? "#ddd6fe"
                      : "rgba(148,163,184,0.75)",
                }}
              >
                <span
                  className="w-1 h-1 rounded-full"
                  style={{
                    background:
                      active === link ? "#a78bfa" : "rgba(148,163,184,0.3)",
                  }}
                />
                {link}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => {
                setActive("Contact");
                setOpen(false);
              }}
              className="col-span-2 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white mt-1 transition-all duration-200 active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg,#7c3aed 0%,#6d28d9 100%)",
                boxShadow: "0 0 20px rgba(124,58,237,0.35)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Hire Me
            </a>
          </div>
        </div>
      </header>

      {/* Mobile spacer so content isn't hidden behind navbar */}
      <div className="md:hidden h-14" />
    </>
  );
}