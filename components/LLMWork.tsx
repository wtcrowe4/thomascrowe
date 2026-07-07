"use client";

import { motion } from "framer-motion";

const showcases = [
  {
    title: "Production agent work",
    desc: "LLM systems doing real work in a live business — not demos. An agent pipeline parses inbound customer purchase orders and maps them to catalog SKUs, with semantic retrieval behind it and observability on every run.",
    stack: [
      ["Agents", "LangGraph orchestration, qwen3 via Ollama"],
      ["Retrieval", "pgvector semantic RAG"],
      ["Serving", "vLLM + Ollama"],
      ["Observability", "Langfuse tracing & evals"],
      ["Fine-tuning", "Unsloth / PyTorch"],
      ["Quantization", "AWQ / GPTQ"],
    ],
  },
  {
    title: "Self-hosted agent rig",
    desc: "A local GPU workstation running multi-agent orchestration end to end: Slack-integrated assistants (Socket Mode, DM-only, allowlisted) and scheduled automations — with all models and data staying on self-hosted hardware.",
    stack: [
      ["Compute", "Local GPU workstation"],
      ["Orchestration", "Multi-agent workflows"],
      ["Interface", "Slack Socket Mode, DM-only, allowlisted"],
      ["Automation", "Scheduled agent runs"],
    ],
  },
];

export function LLMWork() {
  return (
    <section id="llm" className="py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-xs tracking-widest text-accent mb-6">
            ◉ LLM / AGENT ENGINEERING
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-balance max-w-3xl">
            Agents that earn their keep.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Local-first LLM engineering: fine-tuned and quantized open models,
            agent pipelines in production, and the observability to trust them.
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {showcases.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="bg-bg hover:bg-surface transition-colors p-8 flex flex-col gap-5"
            >
              <h3 className="text-xl font-medium tracking-tight">{s.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              <dl className="mt-auto flex flex-col gap-2 pt-2 border-t border-border">
                {s.stack.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[110px_1fr] gap-3 text-[13px]"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-accent pt-0.5">
                      {label}
                    </dt>
                    <dd className="text-muted">{value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          ))}
        </div>

        <a
          href="https://github.com/wtcrowe4/work-casebook"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 mt-8 text-accent hover:opacity-80 transition-opacity"
        >
          Sanitized write-ups in the work casebook <span>→</span>
        </a>
      </div>
    </section>
  );
}
