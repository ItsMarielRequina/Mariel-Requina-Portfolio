import { useEffect, useState } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiFacebook,
  FiMail,
} from "react-icons/fi";

const roles = [
  "IT Graduate",
  "Web Developer",
  "Laravel Developer",
  "React Developer",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80
      );
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        40
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((roleIdx + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-slate-950 text-white flex flex-col"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-700/20 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[150px]" />
      </div>

      {/* Watermark name */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-[8rem] md:text-[14rem] font-black uppercase text-white/[0.03] select-none whitespace-nowrap pointer-events-none">
        MARIEL
      </div>

      {/* Inner wrapper */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 flex flex-col flex-1">

        {/* Main content + image row */}
        <div className="flex-1 grid lg:grid-cols-2 items-center gap-12 pb-8">

          {/* Left — text content */}
          <div className="flex flex-col gap-5 z-30">
            <p className="uppercase tracking-[0.3em] text-violet-400 text-sm">
              Welcome To My Portfolio
            </p>

            <div>
              <h1 className="text-6xl md:text-7xl font-black leading-none">MARIEL</h1>
              <h2 className="text-xl md:text-2xl text-slate-300 mt-2">Mariel Requina</h2>
            </div>

            {/* Typewriter */}
            <div className="h-10 flex items-center">
              <span className="text-2xl font-semibold text-violet-400">
                {displayed}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            <p className="max-w-lg text-slate-400 leading-relaxed text-sm md:text-base">
              Passionate IT graduate specializing in modern web development,
              creating responsive interfaces and scalable applications using
              React, Laravel, JavaScript, and PHP.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition text-sm font-medium"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition text-sm font-medium"
              >
                Contact Me
              </a>
            </div>

            {/* Social icons */}
            <div className="flex gap-5 text-slate-400">
              <a href="#" className="hover:text-white transition" aria-label="GitHub"><FiGithub size={20} /></a>
              <a href="#" className="hover:text-white transition" aria-label="LinkedIn"><FiLinkedin size={20} /></a>
              <a href="#" className="hover:text-white transition" aria-label="Facebook"><FiFacebook size={20} /></a>
              <a href="#" className="hover:text-white transition" aria-label="Email"><FiMail size={20} /></a>
            </div>

            {/* Stats cards — inline, below socials */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 py-4">
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Projects</p>
                <h3 className="text-3xl font-bold">15+</h3>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 py-4">
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Specialty</p>
                <h3 className="text-xl font-bold leading-tight">Full Stack</h3>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-4 py-4">
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Stack</p>
                <h3 className="text-base font-bold leading-tight">React + Laravel</h3>
              </div>
            </div>
          </div>

          {/* Right — profile image */}
          <div className="hidden lg:flex justify-center items-end h-full">
            <img
              src={new URL('../assets/profile.png', import.meta.url).href}
              alt="Mariel"
              className="h-[100vh] object-contain mb-[-20px]"
              style={{
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
