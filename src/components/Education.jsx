import { useEffect, useRef, useState, useCallback } from "react";

const education = [
  {
    degree: "Bachelor of Science in Information Technology",
    school: "Holy Cross of Davao College",
    location: "Sta. Ana Avenue, corner C. Guzman Street, Barangay 14-B, Davao City",
    year: "2022 – 2026",
    level: "Tertiary",
    icon: "🎓",
    description:
      "Focused on web development, database management, and software engineering. Completed AI-based capstone project on music recommendation using a Facial Emotion Recognition (FER) model, and developed a Procurement Management System during internship at DSWD.",
    highlights: [
      "Dean's Lister (Academic Year 2023–2024, 2024–2025)",
      "Web Development Track",
      "Capstone: AI Music Recommendation (FER Model)",
      "Internship: Procurement Management System at DSWD",
    ],
  },
  {
    degree: "Senior High School – ABM Strand",
    school: "Davao City National High School - MAIN Campus",
    location: "F. Torres Street, Poblacion District, Davao City, Philippines",
    year: "2020 – 2022",
    level: "Senior High",
    icon: "📘",
    description:
      "Completed the Academic Strand in Accountancy, Business, and Management (ABM), focusing on foundational skills in business, research, and management practices.",
    highlights: ["Research: Sweetstopia", "Honor Student"],
  },
  {
    degree: "Junior High School",
    school: "Davao City National High School - Madapo Annex Campus",
    location: "Upper Madapo Hills, Barangay 8-A, Poblacion District, Davao City",
    year: "2016 – 2020",
    level: "Junior High",
    icon: "📗",
    description:
      "Completed Junior High education with active involvement in both academics and extracurricular activities. Developed teamwork, discipline, and leadership skills.",
    highlights: ["Track & Field Club", "Drum and Lyre Corps"],
  },
  {
    degree: "Elementary",
    school: "Dona Pilar L. Marfori Elementary School",
    location: "Madapo Hills, Barangay, Poblacion District, Davao City",
    year: "2010 – 2016",
    level: "Elementary",
    icon: "📙",
    description:
      "Completed elementary education with active participation in extracurricular activities that nurtured creativity, discipline, and teamwork.",
    highlights: ["Drum and Lyre Corps", "Girl Scouts"],
  },
];

/* ── Magnetic tilt card ── */
function MagneticCard({ children, className, style }) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `perspective(800px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg) scale(1.02)`;
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }, []);

  const onLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform =
        "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
    }
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transition: "transform 0.25s ease", willChange: "transform" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

/* ── Typewriter highlight pill ── */
function TypewriterPill({ text, delay }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const timer = setTimeout(() => {
            const id = setInterval(() => {
              i++;
              setDisplayed(text.slice(0, i));
              if (i >= text.length) {
                clearInterval(id);
                setDone(true);
              }
            }, 28);
          }, delay);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [text, delay]);

  return (
    <span
      ref={ref}
      className="text-xs font-medium px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-slate-300 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white transition-all duration-300 inline-flex items-center gap-1"
    >
      {displayed}
      {!done && (
        <span
          className="inline-block w-[2px] h-3 bg-violet-400 ml-0.5"
          style={{ animation: "blink 0.7s step-end infinite" }}
        />
      )}
    </span>
  );
}

/* ── Particle dot that floats on the timeline ── */
function TimelineDot({ visible }) {
  return (
    <div className="absolute left-4 md:left-1/2 top-8 z-20 md:-translate-x-1/2 -translate-x-2">
      {/* Pulse rings */}
      {visible && (
        <>
          <span
            className="absolute inset-0 rounded-full bg-violet-500 opacity-30"
            style={{ animation: "ping 1.4s cubic-bezier(0,0,0.2,1) infinite" }}
          />
          <span
            className="absolute inset-0 rounded-full bg-violet-400 opacity-20 scale-150"
            style={{ animation: "ping 1.4s cubic-bezier(0,0,0.2,1) infinite 0.4s" }}
          />
        </>
      )}
      <div
        className="relative w-4 h-4 rounded-full"
        style={{
          background: "linear-gradient(135deg, #a78bfa, #6d28d9)",
          boxShadow: visible
            ? "0 0 0 3px rgba(124,58,237,0.25), 0 0 18px rgba(124,58,237,0.6)"
            : "none",
          transition: "box-shadow 0.5s ease",
        }}
      />
    </div>
  );
}

/* ── Individual card ── */
function EduCard({ edu, i }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const isEven = i % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row gap-8 ${isEven ? "md:flex-row-reverse" : ""}`}
    >
      <TimelineDot visible={visible} />

      <div className={`pl-12 md:pl-0 md:w-1/2 ${isEven ? "md:pr-14" : "md:pl-14"}`}>
        <MagneticCard
          className="group relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-xl p-7 hover:border-violet-500/50 cursor-default"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            boxShadow:
              "4px 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateX(0) translateY(0)"
              : isEven
              ? "translateX(70px) translateY(10px)"
              : "translateX(-70px) translateY(10px)",
            transition: `opacity 0.8s ease ${i * 0.18}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.18}s`,
          }}
        >
          {/* Radial spotlight that follows mouse */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
            style={{
              background:
                "radial-gradient(280px circle at var(--mx,50%) var(--my,50%), rgba(139,92,246,0.12), transparent 70%)",
            }}
          />

          {/* Top shimmer bar */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)",
              opacity: visible ? 1 : 0,
              transition: `opacity 0.6s ease ${i * 0.18 + 0.4}s`,
            }}
          />

          <div className="relative z-10">
            {/* Top row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="text-2xl"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(167,139,250,0.5))",
                    transition: "filter 0.3s",
                  }}
                >
                  {edu.icon}
                </span>
                <span className="text-xs font-semibold text-violet-300 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">
                  {edu.level}
                </span>
              </div>
              <span
                className="text-xs font-semibold text-slate-400 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(-8px)",
                  transition: `opacity 0.5s ease ${i * 0.18 + 0.3}s, transform 0.5s ease ${i * 0.18 + 0.3}s`,
                }}
              >
                {edu.year}
              </span>
            </div>

            {/* Degree */}
            <h3
              className="text-lg font-bold text-white leading-snug mb-1"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.6s ease ${i * 0.18 + 0.2}s, transform 0.6s ease ${i * 0.18 + 0.2}s`,
              }}
            >
              {edu.degree}
            </h3>

            {/* School with animated underline */}
            <p
              className="text-violet-400 font-semibold text-sm mb-1 relative inline-block"
              style={{
                opacity: visible ? 1 : 0,
                transition: `opacity 0.6s ease ${i * 0.18 + 0.3}s`,
              }}
            >
              {edu.school}
              <span
                className="absolute bottom-0 left-0 h-px bg-violet-400/50"
                style={{
                  width: visible ? "100%" : "0%",
                  transition: `width 0.8s ease ${i * 0.18 + 0.6}s`,
                }}
              />
            </p>

            {/* Location */}
            <p
              className="text-slate-500 text-xs mb-4 flex items-center gap-1"
              style={{
                opacity: visible ? 1 : 0,
                transition: `opacity 0.5s ease ${i * 0.18 + 0.35}s`,
              }}
            >
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {edu.location}
            </p>

            {/* Description */}
            <p
              className="text-slate-400 text-sm leading-relaxed mb-5"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 0.7s ease ${i * 0.18 + 0.4}s, transform 0.7s ease ${i * 0.18 + 0.4}s`,
              }}
            >
              {edu.description}
            </p>

            {/* Typewriter highlights */}
            <div className="flex flex-wrap gap-2">
              {edu.highlights.map((h, j) => (
                <TypewriterPill key={h} text={h} delay={i * 180 + j * 120 + 600} />
              ))}
            </div>
          </div>
        </MagneticCard>
      </div>

      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}

/* ── Scroll-driven beam timeline ── */
function TimelineBeam() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const total = rect.height;
      const scrolled = Math.max(0, windowH * 0.5 - rect.top);
      setProgress(Math.min(1, scrolled / total));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px overflow-hidden"
    >
      {/* Static faint base line */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(124,58,237,0.15) 10%, rgba(124,58,237,0.15) 90%, transparent)",
        }}
      />
      {/* Glowing progress beam */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          height: `${progress * 100}%`,
          background:
            "linear-gradient(to bottom, transparent, #7c3aed 8%, #a78bfa 50%, #7c3aed 92%)",
          boxShadow: "0 0 12px 3px rgba(167,139,250,0.5)",
          transition: "height 0.1s linear",
        }}
      />
      {/* Leading comet tip */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-2 h-6 rounded-full"
        style={{
          top: `calc(${progress * 100}% - 24px)`,
          background: "linear-gradient(to bottom, transparent, #c4b5fd)",
          boxShadow: "0 0 8px 4px rgba(196,181,253,0.4)",
          transition: "top 0.1s linear",
          opacity: progress > 0.02 ? 1 : 0,
        }}
      />
    </div>
  );
}

/* ── Header word-by-word reveal ── */
function AnimatedHeader() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const words = ["Education"];

  return (
    <div
      ref={ref}
      className="text-center mb-20"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <p
        className="uppercase tracking-[0.3em] text-violet-400 text-sm mb-3"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.1s",
        }}
      >
        Academic Background
      </p>
      <h2 className="text-4xl md:text-5xl font-black text-white overflow-hidden">
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block mr-3"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: `opacity 0.6s ease ${0.2 + i * 0.1}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.2 + i * 0.1}s`,
            }}
          >
            {word}
          </span>
        ))}
      </h2>
      {/* Animated underline */}
      <div className="flex justify-center mt-3 mb-4">
        <div
          className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent"
          style={{
            width: visible ? "160px" : "0px",
            transition: "width 1s ease 0.5s",
          }}
        />
      </div>
      <p
        className="mt-2 max-w-xl mx-auto text-slate-400"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.5s",
        }}
      >
        My academic journey from elementary through university — the foundation that shaped my technical mindset.
      </p>
    </div>
  );
}

/* ── Main export ── */
export default function Education() {
  return (
    <>
      {/* Keyframe injector */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <section id="education" className="relative py-28 bg-slate-950 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-violet-700/8 blur-[160px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/8 blur-[160px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-900/10 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <AnimatedHeader />

          {/* Timeline */}
          <div className="relative">
            <TimelineBeam />
            <div className="space-y-14">
              {education.map((edu, i) => (
                <EduCard key={i} edu={edu} i={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
