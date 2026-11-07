const socials = [
  {
    label: "Email",
    href: "mailto:wtcrowe4@outlook.com",
    handle: "wtcrowe4@outlook.com",
    primary: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/wtcrowe4",
    handle: "@wtcrowe4",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/wthomascrowe",
    handle: "/in/wthomascrowe",
  },
  {
    label: "Work Casebook",
    href: "https://github.com/wtcrowe4/work-casebook",
    handle: "wtcrowe4/work-casebook",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 border-t border-border">
      <div className="site-container">
        <div className="eyebrow">Contact</div>
        <h2 className="section-title max-w-3xl">
          Want to <span className="serif-accent">talk shop?</span>
        </h2>

        <p className="mt-5 max-w-2xl text-lg text-muted2">
          Email is the best way to reach me. Happy to talk through any of
          the work above: integrations, platform, or agents.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {socials.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={`group bg-bg hover:bg-surface transition-colors p-8 flex items-center justify-between gap-4 ${
                ("primary" in s && s.primary) || i === socials.length - 1 ? "md:col-span-2" : ""
              }`}
            >
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
                  {s.label}
                </div>
                <div className="text-xl break-all">{s.handle}</div>
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
