import { useEffect, useState, useRef } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiFacebook,
  FiMail,
  FiArrowRight,
  FiDownload,
} from "react-icons/fi";

const roles = [
  "IT Graduate",
  "Web Developer",
  "Laravel Developer",
  "React Developer",
];

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

      // Draw connecting lines
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

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // Typewriter
  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80
      );
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        40
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((roleIdx + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  // Parallax mouse
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
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#050816] text-white flex flex-col"
    >
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Deep ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)",
            top: "-10%",
            left: "-5%",
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
            transition: "transform 0.4s ease-out",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
            bottom: "-10%",
            right: "-5%",
            transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px)`,
            transition: "transform 0.4s ease-out",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
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
        MARIEL
      </div>

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

      {/* Main layout */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 flex flex-col flex-1">
        <div className="flex-1 grid lg:grid-cols-2 items-center gap-12 py-16">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-6 z-30">

            {/* Badge */}
            <div className="flex items-center gap-2 w-fit">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500"></span>
              </div>
              <span
                className="text-xs uppercase tracking-[0.35em] font-medium"
                style={{ color: "rgba(196,181,253,0.8)" }}
              >
                Available for opportunities
              </span>
            </div>

            {/* Name block */}
            <div className="space-y-1">
              <div className="flex items-end gap-3">
                <h1
                  className="font-black leading-none uppercase"
                  style={{
                    fontSize: "clamp(3.5rem, 9vw, 6rem)",
                    background:
                      "linear-gradient(135deg, #fff 30%, rgba(196,181,253,0.7) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Mariel
                </h1>
                <span
                  className="text-base font-medium mb-3 px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(139,92,246,0.15)",
                    border: "1px solid rgba(139,92,246,0.3)",
                    color: "#c4b5fd",
                  }}
                >
                  she/her
                </span>
              </div>
              <h2
                className="font-light tracking-widest uppercase text-sm"
                style={{ color: "rgba(148,163,184,0.7)", letterSpacing: "0.4em" }}
              >
                Requina
              </h2>
            </div>

            {/* Typewriter */}
            <div className="flex items-center gap-3 h-12">
              <div
                className="w-8 h-[2px] rounded-full"
                style={{
                  background: "linear-gradient(90deg, #7c3aed, transparent)",
                }}
              />
              <span
                className="text-xl md:text-2xl font-semibold"
                style={{
                  background:
                    "linear-gradient(90deg, #a78bfa, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  minWidth: "260px",
                }}
              >
                {displayed}
                <span
                  className="animate-pulse"
                  style={{ WebkitTextFillColor: "#a78bfa" }}
                >
                  |
                </span>
              </span>
            </div>

            {/* Bio */}
            <p
              className="max-w-md leading-relaxed text-sm md:text-base"
              style={{ color: "rgba(148,163,184,0.75)" }}
            >
              Passionate IT graduate specializing in modern web development,
              crafting{" "}
              <span style={{ color: "#c4b5fd" }}>responsive interfaces</span>{" "}
              and{" "}
              <span style={{ color: "#818cf8" }}>scalable applications</span>{" "}
              using React, Laravel, JavaScript, and PHP.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mt-1">
              
              <a
                href="#projects"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                  boxShadow: "0 0 24px rgba(124,58,237,0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 36px rgba(124,58,237,0.65)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 24px rgba(124,58,237,0.4)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                View Projects
                <FiArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="/resume.pdf"
                className="group flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <FiDownload size={14} />
                Resume
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(139,92,246,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                }}
              >
                Contact Me
              </a>
            </div>

            {/* Divider */}
            <div
              className="h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)",
              }}
            />

            {/* Social icons */}
            <div className="flex items-center gap-1">
              {[
                { icon: FiGithub, label: "GitHub", href: "#" },
                { icon: FiLinkedin, label: "LinkedIn", href: "#" },
                { icon: FiFacebook, label: "Facebook", href: "#" },
                { icon: FiMail, label: "Email", href: "#" },
              ].map(({ icon: Icon, label, href }) => (
                
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300"
                  style={{
                    color: "rgba(148,163,184,0.7)",
                    border: "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#c4b5fd";
                    e.currentTarget.style.background = "rgba(139,92,246,0.12)";
                    e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(148,163,184,0.7)";
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
              <span
                className="ml-3 text-xs"
                style={{ color: "rgba(100,116,139,0.6)" }}
              >
                Let's connect
              </span>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Projects", value: "15+", sub: "Completed" },
                { label: "Specialty", value: "Full", sub: "Stack Dev" },
                { label: "Stack", value: "R+L", sub: "React · Laravel" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl px-4 py-4 group cursor-default transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(20px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(139,92,246,0.08)";
                    e.currentTarget.style.borderColor =
                      "rgba(139,92,246,0.25)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Glow dot */}
                  <div
                    className="absolute top-2 right-2 w-1 h-1 rounded-full"
                    style={{ background: "rgba(139,92,246,0.6)" }}
                  />
                  <p
                    className="text-xs uppercase tracking-widest mb-1"
                    style={{ color: "rgba(100,116,139,0.8)" }}
                  >
                    {stat.label}
                  </p>
                  <h3
                    className="text-2xl font-black"
                    style={{
                      background:
                        "linear-gradient(135deg, #fff, rgba(196,181,253,0.8))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </h3>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(139,92,246,0.7)" }}
                  >
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Avatar ── */}
          <div className="hidden lg:flex justify-center items-end h-full relative">

            {/* Orbiting ring */}
            <div
              className="absolute"
              style={{
                width: "420px",
                height: "420px",
                bottom: "5%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {/* Outer rotating ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px solid rgba(139,92,246,0.2)",
                  animation: "spin 20s linear infinite",
                }}
              >
                {[0, 90, 180, 270].map((deg) => (
                  <div
                    key={deg}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: "rgba(167,139,250,0.8)",
                      boxShadow: "0 0 8px rgba(167,139,250,0.8)",
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${deg}deg) translateX(209px) translateY(-50%)`,
                    }}
                  />
                ))}
              </div>

              {/* Inner counter-rotating ring */}
              <div
                className="absolute"
                style={{
                  inset: "30px",
                  borderRadius: "50%",
                  border: "1px solid rgba(99,102,241,0.15)",
                  animation: "spin 14s linear infinite reverse",
                }}
              >
                {[45, 135, 225, 315].map((deg) => (
                  <div
                    key={deg}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      background: "rgba(99,102,241,0.7)",
                      top: "50%",
                      left: "50%",
                      transform: `rotate(${deg}deg) translateX(175px) translateY(-50%)`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Glow beneath image */}
            <div
              className="absolute"
              style={{
                width: "300px",
                height: "300px",
                bottom: "0",
                left: "50%",
                transform: "translateX(-50%)",
                background:
                  "radial-gradient(ellipse, rgba(109,40,217,0.35) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            {/* Floating tech badges */}
            {[
              {
                label: "React",
                icon: "⚛",
                style: { top: "20%", left: "2%", animationDelay: "0s" },
              },
              {
                label: "Laravel",
                icon: "🔺",
                style: { top: "30%", right: "0%", animationDelay: "0.8s" },
              },
              {
                label: "JavaScript",
                icon: "JS",
                style: { bottom: "32%", left: "0%", animationDelay: "1.4s" },
              },
              {
                label: "PHP",
                icon: "PHP",
                style: { bottom: "25%", right: "2%", animationDelay: "0.4s" },
              },
            ].map((badge) => (
              <div
                key={badge.label}
                className="absolute flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold z-30"
                style={{
                  ...badge.style,
                  background: "rgba(15,15,30,0.85)",
                  border: "1px solid rgba(139,92,246,0.35)",
                  backdropFilter: "blur(12px)",
                  color: "#c4b5fd",
                  animation: `float 4s ease-in-out infinite`,
                  animationDelay: badge.style.animationDelay,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                }}
              >
                <span style={{ fontSize: "11px" }}>{badge.icon}</span>
                {badge.label}
              </div>
            ))}

            {/* Profile image */}
            <img
              src={new URL("../assets/profile.png", import.meta.url).href}
              alt="Mariel"
              className="relative z-20"
              style={{
                height: "92vh",
                maxHeight: "720px",
                objectFit: "contain",
                marginBottom: "-24px",
                filter: "drop-shadow(0 0 40px rgba(109,40,217,0.3))",
                maskImage:
                  "linear-gradient(to bottom, black 55%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 55%, transparent 100%)",
                transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.15}px)`,
                transition: "transform 0.3s ease-out",
              }}
            />
          </div>
        </div>

        {/* Bottom scroll hint */}
        <div className="flex justify-center pb-8 z-20">
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "rgba(100,116,139,0.5)" }}
            >
              Scroll
            </span>
            <div
              className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
              style={{ border: "1px solid rgba(139,92,246,0.3)" }}
            >
              <div
                className="w-1 h-2 rounded-full"
                style={{
                  background: "#7c3aed",
                  animation: "scrollDot 1.8s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes scrollDot {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(12px); }
        }
      `}</style>
    </section>
  );
}
