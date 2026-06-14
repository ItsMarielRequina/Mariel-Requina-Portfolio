import { useState, useRef, useEffect } from "react";
import graduationImg from "../assets/graduation.jpg";
import atWorkImg from "../assets/atwork.jpg";
import setupImg from "../assets/setup.png";

const photos = [
  { src: graduationImg, label: "Graduation Day", tag: "Achievement", likes: 248, time: "2d ago" },
  { src: atWorkImg, label: "At Work", tag: "Builder", likes: 183, time: "5d ago" },
  { src: setupImg, label: "My Setup", tag: "Creator", likes: 312, time: "1w ago" },
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
    const particles = Array.from({ length: 40 }, () => ({
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

// Heart icon SVG
function HeartIcon({ filled }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#f43f5e" : "none"}
      stroke={filled ? "#f43f5e" : "currentColor"} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

// Comment icon SVG
function CommentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// Share icon SVG
function ShareIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// Bookmark icon SVG
function BookmarkIcon({ filled }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "white" : "none"}
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function About() {
  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState({});
  const [bookmarked, setBookmarked] = useState({});
  const [likeCounts, setLikeCounts] = useState(
    Object.fromEntries(photos.map((p, i) => [i, p.likes]))
  );
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

  const toggleLike = (idx) => {
    setLiked((prev) => {
      const next = { ...prev, [idx]: !prev[idx] };
      setLikeCounts((counts) => ({
        ...counts,
        [idx]: photos[idx].likes + (next[idx] ? 1 : 0),
      }));
      return next;
    });
  };

  const toggleBookmark = (idx) => {
    setBookmarked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden py-32 text-white"
      style={{ background: "#050816" }}
    >
      <ParticleCanvas />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)",
            top: "-10%", right: "-5%",
            transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * 0.5}px)`,
            transition: "transform 0.4s ease-out",
          }} />
        <div className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 70%)",
            bottom: "-10%", left: "-5%",
            transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * -0.4}px)`,
            transition: "transform 0.4s ease-out",
          }} />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

      {/* Watermark */}
      <div className="absolute select-none pointer-events-none whitespace-nowrap font-black uppercase"
        style={{
          fontSize: "clamp(5rem, 15vw, 14rem)",
          color: "rgba(255,255,255,0.018)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          letterSpacing: "-0.02em",
        }}>
        ABOUT
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-start">

        {/* ── LEFT: Instagram Card ── */}
        <div className="flex flex-col items-center gap-4">

          {/* Section label */}
          <div className="flex items-center gap-2 self-start">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500" />
            </div>
            <span className="text-xs uppercase tracking-[0.35em] font-medium"
              style={{ color: "rgba(196,181,253,0.8)" }}>
              Gallery
            </span>
          </div>

          {/* Instagram-style post card */}
          <div style={{
            width: "100%",
            maxWidth: "380px",
            borderRadius: "16px",
            overflow: "hidden",
            background: "rgba(18,18,28,0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          }}>

            {/* Post header */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Avatar with IG story ring */}
                <div style={{
                  padding: 2,
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "#050816",
                    border: "2px solid #050816",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    overflow: "hidden",
                  }}>
                    <img
                      src={photos[current].src}
                      alt="avatar"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                    />
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.3 }}>
                    mariel.requina
                  </p>
                  <p style={{ fontSize: 11, color: "rgba(148,163,184,0.6)", margin: 0 }}>
                    {photos[current].time}
                  </p>
                </div>
              </div>
              {/* More options dots */}
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(148,163,184,0.7)", fontSize: 20, letterSpacing: 1, lineHeight: 1 }}>
                •••
              </button>
            </div>

            {/* Image area with slide indicators */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", overflow: "hidden", background: "#0a0a14" }}>
              {photos.map((p, idx) => (
                <img
                  key={idx}
                  src={p.src}
                  alt={p.label}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    opacity: idx === current ? 1 : 0,
                    transform: idx === current ? "scale(1)" : "scale(1.03)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                    pointerEvents: idx === current ? "auto" : "none",
                  }}
                />
              ))}

              {/* Slide counter pill */}
              <div style={{
                position: "absolute", top: 12, right: 12,
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
                borderRadius: 999,
                padding: "3px 10px",
                fontSize: 12, fontWeight: 600, color: "#fff",
              }}>
                {current + 1}/{photos.length}
              </div>

              {/* Left / Right tap zones */}
              <div style={{ position: "absolute", inset: 0, display: "flex" }}>
                <div style={{ flex: 1, cursor: current > 0 ? "pointer" : "default" }}
                  onClick={() => current > 0 && setCurrent(current - 1)} />
                <div style={{ flex: 1, cursor: current < photos.length - 1 ? "pointer" : "default" }}
                  onClick={() => current < photos.length - 1 && setCurrent(current + 1)} />
              </div>

              {/* Dot indicators (IG style) */}
              <div style={{
                position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)",
                display: "flex", gap: 5,
              }}>
                {photos.map((_, idx) => (
                  <div key={idx} onClick={() => setCurrent(idx)}
                    style={{
                      width: idx === current ? 16 : 6,
                      height: 6,
                      borderRadius: 999,
                      background: idx === current ? "#fff" : "rgba(255,255,255,0.4)",
                      cursor: "pointer",
                      transition: "width 0.3s, background 0.3s",
                    }} />
                ))}
              </div>
            </div>

            {/* Action bar */}
            <div style={{ padding: "10px 14px 4px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {/* Left actions */}
                <div style={{ display: "flex", gap: 14 }}>
                  {/* Like */}
                  <button
                    onClick={() => toggleLike(current)}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: liked[current] ? "#f43f5e" : "rgba(226,232,240,0.85)",
                      padding: 0,
                      transform: liked[current] ? "scale(1.2)" : "scale(1)",
                      transition: "transform 0.15s ease, color 0.15s ease",
                    }}>
                    <HeartIcon filled={liked[current]} />
                  </button>
                  {/* Comment */}
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(226,232,240,0.85)", padding: 0 }}>
                    <CommentIcon />
                  </button>
                  {/* Share */}
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(226,232,240,0.85)", padding: 0 }}>
                    <ShareIcon />
                  </button>
                </div>
                {/* Bookmark */}
                <button
                  onClick={() => toggleBookmark(current)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: bookmarked[current] ? "#fff" : "rgba(226,232,240,0.85)",
                    padding: 0,
                  }}>
                  <BookmarkIcon filled={bookmarked[current]} />
                </button>
              </div>

              {/* Like count */}
              <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: "8px 0 4px" }}>
                {likeCounts[current].toLocaleString()} likes
              </p>

              {/* Caption */}
              <p style={{ fontSize: 13, color: "rgba(226,232,240,0.8)", margin: "0 0 6px", lineHeight: 1.5 }}>
                <span style={{ fontWeight: 700, color: "#fff", marginRight: 6 }}>mariel.requina</span>
                {photos[current].label} ✨
                <span style={{ color: "#a78bfa", marginLeft: 6 }}>
                  #{photos[current].tag.toLowerCase()}
                </span>
              </p>

              {/* View comments */}
              <p style={{ fontSize: 12, color: "rgba(100,116,139,0.6)", margin: "0 0 10px", cursor: "pointer" }}>
                View all 12 comments
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Text (unchanged) ── */}
        <div style={{ color: "#fff" }}>

          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500" />
            </div>
            <span className="text-xs uppercase tracking-[0.35em] font-medium"
              style={{ color: "rgba(196,181,253,0.8)" }}>
              Who I Am
            </span>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h2 className="font-black uppercase leading-none"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                background: "linear-gradient(135deg, #fff 30%, rgba(196,181,253,0.7) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.03em",
                marginBottom: 6,
              }}>
              Full-Stack
            </h2>
            <h2 className="font-black leading-none"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #c4b5fd 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.03em",
                fontStyle: "italic",
                marginBottom: 6,
              }}>
              Developer
            </h2>
            <p className="font-light tracking-widest uppercase text-sm"
              style={{ color: "rgba(148,163,184,0.6)", letterSpacing: "0.35em" }}>
              Inspired by Purpose
            </p>
          </div>

          <div className="h-px w-full mb-6"
            style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)" }} />

          <div style={{
            display: "flex", flexDirection: "column", gap: 14,
            color: "rgba(148,163,184,0.75)", lineHeight: 1.8, fontSize: 15, marginBottom: 32,
          }}>
            <p>
              I'm <strong style={{ color: "#fff" }}>Mariel</strong>, an IT graduate from Holy Cross of Davao College, Philippines — with a genuine love for building web systems and mobile apps that are{" "}
              <span style={{ color: "#c4b5fd" }}>both beautiful and functional.</span>
            </p>
            <p>
              My work spans full-stack development — from crafting pixel-perfect, responsive front-ends to building{" "}
              <span style={{ color: "#818cf8" }}>robust back-end systems</span>{" "}
              in React, Laravel, and more. I thrive on turning complex requirements into clean, maintainable code.
            </p>
          </div>

          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
            {[
              { label: "Projects", value: "13+", sub: "Completed" },
              { label: "Experience", value: "2+", sub: "Years" },
              { label: "Stack", value: "R+L", sub: "React · Laravel" },
            ].map((stat) => (
              <div key={stat.label}
                className="relative overflow-hidden rounded-2xl px-4 py-4 cursor-default transition-all duration-300"
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
                }}>
                <div className="absolute top-2 right-2 w-1 h-1 rounded-full"
                  style={{ background: "rgba(139,92,246,0.6)" }} />
                <p className="text-xs uppercase tracking-widest mb-1"
                  style={{ color: "rgba(100,116,139,0.8)" }}>
                  {stat.label}
                </p>
                <h3 className="text-2xl font-black"
                  style={{
                    background: "linear-gradient(135deg, #fff, rgba(196,181,253,0.8))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                  {stat.value}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: "rgba(139,92,246,0.7)" }}>
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Tech pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["React", "Laravel", "Vite", "MySQL", "Tailwind", "PHP", "YOLOv8"].map((tech) => (
              <span key={tech}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "rgba(15,15,30,0.85)",
                  border: "1px solid rgba(139,92,246,0.3)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "999px",
                  padding: "5px 16px",
                  fontSize: 12, fontWeight: 600, color: "#c4b5fd",
                  letterSpacing: "0.06em",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  cursor: "default", transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(109,40,217,0.35)";
                  e.target.style.borderColor = "rgba(139,92,246,0.6)";
                  e.target.style.boxShadow = "0 0 16px rgba(139,92,246,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(15,15,30,0.85)";
                  e.target.style.borderColor = "rgba(139,92,246,0.3)";
                  e.target.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
                }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
