
"use client";

import { motion } from "framer-motion";

const items = [
	{
		period: "Feb 2024 — Present",
		role: "Full-Stack Developer & Technical Operations Lead",
		company: "CalibrationWands.com (Fastec Services LLC)",
		desc: "Build and operate the technical stack for a B2B manufacturer of NIST-traceable test standards serving food, pharmaceutical, and textile quality-control customers. Built Test Standards Hub (React/Vite, Express, Prisma/PostgreSQL), which turns WooCommerce orders into certificates, engraving SVGs, and CNC-ready STL files: 3,800+ certificates auto-generated, ~450 hours of manual document work eliminated. Integrated QuickBooks Desktop and Zoho Inventory with verified, reversible writes; put an LLM intake pipeline with human approval in front of emailed purchase orders; migrated the live store to dedicated DigitalOcean hosting with zero downtime; and run GitLab CI/CD with health-checked deploys, error tracking, and alerting.",
		tags: ["React", "Node/Express", "PostgreSQL", "WooCommerce", "QuickBooks", "GitLab CI", "Docker", "LLMs"],
	},
	{
		period: "Feb 2022 — Dec 2022",
		role: "Software Development Program",
		company: "North Carolina State University",
		desc: "Intensive full-stack program covering the modern web stack end-to-end — HTML/CSS/SCSS, JavaScript/TypeScript, Node, Express, Python, Flask, Django, and C#/.NET, with React, Angular, Svelte, Redux, Tailwind, and Bootstrap on the frontend. Built and deployed projects against MongoDB, PostgreSQL, and SQL using Git, Heroku, and AWS.",
		tags: ["TypeScript", "React", "Node", "Python", "PostgreSQL", "AWS"],
	},
	{
		period: "2016 — 2024",
		role: "General Manager",
		company: "Arnold's of Powdersville",
		desc: "Eight years running a high-volume business before moving into engineering — managing teams, budgets, and inventory under pressure. It is why I build with the operator's problem in mind.",
		tags: ["Operations", "Team Leadership", "Problem Solving"],
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
