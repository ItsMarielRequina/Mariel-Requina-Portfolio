import { useEffect, useRef, useState } from "react";

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  speed: Math.random() * 0.3 + 0.1,
  opacity: Math.random() * 0.4 + 0.1,
  drift: (Math.random() - 0.5) * 0.2,
}));

const TECH = ["React", "Laravel", "PHP", "MySQL", "Vite", "Tailwind"];

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState("enter");
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [barWidth, setBarWidth] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [techIndex, setTechIndex] = useState(0);
  const [glowPulse, setGlowPulse] = useState(false);
  const [particles, setParticles] = useState(PARTICLES);
  const rafRef = useRef(null);
  const fullText = "Mariel Requina";

  // Particle animation
  useEffect(() => {
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 16;
      last = now;
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          y: p.y - p.speed * dt < -2 ? 102 : p.y - p.speed * dt,
          x: p.x + p.drift * dt,
        }))
      );
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Tech label cycling
  useEffect(() => {
    const t = setInterval(() => setTechIndex((i) => (i + 1) % TECH.length), 600);
    return () => clearInterval(t);
  }, []);

  // Glow pulse
  useEffect(() => {
    const t = setInterval(() => setGlowPulse((g) => !g), 2000);
    return () => clearInterval(t);
  }, []);

  // Typewriter
  useEffect(() => {
    let charIndex = 0;
    let typingTimer;
    const start = () => {
      typingTimer = setInterval(() => {
        if (charIndex < fullText.length) {
          charIndex++;
          setTypedText(fullText.slice(0, charIndex));
        } else {
          clearInterval(typingTimer);
          setPhase("bar");
        }
      }, 75);
    };
    const t = setTimeout(start, 600);
    return () => { clearTimeout(t); clearInterval(typingTimer); };
  }, []);

  // Loading bar
  useEffect(() => {
    if (phase !== "bar") return;
    let start = null;
    const duration = 1400;
    const animate = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setBarWidth(eased * 100);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setPhase("done");
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onFinish, 800);
        }, 400);
      }
    };
    requestAnimationFrame(animate);
  }, [phase, onFinish]);

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(t);
  }, []);

  const isDone = typedText.length === fullText.length;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#020617",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        transition: "opacity 0.8s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          pointerEvents: "none",
        }}
      />

      {/* Grid fade vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 30%, #020617 80%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.x + "%",
            top: p.y + "%",
            width: p.size + "px",
            height: p.size + "px",
            borderRadius: "50%",
            background: "#a78bfa",
            opacity: p.opacity,
            pointerEvents: "none",
            zIndex: 2,
          }}
        />
      ))}

      {/* Glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "15%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(124,58,237,0.18), transparent 65%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 2,
          transition: "opacity 2s ease",
          opacity: glowPulse ? 0.6 : 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 65%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 2,
          transition: "opacity 2s ease",
          opacity: glowPulse ? 1 : 0.5,
        }}
      />

      {/* Corner brackets */}
      {[
        { top: 24, left: 24, rotate: "0deg" },
        { top: 24, right: 24, rotate: "90deg" },
        { bottom: 24, right: 24, rotate: "180deg" },
        { bottom: 24, left: 24, rotate: "270deg" },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: "32px",
            height: "32px",
            borderTop: "2px solid rgba(124,58,237,0.5)",
            borderLeft: "2px solid rgba(124,58,237,0.5)",
            transform: "rotate(" + pos.rotate + ")",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
        }}
      >
        {/* Outer ring + icon */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Spinning ring */}
          <div
            style={{
              position: "absolute",
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              border: "1px solid transparent",
              borderTopColor: "rgba(124,58,237,0.8)",
              borderRightColor: "rgba(124,58,237,0.3)",
              animation: "spin 2.5s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "126px",
              height: "126px",
              borderRadius: "50%",
              border: "1px solid transparent",
              borderBottomColor: "rgba(167,139,250,0.4)",
              borderLeftColor: "rgba(167,139,250,0.15)",
              animation: "spin 4s linear infinite reverse",
            }}
          />
          {/* Icon box */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "22px",
              background: "linear-gradient(145deg, rgba(124,58,237,0.35), rgba(99,102,241,0.15))",
              border: "1px solid rgba(124,58,237,0.45)",
              boxShadow: "0 0 50px rgba(124,58,237,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            💻
          </div>
        </div>

        {/* Name + subtitle */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "1.2em",
            }}
          >
            <span style={{ color: "white" }}>{typedText.slice(0, 6)}</span>
            <span style={{ color: "#a78bfa" }}>{typedText.slice(6)}</span>
            <span
              style={{
                display: "inline-block",
                width: "3px",
                height: "0.85em",
                background: "#a78bfa",
                marginLeft: "5px",
                borderRadius: "2px",
                verticalAlign: "middle",
                opacity: showCursor ? 1 : 0,
                boxShadow: "0 0 10px rgba(167,139,250,0.9)",
                transition: "opacity 0.1s",
              }}
            />
          </div>

          {/* Subtitle + cycling tech */}
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              opacity: isDone ? 1 : 0,
              transform: isDone ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#7c3aed",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
              }}
            >
              Full-Stack Developer
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(124,58,237,0.08)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "999px",
                padding: "4px 14px",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a78bfa", boxShadow: "0 0 6px #a78bfa", flexShrink: 0 }} />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#c4b5fd",
                  letterSpacing: "0.1em",
                  minWidth: "70px",
                  textAlign: "center",
                  transition: "opacity 0.3s",
                }}
              >
                {TECH[techIndex]}
              </span>
            </div>
          </div>
        </div>

        {/* Loading bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            opacity: phase === "bar" || phase === "done" ? 1 : 0,
            transform: phase === "bar" || phase === "done" ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          {/* Track */}
          <div
            style={{
              width: "260px",
              height: "4px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "999px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: barWidth + "%",
                background: "linear-gradient(90deg, #6d28d9, #7c3aed, #a78bfa)",
                borderRadius: "999px",
                boxShadow: "0 0 16px rgba(167,139,250,0.7)",
                transition: "width 0.04s linear",
                position: "relative",
              }}
            >
              {/* Tip glow */}
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "white",
                  boxShadow: "0 0 8px #a78bfa, 0 0 16px rgba(167,139,250,0.8)",
                }}
              />
            </div>
          </div>

          {/* Bottom row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "260px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                color: "#475569",
                letterSpacing: "0.08em",
                fontWeight: 500,
              }}
            >
              {phase === "done" ? "✓ Ready" : Math.round(barWidth) + "%"}
            </span>
            <div style={{ display: "flex", gap: "5px" }}>
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "#7c3aed",
                    display: "block",
                    animation: phase === "bar"
                      ? "dotBounce 0.9s ease-in-out " + (d * 0.15) + "s infinite"
                      : "none",
                    opacity: phase === "bar" ? 1 : 0.2,
                    transition: "opacity 0.3s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}