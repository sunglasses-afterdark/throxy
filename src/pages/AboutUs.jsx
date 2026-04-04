import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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

const EXPERIENCE = [
  {
    role: "Senior Business Operations Analyst",
    company: "Modus Create",
    period: "Sept 2024 — Present",
    location: "Remote",
    highlights: [
      "Oversee end-to-end GTM planning — capacity, headcount, quotas, pipeline — across key revenue systems",
      "Designed and implemented comprehensive CRM architecture in HubSpot including lead object structure for lifecycle management across marketing and sales",
      "Overhauled a brittle NetSuite integration that caused duplication and system outages — rebuilt underlying logic flows for stable data synchronization",
      "Implemented lifecycle management improvements with Salesforce integration, aligning marketing and sales for better pipeline visibility and revenue forecasting",
    ],
  },
  {
    role: "CRM Admin",
    company: "NFM Lending",
    period: "Apr 2023 — Aug 2024",
    location: "Ft. Lauderdale, FL (Remote)",
    highlights: [
      "Drove 30% improvement in lead-to-customer conversion through enhanced pipeline visibility and process automation",
      "Designed cross-functional reporting infrastructure connecting marketing, sales, and customer success data",
      "25% increase in qualified pipeline generation and 15% improvement in marketing ROI through multi-channel optimization",
    ],
  },
  {
    role: "Director of Revenue Operations & Business Systems",
    company: "Particle Theory Labs",
    period: "Mar 2020 — Mar 2023",
    location: "Boca Raton, FL (Remote)",
    highlights: [
      "Established company's first revenue operations framework — 40% increase in pipeline velocity, 50% improvement in customer engagement",
      "Implemented HIPAA-compliant CRM infrastructure and governance protocols for secure, scalable data management",
      "Built automated reporting and analytics dashboards tracking key revenue metrics for executive leadership",
    ],
  },
  {
    role: "Business Systems Administrator",
    company: "Chrysalis Institute",
    period: "Mar 2010 — Jan 2020",
    location: "New York, NY",
    highlights: [
      "Led digital transformation initiative — migrated to cloud-based platform, reducing operational costs 25% and increasing patient throughput 30%",
      "Overhauled CRM system with personalized patient communication pathways, resulting in 35% increase in patient retention",
      "Developed and maintained CRM strategies including lifecycle marketing programs and triggered campaigns",
    ],
  },
];

const TECH_DOMAINS = [
  {
    id: "revops",
    label: "Revenue Operations",
    tools: ["GTM strategy", "Pipeline management", "Revenue forecasting", "Cross-functional leadership"],
  },
  {
    id: "crm",
    label: "CRM & Platforms",
    tools: ["HubSpot (Admin)", "Salesforce (Admin)", "NetSuite", "6Sense", "Gong", "Pipedrive"],
  },
  {
    id: "ai",
    label: "AI & Automation",
    tools: ["Claude / Anthropic API", "MCP", "n8n", "Zapier", "LLM integrations", "Relevance AI"],
  },
  {
    id: "data",
    label: "Analytics & BI",
    tools: ["Looker", "Tableau", "Google Analytics", "SQL", "BigQuery", "Metabase"],
  },
  {
    id: "dev",
    label: "Development",
    tools: ["Python", "SQL", "Ruby", "Java", "React", "TypeScript", "Supabase"],
  },
  {
    id: "mktg",
    label: "Marketing Tech",
    tools: ["Google Ads", "LinkedIn Ads", "Marketing automation", "Lifecycle programs", "Clay", "Apollo"],
  },
];

function TechAccordion() {
  const [expanded, setExpanded] = useState(null);
  const [hovered, setHovered] = useState(null);

  return (
    <div className="border-t border-secondary-foreground/10">
      {TECH_DOMAINS.map((domain, i) => {
        const isOpen = expanded === domain.id;
        const isHov = hovered === domain.id;
        const isActive = isOpen || isHov;
        return (
          <div
            key={domain.id}
            className={`border-b border-secondary-foreground/10 transition-colors duration-200 ${isHov || isOpen ? "bg-secondary-foreground/[0.04]" : ""}`}
            onMouseEnter={() => setHovered(domain.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <button
              onClick={() => setExpanded(isOpen ? null : domain.id)}
              className="w-full flex items-center gap-6 py-5 px-1 text-left cursor-pointer"
            >
              {/* Numbered pill */}
              <span
                className={`flex-none w-12 h-8 flex items-center justify-center rounded-sm text-xs font-bold font-mono tracking-widest transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary-foreground/[0.08] text-secondary-foreground/35"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Domain label — centered */}
              <span
                className={`flex-1 text-center text-sm font-semibold uppercase tracking-[0.2em] transition-colors duration-200 ${
                  isActive ? "text-secondary-foreground" : "text-secondary-foreground/50"
                }`}
              >
                {domain.label}
              </span>

              {/* Toggle button */}
              <span
                className={`flex-none w-9 h-9 flex items-center justify-center rounded-full text-lg leading-none transition-all duration-200 border ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-secondary-foreground/20 text-secondary-foreground/35"
                }`}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {/* Expanded tools */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2.5 pb-6 px-[72px]">
                    {domain.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-secondary-foreground/65"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function About() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="min-h-[50vh] flex items-center bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-20 w-full relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <p className="text-xs text-secondary-foreground/40 uppercase tracking-widest mb-4">About</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary-foreground mb-6 max-w-2xl leading-tight">
              Alexander Blackwood.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-x">
                GTM Engineer.
              </span>
            </h1>
            <p className="text-sm text-secondary-foreground/55 max-w-xl leading-relaxed">
              10+ years inside revenue operations, CRM architecture, and systems engineering. I've seen what breaks — and how to fix it for good.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimatedElement>
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">The approach</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
                From design to data.
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  I'm a GTM engineer and revenue operations practitioner. What that means in practice: I sit at the intersection of business process, data systems, and AI — and I build the infrastructure that makes organizations run more effectively.
                </p>
                <p>
                  The work starts with understanding how work actually flows: who does what, where the handoffs happen, what breaks, what's manual that shouldn't be. Then I redesign those workflows around AI and automation, build the systems that execute them, and operate those systems in production.
                </p>
                <p>
                  I've done this at companies from early-stage startups to enterprise — in healthcare, mortgage lending, SaaS, and professional services. The problems look different on the surface. At the foundation, they're usually the same: data that doesn't flow, workflows that depend on the right person being available, systems that don't talk to each other.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <Link to="/intake" className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-semibold px-6 py-3 rounded-full btn-neuo hover:bg-foreground/90 transition-all hover:-translate-y-0.5">
                  Start a project <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="mailto:alexander@alexblackwood.xyz" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  alexander@alexblackwood.xyz <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <div className="space-y-3 pt-[7.5rem]">
                {[
                  { label: "Years in RevOps & Systems", value: "14+" },
                  { label: "CRM implementations", value: "20+" },
                  { label: "Location", value: "Delray Beach, FL" },
                  { label: "Education", value: "B.A. Linguistics, Swarthmore College" },
                  { label: "Engagement model", value: "Month-to-month, no lock-in" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3.5 border-b border-border/50 last:border-0">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-semibold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedElement>
            <p className="text-sm text-secondary-foreground/40 uppercase tracking-widest mb-3">Technical toolkit</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-secondary-foreground mb-14 max-w-xl leading-tight">
              Tools I work with.
            </h2>
          </AnimatedElement>

          <AnimatedElement delay={80}>
            <TechAccordion />
          </AnimatedElement>
        </div>
      </section>


      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />
        <AnimatedElement>
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4 leading-tight">
              Ready to work together?
            </h2>
            <p className="text-sm text-primary-foreground/70 mb-8">
              Tell me what you're trying to build. Takes 2 minutes and I'll respond personally.
            </p>
            <Link to="/intake"
              className="relative inline-flex items-center gap-2 bg-secondary text-secondary-foreground text-sm font-semibold px-7 py-3.5 rounded-full overflow-hidden btn-neuo-dark hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary-foreground/5 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
              Start Your Project Brief
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedElement>
      </section>
    </div>
  );
}
