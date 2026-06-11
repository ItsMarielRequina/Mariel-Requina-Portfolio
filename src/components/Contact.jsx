import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire up to your email service (EmailJS, Formspree, etc.)
    console.log("Form submitted:", form);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-violet-500 font-semibold text-sm tracking-widest uppercase mb-3">Let's Talk</p>
          <h2 className="font-display text-4xl font-bold text-violet-900">Get in Touch</h2>
          <p className="text-violet-700/60 mt-4 max-w-md mx-auto">
            Whether it's a project, collaboration, or just a hello — my inbox is always open.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-violet-50 rounded-3xl p-6 border border-violet-100">
              <h3 className="font-semibold text-violet-900 mb-4 text-lg">Contact Details</h3>
              {[
                { icon: "📧", label: "Email", value: "youremail@gmail.com", href: "mailto:youremail@gmail.com" },
                { icon: "📍", label: "Location", value: "Davao City, Philippines", href: null },
                { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/yourprofile", href: "https://linkedin.com" },
                { icon: "🐙", label: "GitHub", value: "github.com/yourusername", href: "https://github.com" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4 py-3 border-b border-violet-100 last:border-0">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-xs text-violet-400 font-medium">{item.label}</p>
                    {item.href
                      ? <a href={item.href} className="text-sm text-violet-700 font-medium hover:text-violet-600">{item.value}</a>
                      : <p className="text-sm text-violet-700 font-medium">{item.value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-6 text-white">
              <p className="font-display text-xl font-bold mb-2">Open to Opportunities</p>
              <p className="text-violet-100 text-sm leading-relaxed">
                I'm currently available for freelance work and full-time web development roles.
                Let's build something meaningful together.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-green-200">Available for hire</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: "name", label: "Your Name", type: "text", placeholder: "Juan dela Cruz" },
              { name: "email", label: "Email Address", type: "email", placeholder: "juan@email.com" },
            ].map(field => (
              <div key={field.name}>
                <label className="block text-sm font-semibold text-violet-700 mb-2">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-violet-200 bg-violet-50 text-violet-900 placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-violet-700 mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Hi Mariel, I'd love to work with you on..."
                required
                className="w-full px-4 py-3 rounded-2xl border border-violet-200 bg-violet-50 text-violet-900 placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-full transition-colors shadow-lg shadow-violet-200 flex items-center justify-center gap-2"
            >
              {sent ? "✓ Message Sent!" : "Send Message"}
              {!sent && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
