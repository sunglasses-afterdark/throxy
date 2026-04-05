import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Zap, Workflow, Code2, Database, Users, Check, TrendingUp, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const AnimatedElement = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { clearTimeout(fallback); setTimeout(() => setIsVisible(true), delay); observer.unobserve(el); }
    }, { threshold: 0.05, rootMargin: "0px 0px 200px 0px" });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className || ""}`}>
      {children}
    </div>
  );
};

const SERVICES = [
  {
    id: "ai",
    icon: Bot,
    title: "AI Solutions",
    tagline: "LLM-powered features and agents for real business problems",
    description: "I build AI into workflows where it actually changes outcomes — not as a demo, but as production infrastructure. This includes document processing pipelines, intelligent routing and classification, chat-based tools, and MCP-connected agents that operate across your systems of record.",
    featured: true,
    examples: [
      "Project intake powered by Claude — a conversational form that qualifies and scopes inbound requests",
      "Document extraction pipelines that pull structured data from contracts, invoices, or emails",
      "AI-assisted routing that classifies support tickets or leads and assigns them automatically",
      "LLM agents connected via MCP to your CRM, database, or internal tools",
    ],
    tools: ["Claude / Anthropic API", "MCP (Model Context Protocol)", "n8n + AI nodes", "Python", "OpenAI"],
  },
  {
    id: "integrations",
    icon: Zap,
    title: "Data Integration",
    tagline: "Connect your systems so data flows automatically",
    description: "Most revenue problems are really data problems — the right information doesn't exist in the right system at the right time. I build integrations that fix this: bidirectional syncs, event-driven pipelines, and API connections that keep your stack coherent.",
    examples: [
      "HubSpot ↔ NetSuite sync that keeps deal data and invoices aligned without manual reconciliation",
      "Salesforce ↔ marketing automation that triggers campaigns based on CRM lifecycle stage",
      "Event-driven webhooks that propagate state changes across systems in real time",
      "Legacy system modernization — wrapping old databases with clean APIs",
    ],
    tools: ["HubSpot", "Salesforce", "NetSuite", "n8n", "Zapier", "REST / GraphQL APIs", "PostgreSQL"],
  },
  {
    id: "automation",
    icon: Workflow,
    title: "Automation",
    tagline: "Turn repetitive manual work into automated workflows",
    description: "If your team does the same thing every day, it should run itself. I map the process, identify what a system can handle, design the oversight points where humans stay in the loop, and build the automation that runs it.",
    examples: [
      "Lead assignment workflow — new leads routed, enriched, and assigned based on territory rules",
      "Weekly revenue reporting auto-generated from CRM data and distributed to stakeholders",
      "Contract approval flow with sequential review stages, Slack notifications, and audit trail",
      "Scheduled data hygiene jobs that deduplicate, normalize, and flag bad records",
    ],
    tools: ["n8n", "Zapier", "HubSpot Workflows", "Salesforce Flow", "Python", "Cron jobs"],
  },
  {
    id: "software",
    icon: Code2,
    title: "Custom Software",
    tagline: "Internal tools and apps built around how your team actually works",
    description: "When no off-the-shelf tool fits, I build lightweight software that does exactly what you need. Admin portals, client-facing dashboards, operations apps — designed around your actual workflow, not a generic template.",
    examples: [
      "Operations portal for a service business — client intake, job management, invoicing in one place",
      "Revenue dashboard that pulls from multiple sources into a single view for leadership",
      "Airtable-based project tracker with custom automations and external-facing client portal",
      "Retool app for ops team to manage exception queues and approval workflows",
    ],
    tools: ["React", "Airtable", "Retool", "Supabase", "PostgreSQL", "Vite", "Tailwind"],
  },
  {
    id: "data",
    icon: Database,
    title: "Data Architecture",
    tagline: "Design or fix the foundation your data sits on",
    description: "Bad data architecture is the root cause of most reporting problems, integration failures, and scaling pain. I design schemas, warehouses, and data models that are correct by construction — so you can trust the numbers and move fast without breaking things.",
    examples: [
      "Revenue data model that unifies CRM, ERP, and support data into a single source of truth",
      "Data warehouse design for a growing company moving off spreadsheets and into structured analytics",
      "Schema migration with zero downtime for a production database under active load",
      "Airtable base redesign — from ad-hoc to structured, with proper relational links and rollups",
    ],
    tools: ["PostgreSQL", "Airtable", "BigQuery", "dbt", "Looker", "Tableau", "SQL"],
  },
  {
    id: "fractional",
    icon: Users,
    title: "Fractional CTO",
    tagline: "Senior technical leadership without the full-time hire",
    description: "Some companies need a senior engineer in their corner — not to build everything, but to set direction, evaluate vendors, review architecture, and make the hard technical calls. I offer fractional CTO engagement for teams that need strategic technical leadership.",
    examples: [
      "Technology stack audit — evaluate current systems, identify gaps, and prioritize investment",
      "Build-vs-buy analysis for a specific capability the team needs to add",
      "Vendor evaluation and selection for CRM, ERP, or data warehouse",
      "Technical due diligence for an acquisition or funding round",
    ],
    tools: ["HubSpot", "Salesforce", "NetSuite", "Architecture review", "Technical strategy"],
  },
];

const CASE_STUDIES = [
  {
    id: "modus",
    tag: "Professional Services",
    tagBg: "hsl(225 78% 62% / 0.12)",
    tagColor: "hsl(225 78% 45%)",
    company: "Modus Create",
    accentFrom: "hsl(225 60% 93%)",
    accentTo: "hsl(225 60% 98%)",
    iconBg: "hsl(225 78% 55%)",
    Icon: Bot,
    previewMetric: "End-to-end GTM rebuilt",
    previewSub: "CRM + AI intake in production",
    headline: "0→1",
    headlineSuffix: "full GTM stack architected",
    description:
      "Designed and implemented comprehensive CRM architecture in HubSpot from scratch, rebuilt a brittle NetSuite integration causing outages, and aligned marketing-to-sales lifecycle for complete pipeline visibility and revenue forecasting.",
    stats: [
      { value: "0→1", label: "CRM built" },
      { value: "Rebuilt", label: "NetSuite sync" },
      { value: "100%", label: "Pipeline visibility" },
    ],
  },
  {
    id: "nfm",
    tag: "Mortgage Lending",
    tagBg: "hsl(168 68% 38% / 0.12)",
    tagColor: "hsl(168 68% 32%)",
    company: "NFM Lending",
    accentFrom: "hsl(168 55% 90%)",
    accentTo: "hsl(168 55% 97%)",
    iconBg: "hsl(168 68% 38%)",
    Icon: Zap,
    previewMetric: "30% conversion lift",
    previewSub: "lead → customer",
    headline: "30%",
    headlineSuffix: "lift in lead-to-customer conversion",
    description:
      "Rebuilt CRM pipeline architecture and connected marketing automation to the sales lifecycle — turning a fragmented HubSpot stack into a single visible revenue system with cross-functional reporting.",
    stats: [
      { value: "30%", label: "Conversion rate" },
      { value: "25%", label: "Pipeline growth" },
      { value: "15%", label: "Marketing ROI" },
    ],
  },
  {
    id: "ptl",
    tag: "SaaS / HealthTech",
    tagBg: "hsl(255 65% 55% / 0.12)",
    tagColor: "hsl(255 65% 48%)",
    company: "Particle Theory Labs",
    accentFrom: "hsl(255 55% 93%)",
    accentTo: "hsl(255 55% 98%)",
    iconBg: "hsl(255 65% 52%)",
    Icon: Workflow,
    previewMetric: "40% pipeline velocity",
    previewSub: "0 → 1 RevOps",
    headline: "40%",
    headlineSuffix: "increase in pipeline velocity",
    description:
      "Built the company's first revenue operations framework from scratch — HIPAA-compliant CRM governance, automated executive reporting, and lifecycle management across a 3-year engagement.",
    stats: [
      { value: "40%", label: "Pipeline velocity" },
      { value: "50%", label: "Engagement lift" },
      { value: "0→1", label: "RevOps built" },
    ],
  },
  {
    id: "chrysalis",
    tag: "Healthcare",
    tagBg: "hsl(12 75% 50% / 0.10)",
    tagColor: "hsl(12 75% 42%)",
    company: "Chrysalis Institute",
    accentFrom: "hsl(12 60% 92%)",
    accentTo: "hsl(12 60% 97%)",
    iconBg: "hsl(12 75% 48%)",
    Icon: Database,
    previewMetric: "35% retention lift",
    previewSub: "25% cost reduction",
    headline: "35%",
    headlineSuffix: "increase in patient retention",
    description:
      "Led a full digital transformation — cloud migration, CRM overhaul with personalised communication pathways, and lifecycle marketing programs. Reduced operational costs and meaningfully improved patient outcomes.",
    stats: [
      { value: "35%", label: "Patient retention" },
      { value: "30%", label: "Throughput gain" },
      { value: "25%", label: "Cost reduction" },
    ],
  },
];

function CaseStudyCard({ cs, delay = 0 }) {
  const { Icon } = cs;
  return (
    <AnimatedElement delay={delay}>
      <div className="bg-background rounded-2xl overflow-hidden border border-border/30 flex flex-col h-full"
        style={{ boxShadow: "9px 9px 22px rgba(175,162,143,0.38), -7px -7px 18px rgba(255,255,255,0.98)" }}>

        {/* Visual top panel */}
        <div
          className="relative flex flex-col items-center justify-center gap-5 px-6 sm:px-10 pt-8 sm:pt-12 pb-8 sm:pb-10"
          style={{ background: `linear-gradient(160deg, ${cs.accentFrom}, ${cs.accentTo})` }}
        >
          {/* Consultant + client row */}
          <div className="flex items-center gap-4 sm:gap-8">
            {/* Alexander avatar */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/80 bg-background"
                style={{ boxShadow: "4px 4px 12px rgba(175,162,143,0.35), -3px -3px 8px rgba(255,255,255,0.95)" }}>
                <img src="/avatar.png" alt="Alexander" className="w-full h-full object-cover object-top scale-110" />
              </div>
              <span className="text-xs font-semibold text-foreground/50 text-center leading-snug">Alexander<br/>Blackwood</span>
            </div>

            {/* Center icon */}
            <div
              className="w-11 h-11 sm:w-16 sm:h-16 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: cs.iconBg, boxShadow: "4px 4px 12px rgba(0,0,0,0.25), -3px -3px 8px rgba(255,255,255,0.40)" }}
            >
              <Icon className="w-7 h-7 text-white" />
            </div>

            {/* Company badge */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-white/80 flex items-center justify-center bg-white"
                style={{ boxShadow: "4px 4px 12px rgba(175,162,143,0.35), -3px -3px 8px rgba(255,255,255,0.95)" }}>
                <Building2 className="w-8 h-8" style={{ color: cs.iconBg }} />
              </div>
              <span className="text-xs font-semibold text-foreground/50 text-center leading-snug">{cs.company}</span>
            </div>
          </div>

          {/* Floating metric callout */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3.5 text-center border border-white/70"
            style={{ boxShadow: "3px 3px 10px rgba(175,162,143,0.28), -2px -2px 7px rgba(255,255,255,0.92)" }}>
            <p className="text-base font-bold text-foreground leading-none">{cs.previewMetric}</p>
            <p className="text-xs text-foreground/50 mt-1">{cs.previewSub}</p>
          </div>
        </div>

        {/* Content bottom */}
        <div className="flex flex-col flex-1 p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3 mb-4">
            <p className="text-sm text-muted-foreground font-semibold">{cs.company}</p>
            <span
              className="self-start text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm flex-shrink-0"
              style={{ background: cs.tagBg, color: cs.tagColor }}
            >
              {cs.tag}
            </span>
          </div>

          <p className="text-foreground mb-1">
            <span className="text-4xl font-bold leading-none">{cs.headline}</span>
            {" "}
            <span className="text-base font-medium text-muted-foreground">{cs.headlineSuffix}</span>
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed mt-3 mb-6 flex-1">{cs.description}</p>

          <div className="border-t border-border/50 pt-5 grid grid-cols-3 gap-4">
            {cs.stats.map((s) => (
              <div key={s.label}>
                <p className="text-xl font-bold text-foreground leading-none">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedElement>
  );
}

export default function Services() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="min-h-[45vh] flex items-center relative overflow-hidden bg-secondary">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-14 sm:py-20 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <p className="text-sm text-secondary-foreground/40 uppercase tracking-widest mb-4">What I build</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6 max-w-2xl leading-tight">
              Every service, scoped and{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-x">
                delivered by one engineer.
              </span>
            </h1>
            <p className="text-sm text-secondary-foreground/50 max-w-lg leading-relaxed">
              No handoffs. No overhead. You describe the problem, I scope the solution, I build it, I put it in production, and I operate it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-14 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedElement>
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-3">Case studies</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-10 sm:mb-14 max-w-xl leading-tight">
              How I've moved the needle.
            </h2>
          </AnimatedElement>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {CASE_STUDIES.map((cs, i) => (
              <CaseStudyCard key={cs.id} cs={cs} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />
        <AnimatedElement>
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-foreground mb-4 leading-tight">
              Have a project in mind?
            </h2>
            <p className="text-sm text-secondary-foreground/55 mb-8 max-w-md mx-auto">
              Tell me what you're working on. Takes 2 minutes. I'll respond personally within 24 hours.
            </p>
            <Link to="/intake"
              className="relative inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-8 py-4 rounded-full overflow-hidden btn-neuo-primary hover:opacity-95 transition-all duration-300 hover:-translate-y-0.5">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
              Start Your Project Brief
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedElement>
      </section>
    </div>
  );
}
