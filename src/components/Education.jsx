const education = [
  {
    degree: "Bachelor of Science in Information Technology",
    school: "Your University Name",
    location: "Davao City, Philippines",
    year: "2020 – 2024",
    description: "Focused on web development, database management, and software engineering. Completed capstone project on procurement management systems.",
    highlights: ["Dean's Lister", "Web Development Track", "Capstone: IT System Development"],
  },
  {
    degree: "Senior High School – ICT Strand",
    school: "Your Senior High School",
    location: "Davao City, Philippines",
    year: "2018 – 2020",
    description: "Technical-Vocational-Livelihood strand with focus on ICT and programming fundamentals.",
    highlights: ["ICT Strand", "Computer Programming"],
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-violet-500 font-semibold text-sm tracking-widest uppercase mb-3">Academic Background</p>
          <h2 className="font-display text-4xl font-bold text-violet-900">Education</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-violet-200 md:-translate-x-px" />

          <div className="space-y-12">
            {education.map((edu, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 top-6 w-4 h-4 rounded-full bg-violet-500 border-4 border-white shadow-md md:-translate-x-1/2 -translate-x-2" />

                {/* Card */}
                <div className={`pl-8 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <div className="bg-violet-50 rounded-3xl p-6 border border-violet-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-xs font-semibold text-violet-500 bg-violet-100 px-3 py-1 rounded-full">{edu.year}</span>
                      </div>
                    </div>
                    <h3 className="font-display text-lg font-bold text-violet-900 mb-1">{edu.degree}</h3>
                    <p className="text-violet-600 font-semibold text-sm mb-1">{edu.school}</p>
                    <p className="text-violet-400 text-xs mb-3">📍 {edu.location}</p>
                    <p className="text-violet-700/70 text-sm leading-relaxed mb-4">{edu.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.highlights.map(h => (
                        <span key={h} className="text-xs bg-violet-200/60 text-violet-700 px-3 py-1 rounded-full font-medium">{h}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
