export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Photo */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Background shape */}
            <div className="absolute inset-0 bg-violet-100 rounded-3xl rotate-3 scale-105" />
            <div className="absolute inset-0 bg-violet-200/50 rounded-3xl -rotate-2 scale-102" />
            <div className="relative z-10 w-72 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden border-4 border-white shadow-xl shadow-violet-200">
              {/* Replace with your actual photo */}
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-violet-300 to-violet-500 text-white">
                <svg className="w-28 h-28 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
                <p className="text-sm opacity-70 mt-2 font-medium px-6 text-center">Replace with your photo</p>
              </div>
            </div>
            {/* Decorative badge */}
            <div className="absolute -bottom-4 -right-4 z-20 bg-violet-600 text-white rounded-2xl px-4 py-2 shadow-lg text-sm font-semibold">
              IT Graduate 🎓
            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-violet-500 font-semibold text-sm tracking-widest uppercase mb-3">Who I Am</p>
          <h2 className="font-display text-4xl font-bold text-violet-900 mb-6 leading-tight">
            A Passionate Developer<br />
            <span className="text-violet-600 italic">Rooted in Purpose</span>
          </h2>
          <div className="space-y-4 text-violet-800/75 leading-relaxed">
            <p>
              I'm <span className="font-semibold text-violet-700">Mariel</span>, an IT graduate from Davao City, Philippines,
              with a genuine love for building web systems that are both beautiful and functional.
            </p>
            <p>
              My work spans full-stack web development — from crafting pixel-perfect, responsive front-ends
              to building structured back-end systems in Laravel. I thrive on turning complex requirements
              into clean, maintainable code.
            </p>
            <p>
              When I'm not writing code, I'm exploring design systems, tinkering with new frameworks,
              or working on meaningful projects for real institutions like DSWD.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { value: "3+", label: "Projects Completed" },
              { value: "2+", label: "Years Experience" },
              { value: "10+", label: "Technologies" },
            ].map(stat => (
              <div key={stat.label} className="bg-violet-50 rounded-2xl p-4 border border-violet-100">
                <p className="font-display text-2xl font-bold text-violet-600">{stat.value}</p>
                <p className="text-xs text-violet-500 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
