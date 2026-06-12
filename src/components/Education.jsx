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

// ── Particle canvas — exact match to Hero ─────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 50 }, () => ({
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
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
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

// ── Magnetic tilt card ────────────────────────────────────────────────────
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
    if (ref.current)
      ref.current.style.transform =
        "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
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

// ── Typewriter highlight pill ─────────────────────────────────────────────
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
              if (i >= text.length) { clearInterval(id); setDone(true); }
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

// ── Timeline dot with pulse rings ─────────────────────────────────────────
function TimelineDot({ visible }) {
  return (
    <div className="absolute left-4 md:left-1/2 top-8 z-20 md:-translate-x-1/2 -translate-x-2">
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

// ── Individual education card ─────────────────────────────────────────────
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
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateX(0) translateY(0)"
              : isEven
              ? "translateX(70px) translateY(10px)"
              : "translateX(-70px) translateY(10px)",
            transition: `opacity 0.8s ease ${i * 0.18}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.18}s`,
          }}
        >
          {/* Mouse-tracking radial spotlight */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
            style={{
              background:
                "radial-gradient(280px circle at var(--mx,50%) var(--my,50%), rgba(139,92,246,0.12), transparent 70%)",
            }}
          />

          {/* Top shimmer bar — matching Hero's gradient divider */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)",
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
                  style={{ filter: "drop-shadow(0 0 8px rgba(167,139,250,0.5))" }}
                >
                  {edu.icon}
                </span>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    color: "#c4b5fd",
                    background: "rgba(124,58,237,0.15)",
                    border: "1px solid rgba(139,92,246,0.25)",
                  }}
                >
                  {edu.level}
                </span>
              </div>

              {/* Year badge — matching Hero's stat card pill */}
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  color: "rgba(148,163,184,0.8)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(-8px)",
                  transition: `opacity 0.5s ease ${i * 0.18 + 0.3}s, transform 0.5s ease ${i * 0.18 + 0.3}s`,
                }}
              >
                {edu.year}
              </span>
            </div>

            {/* Degree — matching Hero's gradient text */}
            <h3
              className="text-lg font-bold leading-snug mb-1"
              style={{
                background: "linear-gradient(135deg, #fff 40%, rgba(196,181,253,0.75) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.6s ease ${i * 0.18 + 0.2}s, transform 0.6s ease ${i * 0.18 + 0.2}s`,
              }}
            >
              {edu.degree}
            </h3>

            {/* School with animated underline */}
            <p
              className="font-semibold text-sm mb-1 relative inline-block"
              style={{
                color: "rgba(139,92,246,0.9)",
                opacity: visible ? 1 : 0,
                transition: `opacity 0.6s ease ${i * 0.18 + 0.3}s`,
              }}
            >
              {edu.school}
              <span
                className="absolute bottom-0 left-0 h-px"
                style={{
                  background: "rgba(139,92,246,0.5)",
                  width: visible ? "100%" : "0%",
                  transition: `width 0.8s ease ${i * 0.18 + 0.6}s`,
                }}
              />
            </p>

            {/* Location */}
            <p
              className="text-xs mb-4 flex items-center gap-1"
              style={{
                color: "rgba(100,116,139,0.7)",
                opacity: visible ? 1 : 0,
                transition: `opacity 0.5s ease ${i * 0.18 + 0.35}s`,
              }}
            >
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {edu.location}
            </p>

            {/* Divider matching Hero */}
            <div
              className="h-px mb-4"
              style={{
                background: "linear-gradient(90deg, rgba(139,92,246,0.3), transparent)",
                opacity: visible ? 1 : 0,
                transition: `opacity 0.5s ease ${i * 0.18 + 0.4}s`,
              }}
            />

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-5"
              style={{
                color: "rgba(148,163,184,0.75)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 0.7s ease ${i * 0.18 + 0.4}s, transform 0.7s ease ${i * 0.18 + 0.4}s`,
              }}
            >
              {edu.description}
            </p>

            {/* Typewriter highlight pills */}
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

// ── Scroll-driven glowing timeline beam ──────────────────────────────────
function TimelineBeam() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height;
      const scrolled = Math.max(0, window.innerHeight * 0.5 - rect.top);
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
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(124,58,237,0.12) 10%, rgba(124,58,237,0.12) 90%, transparent)",
        }}
      />
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

// ── Section header ────────────────────────────────────────────────────────
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
      {/* Badge — exact match to Hero's availability badge */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500" />
        </div>
        <span
          className="text-xs uppercase tracking-[0.35em] font-medium"
          style={{ color: "rgba(196,181,253,0.8)" }}
        >
          Academic Background
        </span>
      </div>

      {/* Title — matching Hero's gradient heading */}
      <h2
        className="font-black leading-none uppercase mb-3"
        style={{
          fontSize: "clamp(2.5rem, 7vw, 5rem)",
          background: "linear-gradient(135deg, #fff 30%, rgba(196,181,253,0.7) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.03em",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
        }}
      >
        Education
      </h2>

      {/* Gradient divider — exact match */}
      <div className="flex justify-center mt-3 mb-4">
        <div
          className="h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)",
            width: visible ? "160px" : "0px",
            transition: "width 1s ease 0.5s",
          }}
        />
      </div>

      <p
        className="max-w-xl mx-auto text-sm md:text-base"
        style={{
          color: "rgba(148,163,184,0.75)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.5s",
        }}
      >
        My academic journey from elementary through university —{" "}
        <span style={{ color: "#c4b5fd" }}>the foundation</span> that shaped my{" "}
        <span style={{ color: "#818cf8" }}>technical mindset</span>.
      </p>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────
export default function Education() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

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
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="education"
        className="relative py-28 overflow-hidden"
        style={{ background: "#050816" }}
      >
        {/* Particle canvas */}
        <ParticleCanvas />

        {/* Ambient glows — exact match to Hero */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)",
              top: "-10%",
              right: "-5%",
              transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * 0.4}px)`,
              transition: "transform 0.4s ease-out",
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
              bottom: "-10%",
              left: "-5%",
              transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * -0.3}px)`,
              transition: "transform 0.4s ease-out",
            }}
          />
          <div
            className="absolute w-[350px] h-[350px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        {/* Grid overlay — exact match to Hero */}
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

        {/* Noise texture — exact match to Hero */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* Watermark */}
        <div
          className="absolute select-none pointer-events-none whitespace-nowrap font-black uppercase"
          style={{
            fontSize: "clamp(5rem, 16vw, 16rem)",
            color: "rgba(255,255,255,0.015)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            letterSpacing: "-0.02em",
          }}
        >
          EDU
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <AnimatedHeader />

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
