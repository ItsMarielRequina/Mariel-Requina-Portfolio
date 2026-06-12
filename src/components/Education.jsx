import { useEffect, useRef, useState } from "react";

const education = [
  {
    degree: "Bachelor of Science in Information Technology",
    school: "Your University Name",
    location: "Cotabato City, Philippines",
    year: "2020 – 2024",
    level: "Tertiary",
    icon: "🎓",
    description:
      "Focused on web development, database management, and software engineering. Completed capstone project on procurement management systems.",
    highlights: ["Dean's Lister", "Web Development Track", "Capstone: IT System Development"],
  },
  {
    degree: "Senior High School – ICT Strand",
    school: "Your Senior High School",
    location: "Cotabato City, Philippines",
    year: "2018 – 2020",
    level: "Senior High",
    icon: "📘",
    description:
      "Technical-Vocational-Livelihood strand with focus on ICT and programming fundamentals.",
    highlights: ["ICT Strand", "Computer Programming"],
  },
  {
    degree: "Junior High School",
    school: "Your Junior High School",
    location: "Cotabato City, Philippines",
    year: "2014 – 2018",
    level: "Junior High",
    icon: "📗",
    description:
      "Completed junior high school with strong foundation in mathematics and science.",
    highlights: ["Honor Student", "Science Club"],
  },
  {
    degree: "Elementary",
    school: "Your Elementary School",
    location: "Cotabato City, Philippines",
    year: "2008 – 2014",
    level: "Elementary",
    icon: "📙",
    description:
      "Built core academic foundations and developed early interest in computers and technology.",
    highlights: ["Top of Class", "Math Enthusiast"],
  },
];

const dotStyle = {
  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
  boxShadow: "0 0 0 4px rgba(124,58,237,0.15), 0 0 20px rgba(124,58,237,0.3)",
};

const lineStyle = {
  background: "linear-gradient(to bottom, transparent, #7c3aed 15%, #7c3aed 85%, transparent)",
};

function EduCard({ edu, i }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isEven = i % 2 === 0;

  const cardStyle = {
    background: "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
    boxShadow: "4px 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
    transition: "opacity 0.7s ease " + (i * 0.15) + "s, transform 0.7s ease " + (i * 0.15) + "s",
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translateX(0)"
      : isEven
      ? "translateX(60px)"
      : "translateX(-60px)",
  };

  return (
    <div
      ref={ref}
      className={
        "relative flex flex-col md:flex-row gap-8 " +
        (isEven ? "md:flex-row-reverse" : "")
      }
    >
      {/* Dot */}
      <div
        className="absolute left-4 md:left-1/2 top-8 w-4 h-4 rounded-full md:-translate-x-1/2 -translate-x-2 z-10"
        style={dotStyle}
      />

      {/* Card */}
      <div className={"pl-12 md:pl-0 md:w-1/2 " + (isEven ? "md:pr-14" : "md:pl-14")}>
        <div
          className="group relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-xl p-7 hover:border-violet-500/40"
          style={cardStyle}
        >
          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5" />

          <div className="relative z-10">

            {/* Top row: icon + level badge + year */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{edu.icon}</span>
                <span className="text-xs font-semibold text-violet-300 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">
                  {edu.level}
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-400 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full">
                {edu.year}
              </span>
            </div>

            {/* Degree */}
            <h3 className="text-lg font-bold text-white leading-snug mb-1">
              {edu.degree}
            </h3>

            {/* School */}
            <p className="text-violet-400 font-semibold text-sm mb-1">
              {edu.school}
            </p>

            {/* Location */}
            <p className="text-slate-500 text-xs mb-4 flex items-center gap-1">
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {edu.location}
            </p>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              {edu.description}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2">
              {edu.highlights.map((h) => (
                <span
                  key={h}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white transition-all duration-300"
                >
                  {h}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}

export default function Education() {
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
    <section id="education" className="relative py-28 bg-slate-950 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[450px] h-[450px] bg-violet-700/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-blue-600/10 blur-[140px]" />
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
            Academic Background
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Education
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-slate-400">
            My academic journey from elementary through university — the foundation that shaped my technical mindset.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={lineStyle}
          />

          <div className="space-y-14">
            {education.map((edu, i) => (
              <EduCard key={i} edu={edu} i={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
