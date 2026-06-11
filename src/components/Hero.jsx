import { useEffect, useState } from "react";

const roles = ["IT Graduate", "Web Developer", "Laravel Developer", "React Developer"];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((roleIdx + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-16">
      {/* Blob background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-violet-200 opacity-30 blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-violet-300 opacity-20 blur-3xl -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text */}
        <div className="order-2 md:order-1">
          <p className="text-violet-500 font-semibold text-sm tracking-widest uppercase mb-3">Welcome to my portfolio</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-violet-900 leading-tight mb-4">
            Hi, I'm <span className="text-violet-600">Mariel</span>
          </h1>
          <div className="h-12 mb-4">
            <span className="text-2xl md:text-3xl font-semibold text-violet-700">
              {displayed}
              <span className="animate-pulse text-violet-400">|</span>
            </span>
          </div>
          <p className="text-violet-800/70 text-lg leading-relaxed mb-8 max-w-md">
            An IT graduate from Davao City, Philippines, passionate about crafting clean,
            functional web experiences — from elegant front-ends to robust Laravel back-ends.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="px-6 py-3 bg-violet-600 text-white rounded-full font-semibold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-200">
              View Projects
            </a>
            <a href="#contact" className="px-6 py-3 border-2 border-violet-400 text-violet-700 rounded-full font-semibold hover:bg-violet-100 transition-colors">
              Get in Touch
            </a>
          </div>
        </div>

        {/* Photo emphasis */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative">
            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full border-4 border-violet-300 scale-110 opacity-50" />
            <div className="absolute inset-0 rounded-full border-2 border-violet-200 scale-125 opacity-30" />
            {/* Floating dots */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-violet-400 rounded-full opacity-60" />
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-violet-200 rounded-full opacity-80" />
            <div className="absolute top-1/2 -right-8 w-5 h-5 bg-violet-500 rounded-full opacity-40" />

            {/* Photo container */}
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-violet-400 shadow-2xl shadow-violet-300/50 bg-violet-100 relative z-10">
              {/* Placeholder — replace src with your actual photo */}
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-violet-200 to-violet-400 text-white">
                <svg className="w-24 h-24 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                </svg>
                <p className="text-sm opacity-70 mt-2 font-medium px-4 text-center">Replace with your photo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-violet-400 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
