import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ArrowRight, Check, Zap, Database, Mail, Shield, BarChart2, Users } from "lucide-react";

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

const ICONS = { Database, Mail, Shield, BarChart2, Users, Zap };
const ICON_KEYS = ["Database", "Mail", "Zap", "Shield", "BarChart2", "Users"];

export default function Solutions() {
  const [solutions, setSolutions] = useState([]);
  useEffect(() => {
    base44.entities.Solution.list().then(setSolutions).catch(() => {});
  }, []);
  const staticFallback = [
    { title: "Lead Finding and Qualification", description: "We build tailored prospect databases from scratch based on your exact ICP — no generic data providers.", slug: "lead-finding-and-qualification" },
    { title: "Cold Calling", description: "Human-powered cold calling that complements your email outreach for a true multi-channel approach.", slug: "cold-calling" },
    { title: "Messaging", description: "Context-aware personalization that puts the right message in front of every prospect at the perfect moment.", slug: "messaging" },
    { title: "Deliverability", description: "Managed infrastructure ensuring your emails land in inboxes, not spam folders.", slug: "deliverability" },
    { title: "Closed Loop Optimisation", description: "Continuous A/B testing and iteration so your outbound gets smarter every single week.", slug: "closed-loop-optimization" },
    { title: "Done For You", description: "The complete outbound package — strategy, execution, and optimization, completely managed for you.", slug: "done-for-you" },
  ];
  const items = solutions.length > 0 ? solutions : staticFallback;

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="min-h-[45vh] flex items-center relative overflow-hidden bg-secondary">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <p className="text-xs text-secondary-foreground/40 uppercase tracking-widest mb-4">What we do</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary-foreground mb-6 max-w-2xl leading-tight" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
              Every piece of your outbound,{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-x">
                built and managed for you.
              </span>
            </h1>
            <p className="text-sm text-secondary-foreground/50 max-w-lg leading-relaxed">
              Throxy combines proprietary outreach technology with fully managed execution — so you get results without lifting a finger.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((sol, index) => {
              const iconKey = ICON_KEYS[index % ICON_KEYS.length];
              const IconComp = ICONS[iconKey];
              return (
                <AnimatedElement key={index} delay={index * 80}>
                  <div className="p-px rounded-lg bg-gradient-to-br from-primary/40 via-transparent to-accent/30 h-full hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.25)] transition-all duration-500">
                    <div className="bg-card rounded-lg p-6 h-full flex flex-col">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                        <IconComp className="w-5 h-5 text-card-foreground" />
                      </div>
                      <h3 className="text-base font-bold text-card-foreground mb-2" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
                        {sol.title}
                      </h3>
                      <p className="text-sm text-card-foreground/60 leading-relaxed flex-1">{sol.description}</p>
                      <div className="mt-4 flex items-center gap-1.5 text-xs text-primary font-medium group cursor-pointer">
                        Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedElement>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">The process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-16 max-w-xl leading-tight" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
              From zero to booked meetings in 3 weeks.
            </h2>
          </AnimatedElement>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Onboarding & Strategy", desc: "We gather insights about your ICP, messaging, and goals. No setup required from your side." },
              { num: "02", title: "Campaign Buildout", desc: "We research, scrape, and enrich your lead list. Then build and QA your first messaging campaign." },
              { num: "03", title: "Launch, Manage & Optimize", desc: "Outreach begins. You get replies, we qualify them, and pass only the good ones to your team." },
            ].map((step, i) => (
              <AnimatedElement key={i} delay={i * 100}>
                <div className="relative">
                  <div className="text-6xl font-bold text-primary/20 mb-4 leading-none" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>{step.num}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Why it works for traditional industries */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 items-center">
            <AnimatedElement>
              <p className="text-xs text-secondary-foreground/40 uppercase tracking-widest mb-3">Why throxy works</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-foreground mb-6 leading-tight" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
                Built for industries others can't crack.
              </h2>
              <p className="text-sm text-secondary-foreground/60 leading-relaxed mb-8">
                Manufacturing, logistics, construction, medical — these sectors require a different approach. Decision-makers aren’t on LinkedIn. They don’t respond to generic templates. Throxy’s proprietary data and personalization engine is designed specifically for these markets.
              </p>
              <div className="space-y-3">
                {["Custom databases built for your niche", "Context-aware personalization at scale", "Fully managed — zero effort from you", "Continuous optimization every week"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-accent-foreground" />
                    </div>
                    <span className="text-sm text-secondary-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <div className="space-y-3">
                {[
                  { label: "Manufacturing", pct: 92 },
                  { label: "Logistics", pct: 87 },
                  { label: "Construction", pct: 79 },
                  { label: "Medical", pct: 84 },
                  { label: "Education", pct: 88 },
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-xs text-secondary-foreground/50 w-24 flex-shrink-0">{row.label}</span>
                    <div className="flex-1 bg-secondary-foreground/10 rounded-full h-2">
                      <div className="h-2 rounded-full bg-primary transition-all duration-1000" style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-secondary-foreground/60 w-8">{row.pct}%</span>
                  </div>
                ))}
                <p className="text-xs text-secondary-foreground/30 mt-3">Reply rates across verticals</p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")' }} />
        <AnimatedElement>
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4 leading-tight" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
              Ready to fill your pipeline with qualified meetings?
            </h2>
            <p className="text-sm text-primary-foreground/70 mb-8">No setup. No dashboards. Just meetings with decision-makers who want to talk to you.</p>
            <a href="https://throxy.cal.com/forms/15483aea-e383-4659-97ec-60a125426c0c" target="_blank" rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 bg-secondary text-secondary-foreground text-sm font-medium px-7 py-3.5 rounded-sm overflow-hidden hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary-foreground/5 to-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]" />
              Apply for a Strategy Call
            </a>
          </div>
        </AnimatedElement>
      </section>
    </div>
  );
}