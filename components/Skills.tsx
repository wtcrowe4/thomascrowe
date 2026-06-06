"use client";

import { motion } from "framer-motion";

const categories = [
	{
		title: "AI / ML",
		num: "/01",
		items: [
			["LLM Integration", 0.92],
			["LangChain / RAG", 0.88],
			["Python / Pandas", 0.9],
			["Prompt Engineering", 0.85],
		],
	},
	{
		title: "Frontend",
		num: "/02",
		items: [
			["React / Next.js", 0.9],
			["TypeScript", 0.85],
			["Three.js / WebGL", 0.72],
			["CSS / Design Systems", 0.82],
		],
	},
	{
		title: "Backend",
		num: "/03",
		items: [
			["Node.js / Express", 0.85],
			["Python APIs (FastAPI)", 0.88],
			["PostgreSQL", 0.82],
			["REST / GraphQL", 0.8],
		],
	},
	{
		title: "Infra / Cloud",
		num: "/04",
		items: [
			["AWS", 0.82],
			["Docker", 0.78],
			["CI/CD Pipelines", 0.78],
			["Terraform", 0.65],
		],
	},
] as const;

export function Skills() {
	return (
		<div className="py-[140px] relative z-[2]">
			<section id="skills-section" className="max-w-[1280px] mx-auto px-12">
				<div className="grid lg:grid-cols-[4fr_8fr] gap-20 items-start">
					<motion.div
						initial={{ opacity: 0, y: 28 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.1 }}
						transition={{ duration: 0.8 }}
						className="lg:sticky lg:top-[120px]"
					>
						<div className="eyebrow"><span className="num">04 /</span> Stack</div>
						<h2 className="font-semibold tracking-[-0.02em] leading-[0.98]" style={{ fontSize: "clamp(40px, 5.2vw, 72px)" }}>
							Tools of the <span className="serif-accent">trade</span>
						</h2>
						<p className="text-[14px] leading-[1.7] text-[var(--color-muted2)] max-w-[640px] mt-3">
							Across the full spectrum — intelligent backends, polished frontends, and cloud-native infrastructure.
						</p>
					</motion.div>
					<div className="grid sm:grid-cols-2 gap-px bg-[var(--color-border)] border border-[var(--color-border)]">
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
								<div className="flex flex-col gap-2.5">
									{cat.items.map(([name, pct]) => (
										<div key={name} className="flex items-center justify-between text-[13px]">
											<span className="text-[var(--color-text)]">{name}</span>
											<div className="flex-1 max-w-[80px] h-[2px] bg-[var(--color-border)] ml-4 relative overflow-hidden">
												<motion.div
													initial={{ scaleX: 0 }}
													whileInView={{ scaleX: pct }}
													viewport={{ once: true, amount: 0.5 }}
													transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
													className="h-full bg-[var(--color-accent)] origin-left"
												/>
											</div>
										</div>
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
