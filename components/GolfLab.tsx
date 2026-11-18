"use client";

import { motion } from "framer-motion";
import { SawgrassStage } from "@/components/sawgrass17/SawgrassStage";
import { LANDING_PATHS } from "@/data/sawgrass17-landings-2025";

export function GolfLab() {
	return (
		<div
			id="golf"
			className="py-35 relative overflow-hidden border-y border-border bg-bg2"
		>
			<div
				className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
				style={{
					background:
						"radial-gradient(circle at 80% 20%, color-mix(in srgb, var(--color-accent) 4%, transparent) 0%, transparent 60%)",
				}}
			/>
			<section className="relative z-2 site-container">
				<motion.div
					initial={{ opacity: 0, y: 28 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.1 }}
					transition={{ duration: 0.8 }}
					className="grid lg:grid-cols-[1fr_auto] gap-15 items-end mb-14"
				>
					<div>
						<div className="eyebrow">Side project · In progress</div>
						<h2 className="section-title mb-7">
							The 17th at <span className="serif-accent">Sawgrass</span>
						</h2>
						<p className="text-[17px] leading-[1.7] text-muted2 max-w-160 mt-5">
							Me playing around: a 3D scene of the most famous par-3 in golf, with broadcast-style shot tracers in the browser. The 3D scene is coming soon; the panels below use real shot data from THE PLAYERS 2025.
						</p>
					</div>
					<div className="flex flex-col gap-1.5 font-mono text-[11px] text-muted tracking-widest lg:text-right">
						<div>HOLE 17 · PAR 3 · 137 YDS</div>
						<div className="text-accent text-[14px]">TPC SAWGRASS</div>
						<div className="mt-3">Data: THE PLAYERS 2025</div>
						<div>Render: Three.js / R3F</div>
					</div>
				</motion.div>

				<div className="grid lg:grid-cols-[7fr_5fr] gap-4">
					<motion.div
						initial={{ opacity: 0, y: 28 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.1 }}
						transition={{ duration: 0.8 }}
						className="bg-bg border border-border aspect-16/10 lg:aspect-auto relative overflow-hidden"
					>
						<SawgrassStage />
					</motion.div>

					<div className="flex flex-col gap-4">
						<motion.div
							initial={{ opacity: 0, y: 28 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.1 }}
							transition={{ duration: 0.8, delay: 0.1 }}
							className="bg-bg border border-border aspect-square relative overflow-hidden"
						>
							<span className="absolute top-3.5 left-4 font-mono text-[10px] text-accent tracking-[0.15em] uppercase z-3">
								Landing spots · 431 tee shots
							</span>
							<span className="absolute top-3.5 right-4 font-mono text-[9px] text-muted tracking-widest bg-surface border border-border px-2 py-0.5 z-3">
								Preview
							</span>
							<svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" role="img" aria-label="Landing spots of tee shots on hole 17, colored by outcome">
								<rect width="400" height="400" fill="#0a1628" />
								<g fill="none" strokeLinecap="round" strokeWidth="4">
									{[
										["par", "#38bdf8"],
										["bogey", "var(--color-accent)"],
										["double+", "#c084fc"],
										["birdie", "#4ade80"],
										["water", "#f87171"],
									].map(([o, c]) => (
										<path key={o} d={LANDING_PATHS[o]} stroke={c} opacity="0.85" />
									))}
								</g>
								<g transform="translate(16, 372)" fontSize="8" style={{ fontFamily: "var(--font-mono)" }} fill="#8ba3bf">
									{[
										["BIRDIE", "#4ade80", 6],
										["PAR", "#38bdf8", 62],
										["BOGEY", "var(--color-accent)", 102],
										["DOUBLE+", "#c084fc", 158],
										["WATER", "#f87171", 224],
									].map(([label, c, x]) => (
										<g key={label as string}>
											<circle cx={x as number} cy="0" r="2.5" fill={c as string} />
											<text x={(x as number) + 8} y="3">{label as string}</text>
										</g>
									))}
								</g>
							</svg>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 28 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.1 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="bg-bg border border-border p-6 flex-1 flex flex-col gap-4"
						>
							<div className="font-mono text-[10px] text-accent tracking-[0.15em] uppercase pb-3 border-b border-border">
								THE PLAYERS 2025 · Hole 17
							</div>
							{[
								["Tee shots", "431", ""],
								["Birdie", "16.0%", "text-[#4ade80]"],
								["Par", "65.2%", ""],
								["Bogey", "12.3%", ""],
								["Double bogey or worse", "6.5%", ""],
								["Water balls (at any score)", "6.0%", "text-[#f87171]"],
							].map(([label, val, klass]) => (
								<div key={label} className="flex justify-between items-center py-1.5">
									<span className="text-[12px] text-muted2">{label}</span>
									<span className={`font-mono text-[13px] font-medium ${klass || "text-text"}`}>{val}</span>
								</div>
							))}
						</motion.div>
					</div>
				</div>

				<p className="mt-6 font-mono text-[10px] leading-relaxed text-muted2">
					Shot data: pgatour.com, THE PLAYERS Championship 2025. Water balls are mapped from landing coordinates. Personal, non-commercial project; not affiliated with the PGA TOUR.
				</p>
			</section>
		</div>
	);
}
