import { useEffect, useRef, useState, useCallback } from "react";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "DSWD – Department of Social Welfare and Development",
    location: "Philippines",
    period: "Feb 2026 – Jun 2026",
    type: "Internship",
    description:
      "Built and maintained a Laravel-based Purchase Request Tracking System (PTS) for the Procurement Division.",
    bullets: [
      "Developed multi-stage document upload workflows for Activity Proposals and Draft PRs",
      "Implemented role-based access for End User, Approver, Procurement, RD, BAC, and FA II roles",
      "Built FA II rejection and OBR document upload/display workflows",
      "Created status-conditional UI with revision, approval, and rejection flows",
      "Managed ENUM migrations, route naming conventions, and Excel export logic via OpenSpout",
    ],
    stack: ["Laravel", "PHP", "MySQL", "Blade", "Bootstrap", "OpenSpout"],
    accent: "#7c3aed",
    accentGlow: "rgba(124,58,237,0.18)",
    accentSoft: "rgba(124,58,237,0.08)",
    typeColor: "text-violet-300",
    typeBg: "bg-violet-500/10",
    typeBorder: "border-violet-500/20",
    number: "01",
  },
  {
    role: "Full Stack Developer",
    company: "Sisters Chick'n Love (Food Business)",
    location: "Davao City, Philippines",
    period: "2026",
    type: "Freelance",
    description:
      "Developed a full-stack Sales and Inventory Management System for a food business.",
    bullets: [
      "Built role-based admin and staff flows with React + Vite",
      "Implemented sales recording and daily inventory tracking",
      "Designed UI with a forest green and gold brand palette",
      "Integrated product management, reporting dashboards, and low-stock alerts",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    accent: "#2563eb",
    accentGlow: "rgba(37,99,235,0.18)",
    accentSoft: "rgba(37,99,235,0.08)",
    typeColor: "text-blue-300",
    typeBg: "bg-blue-500/10",
    typeBorder: "border-blue-500/20",
    number: "02",
  },
];

/* ─── Connected particle canvas (matches Hero) ─── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
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
          const dist = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y
          );
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

/* ─── Typewriter line ─── */
function TypeLine({ text, delay, accent }) {
  const [chars, setChars] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t = setTimeout(() => {
            let i = 0;
            const id = setInterval(() => {
              i++;
              setChars(i);
              if (i >= text.length) clearInterval(id);
            }, 22);
          }, delay);
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [text, delay]);

  const done = chars >= text.length;
  return (
    <span
      ref={ref}
      className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed"
    >
      <span
        className="mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-500"
        style={{
          background: chars > 0 ? accent : "rgba(255,255,255,0.15)",
          boxShadow: chars > 0 ? `0 0 8px ${accent}` : "none",
        }}
      />
      <span>
        {text.slice(0, chars)}
        {!done && (
          <span
            className="inline-block w-[2px] h-3 align-middle ml-[1px]"
            style={{ background: accent, animation: "blink .6s step-end infinite" }}
          />
        )}
      </span>
    </span>
  );
}

/* ─── Stack badge with hover glow ─── */
function StackBadge({ label, accent, visible, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-xs font-medium px-3 py-1 rounded-full border cursor-default select-none"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.92)",
        transition: `opacity 0.4s ease ${delay}s, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${delay}s, background 0.2s, border-color 0.2s, box-shadow 0.2s`,
        background: hovered ? `${accent}22` : "rgba(255,255,255,0.03)",
        borderColor: hovered ? `${accent}66` : "rgba(255,255,255,0.1)",
        color: hovered ? "#fff" : "rgb(203,213,225)",
        boxShadow: hovered ? `0 0 12px ${accent}44` : "none",
      }}
    >
      {label}
    </span>
  );
}

/* ─── Magnetic tilt card ─── */
function MagneticCard({ children, style, className }) {
  const ref = useRef(null);
  const raf = useRef(null);

  const onMove = useCallback((e) => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      el.style.transform = `perspective(1000px) rotateY(${dx * 5}deg) rotateX(${-dy * 3}deg) scale(1.015)`;
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  }, []);

  const onLeave = useCallback(() => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)";
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        willChange: "transform",
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

/* ─── Single experience card ─── */
function ExpCard({ exp, i }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 0.9s ease ${i * 0.2}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 0.2}s`,
      }}
    >
      <MagneticCard
        className="group relative overflow-hidden rounded-3xl border border-white/[0.08] backdrop-blur-xl"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
          boxShadow: `0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)`,
        }}
      >
        {/* Radial mouse spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-0"
          style={{
            background: `radial-gradient(380px circle at var(--mx,50%) var(--my,50%), ${exp.accentGlow}, transparent 65%)`,
          }}
        />

        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${exp.accent} 40%, ${exp.accent} 60%, transparent 100%)`,
            opacity: visible ? 1 : 0,
            transition: `opacity 0.5s ease ${i * 0.2 + 0.5}s`,
          }}
        />

        <div className="relative z-10 p-8 md:p-10">
          {/* Ghost number */}
          <div
            className="absolute top-6 right-8 text-[7rem] font-black leading-none select-none pointer-events-none"
            style={{ color: exp.accent, opacity: 0.04, fontVariantNumeric: "tabular-nums" }}
          >
            {exp.number}
          </div>

          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div className="flex-1 min-w-0">
              <div className="relative inline-block mb-1">
                <h3 className="text-2xl font-black text-white tracking-tight leading-none">
                  {exp.role}
                </h3>
                <span
                  className="absolute -bottom-0.5 left-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${exp.accent}, transparent)`,
                    width: visible ? "100%" : "0%",
                    transition: `width 0.9s ease ${i * 0.2 + 0.4}s`,
                  }}
                />
              </div>
              <p className="font-semibold text-sm mt-2 mb-1" style={{ color: exp.accent }}>
                {exp.company}
              </p>
              <p className="text-slate-500 text-xs flex items-center gap-1">
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {exp.location}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className="text-xs font-semibold text-slate-400 bg-white/[0.04] border border-white/10 px-3 py-1.5 rounded-full">
                {exp.period}
              </span>
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-full border tracking-wide ${exp.typeColor} ${exp.typeBg} ${exp.typeBorder}`}
              >
                {exp.type}
              </span>
            </div>
          </div>

          {/* Divider with glow */}
          <div className="relative h-px mb-6">
            <div className="absolute inset-0 bg-white/[0.05]" />
            <div
              className="absolute inset-0 h-px"
              style={{
                background: `linear-gradient(90deg, ${exp.accent}44, transparent)`,
                width: visible ? "60%" : "0%",
                transition: `width 1s ease ${i * 0.2 + 0.5}s`,
              }}
            />
          </div>

          {/* Description */}
          <p
            className="text-slate-400 text-sm leading-relaxed mb-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(8px)",
              transition: `opacity 0.6s ease ${i * 0.2 + 0.35}s, transform 0.6s ease ${i * 0.2 + 0.35}s`,
            }}
          >
            {exp.description}
          </p>

          {/* Terminal bullet list */}
          <div
            className="rounded-2xl border border-white/[0.06] mb-6 overflow-hidden"
            style={{ background: "rgba(0,0,0,0.25)" }}
          >
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.05]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="ml-3 text-xs font-mono" style={{ color: `${exp.accent}99` }}>
                {exp.type.toLowerCase()}.log
              </span>
            </div>
            <div className="px-5 py-4 space-y-3 font-mono">
              {exp.bullets.map((b, j) => (
                <TypeLine
                  key={j}
                  text={b}
                  delay={visible ? i * 200 + j * 130 + 500 : 99999}
                  accent={exp.accent}
                />
              ))}
            </div>
          </div>

          {/* Stack badges */}
          <div className="flex flex-wrap gap-2">
            {exp.stack.map((s, j) => (
              <StackBadge
                key={s}
                label={s}
                accent={exp.accent}
                visible={visible}
                delay={i * 0.2 + j * 0.06 + 0.5}
              />
            ))}
          </div>
        </div>
      </MagneticCard>
    </div>
  );
}

/* ─── Section header ─── */
function SectionHeader() {
  const ref = useRef(null);
  const [v, setV] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center mb-20">
      {/* Badge — mirrors Hero's "Available for opportunities" pill */}
      <div
        className="inline-flex items-center gap-2 mb-4"
        style={{ opacity: v ? 1 : 0, transition: "opacity 0.6s ease 0.1s" }}
      >
        <div className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500" />
        </div>
        <span
          className="text-xs uppercase tracking-[0.35em] font-medium"
          style={{ color: "rgba(196,181,253,0.8)" }}
        >
          My Journey
        </span>
      </div>

      {/* Title */}
      <div className="overflow-hidden">
        <h2
          className="text-4xl md:text-5xl font-black uppercase"
          style={{
            background: "linear-gradient(135deg, #fff 30%, rgba(196,181,253,0.7) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.03em",
            opacity: v ? 1 : 0,
            transform: v ? "translateY(0)" : "translateY(48px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s",
          }}
        >
          Work Experience
        </h2>
      </div>

      {/* Expanding accent line — same as Hero's divider */}
      <div className="flex justify-center my-4">
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #7c3aed, #a78bfa, #7c3aed, transparent)",
            width: v ? "220px" : "0px",
            transition: "width 1.1s cubic-bezier(0.22,1,0.36,1) 0.4s",
          }}
        />
      </div>

      <p
        className="max-w-xl mx-auto text-sm"
        style={{
          color: "rgba(148,163,184,0.75)",
          opacity: v ? 1 : 0,
          transition: "opacity 0.6s ease 0.5s",
        }}
      >
        Real-world projects and roles that shaped my skills as a full-stack developer.
      </p>
    </div>
  );
}

/* ─── Main export ─── */
export default function Experience() {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      <section
        id="experience"
        ref={sectionRef}
        className="relative py-28 bg-[#050816] text-white overflow-hidden"
      >
        {/* Connected particle canvas */}
        <ParticleCanvas />

        {/* Ambient glows with mouse parallax */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-[700px] h-[700px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)",
              top: "-10%",
              left: "-5%",
              transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
              transition: "transform 0.4s ease-out",
            }}
          />
          <div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
              bottom: "-10%",
              right: "-5%",
              transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px)`,
              transition: "transform 0.4s ease-out",
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
              top: "40%",
              left: "40%",
            }}
          />
        </div>

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* Decorative grid lines */}
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

        {/* Watermark */}
        <div
          className="absolute select-none pointer-events-none whitespace-nowrap font-black uppercase"
          style={{
            fontSize: "clamp(6rem, 18vw, 18rem)",
            color: "rgba(255,255,255,0.018)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            letterSpacing: "-0.02em",
          }}
        >
          EXPERIENCE
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <SectionHeader />
          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <ExpCard key={i} exp={exp} i={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
