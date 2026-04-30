const socials = [
  { label: "Email", href: "mailto:thomas@fastecservices.com", handle: "thomas@fastecservices.com" },
  { label: "GitHub", href: "https://github.com/", handle: "@thomascrowe" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", handle: "/in/thomascrowe" },
  { label: "YouTube", href: "https://www.youtube.com/", handle: "Unity Golf build" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-xs tracking-widest text-accent mb-6">
          ◉ CONTACT
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-balance max-w-3xl">
          Got a data problem, a golf idea, or just want to talk splats?
        </h2>

        <div className="mt-16 grid md:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group bg-bg hover:bg-surface transition-colors p-8 flex items-center justify-between gap-4"
            >
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
                  {s.label}
                </div>
                <div className="text-xl">{s.handle}</div>
              </div>
              <span className="text-muted group-hover:text-accent transition-colors text-2xl">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
