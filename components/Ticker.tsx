const items = [
	"PYTHON",
	"TYPESCRIPT",
	"REACT",
	"LANGCHAIN",
	"RAG",
	"AWS",
	"POSTGRES",
	"NEXT.JS",
	"UNITY",
	"THREE.JS",
	"DOCKER",
	"LLMs",
];

export function Ticker() {
	const doubled = [...items, ...items];
	return (
		<div className="relative border-y border-[var(--color-border)] bg-[var(--color-bg2)] overflow-hidden py-6 z-[2]">
			<div className="flex gap-14 items-center w-max animate-[tickerScroll_40s_linear_infinite]">
				{doubled.map((it, i) => (
					<div
						key={i}
						className="font-mono text-[14px] text-[var(--color-muted2)] hover:text-[var(--color-text)] tracking-[0.12em] flex items-center gap-4 whitespace-nowrap"
					>
						{it} <span className="text-[var(--color-accent)] text-[10px]">✦</span>
					</div>
				))}
			</div>
			<style>{`
				@keyframes tickerScroll {
					from { transform: translateX(0); }
					to { transform: translateX(-50%); }
				}
			`}</style>
		</div>
	);
}
