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
    skills: ["REST APIs", "MVC Architecture", "Database Design", "Responsive Design", "Role-Based Access Control"],
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

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-violet-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-violet-500 font-semibold text-sm tracking-widest uppercase mb-3">What I Work With</p>
          <h2 className="font-display text-4xl font-bold text-violet-900">
            Languages & Tools
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillGroups.map(group => (
            <div key={group.category} className="bg-white rounded-3xl p-8 shadow-sm border border-violet-100">
              <h3 className="font-semibold text-violet-700 text-lg mb-5 flex items-center gap-2">
                <span>{group.icon}</span> {group.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map(skill => (
                  <div key={skill} className="flex items-center gap-2 bg-violet-50 hover:bg-violet-100 border border-violet-200 rounded-full px-4 py-2 text-sm font-medium text-violet-800 transition-colors">
                    {devIcons[skill] && (
                      <img src={devIcons[skill]} alt={skill} className="w-4 h-4" onError={e => { e.target.style.display = 'none' }} />
                    )}
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
