const skillGroups = [
  {
    category: "Languages",
    icon: "💻",
    skills: ["PHP", "JavaScript", "HTML5", "CSS3", "SQL", "Python"],
  },
  {
    category: "Frameworks & Libraries",
    icon: "🧩",
    skills: ["Laravel", "React", "Vite", "Tailwind CSS", "Bootstrap", "jQuery"],
  },
  {
    category: "Tools & Platforms",
    icon: "🛠️",
    skills: ["Git", "GitHub", "VS Code", "XAMPP", "MySQL", "Composer", "npm", "Figma"],
  },
  {
    category: "Concepts",
    icon: "📐",
    skills: [
      "REST APIs",
      "MVC Architecture",
      "Database Design",
      "Responsive Design",
      "Role-Based Access Control",
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

const cardStyle = {
  background: "linear-gradient(145deg, #1e293b, #0f172a)",
  boxShadow: "4px 4px 10px rgba(0,0,0,0.6), -2px -2px 6px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
};

const imgStyle = {
  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
};

function MarqueeRow({ icons, direction }) {
  const doubled = [...icons, ...icons];
  const animName = direction === "right" ? "scrollRight" : "scrollLeft";
  const duration = direction === "right" ? "30s" : "36s";

  return (
    <div
      className="overflow-hidden mb-5"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <div
        className="flex gap-5 w-max"
        style={{ animation: animName + " " + duration + " linear infinite" }}
      >
        {doubled.map((icon, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-2 w-[88px] h-[88px] rounded-[20px] flex-shrink-0 border border-white/[0.07] transition-all duration-200 hover:-translate-y-1.5 hover:scale-105 hover:border-violet-500/30"
            style={cardStyle}
          >
            <img
              src={icon.url}
              alt={icon.name}
              className="w-9 h-9 object-contain"
              style={imgStyle}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
              {icon.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 bg-slate-950 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-[450px] h-[450px] bg-violet-700/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-blue-600/10 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-violet-400 text-sm mb-3">
            Technical Expertise
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Skills & Technologies
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-400">
            Technologies, frameworks, tools, and concepts I use to build
            responsive and scalable web applications.
          </p>
        </div>

        {/* Marquee */}
        <div className="mb-20">
          <MarqueeRow icons={row1} direction="right" />
          <MarqueeRow icons={row2} direction="left" />
        </div>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 hover:border-violet-500/40 hover:bg-white/[0.05] transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5" />

              <div className="relative z-10">
                <h3 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
                  <span className="text-2xl">{group.icon}</span>
                  {group.category}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white transition-all duration-300"
                    >
                      {devIcons[skill] && (
                        <img
                          src={devIcons[skill]}
                          alt={skill}
                          className="w-4 h-4"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      )}
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 text-center">
            <h3 className="text-3xl font-bold text-white">15+</h3>
            <p className="text-slate-400 text-sm mt-1">Projects Built</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 text-center">
            <h3 className="text-3xl font-bold text-white">10+</h3>
            <p className="text-slate-400 text-sm mt-1">Technologies</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 text-center">
            <h3 className="text-3xl font-bold text-white">React</h3>
            <p className="text-slate-400 text-sm mt-1">Frontend Focus</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 text-center">
            <h3 className="text-3xl font-bold text-white">Laravel</h3>
            <p className="text-slate-400 text-sm mt-1">Backend Focus</p>
          </div>
        </div>

      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes scrollRight {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scrollLeft {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>

    </section>
  );
}
