
"use client";

import { motion } from "framer-motion";

const items = [
	{
		period: "Feb 2024 — Present",
		role: "Technical Operations Lead, CalibrationWands.com",
		company: "Fastec Services LLC",
		desc: "Sole technical operator for CalibrationWands.com — all development, infrastructure, and integrations for a B2B WooCommerce store serving food, pharmaceutical, and textile manufacturers. Migrated the production store to Cloudways/DigitalOcean with zero data loss; built Test Standards Hub, an internal platform unifying WooCommerce + QuickBooks order tracking that generates calibration certificates and SVG engraving files driven straight to our CNC machine. Deployed an ERPNext instance via a Python migration pipeline (4,720 products, 2,852 customers) and an LLM agent that auto-maps customer purchase orders to catalog SKUs. Recovered 1,534 corrupted WooCommerce order numbers via forensic SQL and shipped custom SKU-configurator JavaScript across 10 product lines.",
		tags: ["WooCommerce", "React", "Node", "ERPNext", "LLMs", "Ollama", "Stripe", "Docker"],
	},
	{
		period: "Feb 2022 — Dec 2022",
		role: "Full Stack Web Development",
		company: "North Carolina State University",
		desc: "Intensive full-stack program covering the modern web stack end-to-end — HTML/CSS/SCSS, JavaScript/TypeScript, Node, Express, Python, Flask, Django, and C#/.NET, with React, Angular, Svelte, Redux, Tailwind, and Bootstrap on the frontend. Built and deployed projects against MongoDB, PostgreSQL, and SQL using Git, Heroku, and AWS.",
		tags: ["TypeScript", "React", "Node", "Python", "PostgreSQL", "AWS"],
	},
	{
		period: "Prior to 2022",
		role: "Operations & Management",
		company: "Hospitality & Retail",
		desc: "Years of operations leadership before pivoting to engineering — managing teams, budgets, and inventory under pressure. The foundation for thriving in fast-paced, high-stakes environments.",
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
