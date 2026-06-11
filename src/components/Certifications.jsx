const certifications = [
  {
    title: "Your Certification Title",
    issuer: "Issuing Organization",
    date: "2024",
    credentialId: "CERT-XXXX-XXXX",
    description: "Add a short description of what this certification covers.",
    badge: "🏆",
    link: "#",
  },
  {
    title: "Another Certification",
    issuer: "Another Organization",
    date: "2023",
    credentialId: "CERT-YYYY-YYYY",
    description: "Brief description of this certification and what skills it validates.",
    badge: "🎖️",
    link: "#",
  },
  {
    title: "Web Development Certificate",
    issuer: "Online Platform (e.g. freeCodeCamp / Udemy)",
    date: "2023",
    credentialId: "WD-ZZZZ",
    description: "Completed comprehensive training in full-stack web development.",
    badge: "📜",
    link: "#",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 bg-violet-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-violet-500 font-semibold text-sm tracking-widest uppercase mb-3">Credentials</p>
          <h2 className="font-display text-4xl font-bold text-violet-900">Certifications</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-violet-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-violet-100 rounded-2xl flex items-center justify-center text-3xl mb-4">
                {cert.badge}
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-violet-400 bg-violet-50 px-2 py-0.5 rounded-full">{cert.date}</span>
              </div>
              <h3 className="font-display font-bold text-violet-900 text-lg leading-tight mb-1">{cert.title}</h3>
              <p className="text-violet-600 font-semibold text-sm mb-2">{cert.issuer}</p>
              <p className="text-violet-700/60 text-sm leading-relaxed mb-4">{cert.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-violet-400 font-mono">{cert.credentialId}</span>
                <a href={cert.link} className="text-xs text-violet-600 font-semibold hover:text-violet-800 flex items-center gap-1 transition-colors">
                  View
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-violet-400 text-sm mt-8 italic">
          Replace the above with your actual certifications, dates, and credential IDs.
        </p>
      </div>
    </section>
  );
}
