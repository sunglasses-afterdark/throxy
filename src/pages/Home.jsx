import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Workflow, Zap, Bot, Database, Code2, Users, Check, ChevronRight, ChevronLeft } from "lucide-react";
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
    <div ref={ref} className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className || ""}`}>
      {children}
    </div>
  );
};

const PROJECT_TYPES = [
  { id: "workflow", label: "Workflow Redesign", desc: "Map and rebuild how work happens", icon: Workflow },
  { id: "integration", label: "System Integration", desc: "Connect your CRM, ERP, databases", icon: Zap },
  { id: "ai", label: "AI / MCP Build", desc: "LLM-powered features and agents", icon: Bot },
  { id: "data", label: "Data Architecture", desc: "Foundation your data sits on", icon: Database },
  { id: "other", label: "Something else", desc: "Let's figure it out together", icon: Code2 },
];

function HeroSection() {
  const [selected, setSelected] = useState([]); // multi-select array

  const toggleType = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const intakeHref = selected.length
    ? `/intake?types=${selected.join(",")}`
    : "/intake";

  return (
    <section className="bg-background min-h-[92vh] flex flex-col justify-center relative pt-12 pb-24">
      <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-primary/8 rounded-full blur-[140px] pointer-events-none animate-floatA" />
      <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[100px] pointer-events-none animate-floatB" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,_hsl(var(--border))_1px,_transparent_1px)] bg-[length:32px_32px] opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-foreground text-xs px-3 py-1.5 rounded-sm mb-8 font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
              GTM Engineering · AI / MCP Systems
            </div>

            <h1 className="text-5xl lg:text-[3.4rem] xl:text-[3.8rem] font-bold leading-[1.05] tracking-tight text-foreground mb-6">
              I redesign complex{" "}
              <span className="relative inline-block">
                workflows
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-50" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6.5C61 2.2 173 -3.5 198.5 6.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              {" "}around AI,{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-x">
                build the systems
              </span>
              {" "}that execute them, and operate those systems in production.
            </h1>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              Data integrations, automations, AI solutions, and custom software — scoped, built, and delivered by a senior engineer. No agency overhead. No handoffs. Just the work, done right.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to={intakeHref}
                className="group relative inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground text-sm font-semibold px-8 py-4 rounded-full overflow-hidden btn-neuo-primary hover:opacity-95 transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
                Start Your Project Brief
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                See all services <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right: Project Type Intake Widget */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="bg-card rounded-xl p-6 shadow-2xl border border-white/5 hover:shadow-primary/10 transition-all duration-700">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/8">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-sm bg-primary/20 flex items-center justify-center">
                    <span className="text-primary-foreground font-black text-xs leading-none" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>A</span>
                  </div>
                  <span className="text-xs font-semibold text-card-foreground/60">Alexander — Project Intake</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-card-foreground/15" />
                  <div className="w-2 h-2 rounded-full bg-card-foreground/15" />
                  <div className="w-2 h-2 rounded-full bg-primary/60" />
                </div>
              </div>

              <p className="text-xs text-card-foreground/50 uppercase tracking-widest mb-4">What are you working on?</p>

              <p className="text-xs text-card-foreground/40 mb-1">Select all that apply</p>
              <div className="space-y-2 mb-5">
                {PROJECT_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selected.includes(type.id);
                  return (
                    <button
                      key={type.id}
                      onClick={() => toggleType(type.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all duration-200 ${
                        isSelected
                          ? "bg-primary/15 border-primary/40 shadow-sm"
                          : "bg-card-foreground/4 border-card-foreground/8 hover:bg-card-foreground/8 hover:border-card-foreground/15"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? "bg-primary/30" : "bg-card-foreground/10"}`}>
                        <Icon className={`w-4 h-4 ${isSelected ? "text-primary" : "text-card-foreground/50"}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-semibold leading-none mb-1 ${isSelected ? "text-card-foreground" : "text-card-foreground/70"}`}>{type.label}</p>
                        <p className="text-xs text-card-foreground/40 leading-none">{type.desc}</p>
                      </div>
                      <div className={`ml-auto flex-shrink-0 w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center ${isSelected ? "bg-primary border-primary" : "border-card-foreground/20"}`}>
                        {isSelected && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <Link
                to={intakeHref}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-3 rounded-full btn-neuo-primary hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5"
              >
                {selected.length > 0 ? `Start Brief${selected.length > 1 ? ` (${selected.length} selected)` : ""}` : "Start Project Brief"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Tech stack row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 pt-8 border-t border-border/40"
        >
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-5">Technologies & platforms</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {["Claude / MCP", "HubSpot", "Salesforce", "NetSuite", "n8n", "Zapier", "PostgreSQL", "Python", "Airtable", "Retool"].map((tech) => (
              <span key={tech} className="text-sm font-semibold text-foreground/30 hover:text-foreground/60 transition-colors cursor-default">{tech}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Isometric Exploded GTM Diagram ────────────────────────────────────────
// Isometric transform: u = layer x-axis, v = depth-axis, z = elevation
const ISO_AX = 0.68, ISO_AY = 0.24;
const ISO_CX = 220, ISO_CY = 285;
const ISO_LW = 185, ISO_LD = 62, ISO_LZ = 7;
const ISO_ZLEVELS = [0, 58, 116, 174];

const isoXY = (u, v, z) => [
  ISO_CX + u * ISO_AX - v * ISO_AX,
  ISO_CY - z + u * ISO_AY + v * ISO_AY,
];
const polyPts = (corners) =>
  corners.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

const ISO_LAYERS_DEF = [
  {
    id: "sources",
    z: ISO_ZLEVELS[0],
    label: "SOURCES",
    nodes: [
      { id: "crm",  u: 6,   v: 6,  w: 48, d: 20, label: "CRM"       },
      { id: "erp",  u: 62,  v: 6,  w: 48, d: 20, label: "ERP"       },
      { id: "api",  u: 118, v: 6,  w: 62, d: 20, label: "Ext APIs"  },
      { id: "mktg", u: 6,   v: 36, w: 76, d: 20, label: "Marketing" },
    ],
  },
  {
    id: "integration",
    z: ISO_ZLEVELS[1],
    label: "INTEGRATION",
    nodes: [
      { id: "hub",    u: 14,  v: 18, w: 76, d: 24, label: "Data Hub"  },
      { id: "events", u: 102, v: 18, w: 76, d: 24, label: "Event Bus" },
    ],
  },
  {
    id: "processing",
    z: ISO_ZLEVELS[2],
    label: "PROCESSING",
    nodes: [
      { id: "ai",    u: 6,   v: 18, w: 56, d: 24, label: "AI / MCP"  },
      { id: "auto",  u: 72,  v: 18, w: 68, d: 24, label: "Automation" },
      { id: "logic", u: 150, v: 18, w: 30, d: 24, label: "Logic"      },
    ],
  },
  {
    id: "output",
    z: ISO_ZLEVELS[3],
    label: "OUTPUT",
    nodes: [
      { id: "dash",    u: 6,   v: 18, w: 66, d: 24, label: "Dashboards" },
      { id: "alerts",  u: 82,  v: 18, w: 44, d: 24, label: "Alerts"     },
      { id: "reports", u: 136, v: 18, w: 44, d: 24, label: "Reports"    },
    ],
  },
];

// Node IDs lit per service tab
const SVC_NODES = [
  new Set(["crm","erp","api","hub","ai","dash","alerts"]),
  new Set(["crm","erp","api","mktg","hub","events"]),
  new Set(["hub","events","auto","alerts","reports"]),
  new Set(["ai","auto","logic","dash","alerts","reports"]),
  new Set(["crm","erp","api","mktg","hub","events","ai","auto","logic"]),
  new Set(["crm","erp","api","mktg","hub","events","ai","auto","logic","dash","alerts","reports"]),
];

function GTMDiagram({ active }) {
  const lit = SVC_NODES[active] || new Set();
  const isLit = (id) => lit.has(id);
  const layerLit = (layer) => layer.nodes.some((n) => isLit(n.id));

  const faceCorners = (z) => [
    isoXY(0,       0,       z),
    isoXY(ISO_LW,  0,       z),
    isoXY(ISO_LW,  ISO_LD,  z),
    isoXY(0,       ISO_LD,  z),
  ];

  const pillCorners = (n, z) => [
    isoXY(n.u,       n.v,       z),
    isoXY(n.u + n.w, n.v,       z),
    isoXY(n.u + n.w, n.v + n.d, z),
    isoXY(n.u,       n.v + n.d, z),
  ];

  const pillCenter = (n, z) =>
    isoXY(n.u + n.w / 2, n.v + n.d / 2, z);

  // Corner (u,v) pairs — for dashed vertical connectors between layers
  const CORNER_UV = [[0, 0], [ISO_LW, 0], [ISO_LW, ISO_LD], [0, ISO_LD]];

  const TR = "fill 500ms ease, stroke 500ms ease";

  return (
    <svg viewBox="78 94 295 282" className="w-full" style={{ maxHeight: 440 }}>

      {/* Dashed vertical connectors between layer corners */}
      {CORNER_UV.flatMap(([cu, cv], ci) =>
        ISO_ZLEVELS.slice(0, -1).map((z, li) => {
          const [x1, y1] = isoXY(cu, cv, z);
          const [x2, y2] = isoXY(cu, cv, ISO_ZLEVELS[li + 1]);
          return (
            <line key={`conn-${ci}-${li}`}
              x1={x1.toFixed(1)} y1={y1.toFixed(1)}
              x2={x2.toFixed(1)} y2={y2.toFixed(1)}
              stroke="rgba(255,255,255,0.11)" strokeWidth="0.8" strokeDasharray="3 4"
            />
          );
        })
      )}

      {/* Layers — back-to-front (highest z first so front layers paint over) */}
      {[...ISO_LAYERS_DEF].reverse().map((layer) => {
        const on = layerLit(layer);
        const face = faceCorners(layer.z);

        // Left side face
        const leftFace = [
          isoXY(0, 0,       layer.z),
          isoXY(0, ISO_LD,  layer.z),
          isoXY(0, ISO_LD,  layer.z - ISO_LZ),
          isoXY(0, 0,       layer.z - ISO_LZ),
        ];
        // Front-bottom face
        const frontFace = [
          isoXY(0,      0, layer.z),
          isoXY(0,      0, layer.z - ISO_LZ),
          isoXY(ISO_LW, 0, layer.z - ISO_LZ),
          isoXY(ISO_LW, 0, layer.z),
        ];

        return (
          <g key={layer.id}>
            {/* Thickness: left face */}
            <polygon
              points={polyPts(leftFace)}
              fill={on ? "hsl(225 78% 16% / 0.95)" : "rgba(14,22,42,0.80)"}
              stroke={on ? "hsl(225 78% 46% / 0.30)" : "rgba(255,255,255,0.05)"}
              strokeWidth="0.5"
              style={{ transition: TR }}
            />
            {/* Thickness: front face */}
            <polygon
              points={polyPts(frontFace)}
              fill={on ? "hsl(225 78% 18% / 0.95)" : "rgba(14,22,42,0.70)"}
              stroke={on ? "hsl(225 78% 46% / 0.30)" : "rgba(255,255,255,0.05)"}
              strokeWidth="0.5"
              style={{ transition: TR }}
            />

            {/* Top face — main layer plane */}
            <polygon
              points={polyPts(face)}
              fill={on ? "hsl(225 78% 26% / 0.88)" : "rgba(255,255,255,0.035)"}
              stroke={on ? "hsl(225 78% 62% / 0.55)" : "rgba(255,255,255,0.09)"}
              strokeWidth={on ? 1.2 : 0.8}
              style={{ transition: `${TR}, stroke-width 500ms ease` }}
            />
            {/* Soft glow rim when active */}
            {on && (
              <polygon
                points={polyPts(face)}
                fill="none"
                stroke="hsl(225 78% 72%)"
                strokeWidth="3"
                opacity="0.12"
                strokeLinejoin="round"
              />
            )}

            {/* Node pills */}
            {layer.nodes.map((node) => {
              const nOn = isLit(node.id);
              const corners = pillCorners(node, layer.z);
              const [cx, cy] = pillCenter(node, layer.z);
              return (
                <g key={node.id}>
                  <polygon
                    points={polyPts(corners)}
                    fill={nOn ? "hsl(225 78% 54% / 0.94)" : "rgba(255,255,255,0.05)"}
                    stroke={nOn ? "hsl(225 78% 76% / 0.65)" : "rgba(255,255,255,0.09)"}
                    strokeWidth={nOn ? 1 : 0.6}
                    style={{ transition: TR }}
                  />
                  <text
                    x={cx.toFixed(1)} y={cy.toFixed(1)}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="7.5" fontFamily="'Courier New', monospace"
                    fill={nOn ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.17)"}
                    style={{ transition: "fill 480ms ease", pointerEvents: "none" }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}

            {/* Layer label — left of diagram, dashed leader line */}
            {(() => {
              const [lx, ly] = isoXY(0, 0, layer.z);
              return (
                <g>
                  <line
                    x1="102" y1={ly.toFixed(1)}
                    x2={(lx - 3).toFixed(1)} y2={ly.toFixed(1)}
                    stroke={on ? "hsl(225 78% 62% / 0.38)" : "rgba(255,255,255,0.09)"}
                    strokeWidth="0.8" strokeDasharray="2 3"
                    style={{ transition: "stroke 500ms ease" }}
                  />
                  <text
                    x="98" y={ly.toFixed(1)}
                    textAnchor="end" dominantBaseline="middle"
                    fontSize="6.5" fontFamily="'Courier New', monospace"
                    letterSpacing="1.2"
                    fill={on ? "rgba(255,255,255,0.70)" : "rgba(255,255,255,0.15)"}
                    style={{ transition: "fill 500ms ease" }}
                  >
                    {layer.label}
                  </text>
                </g>
              );
            })()}
          </g>
        );
      })}
    </svg>
  );
}

// ─── Abstract circle visualization ─────────────────────────────────────────
const PILLAR_VIZ = [
  // Workflow Redesign — linear flow
  [
    { cx: 80,  cy: 130, r: 32 },
    { cx: 185, cy: 130, r: 32 },
    { cx: 290, cy: 130, r: 40, active: true },
    { cx: 185, cy: 235, r: 28 },
    { cx: 290, cy: 235, r: 28 },
  ],
  // System Construction — layered stack
  [
    { cx: 200, cy: 75,  r: 32 },
    { cx: 115, cy: 175, r: 36, active: true },
    { cx: 200, cy: 175, r: 32 },
    { cx: 285, cy: 175, r: 32 },
    { cx: 200, cy: 275, r: 32 },
  ],
  // Command & Control — grid with lit centre
  [
    { cx: 100, cy: 95,  r: 28 },
    { cx: 210, cy: 95,  r: 28 },
    { cx: 320, cy: 95,  r: 28 },
    { cx: 100, cy: 200, r: 28 },
    { cx: 210, cy: 200, r: 42, active: true },
    { cx: 320, cy: 200, r: 28 },
    { cx: 210, cy: 305, r: 28 },
  ],
];

function PillarViz({ index }) {
  const nodes = PILLAR_VIZ[index] || PILLAR_VIZ[0];
  return (
    <svg viewBox="0 0 400 360" className="w-full h-full max-h-[320px]">
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.cx} cy={n.cy} r={n.r}
          fill={n.active ? "hsl(225 78% 62% / 0.85)" : "none"}
          stroke={n.active ? "hsl(225 78% 62%)" : "rgba(255,255,255,0.18)"}
          strokeWidth={n.active ? 0 : 2}
        />
      ))}
    </svg>
  );
}

const PILLARS = [
  {
    title: "Workflow Redesign",
    description: "I map how work actually happens across people, systems, and handoffs — then redesign those workflows around AI so software, with human oversight, can execute the work end to end.",
    tags: ["Process mapping", "AI automation design", "Human oversight loops", "Handoff elimination"],
  },
  {
    title: "System Construction",
    description: "I build the infrastructure that runs the redesigned workflow in production, including unified data, encoded business logic, AI reasoning, and integration with your existing systems of record.",
    tags: ["Data pipelines", "API integrations", "LLM / AI agents", "Business logic encoding"],
  },
  {
    title: "Command & Control",
    description: "I operate the systems and take responsibility for their performance over time. Systems execute the work continuously — humans oversee exceptions and approvals.",
    tags: ["Production operations", "Performance monitoring", "Exception handling", "Continuous optimization"],
  },
];

// ── Scramble-text hook ────────────────────────────────────────────────────
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";
function useScramble(target, active) {
  const [display, setDisplay] = useState(target);
  const timerRef     = useRef(null);
  // hasScrambled is a ref — persists across re-renders, resets only on remount (key change)
  const hasScrambled = useRef(false);

  useEffect(() => {
    // Ignore if not yet active, or if we've already run once this mount
    if (!active || hasScrambled.current) return;
    hasScrambled.current = true;

    let frame = 0;
    const TOTAL    = 18;
    const INTERVAL = 75; // ms — readable but snappy

    const tick = () => {
      frame++;
      const progress = frame / TOTAL;
      const scrambled = target.split("").map((ch, idx) => {
        if (ch === " " || ch === "—" || ch === "/") return ch;
        return idx / target.length < progress
          ? ch
          : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join("");
      setDisplay(scrambled);
      if (frame < TOTAL) timerRef.current = setTimeout(tick, INTERVAL);
      else setDisplay(target);
    };
    timerRef.current = setTimeout(tick, INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active]);

  return display;
}

function ScrambleText({ text, active }) {
  const display = useScramble(text, active);
  return <>{display}</>;
}

const PILLAR_CODES  = ["01 — WR", "02 — SC", "03 — CC"];
const PILLAR_NOTES  = [
  "connecting process redesign\nto production infrastructure",
  "systems execute the work —\nhumans oversee exceptions",
];
const CONN_H  = 110; // px — SVG height for connector
const NODE_W  = 272; // px — fixed narrow box width
const ILLUMINATE_AT = 78; // % line progress → pre-illuminate next node

function PillarsSection() {
  const [step, setStep]       = useState(-1);
  const [linePct, setLinePct] = useState([0, 0]);
  // pillRow[i]: 0 = dark, 1 = top pair lit, 2 = both pairs lit
  const [pillRow, setPillRow] = useState([0, 0, 0]);
  // incremented each time section exits viewport — remounts ScrambleText so scramble replays
  const [scrambleKey, setScrambleKey] = useState(0);
  const ref = useRef(null);
  const timersRef = useRef([]);
  const rafRef = useRef([]);

  const addT = (fn, ms) => { const id = setTimeout(fn, ms); timersRef.current.push(id); };

  // Light up pill rows for node `ni` sequentially after its box activates
  const litPills = (ni, baseOffset) => {
    addT(() => setPillRow(p => { const n = [...p]; n[ni] = 1; return n; }), baseOffset + 260);
    addT(() => setPillRow(p => { const n = [...p]; n[ni] = 2; return n; }), baseOffset + 520);
  };

  const animLine = (idx, dur) => {
    rafRef.current.forEach(cancelAnimationFrame);
    rafRef.current = [];
    const start = performance.now();
    const tick = (now) => {
      const pct = Math.min(100, ((now - start) / dur) * 100);
      setLinePct(prev => { const n = [...prev]; n[idx] = pct; return n; });
      if (pct < 100) rafRef.current.push(requestAnimationFrame(tick));
    };
    rafRef.current.push(requestAnimationFrame(tick));
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const LD = 1150;

    const play = (offset = 0) => {
      const s0 = offset;
      const s1 = offset + 650 + LD + 120;
      const s2 = offset + 650 + LD * 2 + 120 + 620 + 120;

      addT(() => setStep(0),       s0);
      litPills(0, s0);
      addT(() => animLine(0, LD),  offset + 650);

      addT(() => setStep(1),       s1);
      litPills(1, s1);
      addT(() => animLine(1, LD),  s1 + 620);

      addT(() => setStep(2),       s2);
      litPills(2, s2);
    };

    const CYCLE = 650 + LD * 2 + 120 * 2 + 620 + 120 + 520 + 2000;

    const loop = () => {
      setStep(-1);
      setLinePct([0, 0]);
      setPillRow([0, 0, 0]);
      rafRef.current.forEach(cancelAnimationFrame);
      rafRef.current = [];
      play(350);
      addT(loop, 350 + CYCLE);
    };

    // Entry observer — fires once to start the animation
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        play();
        addT(loop, CYCLE);
        // Now watch for exits so scramble resets when section leaves view
        exitObserver.observe(el);
      }
    }, { threshold: 0.15 });

    // Exit observer — resets scramble each time section fully leaves viewport
    const exitObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setScrambleKey(k => k + 1);
    }, { threshold: 0 });

    observer.observe(el);
    return () => {
      observer.disconnect();
      exitObserver.disconnect();
      timersRef.current.forEach(clearTimeout);
      rafRef.current.forEach(cancelAnimationFrame);
    };
  }, []);

  // Node illuminates when step reaches it OR the incoming line is ≥ ILLUMINATE_AT %
  const nodeOn = (i) => step >= i || (i > 0 && linePct[i - 1] >= ILLUMINATE_AT);

  // ── SVG connector ─────────────────────────────────────────────────────────
  const VConnector = ({ index }) => {
    const pct      = linePct[index];
    const h        = CONN_H;
    const DOT_R    = 3.5;
    // Dots 18 px from each end — creates visible gap from box borders
    const TOP_CY   = 18;
    const BOT_CY   = h - 18;
    const LINE_Y1  = TOP_CY  + DOT_R + 5;
    const LINE_Y2  = BOT_CY  - DOT_R - 5;
    const solidY2  = LINE_Y1 + (pct / 100) * (LINE_Y2 - LINE_Y1);
    const topOn    = nodeOn(index);        // top dot = previous node lit
    const botOn    = pct >= 99;            // bottom dot = line arrived

    return (
      <div className="relative flex justify-center" style={{ height: h }}>
        <svg width="14" height={h} viewBox={`0 0 14 ${h}`} style={{ display: "block" }}>
          {/* Dashed track */}
          <line x1="7" y1={LINE_Y1} x2="7" y2={LINE_Y2}
            stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeDasharray="5 8" />
          {/* Pacman solid growing top→bottom */}
          <line x1="7" y1={LINE_Y1} x2="7" y2={solidY2}
            stroke="hsl(225 78% 62%)" strokeWidth="2" strokeLinecap="round" />
          {/* Top dot */}
          <circle cx="7" cy={TOP_CY} r={DOT_R} style={{
            fill: topOn ? "hsl(225 78% 62%)" : "rgba(255,255,255,0.20)",
            transition: "fill 400ms ease",
          }} />
          {/* Bottom dot */}
          <circle cx="7" cy={BOT_CY} r={DOT_R} style={{
            fill: botOn ? "hsl(225 78% 62%)" : "rgba(255,255,255,0.20)",
            transition: "fill 400ms ease",
          }} />
        </svg>
        {/* Annotation note — absolute, right of line */}
        <div className="absolute top-1/2 -translate-y-1/2" style={{ left: "calc(50% + 18px)", width: "180px" }}>
          <p className="text-xs font-mono italic leading-snug whitespace-pre-line" style={{
            color: topOn ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.09)",
            transition: "color 600ms ease",
          }}>
            {PILLAR_NOTES[index]}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section ref={ref} className="py-28 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <AnimatedElement>
          <p className="text-sm font-semibold text-secondary-foreground/55 uppercase tracking-[0.22em] mb-16 text-center">How I build</p>
        </AnimatedElement>

        {/* ── Flow diagram — centred column ── */}
        <div className="flex flex-col items-center">
          {PILLARS.map((pillar, i) => (
            <div key={i} className="flex flex-col items-center w-full">

              {/* Node box */}
              <div className="neuo-dark rounded-2xl" style={{
                width: NODE_W,
                background: nodeOn(i) ? "hsl(225 78% 38%)" : "hsl(218 28% 11%)",
                border: nodeOn(i)
                  ? "1.5px solid hsl(225 78% 62% / 0.55)"
                  : "1.5px solid rgba(255,255,255,0.07)",
                boxShadow: nodeOn(i)
                  ? "8px 8px 24px hsl(225 78% 20% / 0.60), -3px -3px 10px rgba(255,255,255,0.09)"
                  : undefined,
                transition: "background 600ms ease, border-color 600ms ease, box-shadow 600ms ease",
              }}>
                {/* Code badge pill — centred */}
                <div className="flex justify-center pt-4 pb-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-xl" style={{
                    background: nodeOn(i) ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.05)",
                    border: nodeOn(i) ? "1px solid rgba(255,255,255,0.26)" : "1px solid rgba(255,255,255,0.08)",
                    color: nodeOn(i) ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.22)",
                    transition: "all 600ms ease",
                  }}>
                    <ScrambleText key={`code-${i}-${scrambleKey}`} text={PILLAR_CODES[i]} active={nodeOn(i)} />
                  </span>
                </div>

                {/* Title centred */}
                <h3 className="text-sm font-bold text-center px-4 pb-3 leading-snug" style={{
                  color: nodeOn(i) ? "#fff" : "rgba(255,255,255,0.28)",
                  transition: "color 600ms ease",
                }}>
                  <ScrambleText key={`title-${i}-${scrambleKey}`} text={pillar.title} active={nodeOn(i)} />
                </h3>

                {/* Sub-pills — 2×2 fixed grid, top row fires first, bottom row follows */}
                <div className="px-3 pb-3 grid grid-cols-2 gap-1.5">
                  {pillar.tags.map((tag, j) => {
                    // j 0,1 = top row; j 2,3 = bottom row
                    const rowLit = j < 2 ? pillRow[i] >= 1 : pillRow[i] >= 2;
                    return (
                      <span key={tag} className="text-xs font-mono py-1.5 rounded-xl text-center" style={{
                        background: rowLit ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.04)",
                        border: rowLit ? "1px solid rgba(255,255,255,0.24)" : "1px solid rgba(255,255,255,0.07)",
                        color: rowLit ? "rgba(255,255,255,0.84)" : "rgba(255,255,255,0.16)",
                        transition: "all 480ms ease",
                      }}>
                        <ScrambleText key={`tag-${i}-${j}-${scrambleKey}`} text={tag} active={rowLit} />
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Connector */}
              {i < PILLARS.length - 1 && <VConnector index={i} />}
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link to="/intake" className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-7 py-3.5 rounded-full btn-neuo-primary hover:opacity-95 transition-all hover:-translate-y-0.5">
            Start a project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    icon: Bot,
    title: "AI Solutions",
    description: "Put AI to work on real business problems — document processing, intelligent routing, classification, chat-based tools, and LLM-powered workflows.",
    items: ["Claude / MCP agents", "Document extraction", "Smart categorization", "LLM-powered features"],
    featured: true,
  },
  {
    icon: Zap,
    title: "Data Integration",
    description: "Connect your systems so data flows automatically — no more copy-pasting between tools or wondering which spreadsheet is current.",
    items: ["CRM ↔ ERP syncs", "API connections", "n8n / Zapier", "Database pipelines"],
  },
  {
    icon: Workflow,
    title: "Automation",
    description: "Turn repetitive manual work into automated workflows. If your team does the same thing every day, it should run itself.",
    items: ["Approval workflows", "Report generation", "Scheduled jobs", "Trigger-based flows"],
  },
  {
    icon: Code2,
    title: "Custom Software",
    description: "Internal tools, dashboards, and lightweight apps built around how your team actually works — not how some SaaS thinks you should.",
    items: ["Admin portals", "Client dashboards", "Airtable buildouts", "Retool / workflow apps"],
  },
  {
    icon: Database,
    title: "Data Architecture",
    description: "Design or fix the foundation your data sits on — so reporting is fast, data is trustworthy, and you can scale without pain.",
    items: ["Database design", "Warehouse setup", "Schema optimization", "Migration"],
  },
  {
    icon: Users,
    title: "Fractional CTO",
    description: "Senior technical leadership without a full-time hire. Get a seasoned engineer in your corner to set direction and solve hard problems.",
    items: ["Tech strategy", "Vendor evaluation", "Architecture reviews", "Build-vs-buy decisions"],
  },
];

function ServicesSection() {
  const [active, setActive] = useState(0);
  const tabRefs     = useRef([]);
  const containerRef = useRef(null);
  const [baton, setBaton] = useState({ left: 0, width: 0, ready: false });

  // Measure active tab synchronously before paint so baton never flashes at (0,0)
  useLayoutEffect(() => {
    const btn = tabRefs.current[active];
    if (btn) setBaton({ left: btn.offsetLeft, width: btn.offsetWidth, ready: true });
  }, [active]);

  const prev = () => setActive(i => Math.max(0, i - 1));
  const next = () => setActive(i => Math.min(SERVICES.length - 1, i + 1));

  return (
    <section className="py-28 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-5">Problems I solve every week</p>
        </AnimatedElement>

        <AnimatedElement delay={80}>
          <div className="neuo rounded-3xl" style={{ background: "hsl(45 22% 98%)" }}>

            {/* Tab bar */}
            <div className="px-6 border-b border-border/40 flex items-center gap-4 py-4">

              {/* Single continuous neumorphic bar — baton slides inside it */}
              <div className="flex-1 min-w-0 neuo rounded-full overflow-hidden"
                style={{ background: "hsl(45 22% 95%)", padding: "3px" }}>
                <div ref={containerRef} className="relative flex overflow-x-auto scrollbar-hide">
                  {/* Sliding baton */}
                  {baton.ready && (
                    <div
                      className="absolute inset-y-0 rounded-full bg-primary"
                      style={{
                        left: baton.left,
                        width: baton.width,
                        transition: "left 320ms cubic-bezier(0.4,0,0.2,1), width 320ms cubic-bezier(0.4,0,0.2,1)",
                        boxShadow: "4px 4px 12px hsl(225 78% 32% / 0.50), -2px -2px 6px rgba(255,255,255,0.22)",
                      }}
                    />
                  )}
                  {/* Tab labels */}
                  {SERVICES.map((s, i) => (
                    <button
                      key={i}
                      ref={el => tabRefs.current[i] = el}
                      onClick={() => setActive(i)}
                      className="relative flex-shrink-0 px-5 py-2 text-sm font-semibold z-10 whitespace-nowrap"
                      style={{
                        color: active === i ? "#fff" : "hsl(var(--muted-foreground))",
                        transition: "color 280ms ease",
                      }}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={prev}
                  disabled={active === 0}
                  className="neuo-sm w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30 transition-all hover:-translate-y-0.5"
                  style={{ background: "hsl(45 22% 96%)" }}
                >
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  onClick={next}
                  disabled={active === SERVICES.length - 1}
                  className="neuo-sm w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30 transition-all hover:-translate-y-0.5"
                  style={{ background: "hsl(45 22% 96%)" }}
                >
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: text */}
              <div className="px-8 py-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                  >
                    {/* Counter */}
                    <p className="text-xs text-muted-foreground/40 mb-8 font-mono">
                      <span className="neuo-sm inline-flex items-center justify-center w-7 h-7 rounded-full text-muted-foreground mr-1" style={{ background: "hsl(45 22% 96%)" }}>
                        {active + 1}
                      </span>
                      / {SERVICES.length}
                    </p>

                    {/* Icon + title */}
                    {(() => {
                      const Icon = SERVICES[active].icon;
                      return (
                        <div className="flex items-center gap-3 mb-5">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center neuo-sm ${SERVICES[active].featured ? "bg-primary/10" : ""}`} style={!SERVICES[active].featured ? { background: "hsl(45 22% 96%)" } : {}}>
                            <Icon className={`w-5 h-5 ${SERVICES[active].featured ? "text-primary" : "text-muted-foreground"}`} />
                          </div>
                          {SERVICES[active].featured && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary border border-primary/30 bg-primary/8 px-2.5 py-1 rounded-full">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
                              Featured
                            </span>
                          )}
                        </div>
                      );
                    })()}

                    <h2 className="text-3xl font-bold text-foreground mb-5 leading-tight">
                      {SERVICES[active].title}
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed mb-8">
                      {SERVICES[active].description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-10">
                      {SERVICES[active].items.map(item => (
                        <span key={item} className="neuo-sm text-xs text-muted-foreground px-3 py-1.5 rounded-full font-mono" style={{ background: "hsl(45 22% 96%)" }}>
                          {item}
                        </span>
                      ))}
                    </div>

                    <Link
                      to="/intake"
                      className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-semibold px-6 py-3 rounded-full btn-neuo hover:bg-foreground/90 transition-all hover:-translate-y-0.5"
                    >
                      Start a project <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right: isometric GTM diagram — persistent, highlights shift per tab */}
              <div
                className="flex flex-col items-center justify-center px-6 py-8 rounded-br-3xl lg:rounded-tr-3xl"
                style={{ background: "hsl(218 28% 8%)" }}
              >
                <div className="w-full">
                  <GTMDiagram active={active} />
                </div>
                <p className="text-xs font-mono mt-4 text-center" style={{ color: "rgba(255,255,255,0.16)", letterSpacing: "0.07em" }}>
                  GTM stack — {SERVICES[active].title}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-5 border-t border-border/40 flex items-center justify-between">
              <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                View all services <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs text-muted-foreground/35 hidden sm:block">
                {active + 1} of {SERVICES.length}
              </span>
            </div>

          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

function WhyAlexanderSection() {
  const reasons = [
    {
      title: "The person you talk to is the person who builds it",
      description: "No handoffs to junior devs. No project manager game of telephone. You talk to me, I build it, I deliver it.",
    },
    {
      title: "Speed you can't get from an agency",
      description: "No sprint planning, no standups, no two-week cycles. I scope fast, start fast, and ship fast. Most projects are in production within weeks.",
    },
    {
      title: "Senior-level thinking at every layer",
      description: "Architecture decisions, security considerations, maintainability — I'm not just writing code, I'm designing systems that hold up as your business grows.",
    },
    {
      title: "You're not locked in",
      description: "Month-to-month engagement. No long-term contracts. I earn the next month by delivering this month.",
    },
  ];

  return (
    <section className="py-28 bg-muted relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <AnimatedElement>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Why work with me</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
              One senior engineer.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Zero overhead.
              </span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
              I've spent 10+ years inside revenue operations, CRM architecture, and systems engineering. I've seen what breaks and what holds. I bring that to every engagement.
            </p>
            <Link
              to="/intake"
              className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-semibold px-7 py-3.5 rounded-full btn-neuo hover:bg-foreground/90 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start a project brief
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedElement>

          <div className="space-y-5">
            {reasons.map((reason, i) => (
              <AnimatedElement key={i} delay={i * 100}>
                <div className="neuo bg-background rounded-xl p-5 transition-all duration-300 hover:-translate-y-1.5">
                  <h3 className="text-sm font-bold text-foreground mb-2">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-primary/12 rounded-full blur-[120px] pointer-events-none" />
      <AnimatedElement>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <p className="text-xs text-secondary-foreground/40 uppercase tracking-widest mb-4">Ready to start?</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-foreground mb-4 leading-tight">
            Describe your project.<br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-x">
              I'll tell you if I can help.
            </span>
          </h2>
          <p className="text-sm text-secondary-foreground/50 mb-10 max-w-lg mx-auto leading-relaxed">
            Takes 2 minutes. No commitment. I'll review your brief and respond personally within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/intake"
              className="relative inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-8 py-4 rounded-full overflow-hidden btn-neuo-primary hover:opacity-95 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
              Start Your Project Brief
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:alexander@alexblackwood.xyz"
              className="inline-flex items-center gap-2 text-sm font-medium text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
            >
              Or email me directly
            </a>
          </div>
        </div>
      </AnimatedElement>
    </section>
  );
}

export default function Home() {
  return (
    <div className="bg-background">
      <HeroSection />
      <PillarsSection />
      <ServicesSection />
      <WhyAlexanderSection />
      <CTASection />
    </div>
  );
}
