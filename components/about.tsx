export default function About() {
  return (
    <section id="about" className="py-32 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-xs tracking-widest text-accent mb-6">
          ◉ ABOUT
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-balance max-w-3xl">
          I work where precision meets pattern — calibration, code, and the
          occasional tee shot.
        </h2>
        <div className="mt-12 grid md:grid-cols-2 gap-12 text-lg text-muted">
          <p>
            By trade I calibrate instruments that measure in fractions of a
            micron. The same obsession shows up in the side projects I ship —
            scraping, shaping, and visualizing data until it tells a cleaner
            story than the spreadsheet it came from.
          </p>
          <p>
            Lately I&apos;ve been pushing on the edge of browser 3D: real-time
            Three.js, Gaussian splats, and PGA Tour shot-level data overlays.
            The section below is a working prototype of a signature piece I&apos;m
            building — v1 today, splat-based v2 down the road.
          </p>
        </div>
      </div>
    </section>
  );
}
