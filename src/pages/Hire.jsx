import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDown, ArrowRight, Video, Mail } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   hire.alexblackwood.xyz — recruiter-facing slide deck.
   One slide per scroll gesture (wheel / swipe / arrow keys), like rfeasley.io.
   Slides: resume → selected work → interview launch.
──────────────────────────────────────────────────────────────────────────── */

const EMAIL = "alexander@alexblackwood.xyz";
const PHONE = "732.858.5910";
const LINKEDIN_URL = "https://www.linkedin.com/in/rebel-spirit";
const RESUME_PDF = "/Alexander_Blackwood_Resume.pdf";
// Set VITE_INTERVIEW_URL once the AI replica is live; until then the button routes to email.
const INTERVIEW_URL = import.meta.env.VITE_INTERVIEW_URL || "";

const RESUME = {
  name: "alexander blackwood",
  tagline: "revops · systems · ai",
  contact: ["delray beach, fl", EMAIL, PHONE, { label: "alexblackwood.xyz", href: "https://alexblackwood.xyz" }],
  experience: [
    {
      company: "modus create",
      site: { label: "moduscreate.com", href: "https://moduscreate.com" },
      location: "reston, va · remote",
      roles: ["senior business operations analyst, sep 2024–present"],
      summary:
        "I own end-to-end GTM planning — capacity, headcount, quotas, pipeline — across the revenue stack. Architected the HubSpot CRM from the lead object up, rebuilt a brittle NetSuite integration that was causing outages, and aligned the marketing-to-sales lifecycle with Salesforce for full pipeline visibility and forecasting.",
    },
    {
      company: "nfm lending",
      site: { label: "nfmlending.com", href: "https://nfmlending.com" },
      location: "ft. lauderdale, fl · remote",
      roles: ["crm admin, apr 2023–aug 2024"],
      summary:
        "Led an end-to-end revenue operations transformation on HubSpot — 30% lift in lead-to-customer conversion, 25% more qualified pipeline, 15% better marketing ROI — and built the cross-functional reporting layer connecting marketing, sales, and customer success.",
    },
    {
      company: "particle theory labs",
      site: null,
      location: "boca raton, fl · remote",
      roles: ["director of revenue operations & business systems, mar 2020–mar 2023"],
      summary:
        "Built the company's first RevOps framework during a rapid growth phase: HIPAA-compliant CRM infrastructure and governance, automated executive dashboards, and customer-journey work that lifted pipeline velocity 40% and engagement 50%.",
    },
    {
      company: "chrysalis institute",
      site: null,
      location: "new york, ny",
      roles: ["business systems administrator, mar 2010–jan 2020"],
      summary:
        "Ran operations for a novel-therapeutics provider. Led the migration to a cloud platform (−25% operating cost, +30% patient throughput) and overhauled the CRM with automated, personalized follow-up pathways that lifted patient retention 35%.",
    },
  ],
  sections: [
    { title: "systems", items: ["hubspot (architect + admin)", "salesforce (architect + admin)", "netsuite", "n8n · zapier", "postgresql · sql", "looker · tableau"] },
    { title: "ai", items: ["claude · anthropic api", "codex", "mcp agents", "langgraph · crewai · autogen", "storybook", "conversational intake", "prompt & eval design"] },
    { title: "industries", items: ["professional services", "mortgage lending", "saas / healthtech", "healthcare"] },
    // TODO: fill in — rendered only when non-empty
    { title: "outside of work", items: [] },
    { title: "education", items: ["swarthmore college", "// b.a. linguistics"] },
  ],
};

// Career timeline — decimal years. Every work slide draws the full span so the
// active tenure reads in context; each employer keeps its own colour across slides.
const CAREER_START = 2010 + 2 / 12; // mar 2010
const _now = new Date();
const CAREER_END = _now.getFullYear() + _now.getMonth() / 12;
const TENURES = [
  { id: "chrysalis", from: 2010 + 2 / 12, to: 2020 + 0 / 12, years: "2010–20", color: "hsl(12 75% 48%)" },
  { id: "ptl", from: 2020 + 2 / 12, to: 2023 + 2 / 12, years: "2020–23", color: "hsl(255 65% 52%)" },
  { id: "nfm", from: 2023 + 3 / 12, to: 2024 + 7 / 12, years: "2023–24", color: "hsl(168 68% 38%)" },
  { id: "modus", from: 2024 + 8 / 12, to: CAREER_END, years: "2024–now", color: "hsl(225 78% 55%)" },
];
const pct = (v) => ((v - CAREER_START) / (CAREER_END - CAREER_START)) * 100;

const WORK = [
  {
    id: "modus",
    label: "Modus Create",
    sub: "GTM stack, 0→1",
    role: "senior business operations analyst",
    company: "Modus Create",
    period: "2024–present",
    tag: "Professional Services",
    accent: "hsl(225 78% 55%)",
    headline: "0→1",
    headlineSuffix: "full GTM stack architected",
    description:
      "Designed and implemented comprehensive CRM architecture in HubSpot from scratch, rebuilt a brittle NetSuite integration causing outages, and aligned marketing-to-sales lifecycle for complete pipeline visibility and revenue forecasting.",
    focus: ["CRM architecture", "NetSuite integration", "GTM planning & forecasting"],
    impact: ["CRM built from the lead object up", "NetSuite sync rebuilt — zero outages since", "100% pipeline visibility"],
  },
  {
    id: "nfm",
    label: "NFM Lending",
    sub: "30% conversion lift",
    role: "crm admin",
    company: "NFM Lending",
    period: "2023–2024",
    tag: "Mortgage Lending",
    accent: "hsl(168 68% 38%)",
    headline: "30%",
    headlineSuffix: "lift in lead-to-customer conversion",
    description:
      "Rebuilt CRM pipeline architecture and connected marketing automation to the sales lifecycle — turning a fragmented HubSpot stack into a single visible revenue system with cross-functional reporting.",
    focus: ["Pipeline architecture", "Marketing automation", "Cross-functional reporting"],
    impact: ["+30% lead-to-customer conversion", "+25% qualified pipeline", "+15% marketing ROI"],
  },
  {
    id: "ptl",
    label: "Particle Theory",
    sub: "RevOps from zero",
    role: "director, revenue operations & business systems",
    company: "Particle Theory Labs",
    period: "2020–2023",
    tag: "SaaS / HealthTech",
    accent: "hsl(255 65% 52%)",
    headline: "40%",
    headlineSuffix: "increase in pipeline velocity",
    description:
      "Built the company's first revenue operations framework from scratch — HIPAA-compliant CRM governance, automated executive reporting, and lifecycle management across a 3-year engagement.",
    focus: ["RevOps framework", "HIPAA-compliant CRM", "Executive reporting"],
    impact: ["+40% pipeline velocity", "+50% customer engagement", "0→1 RevOps function"],
  },
  {
    id: "chrysalis",
    label: "Chrysalis",
    sub: "35% retention lift",
    role: "business systems administrator",
    company: "Chrysalis Institute",
    period: "2010–2020",
    tag: "Healthcare",
    accent: "hsl(12 75% 48%)",
    headline: "35%",
    headlineSuffix: "increase in patient retention",
    description:
      "Led a full digital transformation — cloud migration, CRM overhaul with personalised communication pathways, and lifecycle marketing programs. Reduced operational costs and meaningfully improved patient outcomes.",
    focus: ["Cloud migration", "CRM overhaul", "Lifecycle marketing"],
    impact: ["+35% patient retention", "+30% patient throughput", "−25% operating cost"],
  },
];

/* ── small primitives ─────────────────────────────────────────────────────── */

const Eyebrow = ({ children, className = "" }) => (
  <p className={`text-[11px] uppercase tracking-[0.18em] text-foreground/40 mb-2 ${className}`}>{children}</p>
);

const MetaList = ({ items }) => (
  <ul className="space-y-1.5 text-sm text-foreground/75 leading-snug">
    {items.map((it) => <li key={it}>{it}</li>)}
  </ul>
);

/* ── slide: resume ────────────────────────────────────────────────────────── */

function ResumeCard() {
  return (
    <div className="bg-white rounded-sm neuo w-full max-w-[720px] mx-auto px-7 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-x-12 gap-y-8">
        {/* left column */}
        <div className="min-w-0">
          <h2 className="text-2xl sm:text-[1.7rem] font-bold text-foreground leading-tight">{RESUME.name}</h2>
          <p className="text-base text-foreground/55 mt-1 mb-10">{RESUME.tagline}</p>

          <div className="space-y-8">
            {RESUME.experience.map((job) => (
              <div key={job.company}>
                <p className="text-sm text-foreground leading-snug">
                  <span className="font-bold whitespace-nowrap">{job.company}</span>
                  {job.site && (
                    <>
                      <span className="text-foreground/40 mx-2">·</span>
                      <a href={job.site.href} target="_blank" rel="noreferrer" className="italic underline underline-offset-2 decoration-foreground/30 hover:decoration-foreground">{job.site.label}</a>
                    </>
                  )}
                  <span className="text-foreground/40 mx-2">·</span>
                  <span className="text-foreground/75">{job.location}</span>
                </p>
                {job.roles.map((r) => (
                  <p key={r} className="text-sm text-foreground/85 mt-1.5">{r}</p>
                ))}
                <p className="text-[13px] text-foreground/55 leading-relaxed mt-2">{job.summary}</p>
              </div>
            ))}

            <div>
              <p className="text-sm font-bold text-foreground">… more on linkedin</p>
              <p className="text-[13px] text-foreground/55 mt-1.5">
                Check{" "}
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2 decoration-foreground/30 hover:decoration-foreground">linkedin</a>
                {" "}for the long version, or{" "}
                <a href={RESUME_PDF} download className="underline underline-offset-2 decoration-foreground/30 hover:decoration-foreground">download the pdf</a>.
              </p>
            </div>
          </div>
        </div>

        {/* right column */}
        <div className="space-y-8 md:pt-1">
          <div>
            <p className="text-sm font-bold text-foreground mb-2">contact</p>
            <ul className="space-y-1 text-[13px] text-foreground/60">
              {RESUME.contact.map((c) =>
                typeof c === "string" ? (
                  <li key={c} className="truncate">{c === EMAIL ? <a href={`mailto:${EMAIL}`} className="hover:text-foreground">{c}</a> : c}</li>
                ) : (
                  <li key={c.label}><a href={c.href} className="underline underline-offset-2 decoration-foreground/30 hover:text-foreground">{c.label}</a></li>
                )
              )}
            </ul>
          </div>
          {RESUME.sections.filter((s) => s.items.length).map((s) => (
            <div key={s.title}>
              <p className="text-sm font-bold text-foreground mb-2">{s.title}</p>
              <ul className="space-y-1 text-[13px] text-foreground/60">
                {s.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResumeMeta() {
  return (
    <div className="space-y-8">
      <div>
        <Eyebrow>Open to</Eyebrow>
        <p className="text-lg font-semibold text-foreground leading-snug">Full-time</p>
        <p className="text-lg font-semibold text-foreground leading-snug">Contract</p>
      </div>
      <div>
        <Eyebrow>Contact</Eyebrow>
        <ul className="space-y-1 text-sm">
          <li><a href={`mailto:${EMAIL}`} className="text-foreground/80 hover:text-foreground break-all">{EMAIL}</a></li>
          <li><a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="text-foreground/80 hover:text-foreground">LinkedIn</a></li>
          <li><a href={RESUME_PDF} download className="text-foreground/80 hover:text-foreground">Resume (pdf)</a></li>
        </ul>
      </div>
    </div>
  );
}

/* ── slide: work ──────────────────────────────────────────────────────────── */

function WorkCard({ w }) {
  const active = TENURES.find((t) => t.id === w.id);
  const center = (pct(active.from) + pct(active.to)) / 2;
  const ticks = [...new Set(TENURES.flatMap((t) => [t.from, t.to]))];
  const Brace = ({ children }) => (
    <span className="font-heading font-light leading-none text-foreground/80 select-none text-[3.75rem] sm:text-[5.5rem] -translate-y-[0.06em]">{children}</span>
  );

  return (
    <div className="w-full max-w-[640px] mx-auto rounded-2xl bg-muted/70 px-5 sm:px-10 pt-[7.5rem] sm:pt-36 pb-9 sm:pb-12">
      <div className="flex items-center gap-2 sm:gap-4">
        <Brace>{"{"}</Brace>

        {/* timeline */}
        <div className="relative flex-1 h-14 sm:h-20 bg-foreground/[0.07]">
          {/* floating metric above the active tenure */}
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full mb-7 sm:mb-9 w-[168px] sm:w-[220px] bg-white rounded-md px-3.5 py-3 sm:px-4 sm:py-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_10px_28px_rgba(175,162,143,0.28)]"
            style={{ left: `clamp(84px, ${center}%, calc(100% - 84px))` }}
          >
            <p className="font-heading text-[1.9rem] sm:text-[2.4rem] font-bold tracking-tight leading-none" style={{ color: active.color }}>{w.headline}</p>
            <p className="text-[11px] sm:text-[12px] text-foreground/60 mt-1.5 leading-snug">{w.headlineSuffix}</p>
          </motion.div>

          {/* tenures */}
          {TENURES.map((t, i) => {
            const isActive = t.id === w.id;
            return (
              <motion.div
                key={t.id}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-y-0"
                style={{
                  left: `${pct(t.from)}%`,
                  width: `${pct(t.to) - pct(t.from)}%`,
                  background: t.color,
                  opacity: isActive ? 1 : 0.16,
                  transformOrigin: "left",
                }}
              />
            );
          })}

          {/* boundary ticks */}
          {ticks.map((v) => (
            <span key={v} className="absolute -top-1.5 -bottom-1.5 w-px bg-foreground/30" style={{ left: `${pct(v)}%` }} />
          ))}

          {/* marker line from metric down through the bar */}
          <motion.span
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-px -top-7 sm:-top-9 bottom-0 origin-top"
            style={{ left: `${center}%`, background: active.color }}
          />
        </div>

        <Brace>{"}"}</Brace>
      </div>

      <p className="mt-5 sm:mt-7 text-center font-heading text-[2.75rem] sm:text-6xl font-bold tracking-[-0.04em] leading-none text-foreground">
        {active.years.split("–").map((part, i) => (
          <span key={i}>
            {i > 0 && <span className="mx-[0.14em] text-foreground/35 font-normal">–</span>}
            {part}
          </span>
        ))}
      </p>
      <p className="mt-3 text-center text-[11px] uppercase tracking-[0.18em] text-foreground/40">
        {w.company} · {w.tag}
      </p>
    </div>
  );
}

function WorkMeta({ w, n }) {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-base font-semibold text-foreground leading-snug">{w.role}</p>
        <p className="text-[11px] text-foreground/35 mt-1 font-mono">({String(n).padStart(2, "0")})</p>
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{w.company}</p>
        <p className="text-xs text-foreground/45 mt-0.5">{w.period}</p>
      </div>
      <div>
        <Eyebrow>Description</Eyebrow>
        <p className="text-sm text-foreground/75 leading-relaxed">{w.description}</p>
      </div>
      <div>
        <Eyebrow>Focus</Eyebrow>
        <MetaList items={w.focus} />
      </div>
      <div>
        <Eyebrow>Impact</Eyebrow>
        <MetaList items={w.impact} />
      </div>
    </div>
  );
}

/* ── slide: interview ─────────────────────────────────────────────────────── */

function InterviewCard() {
  const live = Boolean(INTERVIEW_URL);
  const href = live ? INTERVIEW_URL : `mailto:${EMAIL}?subject=${encodeURIComponent("Interview request — via hire.alexblackwood.xyz")}`;
  return (
    <div className="w-full max-w-[560px] mx-auto rounded-sm neuo bg-secondary text-secondary-foreground px-8 py-10 sm:px-12 sm:py-14 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/25 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-16 w-60 h-60 bg-accent/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-secondary-foreground/55 mb-8">
          <span className={`w-1.5 h-1.5 rounded-full ${live ? "bg-accent animate-pulse-dot" : "bg-secondary-foreground/40"}`} />
          AI replica · {live ? "live" : "in training"}
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold leading-[1.1] tracking-tight">
          Interview me.<br />
          <span className="text-secondary-foreground/45">Right now.</span>
        </h2>
        <p className="mt-5 text-sm text-secondary-foreground/65 leading-relaxed max-w-sm">
          I've trained an AI replica on my work history, the systems I've built, and how I think about GTM. Start a live conversation whenever you're ready — no scheduling, no back-and-forth.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3">
          <a
            href={href}
            target={live ? "_blank" : undefined}
            rel={live ? "noreferrer" : undefined}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-primary/90 transition-all hover:-translate-y-0.5"
          >
            {live ? <Video className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
            {live ? "Launch interview" : "Request an interview"}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-1.5 text-sm text-secondary-foreground/55 hover:text-secondary-foreground transition-colors px-2">
            Prefer a human? Email me <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function InterviewMeta() {
  const steps = [
    "Press launch — no account, no calendar.",
    "Have a 20–30 minute video conversation with my AI replica.",
    "Ask anything: my experience, how I'd approach your stack, what I'd do in the first 90 days.",
    "The transcript lands in my inbox and I follow up personally within a day.",
  ];
  return (
    <div className="space-y-7">
      <div>
        <Eyebrow>How it works</Eyebrow>
        <ol className="space-y-3">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-3 text-sm text-foreground/75 leading-snug">
              <span className="font-mono text-[11px] text-foreground/35 pt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>
      <div>
        <Eyebrow>Good for</Eyebrow>
        <MetaList items={["First-round screens", "Technical deep-dives", "Timezone-hostile schedules"]} />
      </div>
    </div>
  );
}

/* ── slide registry ───────────────────────────────────────────────────────── */

const SLIDES = [
  {
    id: "resume",
    label: "Resume",
    sub: { text: "Download ↓", href: RESUME_PDF, download: true },
    Center: ResumeCard,
    Meta: ResumeMeta,
    scrollable: true,
  },
  ...WORK.map((w, i) => ({
    id: w.id,
    label: w.label,
    sub: { text: w.sub },
    Center: () => <WorkCard w={w} />,
    Meta: () => <WorkMeta w={w} n={i + 1} />,
  })),
  {
    id: "interview",
    label: "Interview",
    sub: { text: "Launch →", onClick: "next" },
    Center: InterviewCard,
    Meta: InterviewMeta,
  },
];

/* ── helpers ──────────────────────────────────────────────────────────────── */

// Walk up from `el` to find the nearest [data-scroll] container inside the deck.
function scrollParent(el, root) {
  let n = el;
  while (n && n !== root) {
    if (n.dataset && n.dataset.scroll !== undefined) return n;
    n = n.parentElement;
  }
  return null;
}
function canScroll(el, dir) {
  if (!el) return false;
  if (dir > 0) return el.scrollTop + el.clientHeight < el.scrollHeight - 1;
  return el.scrollTop > 0;
}

const variants = {
  enter: (d) => ({ opacity: 0, y: d * 28 }),
  center: { opacity: 1, y: 0 },
  exit: (d) => ({ opacity: 0, y: d * -28 }),
};
const T = { duration: 0.42, ease: [0.16, 1, 0.3, 1] };

/* ── page ─────────────────────────────────────────────────────────────────── */

export default function Hire() {
  // Always start at 0 for render parity with the prerendered HTML; the deep-link
  // hash is applied in an effect below.
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const rootRef = useRef(null);
  const lock = useRef(false);
  const lastInner = useRef(0);
  const touchY = useRef(null);
  const indexRef = useRef(index);
  indexRef.current = index;

  const go = useCallback((delta) => {
    const next = indexRef.current + delta;
    if (next < 0 || next >= SLIDES.length || lock.current) return;
    lock.current = true;
    setDir(delta > 0 ? 1 : -1);
    setIndex(next);
    setTimeout(() => { lock.current = false; }, 900);
  }, []);

  const jump = useCallback((i) => {
    if (i === indexRef.current || lock.current) return;
    lock.current = true;
    setDir(i > indexRef.current ? 1 : -1);
    setIndex(i);
    setTimeout(() => { lock.current = false; }, 900);
  }, []);

  // Deep link on load (declared before the replaceState effect so the hash is
  // read before it gets rewritten).
  useEffect(() => {
    const i = SLIDES.findIndex((s) => `#${s.id}` === window.location.hash);
    if (i > 0) setIndex(i);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${SLIDES[index].id}`);
  }, [index]);

  // Deep links (hire.alexblackwood.xyz#interview) and manual hash edits.
  useEffect(() => {
    const onHash = () => {
      const i = SLIDES.findIndex((s) => `#${s.id}` === window.location.hash);
      if (i >= 0 && i !== indexRef.current) jump(i);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [jump]);

  // Decide whether a gesture should scroll inner content or advance the deck.
  const shouldAdvance = useCallback((target, delta) => {
    const sp = scrollParent(target, rootRef.current);
    if (sp && canScroll(sp, delta)) { lastInner.current = Date.now(); return false; }
    // Reached the edge of inner content: ignore trailing inertia for a beat.
    if (sp && Date.now() - lastInner.current < 450) return false;
    return true;
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onWheel = (e) => {
      const d = Math.sign(e.deltaY);
      if (!d || Math.abs(e.deltaY) < 6) return;
      if (!shouldAdvance(e.target, d)) return;
      e.preventDefault();
      go(d);
    };
    const onKey = (e) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(1); }
      if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); go(-1); }
      if (e.key === "Home") jump(0);
      if (e.key === "End") jump(SLIDES.length - 1);
    };
    const onTouchStart = (e) => { touchY.current = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      if (touchY.current == null) return;
      const dy = touchY.current - e.changedTouches[0].clientY; // positive = swipe up = next
      touchY.current = null;
      if (Math.abs(dy) < 60) return;
      const d = Math.sign(dy);
      if (!shouldAdvance(e.target, d)) return;
      go(d);
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [go, jump, shouldAdvance]);

  const slide = SLIDES[index];
  const { Center, Meta } = slide;
  const isLast = index === SLIDES.length - 1;

  const Sub = () => {
    const s = slide.sub;
    if (!s) return null;
    const cls = "text-foreground/30 hover:text-foreground/60 transition-colors";
    if (s.href) return <a href={s.href} download={s.download} className={cls}>{s.text}</a>;
    if (s.onClick === "next") return <span className={cls}>{s.text}</span>;
    return <span className="text-foreground/30">{s.text}</span>;
  };

  const Dots = ({ className = "" }) => (
    <div className={`flex items-center gap-1.5 ${className}`} aria-label="Slide progress">
      {SLIDES.map((s, i) => (
        <button
          key={s.id}
          onClick={() => jump(i)}
          aria-label={s.label}
          className={`h-[2px] rounded-full transition-all duration-300 ${i === index ? "w-6 bg-foreground" : "w-3 bg-foreground/25 hover:bg-foreground/50"}`}
        />
      ))}
    </div>
  );

  return (
    <div ref={rootRef} className="fixed inset-0 bg-background text-foreground overflow-hidden select-none" style={{ overscrollBehavior: "none" }}>
      {/* ── desktop ─────────────────────────────────────────────────────── */}
      <div className="hidden lg:grid h-full grid-cols-[minmax(220px,1fr)_minmax(0,3.2fr)_minmax(220px,1fr)] gap-10 px-10 xl:px-14 py-10">
        {/* left rail */}
        <aside className="flex flex-col justify-between min-w-0">
          <div>
            <p className="text-[1.6rem] font-bold leading-tight tracking-tight">Alexander Blackwood</p>
            <p className="text-sm text-foreground/50 mt-1">revops · systems · ai</p>
            <Dots className="mt-5" />
          </div>
          <div className="mb-16">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={slide.id} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={T}>
                <p className="text-[2rem] font-bold leading-[1.05] tracking-tight">{slide.label}</p>
                <p className="text-[2rem] font-bold leading-[1.05] tracking-tight"><Sub /></p>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="text-[11px] text-foreground/25">Built with Claude · Railway</p>
        </aside>

        {/* center stage */}
        <div className="relative min-w-0 min-h-0">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={slide.id}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={T}
              className="absolute inset-0 flex items-center justify-center"
            >
              {slide.scrollable ? (
                <div data-scroll className="max-h-full w-full overflow-y-auto scrollbar-hide py-2 px-2 select-text" style={{ overscrollBehavior: "contain" }}>
                  <Center />
                </div>
              ) : (
                <div className="w-full px-2 select-text"><Center /></div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* right rail */}
        <aside className="flex flex-col justify-center min-w-0">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={slide.id} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={T} className="select-text">
              <Meta />
            </motion.div>
          </AnimatePresence>
          {!isLast && (
            <button onClick={() => go(1)} className="mt-10 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-foreground/35 hover:text-foreground transition-colors self-start">
              Scroll <ArrowDown className="w-3 h-3" />
            </button>
          )}
        </aside>
      </div>

      {/* ── mobile / tablet ──────────────────────────────────────────────── */}
      <div className="lg:hidden h-full flex flex-col">
        <div className="flex-shrink-0 px-5 pt-5 pb-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-lg font-bold leading-tight tracking-tight">Alexander Blackwood</p>
            <p className="text-xs text-foreground/50 mt-0.5">revops · systems · ai</p>
          </div>
          <Dots className="pt-2" />
        </div>
        <div className="relative flex-1 min-h-0">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={slide.id}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={T}
              data-scroll
              className="absolute inset-0 overflow-y-auto scrollbar-hide px-5 pb-10 select-text"
              style={{ overscrollBehavior: "contain", paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom))" }}
            >
              <div className="pt-3 pb-6">
                <p className="text-2xl font-bold leading-tight tracking-tight">{slide.label}</p>
                <p className="text-2xl font-bold leading-tight tracking-tight"><Sub /></p>
              </div>
              <Center />
              <div className="mt-8"><Meta /></div>
              {!isLast && (
                <button onClick={() => go(1)} className="mt-10 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-foreground/35">
                  Next <ArrowDown className="w-3 h-3" />
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
