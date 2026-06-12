import { useState } from "react";
import graduationImg from "../assets/graduation.jpg";
import atWorkImg from "../assets/atwork.jpg";
import setupImg from "../assets/setup.jpg";

const photos = [
  { src: graduationImg, label: "Graduation Day" },
  { src: atWorkImg, label: "At Work" },
  { src: setupImg, label: "My Setup" },
];

export default function About() {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);

  const goTo = (idx) => {
    if (idx === current || flipping) return;
    setFlipping(true);
    setTimeout(() => {
      setCurrent(idx);
      setFlipping(false);
    }, 300);
  };

  return (
    <section id="about" className="py-24 bg-[#0d0d2b] text-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Instagram-style Photo Card */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-sm bg-[#11113a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-violet-900/30">

            {/* IG Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-violet-500 p-[2px]">
                <img src={photos[current].src} alt="avatar" className="w-full h-full rounded-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-none">mariel.requina</p>
                <p className="text-xs text-slate-400 mt-0.5">{photos[current].label}</p>
              </div>
              <div className="ml-auto text-slate-400 text-xl">···</div>
            </div>

            {/* Main Image */}
            <div
              className="w-full aspect-square cursor-pointer overflow-hidden"
              style={{
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: flipping ? "scale(0.97)" : "scale(1)",
                opacity: flipping ? 0 : 1,
              }}
              onClick={() => goTo((current + 1) % photos.length)}
            >
              <img
                src={photos[current].src}
                alt={photos[current].label}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* IG Actions */}
            <div className="px-4 pt-3 pb-1">
              <div className="flex items-center gap-4 mb-2">
                {/* Heart */}
                <svg className="w-6 h-6 text-white hover:text-red-500 transition cursor-pointer" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                </svg>
                {/* Comment */}
                <svg className="w-6 h-6 text-white hover:text-violet-400 transition cursor-pointer" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {/* Share */}
                <svg className="w-6 h-6 text-white hover:text-violet-400 transition cursor-pointer" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>

                {/* Dots indicator */}
                <div className="flex gap-1.5 ml-auto items-center">
                  {photos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goTo(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        idx === current
                          ? "w-5 h-1.5 bg-violet-500"
                          : "w-1.5 h-1.5 bg-slate-600 hover:bg-violet-400"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-sm font-semibold text-white mb-0.5">mariel.requina</p>
              <p className="text-sm text-slate-300 mb-3">
                IT Graduate 🎓 · Full Stack Developer · React + Laravel
                <span className="text-violet-400"> #webdev #laravel #react</span>
              </p>

              {/* Gradient ring badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-slate-400">Tap photo to browse</span>
                <span className="ml-auto text-xs bg-violet-600/30 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-full">
                  {current + 1} / {photos.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-violet-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Who I Am
          </p>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            A Full-Stack Developer<br />
            <span className="text-violet-400 italic">Inspired by Purpose</span>
          </h2>

          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              I'm <span className="font-semibold text-white">Mariel</span>, an IT graduate from Holy Cross of Davao College, Davao City, Philippines,
              with a genuine love for building mobile applications & web systems that are both beautiful, creative and functional.
            </p>
            <p>
              My work spans full-stack web and software development — from crafting pixel, responsive front-ends
              to building structured back-end systems in my specialized programming languages. I thrive on turning complex requirements
              into clean, maintainable code.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { value: "13+", label: "Projects Completed" },
              { value: "2+", label: "Years Experience" },
            ].map(stat => (
              <div key={stat.label} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-2xl font-bold text-violet-400">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
