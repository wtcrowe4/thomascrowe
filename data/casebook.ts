// Sanitized write-ups of production work. Public copy: architecture and outcomes
// only. No proprietary code, hostnames, IPs, pricing rules or customer names.

export type FlowStage = string[];

export type Shot = { src: string; alt: string; caption: string };

export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  problem: string;
  approach: string;
  flow: FlowStage[];
  points: string[];
  stack: string[];
  outcome: string;
  shots?: Shot[];
  liveUrl?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "test-standards-hub",
    title: "Test Standards Hub",
    kicker: "Order-to-manufacturing platform",
    summary:
      "An internal full-stack platform that turns WooCommerce orders into signed certificates, engraving artwork, CNC files and shop-floor printing.",
    problem:
      "Orders lived in two disconnected systems, WooCommerce and QuickBooks Desktop. Certificate generation and CNC engraving artwork were manual, and serialized test standards had no system of record.",
    approach:
      "Built an internal platform that becomes the single source of truth and drives production from the moment an order arrives.",
    flow: [
      ["WooCommerce orders", "QuickBooks Desktop"],
      ["Test Standards Hub"],
      ["Signed certificates", "Serialized test numbers", "SVG engraving + STL files", "Shop-floor printing", "Customer document portal"],
    ],
    points: [
      "New orders reach the platform through a webhook over a Cloudflare Tunnel, with no exposed origin.",
      "Certificates are generated from Word templates through Adobe PDF Services, AES-256 locked, and signed with pyHanko for tamper-evident verification.",
      "A measurement-capture module records per-unit micrometer readings against NIST-traceable references, bringing the workflow into conformance with ISO 10012.",
      "Serialized test numbers are tracked for every standard sold, backed by PostgreSQL.",
      "SVG engraving and STL files feed the CNC machine: a software-to-machine production pipeline.",
      "PrintNode prints to the shop floor, UPS labels and tracking are generated with the order, and finished certificates are served through an account-gated portal.",
    ],
    stack: ["React/Vite", "Express", "Prisma", "PostgreSQL", "Adobe PDF Services", "pyHanko", "Cloudflare Tunnel", "PrintNode", "SVG/STL"],
    outcome:
      "3,800+ certificates auto-generated, the core of 500+ hours of manual work eliminated per year. One source of truth across two systems, with manual certificate, printing and engraving steps replaced by an automated pipeline.",
    shots: [
      {
        src: "/work/tsh-orders-board.png",
        alt: "Orders board listing web orders and purchase orders with status chips and a next action on each row",
        caption: "Web orders and purchase orders share one board, with each row showing its status and the next step.",
      },
      {
        src: "/work/tsh-certificates.png",
        alt: "Process order page previewing three certificates with product, sphere, lot, grade, signer and date",
        caption: "Before generating, the operator previews exactly what each certificate will print.",
      },
      {
        src: "/work/tsh-pick-make.png",
        alt: "Pick and make sheet with pull and build quantities per SKU, a highlighted shortfall and one unmatched SKU",
        caption: "An order becomes a plan of what to pull and build, with shortfalls flagged and unmatched SKUs left for a person to decide.",
      },
    ],
  },
  {
    slug: "customer-certificate-portal",
    title: "Customer accounts + certificate portal",
    kicker: "Customer experience",
    summary:
      "Customers sign in and download their own certificates from My Account, pushed there automatically when an order is completed.",
    problem:
      "Certificates shipped as a hard copy with each order, with no self-serve digital copy a customer could pull up later for an audit or their records.",
    approach:
      "When the order platform sends the order-complete email, it checks whether the customer has a store account. If they do, it uploads that order's certificates to the storefront, where only the account owner can open them.",
    flow: [
      ["Order completed in Test Standards Hub"],
      ["Account check"],
      ["Authenticated upload, checksum-verified"],
      ["My Account: Certificates tab"],
      ["Customer views + downloads"],
    ],
    points: [
      "Certificates upload over an authenticated API with a SHA-256 checksum, are mapped to each order line, and are named by product so customers can find the right PDF.",
      "Owner-only access: a certificate opens only for the account that placed the order.",
      "Each certificate carries lot-level traceability back to the lot manufacturer, and a QR code that ships with the order opens a downloadable copy as a backup to the printed one.",
      "Sign-in by emailed one-time code or magic link, or with Google over OpenID Connect (PKCE, ID tokens verified against the provider's signing keys, nonce and state checks).",
      "Sign-in is hardened with bot protection, per-address and per-IP rate limits and lockouts, and a site-wide alarm that pauses code entry on a burst of wrong codes. Staff accounts can't use it.",
      "A security review and fixes before go-live, and every piece shipped behind an off / preview / on switch, tested as a staff preview on the live site before customers saw it.",
    ],
    stack: ["WooCommerce", "PHP", "OpenID Connect", "Redis", "Cloudflare Turnstile", "Node/Express", "REST"],
    outcome:
      "Every order still ships with a hard-copy certificate, and customers with an account can also open and download a digital copy any time from My Account.",
  },
  {
    slug: "accounting-and-ai-order-intake",
    title: "Accounting integration + AI order intake",
    kicker: "Business systems",
    summary:
      "QuickBooks Desktop and Zoho Inventory connected to the order platform, with an LLM intake pipeline and human approval in front of the inbox.",
    problem:
      "Orders, invoices and stock lived in separate systems. Every web order and emailed purchase order had to be re-keyed into accounting by hand, and inventory was only reconciled after the fact.",
    approach:
      "Connected the order platform to accounting and inventory, and put an LLM intake pipeline in front of the inbox, with a person approving anything before it posts.",
    flow: [
      ["Emailed POs + quote requests", "Web orders"],
      ["LLM intake: extract, match, dedupe", "Human approval"],
      ["Order platform"],
      ["QuickBooks Desktop", "Zoho Inventory", "Audit log with revert"],
    ],
    points: [
      "QuickBooks Desktop integration over Web Connector and qbXML: invoices, estimates, items, customers and inventory adjustments, with per-write verification.",
      "An audit change log can revert any automated write.",
      "Built behind a provider-agnostic accounting interface, so a future system migration swaps an adapter instead of rewriting the platform.",
      "Zoho Inventory stock is decremented and builds are planned automatically as certificates are generated.",
      "LLM intake turns emailed purchase orders and quote requests into validated orders, with customer part-number matching, duplicate-invoice detection and prompt-injection guards.",
    ],
    stack: ["Node/Express", "PostgreSQL", "QuickBooks Desktop (qbXML)", "Zoho Inventory API", "LLM pipeline"],
    outcome:
      "Orders flow from inbox or storefront into accounting and inventory without re-keying. Every automated write is verified, logged and reversible.",
    shots: [
      {
        src: "/work/tsh-intake-queue.png",
        alt: "Intake queue with a purchase order held as suspicious and the reasons listed, above a draft ready for review",
        caption: "Emailed POs land in one queue. Suspicious documents are held with the reasons shown, and a person decides what reaches QuickBooks.",
      },
    ],
  },
  {
    slug: "self-hosted-ai-agents",
    title: "Self-hosted AI agents",
    kicker: "AI engineering",
    summary:
      "Six production agents on a self-hosted LLM stack, grounded in retrieval and instrumented with tracing and evals.",
    problem:
      "Repetitive, judgment-light operations such as reading purchase orders, handling documents, routing orders and preparing machine files took hours of manual work every day and didn't scale.",
    approach:
      "Designed and deployed six self-hosted agents for these workflows, orchestrated with LangGraph and custom Python.",
    flow: [
      ["Orders, POs, documents"],
      ["LangGraph + custom Python", "pgvector RAG"],
      ["Order processing", "PO → SKU mapping", "Email triage", "Document handling", "CNC G-code"],
      ["vLLM + Ollama serving", "Langfuse tracing + evals"],
    ],
    points: [
      "Six production agents (order processing, PO parsing to SKUs, email triage, document handling and CNC G-code generation) orchestrated with LangGraph and custom Python, several exposed through Slack Socket Mode.",
      "Models served on a self-hosted stack (vLLM and Ollama) at zero per-call API cost.",
      "Responses are grounded in a pgvector retrieval pipeline, so agents reason over real source documents rather than model memory.",
      "Local models fine-tuned with Unsloth and PyTorch, tracked in Weights & Biases, and quantized with AWQ/GPTQ for throughput.",
      "All agent runs are traced and evaluated in Langfuse.",
    ],
    stack: ["LangGraph", "vLLM", "Ollama", "pgvector", "PyTorch", "Unsloth", "Langfuse", "Python", "Docker"],
    outcome:
      "Repetitive operations automated on self-hosted infrastructure, keeping sensitive business data in-house and independent of third-party APIs.",
  },
  {
    slug: "agent-ready-storefront",
    title: "Agent-ready storefront (UCP)",
    kicker: "Agentic commerce",
    summary:
      "AI shopping agents can discover the store, browse every product option at its exact price and build a checkout, while payment always stays on the store's own checkout.",
    problem:
      "AI agents are starting to shop on behalf of buyers. A configurable catalog with thousands of option combinations is hard for an agent to price correctly, and no agent should be able to bypass checkout validation, pricing, tax or fraud controls.",
    approach:
      "Implemented the Universal Commerce Protocol (UCP) so an agent goes through the same pricing and checkout code a browser does.",
    flow: [
      ["AI agent"],
      ["Discovery profile"],
      ["Catalog search", "Product options + exact price"],
      ["Checkout session"],
      ["Hand-off link to the buyer"],
      ["Store checkout: tax, shipping, 3-D Secure"],
      ["Order status + tracking"],
    ],
    points: [
      "Prices come from the store's own option-pricing engine through an isolated in-memory cart, so an agent's price can never differ from the website's.",
      "A PHP port of the storefront's SKU generator, verified byte-identical to the JavaScript version across all 7,093 configurations.",
      "No payment handlers: completing a session returns a hand-off link that rebuilds the exact cart in the buyer's browser, where the normal checkout runs. No card data ever touches the agent API.",
      "Idempotent checkout sessions bound to the agent, per-IP and per-agent rate limits, a site-wide session cap with an alarm, and order-status reads that carry no personal data.",
      "Threat-modeled design, a security review and re-review fixes before launch, and a one-command kill switch.",
    ],
    stack: ["Universal Commerce Protocol", "PHP", "WooCommerce", "REST", "Stripe", "Cloudflare"],
    outcome:
      "The catalog is open to AI shopping agents at exact prices, and every paid order still goes through the store's own checkout.",
  },
  {
    slug: "production-migration",
    title: "Zero-downtime production migration",
    kicker: "Infrastructure",
    summary:
      "A live WooCommerce store moved to dedicated hosting with no downtime or data loss, then hardened with tested backups and safe staging.",
    problem:
      "The production storefront needed a more reliable, performant home, with stronger operational practices around it.",
    approach:
      "Planned and executed a live cutover to dedicated DigitalOcean NVMe hosting, then hardened the operations around it.",
    flow: [
      ["Live WooCommerce store"],
      ["Full export + sync"],
      ["DigitalOcean NVMe host"],
      ["Cloudflare DNS, CDN, SSL", "Redis Object Cache", "SPF / DKIM / DMARC", "Git-tracked staging"],
    ],
    points: [
      "DNS and CDN cutover through Cloudflare with SSL re-issue, cutting recurring outages to near zero.",
      "Email deliverability restored with SPF, DKIM and DMARC, and Stripe webhooks verified end to end.",
      "Three-tier backup and disaster recovery with verified restores.",
      "Database tuning for production stability.",
      "A Git-deployed Bedrock staging environment for safe pre-production testing.",
    ],
    stack: ["DigitalOcean", "Cloudflare", "Linux", "Redis", "Bedrock", "MySQL"],
    outcome:
      "Faster, reliable hosting with near-zero outages, a safe staging path and verified recovery for ongoing changes.",
    liveUrl: "https://calibrationwands.com",
  },
  {
    slug: "ci-cd-and-observability",
    title: "CI/CD and observability",
    kicker: "Platform engineering",
    summary:
      "Releases that verify themselves after deploy, secrets caught before merge, and errors that reach Slack before a customer reports them.",
    problem:
      "A growing set of internal services needed safe, repeatable releases and fast visibility when something broke.",
    approach:
      "Built a delivery pipeline and observability layer around the internal platform.",
    flow: [
      ["Merge request"],
      ["GitLab CI on Docker runners"],
      ["Tests", "gitleaks secret scan", "LLM-assisted review"],
      ["Release-swap deploy"],
      ["Health + schema-drift checks"],
      ["Sentry / Bugsink → Slack alerts"],
    ],
    points: [
      "GitLab CI on Docker runners: every merge runs tests, gitleaks secret scanning and an LLM-assisted code review.",
      "Zero-restart release-swap deploys with post-deploy health checks and schema-drift detection. A failed check keeps the previous release.",
      "Sentry and Bugsink error tracking, with alerts routed to Slack.",
      "AI-augmented delivery: 2,000+ reviewed commits across three production repos in five months, directing AI coding agents through a spec → approval → review → merge workflow.",
      "Internal tools published behind Cloudflare Tunnel and Access, with no open inbound ports.",
    ],
    stack: ["GitLab CI", "Docker", "Sentry/Bugsink", "Cloudflare Tunnel + Access", "Oracle Cloud", "Linux/systemd"],
    outcome:
      "Releases that verify themselves after deploy, secrets caught before merge, and errors that surface in Slack before a customer reports them.",
  },
  {
    slug: "storefront-engineering",
    title: "Storefront engineering + data integrity",
    kicker: "E-commerce",
    summary:
      "A real-time SKU configurator across 10 product lines, 50+ custom plugins, and order data restored and protected at the code level.",
    problem:
      "The storefront needed configurable, validated product SKUs across many product lines, and order data needed to stay correct under real load.",
    approach:
      "Engineered a custom SKU-configurator system and hardened the data layer behind it.",
    flow: [
      ["Product options"],
      ["SKU configurator: JS + PHP hooks"],
      ["Cart meta"],
      ["Order meta"],
      ["PDF + email"],
    ],
    points: [
      "Dynamic SKU configurator across 10 product lines, generating valid SKUs in real time and carrying them from cart to order meta, email and PDF.",
      "50+ custom WooCommerce plugins.",
      "Custom Dompdf invoice and packing-slip templates, validated with Playwright end-to-end tests.",
      "SQL data recovery and integrity: recovered 1,534 order records with targeted SQL against the production database, diagnosed the inconsistency at the schema level, and added PHP validation guards to prevent recurrence.",
    ],
    stack: ["JavaScript", "PHP", "WooCommerce", "Dompdf", "Playwright", "SQL"],
    outcome:
      "Configurable, validated SKUs across the catalog, with order data integrity restored and protected at the code level.",
    liveUrl: "https://calibrationwands.com",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
