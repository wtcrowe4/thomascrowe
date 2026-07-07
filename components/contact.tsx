const socials = [
  {
    label: "Email",
    href: "mailto:Thomas@fastecservices.com",
    handle: "Thomas@fastecservices.com",
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
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-xs tracking-widest text-accent mb-6">
          ◉ CONTACT
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-balance max-w-3xl">
          Hiring, consulting, or curious how the tracers work?
        </h2>

        <p className="mt-5 max-w-2xl text-lg text-muted">
          I&apos;m open to full-time engineering roles and consulting work. If
          you&apos;re a small or mid-size business that wants practical
          automation — agents, integrations, less busywork — same inbox.
        </p>

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
