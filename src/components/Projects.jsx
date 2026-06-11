const projects = [
  {
    title: "DSWD Purchase Request Tracking System",
    description: "A full-featured procurement management system for the Department of Social Welfare and Development. Multi-stage document workflows, role-based access for 6 roles, and approval chains from End User to RD.",
    stack: ["Laravel", "PHP", "MySQL", "Blade", "Bootstrap", "OpenSpout"],
    highlights: ["6 user roles", "Multi-stage workflows", "Excel export", "Document uploads"],
    color: "from-violet-500 to-purple-600",
    emoji: "🏛️",
    link: "#",
    github: "#",
  },
  {
    title: "Sisters Chick'n Love – POS & Inventory",
    description: "A Vite + React point-of-sale and inventory management system for a food business. Features role-based admin/staff flows, sales recording, daily inventory tracking, and a brand-aligned UI.",
    stack: ["React", "Vite", "Tailwind CSS", "JavaScript"],
    highlights: ["Role-based access", "Sales recording", "Inventory tracking", "Brand UI"],
    color: "from-purple-500 to-indigo-600",
    emoji: "🍗",
    link: "#",
    github: "#",
  },
  {
    title: "Inventory Tracking System",
    description: "A PHP/MySQL inventory system with admin and staff roles, bcrypt authentication, and session management. Deployed on InfinityFree for live access.",
    stack: ["PHP", "MySQL", "Bootstrap", "XAMPP"],
    highlights: ["Admin & staff roles", "Bcrypt auth", "Live deployment", "Session management"],
    color: "from-indigo-500 to-violet-600",
    emoji: "📦",
    link: "#",
    github: "#",
  },
  {
    title: "Personal IT Portfolio Website",
    description: "A dark cyberpunk-themed portfolio website with particle canvas, typewriter effects, and Devicons icon grids. Single-page with black and purple aesthetic.",
    stack: ["HTML", "CSS", "JavaScript"],
    highlights: ["Particle canvas", "Typewriter effect", "Cyberpunk theme", "Devicons"],
    color: "from-violet-400 to-purple-500",
    emoji: "🌐",
    link: "#",
    github: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-violet-500 font-semibold text-sm tracking-widest uppercase mb-3">What I've Built</p>
          <h2 className="font-display text-4xl font-bold text-violet-900">Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div key={i} className="group bg-violet-50 rounded-3xl overflow-hidden border border-violet-100 hover:shadow-xl hover:shadow-violet-200/50 transition-all duration-300 hover:-translate-y-1">
              {/* Card header */}
              <div className={`bg-gradient-to-br ${project.color} p-8 flex items-center justify-between`}>
                <span className="text-5xl">{project.emoji}</span>
                <div className="flex gap-3">
                  <a href={project.github} className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors" title="GitHub">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  </a>
                  <a href={project.link} className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors" title="Live Demo">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-violet-900 mb-2">{project.title}</h3>
                <p className="text-violet-700/70 text-sm leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.highlights.map(h => (
                    <span key={h} className="text-xs bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full font-medium">✓ {h}</span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map(s => (
                    <span key={s} className="text-xs border border-violet-200 text-violet-500 px-3 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
