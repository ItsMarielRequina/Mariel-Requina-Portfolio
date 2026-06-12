import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    role: "Web Developer (Contract)",
    company: "DSWD – Department of Social Welfare and Development",
    location: "Philippines",
    period: "2024 – Present",
    type: "Contract",
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
  },
  {
    role: "Freelance Web Developer",
    company: "Sisters Chick'n Love (Food Business)",
    location: "Davao City, Philippines",
    period: "2024",
    type: "Freelance",
    description:
      "Developed a full-stack POS and Inventory Management System for a food business.",
    bullets: [
      "Built role-based admin and staff flows with React + Vite",
      "Implemented sales recording and daily inventory tracking",
      "Designed UI with a forest green and gold brand palette",
      "Integrated product management, reporting dashboards, and low-stock alerts",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "JavaScript"],
  },
  {
    role: "Full-Stack Developer",
    company: "Inventory Tracking System (XAMPP/InfinityFree)",
    location: "Personal Project",
    period: "2023",
    type: "Project",
    description:
      "Built a PHP/MySQL inventory system with admin and staff roles for small business use.",
    bullets: [
      "Session-based authentication with bcrypt password hashing",
      "Admin and staff role separation with different dashboard views",
      "Product tracking, stock management, and user management modules",
      "Deployed on InfinityFree for live testing",
    ],
    stack: ["PHP", "MySQL", "Bootstrap", "XAMPP"],
  },
];

const typeBadge = {
  Contract: "text-violet-300 bg-violet-500/10 border-violet-500/20",
  Freelance: "text-blue-300 bg-blue-500/10 border-blue-500/20",
  Project: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
};

const typeGlow = {
  Contract: "group-hover:from-violet-500/5",
  Freelance: "group-hover:from-blue-500/5",
  Project: "group-hover:from-indigo-500/5",
};

const cardBase = {
  background: "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
  boxShadow: "4px 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
};

function ExpCard({ exp, i }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-xl p-8 hover:border-violet-500/40 transition-all duration-300"
      style={{
        ...cardBase,
        transition: "opacity 0.6s ease " + (i * 0.15) + "s, transform 0.6s ease " + (i * 0.15) + "s, border-color 0.3s",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      {/* Hover glow */}
      <div
        className={
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br via-transparent to-blue-500/5 " +
          typeGlow[exp.type]
        }
      />

      <div className="relative z-10">

        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
            <p className="text-violet-400 font-semibold text-sm mb-1">{exp.company}</p>
            <p className="text-slate-500 text-xs flex items-center gap-1">
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {exp.location}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span className="text-xs font-semibold text-slate-400 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full">
              {exp.period}
            </span>
            <span
              className={
                "text-xs font-semibold px-3 py-1 rounded-full border " +
                typeBadge[exp.type]
              }
            >
              {exp.type}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-5" />

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          {exp.description}
        </p>

        {/* Bullets */}
        <ul className="space-y-2 mb-6">
          {exp.bullets.map((b, j) => (
            <li key={j} className="flex items-start gap-3 text-sm text-slate-400">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0"
                style={{ boxShadow: "0 0 6px rgba(139,92,246,0.6)" }}
              />
              {b}
            </li>
          ))}
        </ul>

        {/* Stack */}
        <div className="flex flex-wrap gap-2">
          {exp.stack.map((s) => (
            <span
              key={s}
              className="text-xs font-medium px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white transition-all duration-300"
            >
              {s}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}

export default function Experience() {
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="relative py-28 bg-slate-950 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-[450px] h-[450px] bg-violet-700/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-600/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-20"
          style={{
            transition: "opacity 0.7s ease, transform 0.7s ease",
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <p className="uppercase tracking-[0.3em] text-violet-400 text-sm mb-3">
            My Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Work Experience
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-slate-400">
            Real-world projects and roles that shaped my skills as a full-stack developer.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <ExpCard key={i} exp={exp} i={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
