"use client";

import { motion } from "framer-motion";
import { TopoCanvas } from "./TopoCanvas";

export function Hero() {
	return (
		<section
			id="hero"
			className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
			style={{
				background:
					"radial-gradient(ellipse 100% 80% at 30% 110%, #0a1f3a 0%, #050f1f 60%, #03070f 100%)",
			}}
		>
			<TopoCanvas tileOpacity={0.16} cols={7} rows={5} />

			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					zIndex: 3,
					background:
						"radial-gradient(ellipse 70% 55% at 50% 50%, transparent 20%, #03070f 95%)",
				}}
			/>

			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					zIndex: 3,
					background:
						"radial-gradient(ellipse 80% 40% at 50% 100%, rgba(251,146,60,0.07), transparent 60%)",
				}}
			/>

			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
				className="relative px-6 md:px-12 pb-20 text-center flex flex-col items-center gap-7"
				style={{ color: "#e8eef8", zIndex: 10, maxWidth: 1100 }}
			>
				<div
					className="font-mono text-[12px] tracking-[0.22em] uppercase flex items-center gap-3.5"
					style={{ color: "var(--color-accent, #fb923c)" }}
				>
					<span
						className="w-1.5 h-1.5 rounded-full"
						style={{
							background: "var(--color-accent, #fb923c)",
							boxShadow: "0 0 10px var(--color-accent, #fb923c)",
						}}
					/>
					Senior Software Engineer
				</div>

				<h1
					className="font-semibold leading-[1.05] tracking-[-0.04em]"
					style={{ fontSize: "clamp(56px, 9vw, 132px)", paddingBottom: "0.12em" }}
				>
					Thomas <span className="serif-accent inline-block pr-[0.06em]">Crowe</span>
				</h1>

				<p
					className="leading-normal"
					style={{
						fontSize: "clamp(15px, 1.6vw, 19px)",
						color: "rgba(232,238,248,0.78)",
						maxWidth: 580,
						lineHeight: 1.5,
					}}
				>
					I design, build and run production software for a B2B manufacturer:
					web platforms, business-system integrations, self-hosted AI, and the
					infrastructure underneath.
				</p>

				<div className="flex gap-3.5 mt-3 flex-wrap justify-center">
					<a href="#casebook" className="btn btn-primary">
						Read the Casebook <span className="arrow">→</span>
					</a>
					<a href="/Thomas_Crowe_Resume.pdf" target="_blank" rel="noreferrer" className="btn btn-outline">
						Resume (PDF)
					</a>
				</div>
			</motion.div>

			<div
				className="site-container absolute bottom-8 inset-x-0 grid grid-cols-2 md:grid-cols-[1fr_auto_1fr] items-end font-mono text-[10px] uppercase"
				style={{ color: "rgba(232,238,248,0.5)", zIndex: 10, letterSpacing: "0.15em" }}
			>
				<div className="flex flex-col gap-1.5">
					<div>Location</div>
					<div
						className="text-[12px] normal-case font-sans font-medium"
						style={{ color: "#e8eef8", letterSpacing: "0.05em" }}
					>
						Greenville, SC
					</div>
				</div>

				<div
					className="hidden md:flex flex-col items-center gap-1 font-mono text-[10px] tracking-[0.14em]"
					style={{ color: "var(--color-accent, #fb923c)", opacity: 0.8 }}
				>
					<div>34.8526° N · 82.3940° W</div>
				</div>

				<div className="flex flex-col gap-1.5 text-right">
					<div>Focus</div>
					<div
						className="text-[12px] normal-case font-sans font-medium"
						style={{ color: "#e8eef8", letterSpacing: "0.05em" }}
					>
						Full-Stack · Platform · AI
					</div>
				</div>
			</div>
		</section>
	);
}
