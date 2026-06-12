import { useEffect, useRef, useState } from "react";

const skillGroups = [
  {
    category: "Languages",
    icon: "💻",
    accent: "#7c3aed",
    accentSoft: "rgba(124,58,237,0.12)",
    skills: ["PHP", "JavaScript", "HTML5", "CSS3", "SQL", "Python"],
  },
  {
    category: "Frameworks & Libraries",
    icon: "🧩",
    accent: "#6d28d9",
    accentSoft: "rgba(109,40,217,0.12)",
    skills: ["Laravel", "React", "Vite", "Tailwind CSS"],
  },
  {
    category: "Tools & Platforms",
    icon: "🛠️",
    accent: "#4f46e5",
    accentSoft: "rgba(79,70,229,0.12)",
    skills: ["Git", "GitHub", "VS Code", "XAMPP", "MySQL", "Composer", "npm", "Figma"],
  },
  {
    category: "Concepts",
    icon: "📐",
    accent: "#7c3aed",
    accentSoft: "rgba(124,58,237,0.12)",
    skills: [
      "REST APIs",
      "MVC Architecture",
      "Database Design",
      "Responsive Design",
      "Role-Based Access Control",
      "Artificial Intelligence",
      "Machine Learning",
    ],
  },
];

const devIcons = {
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  HTML5: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  SQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Laravel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  Bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  jQuery: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  GitHub: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  XAMPP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  Composer: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/composer/composer-original.svg",
  npm: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
  Figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
};

const row1 = [
  { name: "PHP",        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
  { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "HTML5",      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Python",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "MySQL",      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Laravel",    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { name: "React",      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Vite",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
  { name: "Tailwind",   url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
];

const row2 = [
  { name: "Bootstrap",  url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
  { name: "jQuery",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" },
  { name: "Git",        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "VS Code",    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Composer",   url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/composer/composer-original.svg" },
  { name: "npm",        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
  { name: "Figma",      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Apache",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" },
  { name: "PHP",        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" },
];

// ── Particle canvas matching Hero exactly ──────────────────────────────────
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ── Marquee row ────────────────────────────────────────────────────────────
function MarqueeRow({ icons, direction }) {
  const doubled = [...icons, ...icons];
  const animName = direction === "right" ? "skillScrollRight" : "skillScrollLeft";
  const duration = direction === "right" ? "32s" : "38s";

  return (
    <div
      className="overflow-hidden mb-4"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        className="flex gap-4 w-max"
        style={{ animation: `${animName} ${duration} linear infinite` }}
      >
        {doubled.map((icon, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-2 w-[84px] h-[84px] rounded-2xl flex-shrink-0 transition-all duration-300 hover:-translate-y-2 hover:scale-105 group"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(139,92,246,0.15)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(124,58,237,0.12)";
              e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(124,58,237,0.25), inset 0 1px 0 rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(139,92,246,0.15)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)";
            }}
          >
            <img
              src={icon.url}
              alt={icon.name}
              className="w-8 h-8 object-contain"
              style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <span
              className="text-[9px] font-semibold uppercase tracking-wider"
              style={{ color: "rgba(148,163,184,0.7)" }}
            >
              {icon.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Skill pill ─────────────────────────────────────────────────────────────
function SkillPill({ skill }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-default"
      style={{
        background: hovered ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.08)"}`,
        color: hovered ? "#c4b5fd" : "rgba(148,163,184,0.85)",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hovered ? "0 4px 16px rgba(124,58,237,0.2)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {devIcons[skill] && (
        <img
          src={devIcons[skill]}
          alt={skill}
          className="w-3.5 h-3.5 object-contain flex-shrink-0"
          style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))" }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      )}
      {skill}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function Skills() {
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

  const stats = [
    { value: "15+", label: "Projects Built", sub: "Completed" },
    { value: "10+", label: "Technologies", sub: "Mastered" },
    { value: "React", label: "Frontend Focus", sub: "& Vite" },
    { value: "Laravel", label: "Backend Focus", sub: "& PHP" },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-28 overflow-hidden"
      style={{ background: "#050816" }}
    >
      {/* ── Particle canvas ── */}
      <ParticleCanvas />

      {/* ── Ambient glows matching Hero ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)",
            top: "-10%",
            left: "-5%",
            transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
            transition: "transform 0.4s ease-out",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
            bottom: "-10%",
            right: "-5%",
            transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`,
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

      {/* ── Grid overlay matching Hero ── */}
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

      {/* ── Noise texture matching Hero ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── Watermark ── */}
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
        SKILLS
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          {/* Badge matching Hero's availability badge style */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500" />
            </div>
            <span
              className="text-xs uppercase tracking-[0.35em] font-medium"
              style={{ color: "rgba(196,181,253,0.8)" }}
            >
              Technical Expertise
            </span>
          </div>

          <h2
            className="font-black leading-none uppercase mb-4"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              background: "linear-gradient(135deg, #fff 30%, rgba(196,181,253,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
            }}
          >
            Skills & Technologies
          </h2>

          {/* Divider matching Hero's gradient divider */}
          <div
            className="h-px w-48 mx-auto mb-4"
            style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)" }}
          />

          <p className="max-w-xl mx-auto text-sm md:text-base" style={{ color: "rgba(148,163,184,0.75)" }}>
            Technologies, frameworks, tools, and concepts I use to build{" "}
            <span style={{ color: "#c4b5fd" }}>responsive interfaces</span>{" "}
            and{" "}
            <span style={{ color: "#818cf8" }}>scalable applications</span>.
          </p>
        </div>

        {/* Marquee */}
        <div className="mb-20">
          <MarqueeRow icons={row1} direction="right" />
          <MarqueeRow icons={row2} direction="left" />
        </div>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillGroups.map((group, idx) => (
            <SkillCard key={group.category} group={group} idx={idx} />
          ))}
        </div>

        {/* Stats — matching Hero's stat cards exactly */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl px-4 py-5 text-center cursor-default transition-all duration-300 group"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(139,92,246,0.08)";
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.25)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Glow dot matching Hero stat cards */}
              <div
                className="absolute top-2 right-2 w-1 h-1 rounded-full"
                style={{ background: "rgba(139,92,246,0.6)" }}
              />
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(100,116,139,0.8)" }}>
                {stat.label}
              </p>
              <h3
                className="text-2xl font-black"
                style={{
                  background: "linear-gradient(135deg, #fff, rgba(196,181,253,0.8))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </h3>
              <p className="text-xs mt-0.5" style={{ color: "rgba(139,92,246,0.7)" }}>
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes skillScrollRight {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes skillScrollLeft {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

// ── Skill card with mouse-tracking glow ───────────────────────────────────
function SkillCard({ group }) {
  const cardRef = useRef(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 1,
    });
  };

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-3xl p-7 transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(139,92,246,0.35)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
        setGlow((g) => ({ ...g, opacity: 0 }));
      }}
    >
      {/* Mouse-tracking radial glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(300px circle at ${glow.x}% ${glow.y}%, rgba(124,58,237,0.1), transparent 70%)`,
        }}
      />

      {/* Subtle top border shine */}
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }}
      />

      <div className="relative z-10">
        {/* Card header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl text-lg flex-shrink-0"
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(139,92,246,0.25)",
            }}
          >
            {group.icon}
          </div>
          <div>
            <h3 className="text-base font-bold text-white leading-tight">{group.category}</h3>
            <p className="text-xs mt-0.5" style={{ color: "rgba(139,92,246,0.7)" }}>
              {group.skills.length} {group.skills.length === 1 ? "skill" : "skills"}
            </p>
          </div>
          {/* Corner accent dot matching Hero's glow dot */}
          <div className="ml-auto flex items-center gap-1.5">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-5"
          style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.3), transparent)" }}
        />

        {/* Skill pills */}
        <div className="flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <SkillPill key={skill} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}