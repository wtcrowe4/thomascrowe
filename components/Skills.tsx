"use client";

import { motion } from "framer-motion";

const categories = [
	{
		title: "LLM / Agents",
		num: "/01",
		items: [
			"LangGraph",
			"Ollama",
			"vLLM",
			"pgvector",
			"Langfuse",
			"Unsloth",
			"AWQ / GPTQ",
			"Claude Code",
		],
	},
	{
		title: "Frontend",
		num: "/02",
		items: ["React", "Next.js 16", "TypeScript", "Vite", "Three.js / R3F", "Tailwind v4"],
	},
	{
		title: "Backend / Data",
		num: "/03",
		items: ["Node.js", "Express", "Python", "PHP", "PostgreSQL", "MySQL", "SQL Server", "Prisma", "FastAPI"],
	},
	{
		title: "Infra",
		num: "/04",
		items: [
			"Cloudflare",
			"Oracle Cloud",
			"DigitalOcean",
			"AWS",
			"GitLab CI",
			"Linux",
			"Docker",
			"WSL",
			"Tailscale",
		],
	},
	{
		title: "Testing",
		num: "/05",
		items: ["Vitest", "Node test runner", "Supertest", "Playwright", "ESLint"],
	},
	{
		title: "Business Systems",
		num: "/06",
		items: ["WooCommerce", "QuickBooks (qbXML)", "Zoho Inventory", "Stripe", "UPS API", "Slack"],
	},
] as const;

export function Skills() {
	return (
		<div className="py-32 border-t border-border relative z-[2]">
			<section id="skills" className="site-container">
				<div className="grid lg:grid-cols-[4fr_8fr] gap-12 lg:gap-20 items-start">
					<motion.div
						initial={{ opacity: 0, y: 28 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.1 }}
						transition={{ duration: 0.8 }}
						className="lg:sticky lg:top-[120px]"
					>
						<div className="eyebrow">Stack</div>
						<h2 className="section-title">
							Tools of the <span className="serif-accent">trade</span>
						</h2>
						<p className="text-[14px] leading-[1.7] text-[var(--color-muted2)] max-w-[640px] mt-3">
							The stack I ship with: production web apps, the infrastructure
							under them, and the business systems they talk to.
						</p>
					</motion.div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
						{categories.map((cat, idx) => (
							<motion.div
								key={cat.title}
								initial={{ opacity: 0, y: 28 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.1 }}
								transition={{ duration: 0.7, delay: idx * 0.05 }}
								className="bg-[var(--color-bg)] p-7 hover:bg-[var(--color-surface)] transition-colors"
							>
								<div className="font-mono text-[11px] text-[var(--color-accent)] tracking-[0.2em] uppercase pb-4 mb-4 border-b border-[var(--color-border)] flex items-center justify-between">
									<span>{cat.title}</span>
									<span className="text-[var(--color-muted)]">{cat.num}</span>
								</div>
								<div className="flex flex-wrap gap-2">
									{cat.items.map((name) => (
										<span key={name} className="tag">
											{name}
										</span>
									))}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
