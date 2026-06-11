export default function Footer() {
  return (
    <footer className="bg-violet-900 text-violet-200 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-lg font-bold text-white">
          Mariel<span className="text-violet-400">.</span>
        </p>
        <p className="text-sm text-violet-400">
          Built with React, Vite & Tailwind CSS · {new Date().getFullYear()}
        </p>
        <div className="flex gap-4 text-sm">
          {["Hero", "Projects", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
