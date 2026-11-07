import type { FlowStage } from "@/data/casebook";

// Plain HTML pipeline diagram: stages run left to right on wide screens and top to
// bottom on narrow ones. No diagram library, so it renders without JS.
export function Flow({ stages }: { stages: FlowStage[] }) {
  return (
    <ol className="flex flex-col lg:flex-row lg:items-stretch gap-3" aria-label="System flow">
      {stages.map((boxes, i) => (
        <li key={i} className="flex flex-col lg:flex-row lg:flex-1 lg:min-w-0 gap-3">
          <div className="flex flex-1 min-w-0 flex-col justify-center gap-2">
            {boxes.map((b) => (
              <div
                key={b}
                className="border border-border bg-surface px-3 py-2.5 text-center font-mono text-[11px] leading-snug text-muted2"
              >
                {b}
              </div>
            ))}
          </div>
          {i < stages.length - 1 && (
            <span
              aria-hidden="true"
              className="self-center font-mono text-accent rotate-90 lg:rotate-0"
            >
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
