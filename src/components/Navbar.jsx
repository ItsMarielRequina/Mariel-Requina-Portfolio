import { useState, useEffect, useRef } from "react";

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
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const navRef = useRef(null);
  const linkRefs = useRef({});

  const updateIndicator = (activeLink) => {
    const el = linkRefs.current[activeLink];
    if (!el || !navRef.current) return;

    const navRect = navRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    setIndicatorStyle({
      left: elRect.left - navRect.left,
      width: elRect.width,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      links.forEach((link) => {
        const section = document.getElementById(link.toLowerCase());
        if (!section) return;

        const top = section.offsetTop - 140;
        const bottom = top + section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < bottom) {
          setActive(link);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    updateIndicator(active);
  }, [active]);

  useEffect(() => {
    const handleResize = () => updateIndicator(active);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [active]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: scrolled
            ? "rgba(5,8,22,0.88)"
            : "rgba(5,8,22,0.20)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid transparent",
        }}
      >
        {scrolled && (
          <>
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(139,92,246,.7),rgba(99,102,241,.7),transparent)",
              }}
            />
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none"
              style={{
                width: 500,
                height: 120,
                background:
                  "radial-gradient(circle, rgba(109,40,217,.18), transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </>
        )}

        <nav
          ref={navRef}
          className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
        >
          <a href="#hero" className="flex items-center gap-2 font-black text-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500" />
            </span>

            <span
              style={{
                background:
                  "linear-gradient(135deg,#fff 0%,rgba(196,181,253,.8) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mariel
            </span>

            <span
              style={{
                background:
                  "linear-gradient(135deg,#a78bfa 0%,#7c3aed 50%,#c4b5fd 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Requina
            </span>
          </a>

          <div className="hidden md:flex items-center relative">
            {indicatorStyle.width > 0 && (
              <div
                className="absolute h-9 rounded-xl transition-all duration-300"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  background: "rgba(139,92,246,.12)",
                  border: "1px solid rgba(139,92,246,.25)",
                  boxShadow: "0 0 20px rgba(124,58,237,.18)",
                }}
              />
            )}

            <ul className="flex items-center relative z-10">
              {links.map((link) => (
                <li key={link}>
                  <a
                    ref={(el) => (linkRefs.current[link] = el)}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setActive(link)}
                    className="relative px-4 py-2 text-sm rounded-xl transition-all duration-300"
                    style={{
                      color:
                        active === link
                          ? "#c4b5fd"
                          : "rgba(148,163,184,.75)",
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white"
              style={{
                background:
                  "linear-gradient(135deg,#7c3aed 0%,#6d28d9 100%)",
                boxShadow: "0 0 24px rgba(124,58,237,.4)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Hire Me
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-10 h-10 rounded-xl"
            >
              ☰
            </button>
          </div>
        </nav>

        {open && (
          <div className="md:hidden px-4 pb-4">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => {
                  setActive(link);
                  setOpen(false);
                }}
                className="block px-4 py-3 rounded-xl"
                style={{
                  color:
                    active === link ? "#c4b5fd" : "rgba(148,163,184,.8)",
                }}
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
