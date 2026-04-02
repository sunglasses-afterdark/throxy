import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ChevronDown, ArrowRight, Check, Play, BarChart3, Users, Zap, Mail, Target, Repeat, Clock } from "lucide-react";
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

function HeroSection() {
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const bookedDays = [4, 8, 14, 20, 26];
  return (
    <section className="bg-background min-h-[90vh] flex flex-col justify-center relative pt-12 pb-24">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-floatA" />
      <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] pointer-events-none animate-floatB" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,_hsl(var(--border))_1px,_transparent_1px)] bg-[length:32px_32px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 bg-muted border border-border/50 text-foreground text-xs px-3 py-1.5 rounded-sm mb-8 font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Backed by Y-Combinator
            </div>
            <h1 className="text-5xl lg:text-6xl xl:text-[4rem] font-bold leading-[1.05] tracking-tight text-foreground mb-6" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
              Qualified meetings with <br className="hidden md:block" />
              <span className="relative inline-block">
                hard-to-reach
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-60" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00032 6.54545C61.3337 2.21212 173.2 -3.45455 198.5 6.54545" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span> buyers. <br />
              Done for you.
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              Most outbound tools are built for tech companies with LinkedIn-active buyers. Traditional industries don't work like that. throxy is built specifically for companies selling into manufacturing, logistics, construction and beyond.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://throxy.cal.com/forms/15483aea-e383-4659-97ec-60a125426c0c"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground text-sm font-semibold px-8 py-4 rounded-sm overflow-hidden hover:opacity-95 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1 w-full sm:w-auto"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent animate-shimmer bg-[length:200%_100%]" />
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                Apply for a Strategy Call
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: 10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="hidden lg:block perspective-1000"
          >
            <div className="bg-card rounded-xl p-6 shadow-2xl border border-border/40 hover:shadow-primary/10 transition-all duration-700 hover:-translate-y-2 backdrop-blur-sm bg-card/90">
              <div className="flex items-center justify-between mb-6 border-b border-border/40 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-accent/80" />
                  <div className="w-3 h-3 rounded-full bg-primary/80" />
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">May 2026</span>
              </div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["SUN","MON","TUE","WED","THU","FRI","SAT"].map(d => (
                  <div key={d} className="text-center text-[10px] text-card-foreground/40 py-2 font-bold tracking-wider">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {["","","","","","",""].slice(0,4).map((_, i) => <div key={`empty-${i}`} className="aspect-square rounded-md bg-muted/20" />)}
                {calendarDays.map((day) => {
                  const isBooked = bookedDays.includes(day);
                  return (
                    <div key={day} className={`relative aspect-square flex flex-col items-center justify-start p-1.5 rounded-md border transition-all duration-300 ${isBooked ? 'bg-primary/5 border-primary/20' : 'bg-transparent border-transparent hover:border-border/50'}`}>
                      <span className={`text-xs font-medium mb-1 ${isBooked ? 'text-primary' : 'text-card-foreground/70'}`}>{day}</span>
                      {isBooked && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + (day * 0.05) }}
                          className="w-full bg-primary text-primary-foreground rounded-sm px-1 py-1 text-center shadow-sm"
                        >
                          <p className="text-[8px] font-bold leading-none truncate mb-0.5">Booked Call</p>
                          <p className="text-[7px] opacity-80 leading-none truncate">Sales Opp.</p>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-24 pt-10 border-t border-border/40 flex flex-col items-center sm:items-start"
        >
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-6">Trusted by global sales teams</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-10 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            {["JELFA", "CERPRO", "UNILOGY", "aion", "SANTILLANA"].map((brand) => (
              <span key={brand} className="text-foreground font-black text-xl tracking-tighter hover:text-primary transition-colors cursor-default">{brand}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    base44.entities.Testimonial.list().then(setTestimonials).catch(() => {});
  }, []);
  const staticFallback = [
    { industry: "Manufacturing Software", stat_value: "5", stat_label: "meetings booked per week", quote: "The manufacturing industry is one of the toughest markets to crack — it's complex, relationship-driven, and full of noise. That's why we partnered with throxy. Together, we're not sending spam — we're starting real conversations.", author_name: "Niklas Gerlach, CCO", company: "Imnoo", image_url: "https://media.base44.com/images/public/69cdf02cda99287bd2ab8650/bba0d5067_framerusercontent_com_v1YEeQYLtGlZDM5K5SMKNGAoY5o_83da9831.png" },
    { industry: "Education Solutions", stat_value: "84", stat_label: "% positive reply rate", quote: "Throxy's personalised outbound put the right message in front of every educator at the perfect moment. We unlocked more qualified opportunities and gained precious time to focus on our customers.", author_name: "Francisco Ortiz", company: "Santillana", image_url: "https://media.base44.com/images/public/69cdf02cda99287bd2ab8650/dcf9bc6a9_framerusercontent_com_iHLvtql7Fy2hRh7XkzORvb13M_3bd3cdec.png" },
    { industry: "Medical Solutions", stat_value: "15", stat_label: "hours back per week", quote: "Throxy runs all the outreach so I can stay heads-down on coding. After just eight highly targeted calls we're about to sign our first deal—already covering the entire campaign cost.", author_name: "Nour Islam Mokhtari", company: "Pycad", image_url: "https://media.base44.com/images/public/69cdf02cda99287bd2ab8650/a6449cc3d_framerusercontent_com_hHramw8p0ivJNIPk0Xpa4wx7I_1f13acf7.jpeg" },
  ];
  const items = testimonials.length > 0 ? testimonials : staticFallback;

  return (
    <section className="bg-foreground text-background py-32 relative overflow-hidden z-20 -mt-8 rounded-t-[3rem]">
      {/* Dark mode glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatedElement>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-primary" />
            <p className="text-xs text-primary font-bold uppercase tracking-[0.2em]">Testimonials</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-background mb-20 max-w-2xl leading-tight tracking-tight" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
            Trusted by teams selling into traditional industries.
          </h2>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <AnimatedElement key={index} delay={index * 120}>
              <div className="bg-card text-card-foreground rounded-xl p-8 flex flex-col h-full border border-border/10 hover:border-primary/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform duration-500 group-hover:scale-150" />
                
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <Target className="w-5 h-5 text-primary/70" />
                  <p className="text-[10px] text-card-foreground/50 font-bold uppercase tracking-widest">{item.industry}</p>
                </div>
                
                <div className="mb-8 relative z-10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-6xl font-black text-card-foreground tracking-tighter" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
                      {item.stat_value}
                    </span>
                    {item.stat_label?.includes("%") && <span className="text-4xl font-bold text-primary">%</span>}
                  </div>
                  <p className="text-[10px] text-card-foreground/50 font-bold uppercase tracking-widest mt-2">
                    {item.stat_label?.replace("%", "")}
                  </p>
                </div>
                
                <p className="text-sm text-card-foreground/80 leading-relaxed flex-1 mb-8 relative z-10 font-medium">"{item.quote}"</p>
                
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/10 relative z-10">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.company} className="w-10 h-10 rounded-full object-cover border-2 border-primary/20" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">
                      {item.author_name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold text-card-foreground uppercase tracking-wide">{item.author_name}</p>
                    <p className="text-[10px] text-primary font-semibold uppercase tracking-wider">{item.company}</p>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function PainPointsSection() {
  const painPoints = [
    { icon: <Users className="w-8 h-8 text-primary" />, bold: "SDRs", text: "are slow to ramp and need handholding.", graph: "https://media.base44.com/images/public/69cdf02cda99287bd2ab8650/2193ff999_framerusercontent_com_4hP2fKH0tt4WaMjFj9Xn0j8dw_57aedb0e.png" },
    { icon: <Clock className="w-8 h-8 text-accent" />, bold: "Tools", text: "require tinkering, testing, & fixing issues.", graph: "https://media.base44.com/images/public/69cdf02cda99287bd2ab8650/0ba5ff4b7_framerusercontent_com_63NW2FzIe9m3lyhHbNYDjyCpIc_6559b254.png" },
    { icon: <Target className="w-8 h-8 text-destructive" />, bold: "Agencies", text: "promise results, but deliver poor leads.", graph: "https://media.base44.com/images/public/69cdf02cda99287bd2ab8650/18e2fa2cc_framerusercontent_com_3LfF1wLccIU6QTO19THUh800Co_1b86e698.png" },
  ];
  return (
    <section className="bg-foreground text-background py-20 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatedElement>
          <h2 className="text-4xl md:text-6xl font-bold text-background mb-16 leading-[1.1] tracking-tight" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
            Most tools overwhelm.<br />
            <span className="text-background/40">Most agencies disappoint.</span>
          </h2>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((point, i) => (
            <AnimatedElement key={i} delay={i * 150}>
              <div className="bg-card text-card-foreground rounded-xl overflow-hidden border border-border/10 hover:border-border/30 transition-all duration-500 group flex flex-col h-full">
                <div className="relative h-48 bg-muted/5 p-6 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10" />
                  <img src={point.graph} alt="" className="w-full h-full object-contain opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                </div>
                <div className="p-8 pt-4 flex-1 flex flex-col relative z-20 bg-card">
                  <div className="mb-4 transform -translate-y-8 bg-background p-3 rounded-lg shadow-lg inline-block w-fit text-foreground group-hover:-translate-y-10 transition-transform duration-500">
                    {point.icon}
                  </div>
                  <p className="text-lg text-card-foreground/80 leading-relaxed font-medium">
                    <span className="text-card-foreground font-bold text-xl block mb-2">{point.bold}</span>
                    {point.text}
                  </p>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURE_TABS = ["Data sources", "ICP Matching", "Managed Deliverability", "Messaging", "Loop Optimization", "Fully Managed"];
const FEATURE_CONTENT = [
  { title: "Build better lead lists with custom databases, not generic data providers", desc: "Most tools rely on stale data or firmographic filters. We build tailored prospect databases from scratch based on your exact ICP." },
  { title: "Match your ideal customer profile with precision targeting", desc: "Our proprietary ICP matching engine finds the exact buyers who need your solution right now." },
  { title: "Managed deliverability so your emails land in inboxes", desc: "We manage your sending infrastructure, warm-up schedules, and domain reputation so every email counts." },
  { title: "Context-aware messaging that converts", desc: "Personalized outreach built from scraped LinkedIn, website data, and trigger events specific to each prospect." },
  { title: "Closed-loop optimization every week", desc: "Weekly A/B testing, reply analysis, and campaign iteration to continually improve your outbound performance." },
  { title: "Fully managed execution from day one", desc: "Strategy, buildout, launch, management — we handle everything so your team can focus on closing deals." },
];

function OutboundPartnerSection() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section className="bg-background py-32 relative overflow-hidden -mt-10 rounded-t-[3rem] z-30">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
          <AnimatedElement>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-primary" />
              <p className="text-xs text-primary font-bold uppercase tracking-[0.2em]">For Traditional Industries</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
              The outbound partner with custom-built tech & managed execution
            </h2>
            
            <div className="space-y-8 mb-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground mb-2">We built our own outbound tech</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">Our custom-built outbound system generates curated databases, runs niche-specific outreach, and improves every week.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground mb-2">We manage it for you</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">Our fully managed service handles your entire pipeline. From strategy to messaging, infrastructure to booking.</p>
                </div>
              </div>
            </div>
            
            <a href="https://throxy.cal.com/forms/15483aea-e383-4659-97ec-60a125426c0c" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-sm font-semibold px-6 py-3.5 rounded-sm hover:bg-primary/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20">
              Apply for a Strategy Call
              <ArrowRight className="w-4 h-4" />
            </a>
          </AnimatedElement>
          
          <AnimatedElement delay={200}>
            <div className="bg-card rounded-2xl p-6 shadow-2xl border border-border/30 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              
              <div className="bg-muted/50 rounded-lg p-4 mb-6 border border-border/50">
                <p className="text-[10px] font-bold text-card-foreground/50 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Target className="w-3 h-3" /> Strategic Plan
                </p>
                <div className="flex flex-wrap gap-2">
                  {["ICP | Mid-Market Logistics", "Persona | Director of Ops", "Trigger | Fleet Expansion"].map((tag) => (
                    <span key={tag} className="text-xs bg-background border border-border/50 text-foreground px-3 py-1.5 rounded-full font-medium shadow-sm">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="mb-6 relative">
                <p className="text-[10px] font-bold text-card-foreground/50 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Zap className="w-3 h-3" /> Context aware personalization
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-background border border-border/50 rounded-lg p-4 shadow-sm hover:border-primary/30 transition-colors">
                    <span className="text-[9px] font-black text-primary bg-primary/10 px-2 py-1 rounded uppercase tracking-wider mt-0.5">LinkedIn</span>
                    <p className="text-sm text-card-foreground/80 font-medium">Saw your recent <span className="text-primary font-bold">Fleet expansion</span>.</p>
                  </div>
                  <div className="flex items-start gap-3 bg-background border border-border/50 rounded-lg p-4 shadow-sm hover:border-primary/30 transition-colors">
                    <span className="text-[9px] font-black text-accent bg-accent/10 text-accent-foreground px-2 py-1 rounded uppercase tracking-wider mt-0.5">Website</span>
                    <p className="text-sm text-card-foreground/80 font-medium">Congrats on your <span className="text-primary font-bold">DHL partnership</span>.</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-primary/10 rounded-bl-full" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-card-foreground block">A/B Test Variant A</span>
                    <span className="text-[10px] text-card-foreground/50 font-medium">Outbound Email</span>
                  </div>
                </div>
                <p className="text-sm text-card-foreground/80 leading-relaxed font-medium">Hi Alex, Congrats on your DHL partnership. Is ABC company looking to scale their fleet? We help logistic companies break into new areas with strategic fleet expansion solutions.</p>
              </div>
            </div>
          </AnimatedElement>
        </div>

        {/* Tabbed Feature Section */}
        <AnimatedElement delay={100}>
          <div className="bg-foreground text-background rounded-2xl overflow-hidden shadow-2xl border border-border/10">
            <div className="flex overflow-x-auto border-b border-background/10 scrollbar-hide bg-background/5">
              {FEATURE_TABS.map((tab, i) => (
                <button key={tab} onClick={() => setActiveTab(i)}
                  className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-all duration-300 flex-shrink-0 relative ${activeTab === i ? "text-primary" : "text-background/50 hover:text-background/80"}`}>
                  {tab}
                  {activeTab === i && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-background mb-6 leading-snug" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
                    {FEATURE_CONTENT[activeTab].title}
                  </h3>
                  <p className="text-base text-background/70 leading-relaxed mb-8">{FEATURE_CONTENT[activeTab].desc}</p>
                  <a href="https://throxy.cal.com/forms/15483aea-e383-4659-97ec-60a125426c0c" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors duration-200 group">
                    See how it works <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </AnimatePresence>
              
              <div className="bg-card/5 border border-border/10 rounded-xl p-8 relative overflow-hidden h-full flex flex-col justify-center">
                {/* Abstract visualization of the feature */}
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <div className="h-3 rounded-sm bg-background/20 w-3/4" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-background/20" />
                    <div className="h-3 rounded-sm bg-background/10 w-1/2" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <div className="h-3 rounded-sm bg-background/20 w-5/6" />
                  </div>
                  <div className="h-px w-full bg-background/10 my-6" />
                  <div className="h-12 rounded-lg bg-primary/20 w-full border border-primary/30 flex items-center px-4">
                     <div className="h-2 rounded-sm bg-primary/50 w-1/3" />
                  </div>
                </div>
                {/* Decorative background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { week: "Week 1: Strategy", desc: "We gather insights about your ICP, messaging, and goals.", tags: ["ICP | Logistics", "Persona | Director", "Trigger | Expansion"], icon: <Target className="w-5 h-5 text-primary" /> },
    { week: "Week 2: Buildout", desc: "We research, scrape, and enrich your lead list. Then we build your campaign.", tags: ["Website", "LinkedIn", "Custom DB"], icon: <Users className="w-5 h-5 text-accent" /> },
    { week: "Week 3: Launch", desc: "Outreach begins. You get replies, we qualify and pass only the good ones.", email: true, icon: <Mail className="w-5 h-5 text-destructive" /> },
    { week: "Ongoing Manage", desc: "Weekly updates, live feedback, and booked meetings, managed for you.", ongoing: true, icon: <Repeat className="w-5 h-5 text-primary" /> },
  ];
  return (
    <section className="bg-muted py-32 relative overflow-hidden border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="h-px w-8 bg-primary" />
            <p className="text-xs text-primary font-bold uppercase tracking-[0.2em]">How it works</p>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-20 text-center max-w-3xl mx-auto leading-tight tracking-tight" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
            Your outbound strategy, execution, and optimization, completely done for you
          </h2>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-border/50 -translate-y-1/2 z-0" />
          
          {steps.map((step, i) => (
            <AnimatedElement key={i} delay={i * 150} className="relative z-10">
              <div className="bg-background rounded-2xl p-6 h-full flex flex-col border border-border shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-500 group">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-border/50">
                  {step.icon}
                </div>
                
                <div className="flex-1 mb-6">
                  <h3 className="text-lg font-bold text-foreground mb-3 tracking-tight">{step.week}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">{step.desc}</p>
                </div>
                
                <div className="mt-auto pt-6 border-t border-border/50 bg-muted/30 -mx-6 -mb-6 p-6 rounded-b-2xl">
                  {step.tags && (
                    <div className="flex flex-wrap gap-2">
                      {step.tags.map((tag) => (
                        <div key={tag} className="text-[10px] font-bold bg-background text-foreground/70 px-2.5 py-1 rounded border border-border/50 uppercase tracking-wider">{tag}</div>
                      ))}
                    </div>
                  )}
                  {step.email && (
                    <div className="bg-background rounded-lg p-3 border border-border/50 shadow-sm relative overflow-hidden">
                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                      <div className="flex items-center gap-2 mb-2 pl-2">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[10px] font-bold text-foreground/60 uppercase tracking-widest">A/B Test 1</span>
                      </div>
                      <p className="text-[11px] text-foreground/80 leading-relaxed font-medium pl-2">Hi Alex, Congrats on your DHL partnership...</p>
                    </div>
                  )}
                  {step.ongoing && (
                    <div className="grid grid-cols-2 gap-2">
                      {["Updates", "Feedback", "Meetings", "Managed"].map((t) => (
                        <div key={t} className="bg-background border border-border/50 rounded flex items-center justify-center py-2 text-[10px] text-foreground font-bold uppercase tracking-wider shadow-sm">{t}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABannerSection() {
  return (
    <section className="bg-primary py-32 relative overflow-hidden z-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-background/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedElement>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground leading-[1.1] mb-8 tracking-tight" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
              The outbound partner built for hard-to-crack markets. <br className="hidden lg:block"/>Powered by our own tech.
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 leading-relaxed font-medium max-w-lg">
              Throxy is the only outbound partner combining proprietary outreach tech with fully managed execution. We're your unfair advantage in markets where outbound is hard, ignored, or broken.
            </p>
            <a href="https://throxy.cal.com/forms/15483aea-e383-4659-97ec-60a125426c0c" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-foreground text-background text-sm font-bold px-8 py-4 rounded-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl">
              Apply for a Strategy Call
              <ArrowRight className="w-4 h-4" />
            </a>
          </AnimatedElement>
          
          <AnimatedElement delay={200} className="hidden lg:block">
            <div className="bg-primary-foreground/5 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10 relative">
              <div className="space-y-4">
                {["Custom lead targeting", "Custom infrastructure", "Fully managed service"].map((item, i) => (
                  <motion.div 
                    key={item} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="flex items-center gap-4 bg-primary-foreground/10 rounded-lg p-4 backdrop-blur-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-background text-foreground flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-base font-bold text-primary-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.7 }}
                 className="mt-8 bg-background rounded-xl p-6 shadow-xl"
              >
                <div className="text-[10px] text-foreground/50 mb-4 font-bold uppercase tracking-widest flex items-center justify-between">
                  <span>Custom Lead Targeting</span>
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div className="space-y-3">
                  {[
                    { label: "ICP Match", w: 90, color: "bg-primary" },
                    { label: "Data Quality", w: 85, color: "bg-accent" },
                    { label: "Engagement", w: 75, color: "bg-foreground" }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-semibold text-foreground/70">
                        <span>{stat.label}</span>
                        <span>{stat.w}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stat.w}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.8 + (i * 0.2) }}
                          className={`h-full ${stat.color} rounded-full`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}

function PromiseSection() {
  return (
    <section className="bg-background py-32 relative overflow-hidden -mt-10 rounded-t-[3rem] z-30">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatedElement>
           <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 bg-primary" />
            <p className="text-xs text-primary font-bold uppercase tracking-[0.2em]">Our Promise</p>
          </div>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <AnimatedElement delay={100}>
            <div className="relative group rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img
                src="https://media.base44.com/images/public/69cdf02cda99287bd2ab8650/271260fef_framerusercontent_com_Ja6G5qS7zYgubxmra2xJYoTN2Y_34cd862f.png"
                alt="Throxy team"
                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              />
            </div>
          </AnimatedElement>
          
          <AnimatedElement delay={200}>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-8 tracking-tight" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
              Outbound sales is broken. <br className="hidden md:block"/>We're fixing it.
            </h3>
            <div className="space-y-6 text-base text-muted-foreground leading-relaxed font-medium">
              <p>We started throxy with a clear belief: outbound sales is broken, and AI will redefine how companies connect with their customers.</p>
              <p>Throxy exists to solve this problem. We won’t be just another sales platform, we’re your outbound growth partner, combining proprietary technology, rich data intelligence, and human expertise to connect you with perfect-fit prospects others simply can’t reach.</p>
              <p>Our promise is simple: we deliver qualified meetings with decision-makers in hard-to-reach, lucrative industries. No dashboards to manage. No systems to learn. No resources to hire.</p>
              <p className="text-foreground font-bold text-xl pt-4 border-t border-border mt-8">
                With throxy, outbound sales becomes what it should be: predictable, profitable, and painless.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(null);
  
  useEffect(() => {
    base44.entities.FAQ.list().then(setFaqs).catch(() => {});
  }, []);
  
  const staticFallback = [
    { question: "Do I need to set anything up?", answer: "No. We handle everything from strategy to execution. You simply onboard with us, share your ICP and goals, and we take it from there." },
    { question: "Do you cold call?", answer: "Our primary channel is email outreach, but we can incorporate cold calling as part of a multi-channel strategy." },
    { question: "Can I use my CRM or pipeline tools?", answer: "Yes. We integrate with your existing CRM and pass qualified meetings directly into your pipeline." },
    { question: "What if I'm in a niche or traditional industry?", answer: "That's exactly where we excel. Throxy is built specifically for companies selling into manufacturing, logistics, construction, and other traditional industries." },
    { question: "How fast will I see meetings?", answer: "Most clients see their first booked meetings within 2-3 weeks of campaign launch." },
    { question: "How is this different from a traditional lead gen agency?", answer: "Traditional agencies use generic data and spray-and-pray tactics. We build custom databases from scratch, use proprietary outreach technology, and act as a fully managed partner." },
  ];
  
  const items = faqs.length > 0 ? faqs : staticFallback;
  
  return (
    <section className="bg-muted py-32 border-t border-border/30">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedElement className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight" style={{ fontFamily: "'PP Neue Montreal Arabic Medium', system-ui, sans-serif" }}>
            Frequently Asked Questions
          </h2>
        </AnimatedElement>
        
        <div className="space-y-4">
          {items.map((faq, i) => (
            <AnimatedElement key={i} delay={i * 100}>
              <div className="bg-background rounded-xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left group focus:outline-none"
                >
                  <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors pr-8">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${open === i ? 'bg-primary border-primary text-primary-foreground rotate-180' : 'bg-transparent border-border text-muted-foreground group-hover:border-primary group-hover:text-primary'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-border/50 bg-muted/20">
                        <p className="text-base text-muted-foreground leading-relaxed font-medium">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="font-sans">
      <style>{`
        @keyframes floatA { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
        @keyframes floatB { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-2deg); } }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .perspective-1000 { perspective: 1000px; }
        .animate-floatA { animation: floatA 8s ease-in-out infinite; }
        .animate-floatB { animation: floatB 10s ease-in-out infinite reverse; }
        .animate-shimmer { animation: shimmer 3s linear infinite; }
        .animate-pulse-slow { animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
      <HeroSection />
      <TestimonialsSection />
      <PainPointsSection />
      <OutboundPartnerSection />
      <ProcessSection />
      <CTABannerSection />
      <PromiseSection />
      <FAQSection />
    </div>
  );
}