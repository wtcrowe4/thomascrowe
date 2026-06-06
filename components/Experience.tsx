
"use client";

import { motion } from "framer-motion";

const items = [
	{
		period: "2022 — Present",
		role: "Full Stack Developer & AI Engineer",
		company: "Fastec Services / Calibration Wands",
		desc: "Building and maintaining production web platforms, integrating AI workflows, and delivering full-stack solutions. Responsible for the full product lifecycle at calibrationwands.com — frontend, backend API, infrastructure, and AI-assisted internal tooling.",
		tags: ["Custom Wordpress/Woocommerce","React", "Node", "Google Cloud", "LLMs", "RAG",  ],
	},
	{
		period: "2019 — 2022",
		role: "Software Engineer",
		company: "Indepedent / Freelance",
		desc: "Full stack development across web applications. Shipped features end-to-end using React, Node.js, and cloud infrastructure. Started exploring ML integration in smaller systems. Experiments included many project in .NET MAUI for cross-platform mobile/desktop apps.",
		tags: ["React", "Node", "Postgres", "AWS", ".NET MAUI"]
	},
	{
		period: "2015 — 2019",
		role: "Junior Developer",
		company: "Early Career",
		desc: "Sharpened fundamentals — frontend interfaces, databases, deployment. Built a deep affection for clean, efficient code and the engineers who write it.",
		tags: ["JavaScript", "SQL", "SCSS", "Linux", "Python"],
	},
];

export function Experience() {
	return (
		<div className="py-[140px] relative z-[2]">
			<section id="experience" className="max-w-[1280px] mx-auto px-12">
				<motion.div
					initial={{ opacity: 0, y: 28 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.1 }}
					transition={{ duration: 0.8 }}
					className="mb-12"
				>
					<div className="eyebrow"><span className="num">05 /</span> Path</div>
					<h2 className="font-semibold tracking-[-0.02em] leading-[0.98]" style={{ fontSize: "clamp(40px, 5.2vw, 72px)" }}>
						Experience &amp; <span className="serif-accent">trajectory</span>
					</h2>
				</motion.div>
				<div className="relative">
					{items.map((it, i) => (
						<motion.div
							key={it.period}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.1 }}
							transition={{ duration: 0.6, delay: i * 0.12 }}
							className={`group grid lg:grid-cols-[220px_1fr] gap-15 py-8 border-t border-[var(--color-border)] ${
								i === items.length - 1 ? "border-b" : ""
							} hover:bg-[var(--color-surface)] hover:px-5 transition-all`}
						>
							<div className="font-mono text-[12px] text-[var(--color-muted)] tracking-[0.1em] group-hover:text-[var(--color-accent)] transition-colors">
								{it.period}
							</div>
							<div className="flex flex-col gap-2">
								<div className="text-[22px] font-semibold tracking-[-0.01em]">{it.role}</div>
								<div className="text-[13px] text-[var(--color-accent)] font-mono tracking-wide"> {it.company}</div>
								<div className="text-[14px] text-[var(--color-muted2)] leading-[1.7] max-w-[700px] mt-1.5">{it.desc}</div>
								<div className="flex gap-1.5 flex-wrap mt-3">
									{it.tags.map((t) => (
										<span key={t} className="tag">{t}</span>
									))}
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</section>
		</div>
	);
}
