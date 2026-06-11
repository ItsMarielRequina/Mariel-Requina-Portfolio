const experiences = [
  {
    role: "Web Developer (Contract)",
    company: "DSWD – Department of Social Welfare and Development",
    location: "Philippines",
    period: "2024 – Present",
    type: "Contract",
    description: "Built and maintained a Laravel-based Purchase Request Tracking System (PTS) for the Procurement Division.",
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
    description: "Developed a full-stack POS and Inventory Management System for a food business.",
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
    description: "Built a PHP/MySQL inventory system with admin and staff roles for small business use.",
    bullets: [
      "Session-based authentication with bcrypt password hashing",
      "Admin and staff role separation with different dashboard views",
      "Product tracking, stock management, and user management modules",
      "Deployed on InfinityFree for live testing",
    ],
    stack: ["PHP", "MySQL", "Bootstrap", "XAMPP"],
  },
];

const typeColors = {
  Contract: "bg-violet-100 text-violet-700",
  Freelance: "bg-purple-100 text-purple-700",
  Project: "bg-indigo-100 text-indigo-700",
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-violet-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-violet-500 font-semibold text-sm tracking-widest uppercase mb-3">My Journey</p>
          <h2 className="font-display text-4xl font-bold text-violet-900">Work Experience</h2>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-violet-100 hover:shadow-md transition-shadow">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-violet-900">{exp.role}</h3>
                  <p className="text-violet-600 font-semibold">{exp.company}</p>
                  <p className="text-violet-400 text-sm">📍 {exp.location}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm text-violet-500 font-medium bg-violet-50 px-3 py-1 rounded-full border border-violet-200">{exp.period}</span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[exp.type]}`}>{exp.type}</span>
                </div>
              </div>

              <p className="text-violet-700/70 text-sm mb-4 leading-relaxed">{exp.description}</p>

              <ul className="space-y-2 mb-5">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-violet-700/80">
                    <span className="text-violet-400 mt-0.5 shrink-0">▸</span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.stack.map(s => (
                  <span key={s} className="text-xs bg-violet-50 border border-violet-200 text-violet-600 px-3 py-1 rounded-full font-medium">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
