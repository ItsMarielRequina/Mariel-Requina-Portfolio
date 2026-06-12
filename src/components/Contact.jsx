import { useEffect, useRef, useState } from "react";

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "youremail@gmail.com",
    href: "mailto:youremail@gmail.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Location",
    value: "Cotabato City, Philippines",
    href: null,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/yourprofile",
    href: "https://linkedin.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    label: "GitHub",
    value: "github.com/yourusername",
    href: "https://github.com",
  },
];

function ContactInfoCard({ item, i }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const delay = (i * 0.1) + "s";

  const wrapperStyle = {
    background: "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
    boxShadow: hovered
      ? "4px 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 30px rgba(124,58,237,0.1)"
      : "4px 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
    borderColor: hovered ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.08)",
    transitionProperty: "opacity, transform, box-shadow, border-color",
    transitionDuration: "0.5s, 0.5s, 0.3s, 0.3s",
    transitionTimingFunction: "ease",
    transitionDelay: delay + ", " + delay + ", 0s, 0s",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(-30px)",
  };

  const iconBoxStyle = {
    background: hovered
      ? "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(124,58,237,0.15))"
      : "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(124,58,237,0.05))",
    border: "1px solid rgba(124,58,237,0.25)",
    transition: "background 0.3s",
  };

  const content = (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-4 p-4 rounded-2xl border backdrop-blur-xl"
      style={wrapperStyle}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-violet-400"
        style={iconBoxStyle}
      >
        {item.icon}
      </div>
      <div>
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-0.5">{item.label}</p>
        <p className="text-white text-sm font-semibold">{item.value}</p>
      </div>
      {item.href && (
        <div className="ml-auto">
          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      )}
    </div>
  );

  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
        {content}
      </a>
    );
  }
  return content;
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const headerRef = useRef(null);
  const formRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const observers = [
      { ref: headerRef, setter: setHeaderVisible },
      { ref: formRef, setter: setFormVisible },
    ];
    observers.forEach(({ ref, setter }) => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setter(true); },
        { threshold: 0.15 }
      );
      if (ref.current) observer.observe(ref.current);
    });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  const headerStyle = {
    transition: "opacity 0.7s ease, transform 0.7s ease",
    opacity: headerVisible ? 1 : 0,
    transform: headerVisible ? "translateY(0)" : "translateY(30px)",
  };

  const formCardStyle = {
    background: "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
    boxShadow: "4px 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
    opacity: formVisible ? 1 : 0,
    transform: formVisible ? "translateX(0)" : "translateX(40px)",
  };

  const getInputStyle = (name) => ({
    width: "100%",
    background: focused === name
      ? "rgba(124,58,237,0.08)"
      : "rgba(255,255,255,0.03)",
    border: "1px solid " + (focused === name ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)"),
    borderRadius: "14px",
    padding: "12px 16px",
    color: "white",
    fontSize: "14px",
    outline: "none",
    transition: "background 0.2s, border-color 0.2s",
    boxShadow: focused === name ? "0 0 0 3px rgba(124,58,237,0.1)" : "none",
  });

  const submitBtnStyle = {
    width: "100%",
    padding: "14px",
    background: sent
      ? "linear-gradient(135deg, #059669, #047857)"
      : "linear-gradient(135deg, #7c3aed, #6d28d9)",
    border: "none",
    borderRadius: "14px",
    color: "white",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "opacity 0.2s, background 0.3s",
    boxShadow: sent
      ? "0 0 30px rgba(5,150,105,0.3)"
      : "0 0 30px rgba(124,58,237,0.3)",
    letterSpacing: "0.02em",
  };

  return (
    <section id="contact" className="relative py-28 bg-slate-950 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-violet-700/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-20" style={headerStyle}>
          <p className="uppercase tracking-[0.3em] text-violet-400 text-sm mb-3">
            Let's Talk
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-md mx-auto text-slate-400">
            Whether it's a project, collaboration, or just a hello — my inbox is always open.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left — contact info */}
          <div className="flex flex-col gap-4">

            {/* Available banner */}
            <div
              className="relative overflow-hidden rounded-2xl p-5 mb-2"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(99,102,241,0.1))",
                border: "1px solid rgba(124,58,237,0.25)",
                boxShadow: "0 0 40px rgba(124,58,237,0.1)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                opacity: headerVisible ? 1 : 0,
                transform: headerVisible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[60px]" />
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-lg mb-1">Open to Opportunities</p>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                    Available for freelance work and full-time web development roles.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1 flex-shrink-0 ml-4">
                  <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs font-semibold">Active</span>
                </div>
              </div>
            </div>

            {/* Contact detail cards */}
            <div className="flex flex-col gap-3">
              {contactInfo.map((item, i) => (
                <ContactInfoCard key={item.label} item={item} i={i} />
              ))}
            </div>

          </div>

          {/* Right — form */}
          <div ref={formRef} className="rounded-3xl backdrop-blur-xl p-8" style={formCardStyle}>

            <h3 className="text-white font-bold text-xl mb-6">Send a Message</h3>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      placeholder="Juan dela Cruz"
                      required
                      style={getInputStyle("name")}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="juan@email.com"
                      required
                      style={getInputStyle("email")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    rows={6}
                    placeholder="Hi Mariel, I'd love to work with you on..."
                    required
                    style={{ ...getInputStyle("message"), resize: "none" }}
                  />
                </div>

                <button type="submit" style={submitBtnStyle}>
                  {sent ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>

              </div>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
}
